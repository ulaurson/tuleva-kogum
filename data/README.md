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

- Elisa: hinnad kontrollitud 10.10 (elisa.ee/mobiil, „Suured paketid” ja „Väikesed paketid”; Ülari ekraanipilt samast lehest). Võimas 5G+ ja Ultra 5G+ on piiramatu Eestis. Sidumise tingimusi leht ei näita, seega on veerus `hind_kuupohine_eur` lehel olev kuuhind. Lehel on ka teine, vanem pakettide loetelu (nt Piisav 13,99 €, Lõpmatu 5G 51,99 €), mida me ei kasuta.
- Telia 24-kuulisi hindu tabelis pole.
- Minutid, SMS-id ja EL-i rändluse maht puuduvad.
- Väiksemaid pakkujaid ja alambrände tabelis pole.

## koduinternet.csv

Telia, Tele2 ja Elisa eraisiku koduinterneti paketid, €/kuu koos käibemaksuga, kontrollitud 10.10.2026 operaatorite lehtedelt.

- `kiirus_mbit`: allalaadimiskiirus. 5G pakettidel sõltub kiirus levist, seepärast on lahter tühi.
- Hinnale võib lisanduda ruuteri rent: Telia 4,13 € kuus (praegu 12 kuud tasuta), Tele2 1,99–3,50 € kuus (kampaaniahind).
- Kiirus ja hind sõltuvad aadressist.
- **Elisa** on lisatud 10.10 Elisa interneti hinnakirja ja e-poe järgi. Hinnakirjas on 5G pakettide hinnad omavahel vahetuses, tabelis on e-poe hinnad. Avatud võrkudes lisandub võrgutasu, Enefiti võrgus 12,40 € kuus. Ruuteri rent 5,15 € kuus.

## telepaketid.csv

Telia, Elisa ja Tele2 eraisiku telepaketid, €/kuu, tavahind, kontrollitud 10.10.2026.

- Telia hinnad on hinnakirjast seisuga 01.10.2026. Kanalite arvu Telia lehelt ei leidnud.
- Elisa hinnad on Elisa e-poest. Hinnakirja müüdavate telepakettide kohta ei leidnud. Käibemaks on eeldatud, sest sama e-poe internetihinnad sisaldavad käibemaksu.
- Tele2 hinnad on lehelt tele2.ee/tv.

## Isikuandmed

Küsitluse vastuseid siia ei panda. Hoia neid kaustas `andmed-privaatne/`, mida git ei jälgi.
