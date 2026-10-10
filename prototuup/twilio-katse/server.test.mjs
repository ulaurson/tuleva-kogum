import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createApp, normalizePhone, parsePort, writeStateAtomic } from './server.mjs';

// Sünteetilised sisendid. Kõik Twilio kutsed asendab fetchImpl; päris teenust ei kutsuta.
const NATIONAL = '5'.repeat(7);
const PHONE = `+372${NATIONAL}`;
const ENV = { TWILIO_API_KEY_SID: `SK${'0'.repeat(32)}`, TWILIO_API_KEY_SECRET: 'synthetic-secret-for-local-tests' };
const START = Date.UTC(2026, 9, 10, 10);
const HOURS_72 = 72 * 60 * 60 * 1000;
const goodResponse = () => new Response(JSON.stringify({
  valid: true,
  phone_number: PHONE,
  secret_that_must_not_escape: ENV.TWILIO_API_KEY_SECRET,
  line_type_intelligence: { carrier_name: 'Testoperaator', type: 'mobile', error_code: null, mobile_network_code: '00' },
}), { status: 200 });

async function harness(t, overrides = {}) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'tuleva-twilio-test-'));
  const stateFile = path.join(dir, 'state.json');
  const indexFile = path.join(dir, 'index.html');
  await fs.writeFile(indexFile, '<!doctype html><title>Lokaalne katse</title>', 'utf8');
  let app;
  let url;
  let token;
  const base = { env: ENV, stateFile, indexFile, clock: () => START, fetchImpl: async () => { throw new Error('Unexpected mock call'); }, ...overrides };
  const result = {
    dir, stateFile,
    get url() { return url; },
    get token() { return token; },
    async start(more = {}) {
      app = await createApp({ ...base, ...more });
      url = await app.listen({ port: 0 });
      const current = await this.get('/api/status');
      token = current.body.csrf_token;
      return current;
    },
    async stop() { await app?.close(); app = null; },
    async get(route, headers = {}) {
      const response = await fetch(`${url}${route}`, { headers });
      const body = response.headers.get('content-type')?.includes('application/json') ? await response.json() : await response.text();
      return { status: response.status, body, headers: response.headers };
    },
    async post(route, body, { csrf = token, origin = url, headers = {} } = {}) {
      const response = await fetch(`${url}${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(csrf === null ? {} : { 'X-CSRF-Token': csrf }), ...(origin === null ? {} : { Origin: origin }), ...headers },
        body: JSON.stringify(body),
      });
      return { status: response.status, body: await response.json(), headers: response.headers };
    },
    activate() { return this.post('/api/activate', { acknowledge_cost: true }); },
    lookup(body = { phone: PHONE, consent: true }) { return this.post('/api/lookup', body); },
    async state() { return JSON.parse(await fs.readFile(stateFile, 'utf8')); },
  };
  t.after(async () => { await result.stop(); await fs.rm(dir, { recursive: true, force: true }); });
  await result.start();
  return result;
}

test('normaliseerib toetatud kujud ning tõrjub teiste riikide ja piloodi piirist väljas sisendi', () => {
  for (const value of [NATIONAL, PHONE, `00372 ${NATIONAL}`, `(+372) ${NATIONAL.slice(0, 3)}-${NATIONAL.slice(3)}`, `+372${'5'.repeat(8)}`]) {
    assert.match(normalizePhone(value), /^\+3725\d{6,7}$/);
  }
  for (const value of [null, 123, '', '5'.repeat(6), '5'.repeat(9), `+358${NATIONAL}`, `372${NATIONAL}`, '8'.repeat(7), '2'.repeat(8), `${PHONE}ext1`, `++372${NATIONAL}`, 'x'.repeat(100)]) {
    assert.equal(normalizePhone(value), null);
  }
});

test('CLI pordi väärtus on vaikimisi 8787 ja lubab ainult vahemikku 1024–65535', () => {
  assert.equal(parsePort(undefined), 8787);
  for (const value of ['1024', '8787', '65535']) assert.equal(parsePort(value), Number(value));
  for (const value of ['', '0', '1023', '65536', '-8787', '8787.5', ' 8787', '8787x', '00000']) {
    assert.throws(() => parsePort(value), /invalid_port/);
  }
});

test('võtmete puudumisel või vale tüüpi SID korral ei aktiveeri ega saada päringut', async t => {
  for (const env of [{}, { TWILIO_API_KEY_SID: ENV.TWILIO_API_KEY_SID }, { TWILIO_API_KEY_SECRET: 'test' }, { ...ENV, TWILIO_API_KEY_SID: `AC${'0'.repeat(32)}` }]) {
    const h = await harness(t, { env });
    const status = (await h.get('/api/status')).body;
    assert.equal(status.state, 'unconfigured');
    assert.equal(status.configured, false);
    assert.equal((await h.activate()).body.error, 'unconfigured');
    assert.equal((await h.lookup()).body.error, 'unconfigured');
    assert.deepEqual(await h.state(), { version: 1, started_at: null, expires_at: null, requests_used: 0 });
  }
});

test('aktiveerimine vajab kulunõusolekut ja CSRF-i; HTTP turvapiirid ei luba välist Origin-it', async t => {
  const h = await harness(t);
  assert.equal((await h.post('/api/activate', {})).body.error, 'cost_acknowledgement_required');
  assert.equal((await h.post('/api/activate', { acknowledge_cost: true }, { csrf: null })).status, 403);
  assert.equal((await h.post('/api/activate', { acknowledge_cost: true }, { csrf: 'õ'.repeat(64) })).body.error, 'csrf_invalid');
  assert.equal((await h.post('/api/activate', { acknowledge_cost: true }, { origin: 'https://example.invalid' })).body.error, 'origin_forbidden');
  assert.equal((await h.post('/api/activate', { acknowledge_cost: true }, { origin: null })).body.error, 'origin_forbidden');
  const response = await new Promise((resolve, reject) => {
    const request = http.get(`${h.url}/api/status`, { headers: { Host: 'example.invalid' } }, incoming => {
      let text = '';
      incoming.on('data', chunk => { text += chunk; });
      incoming.on('end', () => resolve({ status: incoming.statusCode, body: JSON.parse(text) }));
    });
    request.on('error', reject);
  });
  assert.equal(response.status, 403);
  assert.equal(response.body.error, 'host_forbidden');
  const status = await h.get('/api/status');
  assert.equal(status.headers.get('access-control-allow-origin'), null);
  assert.equal(status.headers.get('cache-control'), 'no-store');
  assert.equal(status.body.state, 'ready');
  assert.equal(status.body.requests_limit, 100);
  assert.equal(status.body.request_price_usd, 0.008);
  assert.equal(status.body.max_cost_usd, 0.8);
  assert.match((await h.get('/')).body, /Lokaalne katse/);
});

test('72 tunni algus ja lõpp säilivad taaskäivitamisel; korduv aktiveerimine ei pikenda katset', async t => {
  let now = START;
  const h = await harness(t, { clock: () => now });
  const first = (await h.activate()).body;
  assert.equal(first.state, 'active');
  assert.equal(Date.parse(first.started_at), START);
  assert.equal(Date.parse(first.expires_at), START + HOURS_72);
  const oldToken = h.token;
  now += 60 * 60 * 1000;
  assert.equal((await h.activate()).body.expires_at, first.expires_at);
  await h.stop();
  await h.start();
  assert.notEqual(h.token, oldToken);
  assert.equal((await h.get('/api/status')).body.expires_at, first.expires_at);
  assert.equal((await h.post('/api/activate', { acknowledge_cost: true }, { csrf: oldToken })).body.error, 'csrf_invalid');
  now = START + HOURS_72;
  assert.equal((await h.activate()).body.state, 'expired');
  assert.equal((await h.lookup()).body.error, 'expired');
  assert.equal((await h.state()).requests_used, 0);
});

test('aktiveerimata katse, puuduv nõusolek, CSRF ja vale number ei kuluta kvooti', async t => {
  let calls = 0;
  const h = await harness(t, { fetchImpl: async () => { calls++; return goodResponse(); } });
  assert.equal((await h.lookup()).body.error, 'not_active');
  await h.activate();
  assert.equal((await h.lookup({ phone: PHONE })).body.error, 'consent_required');
  assert.equal((await h.post('/api/lookup', { phone: PHONE, consent: true }, { csrf: null })).body.error, 'csrf_invalid');
  assert.equal((await h.lookup({ phone: '8'.repeat(8), consent: true })).body.error, 'invalid_phone');
  assert.equal(calls, 0);
  assert.equal((await h.state()).requests_used, 0);
});

test('päring reserveeritakse enne Twilio kutset; vastus ja püsifail ei lekita numbrit ega toorvastust', async t => {
  let h;
  let calls = 0;
  h = await harness(t, { fetchImpl: async (url, options) => {
    calls++;
    assert.equal((await h.state()).requests_used, 1);
    assert.equal(url, `https://lookups.twilio.com/v2/PhoneNumbers/${encodeURIComponent(PHONE)}?Fields=line_type_intelligence`);
    assert.equal(options.method, 'GET');
    assert.equal(options.redirect, 'error');
    assert.equal(options.headers.Authorization, `Basic ${Buffer.from(`${ENV.TWILIO_API_KEY_SID}:${ENV.TWILIO_API_KEY_SECRET}`).toString('base64')}`);
    return goodResponse();
  } });
  await h.activate();
  const response = await h.lookup();
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'ok', carrier: 'Testoperaator', source: 'twilio', checked_at: new Date(START).toISOString(), line_type: 'mobile' });
  assert.equal(calls, 1);
  const serialized = JSON.stringify(response.body) + JSON.stringify(await h.state());
  for (const forbidden of [PHONE, ENV.TWILIO_API_KEY_SID, ENV.TWILIO_API_KEY_SECRET, 'mobile_network_code', 'phone_number']) assert.equal(serialized.includes(forbidden), false);
  await h.stop();
  await h.start();
  assert.equal((await h.get('/api/status')).body.requests_used, 1);
});

