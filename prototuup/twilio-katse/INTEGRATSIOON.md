# Operaatoripäringu kasutamine oma rakenduses

Seis 10.10.2026. [server.mjs](server.mjs) sisaldab töötavat HTTP-liidese koodi ja [index.html](index.html) selle kasutamise näidet. Praegune teostus on **localhosti piloot**, mitte avaliku rakenduse valmis teenus. Käivitamine, võtme seadistamine, hinnainfo ja katse lõpetamine on [README-s](README.md). Ankeedi üldine nõue on [dokumendis 19](../../docs/19-operaatori-paring.md); siin kirjeldatakse olemasolevat Twilio teostust, mitte kinnitatud TTJA API-t.

## Ühenduse ülesehitus

**Frontend → oma backend → Twilio Lookup v2 → oma backend → frontend.**

Number saadetakse Twiliole alles kasutaja nõusolekul ja päringunupust. Backend küsib ainult `line_type_intelligence` andmeid ning tagastab piiratud vastuse. SMS-i ega kõnet ei tehta. Twilio vastuse täpsus Eesti teisaldatud numbrite puhul vajab eraldi kontrolli; vastus ei tuvasta teenusebrändi, paketti, lepingut ega numbri omanikku.

Võtmed jäävad serveri protsessi keskkonda: `TWILIO_API_KEY_SID` ja `TWILIO_API_KEY_SECRET`. Windowsi käivitaja loeb need kasutajaga seotud DPAPI abil krüptitud failist. Võtmeid, telefoninumbreid ega päris päringuvastuseid ei lisata GitHubi, brauseri koodi, logidesse või analüütikasse. Piloot ei salvesta numbreid ega vastuseid kettale.

## Olemasolev HTTP API

Vaikimisi aadress on `http://127.0.0.1:8787`; `GET /` avab kasutajaliidese. Kõik API vastused on JSON. POST-päring vajab `Content-Type: application/json` päist, sama päritoluga `Origin`-päist ja `X-CSRF-Token` päist. Brauser lisab `Origin`-päise ise. Server lubab ainult oma pordi `127.0.0.1` või `localhost` hosti; CORS-i pole avatud.

| Päring | Sisend ja tulemus |
|---|---|
| `GET /api/status` | Tagastab katse oleku ja protsessipõhise `csrf_token` väärtuse. Ei käivita tasulist päringut. |
| `POST /api/activate` | Keha `{ "acknowledge_cost": true }`. Vajab seadistatud võtmeid. Tagastab sama olekuobjekti kui `/api/status`. Esimene aktiveerimine alustab 72 tundi; korduv aktiveerimine ei pikenda ega taasta katset. |
| `POST /api/lookup` | Keha `{ "phone": "<kasutaja sisend>", "consent": true }`. Vajab aktiivset katset. Tagastab allpool kirjeldatud päringuvastuse või HTTP vea. |

Olekuobjekti väljad on `state`, `configured`, `started_at`, `expires_at`, `requests_used`, `requests_limit`, `request_price_usd`, `max_cost_usd` ja `csrf_token`. `state` on `unconfigured`, `ready`, `active`, `expired` või `limit_reached`. Ajad on UTC ISO 8601 kujul või enne aktiveerimist `null`. `configured: true` tähendab võtmete kohalikku vormikontrolli, mitte Twilio konto edukat autentimist.

Piloodi piirid on 72 tundi ja **100** väljakutset. Olekuvastuses on päringu arvutushind `0.008` USD ning selle piloodi arvutuslik ülempiir `0.8` USD; hinnainfo piirangud on README-s. Tähtaeg ja loendur säilivad taaskäivitamisel. Iga lubatud päringu koht salvestatakse enne Twilio kutset; ka teenuse viga või ajalõpp kulutab koha. Automaatseid korduskatseid ei tehta. Twilio kutse ajalõpp on 8 sekundit. Katse lõppedes uusi kutseid ei alustata.

Olek asub `TULEVA_TRIAL_STATE_DIR` kaustas või README-s kirjeldatud vaikekaustas. `state.json`, initsialiseerimismarker ja protsessilukk hoiavad katse järjepidevust. Olekuvea korral päringud peatatakse. Failide kustutamine või teise kausta kolimine ei kuulu katse pikendamise töövoogu. See kvoot ei piira Twilio konto teiste rakenduste kasutust.

Server normaliseerib `+372`, `00372` ja riigikoodita sisendi ning eemaldab tühikud, sulud ja sidekriipsud. Piloot toetab ainult 5-ga algavaid 7- või 8-kohalisi Eesti mobiilinumbreid. See on sisendipiir, mitte operaatori määramine numbri alguse järgi.

Päringuvastuse kuju, **skeemiline näide**:

```json
{
  "status": "ok",
  "carrier": "<teenuse vastus>",
  "source": "twilio",
  "checked_at": "<UTC ISO 8601 aeg>",
  "line_type": "mobile"
}
```

