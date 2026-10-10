# Kujunduse ülevaade (10.10.2026)

*Claude Designi kujundus (11 ekraani) vaadati üle nelja skilliga: design-critique, accessibility-review, ux-copy ja tuleva-zurii (simuleeritud Tuleva nõukogu). Siin on leiud koondatud: mis on parandatud ja mis on lahtine. Skillide hinnangud on mudeli hinnangud, mitte päris žürii omad.*

## Žürii simulatsiooni hinnang

**Otsus:** läbib, kui parandused tehakse. Praegusel kujul kukub läbi elujõulisuse ja väärtuste kriteeriumil.

| Kriteerium | Hinne (1–5) | Peamine põhjus |
|---|---|---|
| Mõju | 3 | Vahetaja sääst on umbes 217 € aastas (hinnang). Hange ise lisab sellest umbes kolmandiku |
| Pöördelisus | 2 | OCU on sama juba teinud. Ainus selge eristaja on huvide konflikti puudumine, ja operaatori tasu nõrgendab seda |
| Teostatavus | 3 | Lepingukanal ja operaatori aruanded sõltuvad operaatorite nõusolekust, mida veel pole |
| Elujõulisus | 2 | Operaatori tasu toob 1 000 osalejaga umbes 3 360 € aastas. Koguja väärtus on arvutamata |
| Väärtused | 3 | Liige otsustab ise ja numbrid on ausalt märgitud. Operaatori tasu toob hinde alla |

## Lahtised probleemid (raskemad ees)

1. **Operaatori tasu.** Kõik neli ülevaadet märkisid selle ära. Tasu läheb vastuollu põhimõttega „Tuleva ei võta operaatoritelt vahendustasu”, toob vähe raha ja maksab selle tegelikult ainult võitja. Tiim jättis tasu esialgu sisse. Otsus on lahtine, vt [arutelu punkt 2](10-arutelu.md). Uuendus 10.10: tiim otsustas fikseeritud tasu kasuks, summa arvutab Marju (vt [otsused](06-otsused.md)).
2. **Hange lisab umbes kolmandiku säästust.** Avalike hindadega saab säästa 2 944 € aastas, hankega 4 400 € (näidisandmed). Laval tuleb öelda, et uudsus pole hind, vaid iga-aastane päästik, valmis leping ja huvide konflikti puudumine.
3. **Pole ühtki operaatori signaali.** Enne pühapäeva saata kiri või helistada vähemalt ühele operaatorile või küsida äriarenduse mentorilt.
4. **Elisa hinnad on kontrollimata**, aga nende pealt tuleb umbes 40 % näidisandmete ülemaksest. Kontrollida üle või võtta numbritest välja. Uuendus 10.10: Elisa hinnad on kontrollitud (vt [faktid](03-faktid.md)).
5. **Koguja väärtus on teadmata.** Küsida Tulevalt, palju maksab uue koguja saamine ja palju toob koguja aastas.
6. **Liikmete arv „umbes 10 000” on allikata.** Ekraanil on see märgitud tiimi hinnanguks. Uuendus 10.10: allikas on olemas, 31.03.2026 seisuga 9 560 liiget (vt [häkaton](01-hakaton.md)).

## Mis kujunduses parandati

- **Demo tee:** kõnes kuus klikki (1 → 2 → 3 → 4 → 7 → 10), ülejäänud ekraanid jäävad küsimuste ajaks. Tee on kirjas kujunduse märkmes.
- **Tähtajaline leping:** uus ekraan 2b. Nupu „vaheta” asemel on tekst „Sinu leping lõpeb märtsis 2027” ja nupp „Tuleta mulle märtsis meelde”.
- **„Mitte praegu”:** viib nüüd uuele ekraanile 6 („Hoiame pakkumise sinu jaoks alles”), mitte säästu ekraanile.
- **Leping:** nõusoleku ruut on vaikimisi tühi ja allkirjastada saab alles pärast linnukest. „Tulevaga” → „Tuleval”. Nime ja isikukoodi päritolu on selgitatud (sisselogimisest) ja telefoninumbri lisab liige ise.
- **Säästu ekraan:** sääst on märgitud „oodatav” ja „kehtib, kui leping jõustub”. „18 osalejat 25-st” → „18 osalejal 24-st”. Juures on ka ülemakse 156 € aastas.
- **Aasta statistika:** arvutus 1 000 osalejaga on nüüd 560 vahetajat × 217 € ≈ 121 000 € (varem segamini kaks eri keskmist).
- **Operaatori tasu tekst:** täpsustatud, et tasu maksab võitja iga jõustunud lepingu eest ja see ei mõjuta võitja valikut.
- **Tekstid:** juristikeel asendatud („volitusel” ja „taganeda” → lihtsad laused), terminid ühtlustatud (ühishange, pakett, „hind kehtib 12 kuud”), „Operaator A (näidis)”, nurgamärge kõikjal „Prototüüp · näidisandmed”, T2 grammatika.
- **Ligipääsetavus:**
  - valikunuppudel `role="radio"` ja `aria-checked`, abinupul `aria-expanded`;
  - väljade äär `#8A929B` (kontrast 3,15:1), hall „0,00” `#6B7074` (5,01:1), ootel-täpi äär `#6B8FB0`;
  - fookusstiil kõikjal, `aria-current` menüüs, pealkirjade järjekord, `header` ja `main`;
  - pakkumise lisamisel veateade ja „Pakkumine lisatud” teade;
  - osalejate tabel on klaviatuuriga keritav.
