# Juhised Claude'ile

Tuleva häkatoni (9.–11.10.2026) projekt: Tuleva liikmete mobiilside ühishange. Ülevaade ja failide kaart on failis [README.md](README.md). Loe see enne tööd läbi.

## Enne tööd

- Tee `git pull`. Tiim muudab dokumente häkatoni ajal samal ajal.
- Loe [docs/10-arutelu.md](docs/10-arutelu.md). Seal on tiimi viimased arutelud, mida teistes failides veel pole.
- Kui ehitad prototüüpi, järgi [ehitusbriifi](docs/09-prototuubi-briif.md).

## Repo on avalik

Enne iga commit'i vaata diff üle. Siia ei tohi minna:

- isikuandmed: nimed, telefoninumbrid, isikukoodid, arved, küsitluse vastused;
- Tuleva sisemine info, mis pole avalik: liikmete andmed, sisedokumendid, avaldamata äri- ja finantsnumbrid.

Kui pole kindel, küsi kasutajalt enne push'i. Privaatsed failid käivad kausta `andmed-privaatne/`, mida git ei jälgi.

## Tiimi arutelu kirjapanek

Kui kasutaja palub arutelupunkti kirja panna, lisa see faili [docs/10-arutelu.md](docs/10-arutelu.md) uue jaotisena. Vorm on faili alguses.

- Kui punktist saab otsus, lisa rida [otsuste](docs/06-otsused.md) ajaloo tabelisse ja muuda arutelus staatus „otsustatud”.
- Kui punkt on risk või lahtine küsimus, lisa see ka [avatud küsimustesse](docs/05-avatud-kusimused.md).
- Kui punkt muudab seda, mida demo peab tegema, uuenda [prototüübi lähtealuseid](docs/07-prototuubi-lahtealused.md).

## Kirjutamine

- Eesti keeles ja lühikeste lausetega, nagu teised failid.
- Iga turufakt käib koos allika ja kuupäevaga. Enda arvutus või oletus märgitakse sõnaga **hinnang**.
- Mida pole kontrollitud, seda ära kirjuta faktina. Märgi see lahtiseks.

## Commit ja push

- Väikesed muudatused otse `main` harusse, suuremad eraldi harusse ja pull request'iga.
- Kui muudad numbrit, uuenda allikas samas commit'is.