`status` on `ok`, `not_found` või `unavailable`. `ok` sisaldab sideettevõtja ja liinitüübi stringi. `not_found` korral on `carrier` ja `line_type` väärtus `null`. Tehnilise tõrke `unavailable` korral on ka `checked_at: null`: seda ei esitata eduka kontrollina. HTTP 200 üksi ei kinnita õnnestumist; kontrolli alati `status` välja. Vastuses pole telefoninumbrit ega Twilio toorvastust.

Eeltingimuse vead tagastatakse kujul `{ "error": "<veakood>" }`:

| HTTP | Olulised veakoodid | Rakenduse käitumine |
|---|---|---|
| 400 | `invalid_phone`, `consent_required`, `cost_acknowledgement_required`, `invalid_json` | Paranda sisend või küsi puuduv nõusolek; päring ei käivitu. |
| 403 | `csrf_invalid`, `origin_forbidden`, `host_forbidden` | Kontrolli sama päritolu ja värsket tokenit; ära ava CORS-i veast möödumiseks. |
| 409 | `not_active`, `expired`, `limit_reached` | Värskenda katse olekut ja säilita käsitsi valik. Aegunud või täis katset ei aktiveerita uuesti. |
| 503 | `unconfigured`, `state_unavailable`, `unavailable` | Näita teenuse puudumist; käsitsi valik töötab edasi. |

Muud protokollivead on 404 `not_found`, 405 `method_not_allowed`, 413 `body_too_large` ja 415 `json_required`. Ära kuva kasutajale toorviga ega lisa veateatesse numbrit. Teenuse enda tõrge tuleb tavaliselt HTTP 200 ja `status: unavailable` kujul.

## Ankeedi voog ja väljade sidumine

1. Loe `/api/status` ja hoia `csrf_token` ainult brauseri mälus. Serveri taaskäivitamise järel loe uus token.
2. Kui olek on `ready`, näita katse piirid ja küsi kulunõusolek. Saada `/api/activate` ainult teadlikust kasutajategevusest.
3. Küsi numbri Twiliole saatmise luba. Saada `/api/lookup` nupust, mitte igal klahvivajutusel. Värskenda vastuse järel katse loendurit.
4. Näita sideettevõtjat ja päringu aega. Kasutaja kinnitab või parandab sideettevõtja ning valib teenusebrändi eraldi. Puuduv või vigane vastus jätab käsitsi valiku avatuks.
5. Numbri muutmisel eemalda vana tulemus ja kinnitus. Ära lase hilinenud vastusel uue numbri välja täita. Anonüümne häkatoniküsitlus jääb telefoninumbrita.

[Dokumendi 19](../../docs/19-operaatori-paring.md) kavandatud väljad seotakse nii; piloot ise neid andmebaasi ei kirjuta:

| Ankeedi väli | Allikas |
|---|---|
| `lookup_status` | `response.status`; `idle` ja `loading` on frontendi olekud. Toetamata sisend võib olla ankeedis `unsupported`. |
| `registry_carrier` | `response.carrier` ainult eduka vastuse korral. Välja nimi ei muuda Twilio vastust TTJA registrivastuseks. |
| `lookup_source` | `response.source`, siin `twilio`. Näidisvastusel peab olema eraldi `demo` tähis. |
| `lookup_checked_at` | `response.checked_at`; käsitsi valik ei tekita pärispäringu aega. |
| `confirmed_carrier`, `service_brand`, `carrier_confirmation_source` | Kasutaja kinnitus või käsitsi valik; neid ei tuletata automaatselt operaatorivastusest. |
| `phone_e164` | Vajadusel normaliseeri oma backendis, näiteks olemasoleva `normalizePhone` funktsiooniga. Praegune HTTP vastus numbrit ei tagasta; säilitamine vajab rakenduse eraldi reeglit. |

## Enne avalikus rakenduses kasutamist

Praegust serverit ei avaldata muutmata kujul internetti. Tõsta päringuhaldur oma rakenduse backend'i ning lisa kasutajate autentimine ja õigused, HTTPS, päringusageduse piiramine ning kõigi kasutajate ja serveriprotsesside **ühine atomaarne kulukvoot**. Host/Origin reeglid tuleb muuta teadlikult rakenduse tegelikule domeenile; praegune CSRF-token ei asenda autentimist.

Hosting vajab püsiketast või tehingulist andmebaasi, et restart või mitu serveri eksemplari ei nulliks või dubleeriks kvooti. Võtmed tulevad hostingu saladuste hoidlast serverisse; kohaliku Windowsi DPAPI fail ei ole pilve saladuste hoidla. Enne päris kasutust kinnita teenuse kasutustingimused, numbri saatmise teavitus, säilitamisreeglid ja Eesti operaatoriinfo täpsus. Testikäsk `node --test server.test.mjs` kasutab näidisvastuseid ega tõenda päris ühenduse toimimist.