test('puuduvat numbrit eristatakse teenuse tõrkest ning mõlemad katsed kulutavad kvooti', async t => {
  const replies = [new Response('{}', { status: 404 }), new Response(JSON.stringify({ valid: false }), { status: 200 })];
  const h = await harness(t, { fetchImpl: async () => replies.shift() });
  await h.activate();
  for (let index = 0; index < 2; index++) {
    const result = (await h.lookup()).body;
    assert.equal(result.status, 'not_found');
    assert.equal(result.carrier, null);
    assert.equal(result.checked_at, new Date(START).toISOString());
  }
  assert.equal((await h.state()).requests_used, 2);
});

test('upstreami tõrked ei muutu edukaks kontrolliks ega too automaatset korduskatset', async t => {
  const failures = [
    () => new Response('secret that must not escape', { status: 500 }),
    () => new Response('{}', { status: 429 }),
    () => { throw new Error(`${PHONE} ${ENV.TWILIO_API_KEY_SECRET}`); },
    () => new Response('not-json', { status: 200 }),
    () => new Response(JSON.stringify({ valid: true, line_type_intelligence: { error_code: 60601, carrier_name: 'Testoperaator', type: 'mobile' } })),
    () => new Response(JSON.stringify({ valid: true, line_type_intelligence: { error_code: null, carrier_name: null, type: 'mobile' } })),
    () => new Response(JSON.stringify({ valid: true, line_type_intelligence: { error_code: null, carrier_name: PHONE, type: 'mobile' } })),
  ];
  let calls = 0;
  const h = await harness(t, { fetchImpl: async () => failures[calls++]() });
  await h.activate();
  for (let index = 0; index < failures.length; index++) {
    assert.deepEqual((await h.lookup()).body, { status: 'unavailable', carrier: null, source: 'twilio', checked_at: null, line_type: null });
    assert.equal(calls, index + 1);
  }
  assert.equal((await h.state()).requests_used, failures.length);
});

