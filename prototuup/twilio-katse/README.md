# Twilio operaatoripäringu kolmepäevane katse

Kohalik katsetööriist ühendab Eesti mobiilinumbri Twilio Lookup v2 teenusega. See on eraldi ühenduse katse, mitte kogu Tuleva hankeprototüüp. Päris päringud vajavad kasutaja Twilio kontot ja API võtit.

**Arendajale:** [rakendusse ühendamise juhis](INTEGRATSIOON.md) kirjeldab olemasolevat HTTP API-t ja tooteankeedi välju. Kood on kasutatav serveriühenduse alusena. Veebirakendusse paigaldamine ja ühine kontoseadistus tuleb teha eraldi.

## Piirid

- Katse algab alles nupust „Alusta 3-päevast katset”. Aktiveerimine lubab kuni 100 väljakutset 72 tunni jooksul.
- Taaskäivitamine ei nulli tähtaega ega loendurit. Ka ebaõnnestunud väljakutse võtab ühe koha; automaatseid korduskatseid ei tehta.
- Rakendus küsib ainult `line_type_intelligence` paketti. SMS-e ega kõnesid ei tehta.
- Piloodis toetatakse Eesti 5-ga algavaid 7- ja 8-kohalisi mobiilinumbreid. See on katse piirang, mitte kõigi Eesti numbrite kirjeldus.
- Server kuulab ainult `127.0.0.1` aadressil. See ei ole avalik ega tiimile internetis jagatav teenus.
- Telefoninumbreid ja toorvastuseid kettale ei salvestata. Vastus näitab operaatorit, allikat ja kontrolli aega. Teenusebrändi, paketti ega lepingut see ei tuvasta.
- Eesti teisaldatud numbri praeguse operaatori täpsus tuleb katses eraldi kontrollida. Twilio vastus pole selle täpsuse tõend enne võrdlemist teadaoleva tulemusega.

**API-kulu arvutus:** 100 väljakutset × 0,008 USD = kuni 0,80 USD selle rakenduse päringute eest, võimalikud maksud lisaks. Katse piir ei piira konto muude rakenduste kasutust. Hinnakiri kontrollitud 10.10.2026: [Twilio Lookup](https://www.twilio.com/en-us/user-authentication-identity/pricing/lookup).

## Konto ja võtme seadistamine Windowsis

1. Logi oma [Twilio kontole](https://console.twilio.com/) ise sisse.
2. Loo katse jaoks eraldi **Restricted API key**, kui konto US regioon seda võimaldab. Anna ainult õigus `/twilio/lookup/phone-numbers/read`. Võtme SID algab `SK`. Ära kasuta konto peamist Auth Tokenit. [Võtmete juhend](https://www.twilio.com/docs/iam/api-keys/keys-in-console), [Lookup õiguste tabel](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Lookup_Permissions.pdf), kontrollitud 10.10.2026.
3. Käivita selles kaustas PowerShell 7 abil `pwsh -NoProfile -STA -File .\configure.ps1`. Sisesta SID ja Secret avanenud maskitud väljadega kohalikku aknasse. Neid ei ole vaja vestlusse kirjutada.
4. Käivita `pwsh -NoProfile -File .\start.ps1`. Vaja on Node.js 22 või uuemat. Ava brauseris `http://127.0.0.1:8787`. Kui PowerShell keeldub skripti käivitamast, kontrolli kohaliku skripti käivitamisõigust; käivitaja ei muuda arvuti turvapoliitikat.
5. Vaata kulupiir üle ja aktiveeri katse. Kontrolli ainult enda numbrit või numbrit, mille kasutaja on kontrolliga nõus.

Windowsi käivitaja hoiab võtme DPAPI abil krüptituna kaustas `%LOCALAPPDATA%\TulevaKogum\twilio-katse\credentials.json`. Dešifreeritud võti antakse ainult kohaliku serveri protsessi keskkonda. Püsiv katseolek on samas privaatses kaustas. Võtit ei saadeta brauserile, analüütikasse ega GitHubi.

Ilma Windowsi käivitajata saab serverit käivitada `node server.mjs` käsuga. Turvalises protsessikeskkonnas peavad siis olema `TWILIO_API_KEY_SID` ja `TWILIO_API_KEY_SECRET`. Oleku asukohta juhib `TULEVA_TRIAL_STATE_DIR`; vaikimisi kasutatakse repo Gitist välja jäetud `andmed-privaatne/twilio-katse/` kausta. Ära pane võtmeid käsu parameetritesse, brauseri koodi ega faili, mida Git jälgib.

## Katse lõpp

72 tunni või 100 päringu täitumisel server uusi Twilio väljakutseid ei tee. Käsitsi operaatorivalik jääb kasutatavaks. Serveri saab varem peatada selle terminalis `Ctrl+C` abil.

**Rakenduse sulgumine ei tühista Twilio API võtit.** Katse lõpus kustuta eraldi katsevõti Twilio konsoolist. Kohaliku olekufaili kustutamine või uude kausta kopeerimine ei kuulu lubatud kolmepäevase katse pikendamise töövoogu. [Twilio võtme ressursi kirjeldus](https://www.twilio.com/docs/iam/api-keys/key-resource-v1), kontrollitud 10.10.2026.

## Kontrollimine

`node --test server.test.mjs` kontrollib ühendust teenuse näidisvastustega. See ei tee tasulisi päringuid ega tõenda päris võtme või Eesti operaatoriinfo toimimist. Päris ühendus on kinnitatud alles pärast lubatud testnumbri edukat live-päringut.

**Kohaliku katse tulemus 10.10.2026:** lubatud numbri päring andis Twiliolt kasutatava vastuse. See kinnitas ühenduse toimimist selle konto ja võtmega. Number, konto, võti ning päringu üksikasjad ei ole avaliku repo osa; teisaldatud numbri operaatoriinfo täpsus vajab eraldi kontrolli.

## Käivitustõrge pärast jõuga sulgemist

Server lukustab olekufaili `state.json.lock` abil, et kaks protsessi ei saaks sama päringupiiri ületada. Tavapärane sulgemine eemaldab luku. Jõuga lõpetamise või voolukatkestuse järel võib lukk alles jääda. Enne ainult lukufaili käsitsi eemaldamist veendu, et ükski selle katse server enam ei tööta. Ära kustuta `state.json` faili ega `state.json.initialized` markerit: need säilitavad katse järjepidevuse. Kui olekufail on kadunud või rikutud, peatab server päringud, selle asemel et anda uue kvoodi.
