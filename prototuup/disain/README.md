# Prototüübi kujundus (Claude Design)

Claude Designi lõuendi lähtefailid seisuga 10.10.2026. Iga `*.dc.html` on üks ekraan, `canvas.json` on ekraanide järjekord, pealkirjad ja suurused. Kõik andmed on väljamõeldud (näidis).

Failid ei avane brauseris eraldi, sest vajavad Claude Designi käituskeskkonda (`support.js`). Töötav offline-versioon tuleb faili `prototuup/index.html` (vt [briif](../../docs/09-prototuubi-briif.md)).

## Ekraanid

| Fail | Ekraan |
|---|---|
| Main | 1 · Registreerumine (nõusolek + e-post) |
| K1-MinuKogum | 2 · Minu Kogum: ootan pakkumist |
| M2-Pakkumine | 3 · Pakkumine: piiramatu 6,50 € |
| M2b-Tahtajaline | 3b · Mul on tähtajaline leping |
| M6-Hiljem | 3c · Mitte praegu / meeldetuletus |
| M3-Leping | 4 · Lepingu andmed (eraklient) |
| M3b-LepingEttevote | 4b · Lepingu andmed (ettevõte) |
| M3c-Leping | 4c · Leping: loe, allkirjasta, saada |
| M3d-LepingEttevote | 4d · Leping: ettevõte |
| M4-Allkiri | 5 · Leping on saadetud |
| M5-Statistika | 6 · Minu pakett |
| K1b-AastaHiljem | 7 · Minu Kogum aasta hiljem |
| M2c-Pakkumine2027 | 7b · Ühishange 2027: hind langeb |
| T1-Osalejad | 8 · Tuleva: osalejad |
| T2-Hange | 9 · Tuleva: hankepäring |
| T3-Pakkumised | 10 · Tuleva: pakkumised ja vastuvõtt |
| T4-Aasta | 11 · Tuleva: aasta statistika |

Kõne tee: 1 → 2 → 3 → 4 → 4c → 5 → 8 → 11. Ülejäänud ekraanid jäävad küsimuste ajaks.
