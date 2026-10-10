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