test('ajalõpp katkestab upstreami ega vabasta reserveeritud katsekohta', async t => {
  let calls = 0;
  let signal;
  const h = await harness(t, { upstreamTimeoutMs: 25, fetchImpl: async (_url, options) => {
    calls++;
    signal = options.signal;
    return new Promise(() => {});
  } });
  await h.activate();
  assert.equal((await h.lookup()).body.status, 'unavailable');
  assert.equal(signal.aborted, true);
  assert.equal(calls, 1);
  assert.equal((await h.state()).requests_used, 1);
});

test('101 paralleelset päringut käivitavad täpselt 100 upstreami kutset ja piir säilib restartil', async t => {
  let calls = 0;
  const h = await harness(t, { fetchImpl: async () => { calls++; return goodResponse(); } });
  await h.activate();
  const results = await Promise.all(Array.from({ length: 101 }, () => h.lookup()));
  assert.equal(results.filter(result => result.body.status === 'ok').length, 100);
  assert.equal(results.filter(result => result.body.error === 'limit_reached').length, 1);
  assert.equal(calls, 100);
  assert.equal((await h.get('/api/status')).body.state, 'limit_reached');
  assert.equal((await h.state()).requests_used, 100);
  await h.stop();
  await h.start();
  assert.equal((await h.activate()).body.state, 'limit_reached');
  assert.equal((await h.lookup()).body.error, 'limit_reached');
  assert.equal(calls, 100);
});