- **Osalejate tabel:** Mari rida on tähistatud „(Mari)” ja vasaku sinise joonega.

## Teha HTML-versioonis

- Fondid peavad olema faili sees, et demo töötaks ilma internetita.
- Valitud pakett peab liikuma edasi lepingu ja säästu ekraanile. Kujunduses on ekraanid eraldi ega jaga olekut.
- Telefonivaade peab kannatama teksti suurendamist (`min-height` fikseeritud kõrguse asemel).
- Laval näidata telefoniekraani suurendatult. Väike hall tekst projektorilt ei paista.

## Teine ülevaade (10.10, pärast lepingu ja hinna muudatusi)

*Kujundus (16 ekraani) vaadati uuesti üle samade nelja skilliga ja tehnilise kontrolliga (vorm, lingid, kontrast, vanad numbrid, isikuandmete kuju). Tehniline kontroll vigu ei leidnud. Võrreldi ka failidega 06, 07, 09, 10 ja 13.*

**Žürii simulatsioon:** läbib paranduste järel. Mõju 3, pöördelisus 2, teostatavus 2, elujõulisus 2, väärtused 2 (mudeli hinnang).

### Parandatud kujunduses

- T3/T4: lehter klapib (575 allkirjastas, 15 taganes, 560 jõustus; varem 600).
- M6: „ühe klikiga” → leping on eeltäidetud, allkirjastad ise (liige otsustab ise, otsus 06).
- M4: „loobuda” → „taganeda”, nupp „Minu sääst” → „Minu pakett”. T3: „õnnestus” → „õnnestub”.
- M3/M3c: e-post sama mis registreerumisel (mari@naidis.ee), lihtsam sissejuhatus, `autocomplete`, abitekst väljaga seotud.
- Ligipääsetavus: M3c olekumuutus teatatakse ekraanilugejale, lepingu pealkirjad h2/h3, T2 tulemus `role="status"`, T3 vormi Enter ei lae lehte uuesti.

### Lahtine (raskemad ees)

1. **6,50 € hinnal pole allikat ja numbrid ei klapi.** Prototüüp 6,50 €, Marju mudel ([13](13-tasuvus.md)) 5–6 € Telialt, hanke latt (otsus 06) kuni 13,50 €. Turu lähim hind on Tele2 Piiramatu Klubi 12,99 € ([03](03-faktid.md)). Viia ühele numbrile või öelda laval „sihthind”.
2. **Sääst on ainult tavahinna vastu** (≈ 382 €, hinnang). Tele2 kampaania 15,50 € vastu on vahe 108 € aastas ja väikese paketi kasutajale pole säästu (05 p 13). Ülari otsustas võrrelda ainult tavahindu. Laval peab olema valmis vastus.
3. **Liikmete ring on vastuolus:** otsus 06 „hange ei piirdu liikmetega”, mudel 13 „ainult ühistu liikmetele”. Prototüüp järgib otsust 06.
4. **„Kui vahetad” plokk on pakkumiselt ära võetud** (Ülari, 10.10), aga arutelu p 1 ja briif nõuavad enne nuppu lühikest selgitust (number jääb samaks, tasuta, vana leping lõpetatakse, 14 päeva taganemist). Praegu on see info lepingu tekstis (4c) ja ekraanil 5. Otsustada, kas piisab.
5. ~~Elisa kontrollimata hind on graafikul.~~ Kontrollitud 10.10 (43,99 €, vt [faktid](03-faktid.md)). Sidumise tingimused on selgumata.
6. **Ümberarvutust liikmetele/kogujatele aasta vaates pole** (07 p 2). Marju baas: liikmete sääst ≈ 311 000 € 1. aastal (hinnang).
7. **K1b 2027 bänner** viib 2026 pakkumise ekraanile. Demos ära näita või tee eraldi vaade.
8. Telepakett: ekraanil nüüd 50 % tavahinnast (otsus 10.10). *Uuendus 10.10: soodustust demos ei näidata ja telepaketi soodustus on 30 % (vt [otsused](06-otsused.md)).*
9. **Ligipääsetavus HTML-is:** valikunupud päris `input type="radio"` peale, tegevused (`Koosta leping`, `Saada Operaator A-le`) `button`-iks, tagasilingid 44 px.
10. Operaatori signaali ja koguja väärtuse küsimus on endiselt lahti (vt eespool).

