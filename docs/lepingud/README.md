# Lepingu näidised

**NÄIDIS. Ei ole päris leping ega juriidiliselt kontrollitud.** Kasutame prototüübis (ekraan 4 ja 4b). Kõik nimed, koodid ja numbrid on väljamõeldud. Päris lepingu teksti annab operaator, Tuleva ainult täidab andmed ja saadab allkirjastatud lepingu edasi.

| Fail | Kellele |
|---|---|
| [eraklient-naidis.md](eraklient-naidis.md) | Eraisik |
| [ettevote-naidis.md](ettevote-naidis.md) | Ettevõte (juhatuse liige või volikirja alusel esindaja) |

## Vormi väljad

| Väli | Eraklient | Ettevõte | Miks |
|---|---|---|---|
| Kliendi nimi / Ettevõtte nimi | ✓ | ✓ | lepingu pool |
| Isikukood | ✓ | esindaja oma | isiku tuvastus, allkirjastaja |
| Registrikood | – | ✓ | lepingu pool |
| Esindaja nimi | – | ✓ | allkirjastaja |
| Esindusõiguse alus | – | ✓ (juhatuse liige / volikiri) | kontroll äriregistrist; volikiri lisatakse PDF-ina |
| Telefoninumber, mille üle viid | ✓ | ✓ | numbri üleviimise volitus |
| Praegune operaator (doonoroperaator) | ✓ | ✓ | numbri üleviimise volitus |
| Aadress | ✓ | ✓ | numbri üleviimise volituse vormil on aadress kohustuslik |
| E-post | ✓ | ✓ | arved ja lepingu koopia; tuleb registreerumisest |
| SIM-kaart / eSIM | ✓ | ✓ | kaardi saatmine |

Kasutaja palutud väljad: nimi, isikukood, telefon (eraklient); isiku nimi, telefon, isikukood, esindusõiguse alus, ettevõtte nimi, registrikood (ettevõte). Lisatud uurimise põhjal: aadress, praegune operaator, e-post, SIM/eSIM.

## Allikad (vaadatud 10.10.2026)

- Numbri üleviimise volituse vorm (operaatorite ühine vorm, eesti keeles): kliendi tüüp äri/era, registrikood, nimi, aadress, doonoroperaator, numbrid, volitatud isiku isikukood, allkiri ja kuupäev, kehtib 60 päeva. https://wildix.atlassian.net/wiki/download/attachments/30283695/Estonia+LOA_in+Estonian+V.pdf?version=1
- Transpordiameti numbriliikuvuse volikirja näide (volitatud isik, doonoroperaator, number, liitumisleping). https://adr-docs.karlerss.com/Sd3xgJh4fjJLnErSqPH3reaSnNuDSSRJ/Numbriliikuvuse%20volikiri.pdf
- Lepingu kokkuvõte on EL-i side seadustiku järgi kohustuslik, selle annab operaator (prototüübis „PDF, demos puudub”).

## Lahtine

- Kas operaatorid aktsepteerivad Tuleva kaudu tulnud digiallkirjastatud lepingut ja volitust (vt 05-avatud-kusimused.md p 14).
- Ettevõtte puhul: mitu numbrit ühe lepinguga ja kas iga SIM-i kasutaja nimi on vaja.
