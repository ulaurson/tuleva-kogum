# Prototüüp: Tuleva Kogum

`index.html` on üks fail, mis töötab ilma internetita. Ava see topeltklikiga (Safari või Chrome). Fondid, stiilid ja andmed on faili sees. Kõik andmed on väljamõeldud (näidis).

## Esitamine

- **Nooleklahvid ← →** liiguvad kõne teel: registreerumine → Minu Kogum → pakkumine → lepingu andmed → leping ja allkiri → saadetud → Tuleva: osalejad → Tuleva: aasta.
- Ülemisest ribast saab valida iga ekraani (● = kõne teel). **H** peidab riba. **Algusesse** taastab näidisandmed.
- Kui fookus on väljal, nooleklahvid välja ei liigu (saad kirjutada).

## Mis töötab päriselt

- Lepingu andmed (eraklient või ettevõte, lisanumbrid) liiguvad lepingu teksti ja kogusummasse.
- Allkirjastamine on simuleeritud („Digiallkiri (demo)”), nupp aktiveerub alles pärast linnukest.
- Tuleva pakkumiste vaates sisestatud võitja hind muutub kohe liikme pakkumisel, lepingus ja aasta statistikas.
- Hankepäringu liugur arvutab säästu ja tingimuse täitumise.

## Varuplaan

Igast ekraanist on pilt kaustas `ekraanid/`. Kui fail laval ei avane, näita pilte.

## Allikad

- Kujundus: `disain/` (Claude Design).
- Hinnad: `data/hinnad.csv` (Tele2, Telia, Elisa tavahinnad 10.10.2026). Sääst on **hinnang** kolme tavahinna keskmise järgi.
- Fondid: Roboto ja Merriweather, SIL Open Font License 1.1 (Fontsource).
