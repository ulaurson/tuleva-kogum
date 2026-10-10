import http from 'node:http';
import { promises as fs } from 'node:fs';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../..');
export const TRIAL_HOURS = 72;
export const REQUESTS_LIMIT = 100;
export const REQUEST_PRICE_USD = 0.008;
const TRIAL_MS = TRIAL_HOURS * 60 * 60 * 1000;
const MAX_BODY_BYTES = 4096;
const EMPTY_STATE = { version: 1, started_at: null, expires_at: null, requests_used: 0 };

class AppError extends Error {
  constructor(code, httpStatus = 503) {
    super(code);
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

// Piloot toetab ainult 5-ga algavaid 7- või 8-kohalisi Eesti mobiilinumbreid.
// See ei määra operaatorit ega tõenda numbri olemasolu või omanikku.
export function normalizePhone(value) {
  if (typeof value !== 'string' || value.length > 64) return null;
  const compact = value.replace(/[\s()-]/g, '');
  const national = compact.startsWith('+372') ? compact.slice(4)
    : compact.startsWith('00372') ? compact.slice(5) : compact;
  return /^5\d{6,7}$/.test(national) ? `+372${national}` : null;
}

export function parsePort(value) {
  if (value === undefined) return 8787;
  if (typeof value !== 'string' || !/^\d{4,5}$/.test(value)) throw new AppError('invalid_port');
  const port = Number(value);
  if (port < 1024 || port > 65535) throw new AppError('invalid_port');
  return port;
}

function validateState(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
      || Object.keys(value).sort().join(',') !== 'expires_at,requests_used,started_at,version'
      || value.version !== 1 || !Number.isInteger(value.requests_used)
      || value.requests_used < 0 || value.requests_used > REQUESTS_LIMIT) {
    throw new AppError('state_unavailable');
  }
  if (value.started_at === null && value.expires_at === null && value.requests_used === 0) return value;
  if (typeof value.started_at !== 'string' || typeof value.expires_at !== 'string') {
    throw new AppError('state_unavailable');
  }
  const start = Date.parse(value.started_at);
  const end = Date.parse(value.expires_at);
  if (!Number.isFinite(start) || end - start !== TRIAL_MS
      || new Date(start).toISOString() !== value.started_at
      || new Date(end).toISOString() !== value.expires_at) {
    throw new AppError('state_unavailable');
  }
  return value;
}

// Ajutine fail + fsync + rename: loendur ei lähe võrgukutsele ette üksnes mälus.
export async function writeStateAtomic(filename, value) {
  const temp = `${filename}.${randomBytes(12).toString('hex')}.tmp`;
  let handle;
  try {
    handle = await fs.open(temp, 'wx', 0o600);
    await handle.writeFile(`${JSON.stringify(value)}\n`, 'utf8');
    await handle.sync();
    await handle.close();
    handle = null;
    await fs.rename(temp, filename);
  } finally {
    await handle?.close().catch(() => {});
    await fs.unlink(temp).catch(() => {});
  }
}

class StateStore {
  constructor(filename, writer) {
    this.filename = filename;
    this.writer = writer;
    this.lockname = `${filename}.lock`;
    this.markername = `${filename}.initialized`;
    this.lockToken = randomBytes(24).toString('hex');
    this.queue = Promise.resolve();
    this.failed = false;
    this.closed = false;
    this.lockOwned = false;
  }

  async init() {
    await fs.mkdir(path.dirname(this.filename), { recursive: true, mode: 0o700 });
    // Ka teine protsess ei tohi sama katse kvooti kasutada. Ebaselge/krahhist
    // jäänud lukk vajab käsitsi kontrolli; seda ei kustutata automaatselt.
    const lock = await fs.open(this.lockname, 'wx', 0o600);
    this.lockOwned = true;
    try {
      await lock.writeFile(JSON.stringify({ pid: process.pid, token: this.lockToken }), 'utf8');
      await lock.sync();
    } finally {
      await lock.close();
    }
    let stateExists = true;
    try {
      this.value = validateState(JSON.parse(await fs.readFile(this.filename, 'utf8')));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      stateExists = false;
    }
    let markerExists = true;
    try { await fs.access(this.markername); } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      markerExists = false;
    }
    if (!stateExists && markerExists) throw new AppError('state_unavailable');
    if (!markerExists) {
      // Marker säilib ka esimese salvestuse ebaõnnestumisel. Puuduv olekufail
      // ei saa järgmisel käivitusel muutuda märkamatult uueks katseks.
      const marker = await fs.open(this.markername, 'wx', 0o600);
      try { await marker.writeFile('initialized-v1\n', 'utf8'); await marker.sync(); }
      finally { await marker.close(); }
    }
    if (!stateExists) {
      this.value = { ...EMPTY_STATE };
      await this.writer(this.filename, this.value);
    }
  }

