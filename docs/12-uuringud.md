# AI-uuringute kokkuvõte (10.10.2026)

*Tiim kasutas kolme AI süvauuringut ja üht ChatGPT vestlust. Siin on nende olulisem sisu ja see, kus need meie otsustega ei klapi. Uuringud on teisene allikas. Turufaktid, mida kontrollisime algallikast, on failis [03](03-faktid.md) märgiga ✅. Kõik muu on uuringu väide või **hinnang**. Uuringute algfailid repos ei ole.*

| Tähis | Allikas | Fookus |
|---|---|---|
| A | „Tuleva members' mobile group offer — feasibility and launch decision” (inglise keeles) | Mobiil: otsusememo, vastutuse jaotus, 30 päeva piloot, hankepäringu tekst |
| B | „Eesti eraisikute side- ja elektriühisost: teostatavus, sääst ja 30 päeva piloot” | Side ja elekter, sääst ja tasuvus |
| C | „Süvauuring: Tuleva liikmete mobiilipakettide ühispakkumise elluviimine” | Mobiil: vahendusmudel, Mobiil-ID, andmekaitse, riskid |
| D | ChatGPT vestlus „Esimene sihtklient” | Persoona |

## Milles uuringud kokku langevad

1. **Mudel on sama mis meil.** Tuleva koondab nõudluse ja korraldab hanke. Lepingu, arve, numbri üleviimise ja toe annab operaator. Virtuaaloperaator, edasimüük või Tuleva ärikliendileping ei sobi esimeseks sammuks (A, B, C).
2. **Võrdlus käib parima pakkumise vastu, mille liige saaks ka ise.** Tänane latt on Tele2 kampaania: 17 GB 8,50 € ja piiramatu 15,50 € kuus 24-kuulise lepinguga (vt [faktid](03-faktid.md)). Sääst letihinna vastu ei tõesta ühisostu väärtust (A, B, D). Vt [kolm väärtust](02-idee.md#kolm-väärtust).
3. **Sama hind ilma sidumiseta on ka tulemus.** Aga paindlikkusele ei tohi panna väljamõeldud eurosummat (A, C).
4. **Usaldus otsustab.** Liige küsib, kust korraldaja raha teenib (D). Tasu peab olema enne liitumist näha ja liige peab saama ka vastuse „ära vaheta” (A, C). Kui vana operaator teeb parema vastupakkumise, on aus vastus: võta see vastu (C).
5. **Esimene sihtrühm valitakse käitumise ja kasutuse järgi.** Keskmise või suure kasutusega, maksab umbes 15–20+ € numbri kohta, number on tema nimel, seadme järelmaks ega kimbuleping teda ei seo (A, C). Väikese kasutusega kliendil on vähe säästa, sest Tele2 2 GB maksab kampaanias 5,50 € (A).
6. **Andmeid kogutakse vähe.** Operaatorile lähevad ainult koondandmed, näiteks „320 numbrit vajab 10–30 GB”. Isikuandmed lähevad alles siis, kui liige on pakkumise valinud. Arvet tervikuna ega kõneeristust ei koguta (A, C).
7. **Korraldab ühistu, mitte Tuleva Fondid AS** (A, C, sama mis [õiguses](04-oigus.md)). A lisab: kas sideteenus sobib ühistu põhikirja, peab kinnitama Tuleva jurist.
8. **100 liitumist on protsessikatse, mitte äri.** Esimene äriliselt huvitav maht on umbes 1000 liitumist (**hinnang** A, B, C). Piloot peab läbima vähemalt ühe arvetsükli, sest alles esimene arve näitab, kas hind ja numbri üleviimine töötasid (A).
9. **Enne tarkvara tuleb päris päring.** Sama päring kõigile kolmele operaatorile korraga, hinnad 100, 1000 ja 5000 aktiveeritud liitumise kohta, ilma mahugarantiita (A, B, C).

## Kus uuringud meie repoga ei klapi

| Teema | Uuringud | Meie repo |
|---|---|---|
| Korraldaja tasu | Kõik kolm eeldavad ühekordset kliendihanketasu, 20–30 € liitumise kohta (**hinnang**, mitte pakkumine) | Fikseeritud tasu iga lepingu kuumaksest ([otsus](06-otsused.md) 10.10) |
| Kus liige lepingu allkirjastab | Operaatori keskkonnas, sest lepingueelse teabe ja lepingu kokkuvõtte annab operaator (A, C) | Leping on valmis Tuleva süsteemis ja Tuleva edastab selle (otsus 10.10). Konsulteerimine on todo ([05](05-avatud-kusimused.md)) |
| Sihtrühm | Käitumise ja kasutuse järgi (A, C, D) | Vanus 35–45 ([tööleht](08-tooleht-2026-10-09.md)) |
| Mitme numbriga pere | D: hea esimene sihtklient. A: Tele2 Piiramatu Klubis maksab iga järgmine piiramatu pakett 12,99 €, seega pere pole automaatselt hea sihtrühm | Pole arutatud |
| Tele2 24 kuu hinnad | A ja B: kampaaniahinnad 8,50 € ja 15,50 €. C: 10,50 € ja 17,50 € | `hinnad.csv` seisuga 26.09: 10,50 € ja 17,50 €. Kampaania kontrollitud 10.10 ([faktid](03-faktid.md)) |
| Liikmete arv | C toob ühistu liikmete arvu ja viitab poolaasta aruandele | Aruanne ühistu liikmete arvu ei too ([häkaton](01-hakaton.md)). C numbrit ära kasuta |

## Vahetuse takistused

Täiendab [arutelu punkti 1](10-arutelu.md).

| Takistus | Allikas | Staatus |
|---|---|---|
| Mobiil-ID ei liigu uuele SIM-kaardile. Uuel kaardil tuleb see ID-kaardi ja PIN-koodidega uuesti aktiveerida. Smart-ID jääb tööle | RIA, vt [faktid](03-faktid.md) | ✅ |
| Kui number pole liikme nimel (nt abikaasa nimel), lükkab vana operaator üleviimise tagasi | C | kontrollimata |
| Seadme järelmaks, kimbuleping (nt Telia 1) või peresoodustus teeb lahkumise kalliks | A, C | kontrollimata |
| Vana operaator teeb üleviimise ajal vastupakkumise. C peab seda suurimaks riskiks | A, C | kontrollimata |
| Levi kodus või suvilas võib uues võrgus olla halvem. Tuleva ei saa kvaliteeti lubada | A, C | kontrollimata |
| eSIM, MultiSIM ja nutikell vajavad uut seadistust | A | kontrollimata |

C hinnangul jõuab huvi avaldanutest aktiveerimiseni 40–50% (**hinnang**).

**Hinnang:** vana põlvkonna SIM-kaart ei toeta Mobiil-ID-d pärast 19.05.2027 (RIA). Need liikmed peavad SIM-kaardi niikuinii vahetama. Siis ei lisa operaatori vahetus Mobiil-ID-ga lisavaeva.

## Sihtklient (D)

*Testitav persoonahüpotees, mitte uuringuga kinnitatud profiil.*

- **Mari on pere püsikulude korraldaja, mitte hinnajahtija.** Ta teab, et odavam pakkumine võib olemas olla. Probleem on selles, et säästu leidmine ja selles veendumine nõuab liiga palju tähelepanu.
- **Ta ostab kolme asja:** tõendatav võit eurodes aastas koos kõigi tasude ja kampaania lõpuga, vähese vaevaga vahetus ja kindlus, et number, levi ja vastutus on selged. Sama on [töölehel](08-tooleht-2026-10-09.md).
- **Käivitajad:** hinnatõusu teade, soodusperioodi lõpp, kolimine, pere eelarve ülevaatus.
- **Suurim takistus:** usaldamatus korraldaja vastu. „Kust teie raha teenite?”
- **Keskmesse ei sobi:** inimene, kes võrdleb niigi pidevalt hindu, ja inimene, kes otsib eelkõige paremat levi.
- **Sihtimine käitumise järgi:** vastutab lepingute eest, pole neid hiljuti üle vaadanud, saab oma andmed esitada, vahetab selgelt parema pakkumise korral.
- **Sõnum:** „Laseme teenusepakkujatel meie ühise kliendigrupi nimel konkureerida. Näitame sinu tegelikku aastast säästu, kõiki tasusid ja tingimusi. Sina otsustad, kas vahetus tasub ära.”

## Numbrid, mis on ainult hinnang

| Mis | Number | Allikas |
|---|---|---|
| Millal on ühisost päriselt kasulik | Vähemalt 2 € kuus odavam kui parim avalik pakkumine: 17 GB kuni 6,50 €, piiramatu kuni 13,50 €. Või sama hind ilma sidumiseta. Tiim võttis 10.10 ainult esimese osa ([otsus](06-otsused.md)) | A, juhtkonna eeldus, mitte hulgihind |
| Teine lävi | Vähemalt 10% parem kui avalik pakkumine | B |
| Ühisostu lisasääst, kui hange on 10% parem kui Tele2 kampaania | 17 GB: 10,20 € aastas. Piiramatu: 18,60 € aastas | B |
| Korraldaja kulu esimesel aastal, 100 / 1000 liitumist | A: 21 575 € / 35 750 €. C: 7 000 € / 18 000 €. B: 2 500 € püsikulu + 5 € liitumise kohta | Illustratiivsed eeldused |
| Millal tasuks virtuaaloperaator | Kui hulgihind on kuni 6,75 € numbri kohta kuus ilma käibemaksuta | B |
| Elekter | Soodsaima börsipaketi müüjamarginaal oli 0,40 s/kWh (Konkurentsiamet, 7.08.2026). Marginaali poolitamine säästaks 2600 kWh korteris 5,20 € aastas. Toetab [otsust](06-otsused.md) 26.09 | B, kontrollimata |

## Kasulik edasiseks

- **Intervjuuküsimused käitumise kohta** (A, D). Küsi, mida inimene tegi, mitte mida ta teeks.
  1. „Näita viimast korda, kui mõtlesid paketti vahetada. Mis pani sind tegutsema või pooleli jätma?”
  2. „Millal su hind viimati muutus? Mida sa tegid?”
  3. „Millal küsisid viimati paremat hinda teiselt või oma operaatorilt? Mis juhtus?”
  4. „Mitu GB sa viimasel kolmel kuul kuus kasutasid?”
  5. „Mis ei tohi muutuda: levi, Mobiil-ID, rändlus, peresoodustus, number, eSIM, nutikell?”
  6. Alles lõpuks: „Kui Tuleva saaks selle konkreetse pakkumise, kas võtaksid selle kohe?”
- **Huvi registreerimise tekst** (C): „Kui Tuleva suudab välja kaubelda pakkumise, mis on soodsam kui sinu tänane X eurot, anname sulle teada. See ei kohusta sind millekski.”
- **Hankepäringu lisaküsimused** on failis [02](02-idee.md#lahendus).
- **Varuplaan** (A, C): kui hange ei anna midagi, mida üksikklient ise ei saa, jääb alles tasuta abi õige paketi leidmisel ja vahetamisel.
