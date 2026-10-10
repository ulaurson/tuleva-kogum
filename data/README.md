# Andmed

## hinnad.csv

Eesti kolme suure operaatori eraisiku mobiilipaketid. Hinnad on €/kuu koos käibemaksuga.

| Veerg | Tähendus |
|---|---|
| `operaator` | Tele2, Telia, Elisa |
| `pakett` | Paketi nimi operaatori lehel |
| `andmemaht_gb` | Andmemaht Eestis, GB kuus. `9999` = piiramatu |
| `hind_24k_eur` | Hind 24-kuulise lepinguga. Tühi, kui sellist hinda pole avaldatud |
| `hind_kuupohine_eur` | Hind ilma sidumiseta (tähtajatu leping) |
| `allikas` | Kust hind pärineb |
| `kontrollitud` | Kuupäev, millal hind allikast kontrolliti. `KONTROLLIMATA` = ära kasuta esitluses ilma märkuseta |

**Teadaolevad puudused**

- Elisa: 10.10 lehel samad hinnad, aga lehel on ka teine pakettide loetelu teiste hindadega ja sidumise tingimusi ei selgu. Kontrolli enne kasutamist.
- Telia 24-kuulisi hindu tabelis pole.
- Minutid, SMS-id ja EL-i rändluse maht puuduvad.
- Väiksemaid pakkujaid ja alambrände tabelis pole.

## Lepingu blanketid ja näidised

[lepingublanketid/](lepingublanketid/) sisaldab 10.10.2026 kontrollitud avalikke operaatorite raamlepingu näidiseid, volikirju ja üldtingimusi. Vormid ja tingimused on eraldi. Koondis on ka laste ning esindusõiguse vormide puudujäägid, ametlikud allikad ja PDF-koopiate kontrollsummad.

## Isikuandmed

Küsitluse vastuseid siia ei panda. Hoia neid kaustas `andmed-privaatne/`, mida git ei jälgi.