  run(operation) {
    const pending = this.queue.then(async () => {
      if (this.failed || this.closed) throw new AppError('state_unavailable');
      try {
        const disk = validateState(JSON.parse(await fs.readFile(this.filename, 'utf8')));
        if (JSON.stringify(disk) !== JSON.stringify(this.value)) throw new Error('state_changed');
      } catch {
        this.failed = true;
        throw new AppError('state_unavailable');
      }
      return operation(this.value);
    });
    this.queue = pending.catch(() => {});
    return pending;
  }

  async save(value) {
    try {
      await this.writer(this.filename, value);
      this.value = value;
    } catch {
      this.failed = true;
      throw new AppError('state_unavailable');
    }
  }

  async close() {
    this.closed = true;
    await this.queue;
    if (!this.lockOwned) return;
    try {
      const lock = JSON.parse(await fs.readFile(this.lockname, 'utf8'));
      if (lock.token === this.lockToken) await fs.unlink(this.lockname);
    } catch { /* Võõrast või muutunud lukku ei eemaldata. */ }
    this.lockOwned = false;
  }
}

function stateName(value, configured, now) {
  if (!configured) return 'unconfigured';
  if (!value.started_at) return 'ready';
  if (now >= Date.parse(value.expires_at)) return 'expired';
  if (value.requests_used >= REQUESTS_LIMIT) return 'limit_reached';
  return 'active';
}

function requireActive(value, configured, now) {
  const state = stateName(value, configured, now);
  if (state !== 'active') {
    throw new AppError(state === 'ready' ? 'not_active' : state, state === 'unconfigured' ? 503 : 409);
  }
}

function safeString(value, maxLength) {
  return typeof value === 'string' && value.trim() && value.length <= maxLength
    && !/[\u0000-\u001f\u007f]/.test(value) ? value.trim() : null;
}

async function readJson(request) {
  if (!/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(request.headers['content-type'] || '')) {
    throw new AppError('json_required', 415);
  }
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > MAX_BODY_BYTES) throw new AppError('body_too_large', 413);
    chunks.push(chunk);
  }
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('invalid');
    return value;
  } catch {
    throw new AppError('invalid_json', 400);
  }
}

function sendJson(response, httpStatus, value) {
  response.writeHead(httpStatus, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(value));
}

