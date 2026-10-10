# Tuleva Kogum

*Tuleva häkaton, 9.–11. oktoober 2026, Telliskivi Loomelinnak · Väljakutse 3: Kollektiivne ostujõud*

**Tuleva Kogum** on Tuleva liikmete ühise ostujõu teenus. Osaleda saavad ka teised, et ühine ostujõud oleks veel tugevam. Esimene hange on mobiilside, hiljem võivad tulla elekter, kindlustus ja liikmete endi algatatud ühispakkumised.

**Esimene hange ühe lausega:** kord aastas korraldab Tuleva oma liikmete nimel mobiilside ühishanke. Liikmed annavad teada oma praeguse paketi ja tegeliku kasutuse, operaatorid pakuvad hinda kogu grupile, parim pakkumine läheb liikmetele ja iga liige otsustab ise, kas vahetab.

**Seis:** taustainfo on koos. Prototüüp ehitatakse häkatonil.

## Kust alustada

| Fail | Mis seal on | Loe, kui… |
|---|---|---|
| [docs/01-hakaton.md](docs/01-hakaton.md) | Häkatoni reeglid, hindamine, Tuleva taust | oled tiimis uus |
| [docs/02-idee.md](docs/02-idee.md) | Probleem, lahendus, hankeprotsess, ärimudel | tahad aru saada, mida ehitame |
| [docs/03-faktid.md](docs/03-faktid.md) | Turu hinnad, välismaa eeskujud, kõik allikaga | vajad numbrit esitlusse või koodi |
| [docs/04-oigus.md](docs/04-oigus.md) | Mida tohib ja mida mitte (õigusmentori hinnang) | kirjutad teksti, mida liige näeb |
| [docs/05-avatud-kusimused.md](docs/05-avatud-kusimused.md) | Riskid ja lahtised küsimused, raskemad ees | tahad teada, mis võib idee murda |
| [docs/06-otsused.md](docs/06-otsused.md) | Mis on otsustatud ja miks | keegi küsib „miks mitte X?” |
| [docs/07-prototuubi-lahtealused.md](docs/07-prototuubi-lahtealused.md) | Mida demo peab tõestama, arvutusreeglid, testjuhtumid, küsimustik | hakkad koodi kirjutama |
| [docs/08-tooleht-2026-10-09.md](docs/08-tooleht-2026-10-09.md) | Tiimi tööleht: probleem, sihtrühm, skoop, väärtuspakkumine | tahad teada, milles tiim kokku leppis |
| [docs/09-prototuubi-briif.md](docs/09-prototuubi-briif.md) | Demo ehitusbriif: ekraanid, piirid, mida tähendab valmis | ehitad prototüüpi |
| [docs/10-arutelu.md](docs/10-arutelu.md) | Tiimi viimased arutelud, mida teistes failides veel pole | tahad teada, mida tiim praegu arutab |
| [docs/11-ulevaade.md](docs/11-ulevaade.md) | Kujunduse ülevaade 10.10: žürii simulatsioon, parandused, lahtised probleemid | valmistud esitluseks |
| [docs/12-uuringud.md](docs/12-uuringud.md) | AI-uuringute kokkuvõte: milles need kokku langevad, kus meiega ei klapi, vahetuse takistused, sihtklient, ühistu säästumudel | tahad teada, mida uuringud ütlevad |
| [docs/13-tasuvus.md](docs/13-tasuvus.md) | Tuleva tulu ja kulu prognoos 5 aastaks, kolm stsenaariumi | tahad teada, kas teenus tasub end ära |
| [docs/14-uuring-partnerid.md](docs/14-uuring-partnerid.md) | Operaatorid, õigus, andmekaitse ja Tuleva numbrid: mida leidsime, tingimused operaatoritele | valmistud operaatori või mentoriga rääkima |
| [docs/15-lahtised-kusimused.md](docs/15-lahtised-kusimused.md) | Kõik lahtised küsimused, rühmitatud selle järgi, kellelt vastust küsida | tahad teada, mis on veel vastuseta |
| [data/](data/) | Operaatorite hinnatabel (`hinnad.csv`) | vajad hindu |

## Reeglid selles repos

1. **Iga turufakt käib koos allika ja kuupäevaga.** Hinnad ja seadused muutuvad. Enda arvutus või oletus märgitakse sõnaga **hinnang**.
2. **Repo on avalik, isikuandmeid siia ei panda.** Küsitluse vastused, arved, nimed ja telefoninumbrid hoitakse kaustas `andmed-privaatne/`, mida git ei jälgi (vt `.gitignore`).
3. **Tuleva tasu on fikseeritud ja liikmele nähtav.** Iga lepingu kuumaksest saab Tuleva sama summa, mis ei sõltu paketist (vt [otsused](docs/06-otsused.md)).
4. **Prototüübis töötab liikme nähtav pool.** Tagapool (päris hange, operaatorite pakkumised) võib olla käsitsi või näidisandmetega, kui see on demos ausalt öeldud.
5. **Liige otsustab alati ise.** Tuleva ei vaheta kellegi eest ega soovita, kuhu sääst panna (vt [õigus](docs/04-oigus.md)).

## Tiim

| Nimi | Roll | Kontakt |
|---|---|---|
| Ülari | AI ja andmeprototüüp | |
| | | |

## Töövoog

- Väikesed muudatused otse `main` harusse, suuremad eraldi haru ja pull request.
- Kui muudad numbrit, uuenda allikas samas commit'is.
- Tiimi arutelud pannakse kirja faili [docs/10-arutelu.md](docs/10-arutelu.md). Claude Code loeb repo juhised failist [CLAUDE.md](CLAUDE.md).
