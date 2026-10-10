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

## koduinternet.csv

Telia ja Tele2 eraisiku koduinterneti paketid, €/kuu koos käibemaksuga, kontrollitud 10.10.2026 operaatorite lehtedelt.

- `kiirus_mbit`: allalaadimiskiirus. 5G pakettidel sõltub kiirus levist, seepärast on lahter tühi.
- Hinnale võib lisanduda ruuteri rent: Telia 4,13 € kuus (praegu 12 kuud tasuta), Tele2 1,99–3,50 € kuus (kampaaniahind).
- Kiirus ja hind sõltuvad aadressist.
- **Elisa puudub:** leht ei avanenud 10.10. Lisada, kui hinnad on kontrollitud.

## Isikuandmed

Küsitluse vastuseid siia ei panda. Hoia neid kaustas `andmed-privaatne/`, mida git ei jälgi.