export async function createApp({
  env = process.env,
  stateFile = path.join(env.TULEVA_TRIAL_STATE_DIR || path.join(REPO, 'andmed-privaatne/twilio-katse'), 'state.json'),
  indexFile = path.join(HERE, 'index.html'),
  fetchImpl = globalThis.fetch,
  clock = Date.now,
  persistState = writeStateAtomic,
  upstreamTimeoutMs = 8000,
} = {}) {
  const keySid = typeof env.TWILIO_API_KEY_SID === 'string' ? env.TWILIO_API_KEY_SID.trim() : '';
  const keySecret = typeof env.TWILIO_API_KEY_SECRET === 'string' ? env.TWILIO_API_KEY_SECRET.trim() : '';
  const configured = /^SK[0-9a-f]{32}$/i.test(keySid) && Boolean(keySecret);
  const csrfToken = randomBytes(32).toString('hex');
  const store = new StateStore(path.resolve(stateFile), persistState);
  try {
    await store.init();
  } catch {
    await store.close();
    throw new AppError('state_unavailable');
  }

  const trialStatus = value => ({
    state: stateName(value, configured, clock()),
    configured,
    started_at: value.started_at,
    expires_at: value.expires_at,
    requests_used: value.requests_used,
    requests_limit: REQUESTS_LIMIT,
    request_price_usd: REQUEST_PRICE_USD,
    max_cost_usd: REQUESTS_LIMIT * REQUEST_PRICE_USD,
    csrf_token: csrfToken,
  });

  async function lookup(phone) {
    const empty = { status: 'unavailable', carrier: null, source: 'twilio', checked_at: null, line_type: null };
    const controller = new AbortController();
    let timer;
    try {
      const deadline = new Promise((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new Error('upstream_timeout'));
        }, upstreamTimeoutMs);
      });
      const work = (async () => {
        // Kontroll toimub pärast püsivat reserveerimist vahetult enne saatmist.
        if (store.failed || store.closed) throw new AppError('state_unavailable');
        if (clock() >= Date.parse(store.value.expires_at)) throw new AppError('expired', 409);
        const upstream = await fetchImpl(
          `https://lookups.twilio.com/v2/PhoneNumbers/${encodeURIComponent(phone)}?Fields=line_type_intelligence`,
          {
            method: 'GET',
            headers: { Authorization: `Basic ${Buffer.from(`${keySid}:${keySecret}`).toString('base64')}`, Accept: 'application/json' },
            signal: controller.signal,
            redirect: 'error',
          },
        );
        if (upstream.status === 404) return { ...empty, status: 'not_found', checked_at: new Date(clock()).toISOString() };
        if (!upstream.ok) return empty;
        const data = await upstream.json();
        if (!data || typeof data !== 'object' || Array.isArray(data)) return empty;
        if (data.valid === false) return { ...empty, status: 'not_found', checked_at: new Date(clock()).toISOString() };
        const intelligence = data.line_type_intelligence;
        if (data.valid !== true || !intelligence || typeof intelligence !== 'object'
            || (intelligence.error_code !== null && intelligence.error_code !== undefined)) return empty;
        const carrier = safeString(intelligence.carrier_name, 160);
        const lineType = safeString(intelligence.type, 40);
        if (!carrier || !lineType || !/^[a-z_]+$/i.test(lineType)
            || carrier.includes(phone) || carrier.includes(keySid) || carrier.includes(keySecret)) return empty;
        return { status: 'ok', carrier, source: 'twilio', checked_at: new Date(clock()).toISOString(), line_type: lineType };
      })();
      return await Promise.race([work, deadline]);
    } catch (error) {
      if (error instanceof AppError) throw error;
      return empty;
    } finally {
      clearTimeout(timer);
      controller.abort();
    }
  }

  const server = http.createServer(async (request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'no-referrer');
    try {
      const port = request.socket.localPort;
      const host = request.headers.host?.toLowerCase();
      const allowedHosts = new Set([`127.0.0.1:${port}`, `localhost:${port}`]);
      if (!allowedHosts.has(host)) throw new AppError('host_forbidden', 403);
      const origin = request.headers.origin;
      if (origin !== undefined && origin !== `http://${host}`) throw new AppError('origin_forbidden', 403);
      if (request.method === 'POST' && origin === undefined) throw new AppError('origin_forbidden', 403);
      if (!request.url || request.url.length > 1024 || request.url.includes('?')) throw new AppError('not_found', 404);
      const route = request.url;
      if (!['/', '/api/status', '/api/activate', '/api/lookup'].includes(route)) throw new AppError('not_found', 404);
      if ((['/', '/api/status'].includes(route) && request.method !== 'GET')
          || (['/api/activate', '/api/lookup'].includes(route) && request.method !== 'POST')) {
        throw new AppError('method_not_allowed', 405);
      }
      if (request.method === 'POST') {
        const token = request.headers['x-csrf-token'];
        if (typeof token !== 'string' || !/^[0-9a-f]{64}$/.test(token)
            || !timingSafeEqual(Buffer.from(token), Buffer.from(csrfToken))) throw new AppError('csrf_invalid', 403);
      }
      if (route === '/') {
        let html;
        try { html = await fs.readFile(indexFile); } catch { throw new AppError('page_unavailable'); }
        response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(html);
        return;
      }
      if (route === '/api/status') {
        sendJson(response, 200, await store.run(value => trialStatus(value)));
        return;
      }
      const body = await readJson(request);
      if (route === '/api/activate') {
        if (body.acknowledge_cost !== true) throw new AppError('cost_acknowledgement_required', 400);
        if (!configured) throw new AppError('unconfigured');
        const result = await store.run(async value => {
          if (value.started_at) return trialStatus(value); // Ei pikenda ka aegunud katset.
          const now = clock();
          const next = { ...value, started_at: new Date(now).toISOString(), expires_at: new Date(now + TRIAL_MS).toISOString() };
          await store.save(next);
          return trialStatus(next);
        });
        sendJson(response, 200, result);
        return;
      }
      if (body.consent !== true) throw new AppError('consent_required', 400);
      const phone = normalizePhone(body.phone);
      if (!phone) throw new AppError('invalid_phone', 400);
      await store.run(async value => {
        requireActive(value, configured, clock());
        await store.save({ ...value, requests_used: value.requests_used + 1 });
      });
      sendJson(response, 200, await lookup(phone));
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError('unavailable');
      if (!response.headersSent) sendJson(response, appError.httpStatus, { error: appError.code });
      else response.end();
    }
  });
  server.requestTimeout = 10000;
  server.headersTimeout = 10000;
  server.on('clientError', (_error, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\nContent-Length: 0\r\n\r\n');
  });
  let closing;
  return {
    server,
    async listen({ port = 8787 } = {}) {
      await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, '127.0.0.1', () => {
          server.removeListener('error', reject);
          resolve();
        });
      });
      return `http://127.0.0.1:${server.address().port}`;
    },
    close() {
      closing ||= (async () => {
        if (server.listening) {
          await new Promise(resolve => { server.close(resolve); server.closeIdleConnections(); });
        }
        await store.close();
      })();
      return closing;
    },
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let app;
  try {
    const port = parsePort(process.env.PORT);
    app = await createApp();
    const url = await app.listen({ port });
    console.log(`Twilio katse: ${url} (lokaalne, 72 h / kuni 100 päringut).`);
    for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, async () => { await app.close(); process.exit(0); });
  } catch {
    await app?.close();
    console.error('Katse server ei käivitunud. Kontrolli porti ja privaatse olekufaili ligipääsu/lukku.');
    process.exitCode = 1;
  }
}