## Kolmas ülevaade (10.10): idee-valideerimine ja McNeill

*Skillid idee-valideerimine ja mcneill-algorithm. Kõne ja küsimused on failis [16](16-liftikone.md), uuendatud ideekirjeldus failis [17](17-ideekirjeldus.md). Hinnangud on mudeli omad.*

### Riskantseimad kontrollimata eeldused ja odavaim katse enne pühapäeva

1. **Keegi müüb piiramatut 6,50 €-ga.** Operaatorile jääks pärast käibemaksu ja Tuleva tasu ≈ 4,74 € (hinnang). Turu soodushinnad on 12,99 € (Tele2 Piiramatu Klubi lisaliin) ja 15,50 € (kampaania 24 kuuga). *Katse:* küsi mentorilt või ühe operaatori müügijuhilt madalaimat hinda 1 000 liinile. Kui alla 10 € keegi ei ütle, näita laval „kuni 13,50 €” ja nimeta 6,50 € sihiks.
2. **Sääst ≈ 405 € eeldab, et kõik maksavad tavahinda.** Marju mudel eeldab praeguseks hinnaks 22 € (sääst ≈ 186 €, hinnang), kampaania vastu 108 €. Leibkonnaliikme kogu sidekulu on Statistikaameti järgi ≈ 276–279 € aastas (vajab kontrolli). Õigem sõnastus: „kuni ≈ 405 €, kui maksad tavahinda”. *Katse:* küsi 15 häkatoni osalejalt praegust arvesummat.
3. **Inimesed registreeruvad.** Tõendit pole. *Katse:* päris registreerumisvorm häkatonil ja Tuleva kogukonnas, lävi 30 registreerunut.
4. **Soodustus (internet 50 %, telepakett 30 %) „seni, kuni oled klient”.** Turul kehtivad soodustused 12–24 kuud (enefit.ee, 10.10). *Katse:* küsi operaatorilt või mentorilt.
5. **Operaator lubab vahendaja rolli** (Tele2 tingimused, fail 14). *Katse:* üks küsimus õigusmentorile.

### Faktikontroll

- Elisa lehel on teises loetelus piiramatu Maksimaalne 5G 41,99 €. Võrdluses on Võimas 5G+ 43,99 € (sisaldab Soomet). Odavamaga oleks sääst ≈ 396 € (hinnang).
- Telia lehe järgi on mitme kasutajaga hind kasutaja kohta odavam (hindu ei näita).
- OCU 2015: 50 261 osalejat, keskmine sääst 84 € (ocu.org, 17.11.2015).
- Fail 13 ja otsused on vastuolus (5–6 € Telia ja ainult liikmed vs 6,50 € ja kõik). Fail 13 ja 15 annavad kulu katmiseks eri aasta.

### McNeill: liikme teekond

Liikme töö ≈ 25–40 min, registreerumisest töötava numbrini 4–8 nädalat (hinnang). Suurim varjatud samm on **Mobiil-ID uuesti aktiveerimine** pärast SIM-i vahetust (ID-kaart, PIN-id, kadunud PIN-idega esindus). Prototüüp seda ei maini.

- **Küsi nõuet:** nimi ja isikukood tulevad digiallkirjast, ettevõtte esindaja äriregistrist. Seadus nõuab operaatori lepingu kokkuvõtet, mitte kõigi tingimuste lugemist.
- **Kustuta (kaaluda):** „Allkirjasta” ja „Saada” üheks nupuks; ettevõtte haru kõnes ühe lausega.
- **Lihtsusta:** pakkumise ekraanile enne nuppu üks rida (number jääb samaks, järgmine tööpäev, tasuta, Mobiil-ID tuleb uuesti aktiveerida, 14 päeva). See taastab arutelu p 1 nõude.
- **Kiirenda:** pakkumine pärast Tele2 kampaania lõppu 15.11 või lati kuupäevaga. eSIM kiirendaks, aga Mobiil-ID tugi eSIM-il on kontrollimata.
- **Automatiseeri viimasena:** esimene hange käsitsi. Esimesena automatiseerida lepingute edastus operaatorile (≈ 75 h 900 lepingu kohta, hinnang).