test('reserveerimise ajal aeguv katse ei saada ka juba arvestatud päringut', async t => {
  let now = START;
  let calls = 0;
  const h = await harness(t, {
    clock: () => now,
    persistState: async (filename, value) => {
      await writeStateAtomic(filename, value);
      if (value.requests_used === 1) now = START + HOURS_72;
    },
    fetchImpl: async () => { calls++; return goodResponse(); },
  });
  await h.activate();
  assert.equal((await h.lookup()).body.error, 'expired');
  assert.equal(calls, 0);
  assert.equal((await h.state()).requests_used, 1);
});

test('loenduri salvestusvea järel jääb server suletuks ja upstreami ei kutsuta', async t => {
  let calls = 0;
  const h = await harness(t, {
    persistState: async (filename, value) => {
      if (value.requests_used > 0) throw new Error('Synthetic disk failure');
      await writeStateAtomic(filename, value);
    },
    fetchImpl: async () => { calls++; return goodResponse(); },
  });
  await h.activate();
  assert.equal((await h.lookup()).body.error, 'state_unavailable');
  assert.equal((await h.lookup()).body.error, 'state_unavailable');
  assert.equal((await h.get('/api/status')).status, 503);
  assert.equal((await h.state()).requests_used, 0);
  assert.equal(calls, 0);
});

test('kustutatud või väliselt muudetud olekufail ei alusta töötavas serveris uut katset', async t => {
  for (const mutate of [filename => fs.unlink(filename), filename => fs.writeFile(filename, '{}', 'utf8')]) {
    const h = await harness(t);
    await h.activate();
    await mutate(h.stateFile);
    assert.equal((await h.lookup()).body.error, 'state_unavailable');
    assert.equal((await h.activate()).body.error, 'state_unavailable');
  }
});

test('vigane püsifail ja juba lukustatud katse tõrjuvad käivituse', async t => {
  const h = await harness(t);
  await assert.rejects(createApp({ env: ENV, stateFile: h.stateFile }), /state_unavailable/);
  await h.stop();
  await fs.writeFile(h.stateFile, '{broken', 'utf8');
  await assert.rejects(createApp({ env: ENV, stateFile: h.stateFile }), /state_unavailable/);
  assert.equal(await fs.readFile(h.stateFile, 'utf8'), '{broken');
});

test('serveri seismise ajal kadunud olekufail ei muutu taaskäivitusel uueks kvoodiks', async t => {
  const h = await harness(t);
  await h.activate();
  await h.stop();
  await fs.unlink(h.stateFile);
  await assert.rejects(createApp({ env: ENV, stateFile: h.stateFile }), /state_unavailable/);
  await assert.rejects(fs.access(h.stateFile), { code: 'ENOENT' });
  assert.equal(await fs.readFile(`${h.stateFile}.initialized`, 'utf8'), 'initialized-v1\n');
});

test('olekukausta saab määrata privaatse keskkonnamuutujaga', async t => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'tuleva-twilio-env-test-'));
  let app;
  t.after(async () => { await app?.close(); await fs.rm(dir, { recursive: true, force: true }); });
  app = await createApp({ env: { TULEVA_TRIAL_STATE_DIR: dir }, fetchImpl: async () => { throw new Error('No live calls'); } });
  assert.deepEqual(JSON.parse(await fs.readFile(path.join(dir, 'state.json'), 'utf8')), { version: 1, started_at: null, expires_at: null, requests_used: 0 });
});
