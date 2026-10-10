# Prototüübi ehitusbriif (10.10.2026)

*Koostatud Ülari intervjuu põhjal (prompt-master). See on ülesanne ehitajale, inimesele või Claude'ile. Arvutusreeglid ja testjuhtumid on failis [07](07-prototuubi-lahtealused.md), siin neid ei korrata.*

## Töö

Ehita Tuleva Kogumi demo. Sellel on kaks poolt: liikme vaade (sisestus, pakkumine, allkiri, oma statistika) ja Tuleva vaade (osalejad, hanke sihthinnad, pakkumiste sisestamine, aasta statistika). Esmalt valmib kujundus Claude Designis, siis töötav HTML-fail `prototuup/index.html`.

## Miks

Ehitan Tuleva häkatoni prototüüpi (väljakutse 3, kollektiivne ostujõud). Pühapäeval klikib esitleja selle 3-minutilise liftikõne ajal läbi Tuleva nõukogu ees. Nõukogu otsustab, kas idee on kordades parem kui praegu turul, kas see on teostatav ja kas see sobib Tuleva väärtustega (null infomüra, usaldus). Demo peab olema üks sujuv lugu, mis ei saa laval katki minna.

Loe enne alustamist: [02 idee](02-idee.md), [04 õigus](04-oigus.md), [06 otsused](06-otsused.md), [07 lähtealused](07-prototuubi-lahtealused.md), [data/hinnad.csv](../data/hinnad.csv).

## Mida demo näitab

Demo lugu käib nii: kõigepealt üks liige, siis kogu grupp. Ekraanid on järjekorras, aga kuidas need täpselt välja näevad, otsustab ehitaja. Kujundus tehakse kõigepealt Claude Designis ja töötav HTML ehitatakse selle põhjal.

### Liikme pool

1. **Sisestus.** Mari (väljamõeldud liige, 35–45) sisestab:
   - praeguse paketi kuutasu;
   - kas leping on tähtajaline ja millal see lõpeb;
   - operaatori;
   - tegeliku internetikasutuse kuus (GB).

   Tähtajalise lepingu küsimuse juures on abi, kust seda vaadata. Vastus „ei tea” on lubatud (vt [arutelu](10-arutelu.md)).
2. **Pakkumine.** Mari näeb, milline pakett talle sobib ja kui palju odavam see on: praegu, täna avalike hindadega ja hankega (**hinnang**). Sääst on näidatud aastas. Pakkumise juures on Tuleva tasu (näidis 0,50 € kuus, kuni Marju arvutus on valmis, vt [arutelu](10-arutelu.md) punkt 2) ja sõnum „Hind ei tõuse 24 kuu jooksul. Kui grupp kasvab, võib see langeda.” Lisaks on kirjas lisahüve: Tuleva kaudu telefonipaketi võtnu saab koduinterneti 50% tavahinnast odavamalt. Enne nuppu „Vaheta” on lühidalt kirjas, mis edasi juhtub: number jääb samaks, üleviimine on tasuta, vana leping lõpetatakse liikme volitusel ja 14 päeva saab taganeda. Kui leping on tähtajaline, ei ütle voog „vaheta kohe”. Selle asemel näitab ta, millal saab vahetada, ja pakub meeldetuletust. Sõnu „ilma trahvita” ei kasutata, kuni lõpetamise tasud on kontrollimata.
3. **Leping ja allkiri.** Leping on valmis täidetud väljamõeldud andmetega. Enne allkirja on näha operaatori lepingueelne teave ja lühikokkuvõte (näidis), sest seadus nõuab neid enne lepingu sõlmimist (vt [õigus](04-oigus.md#mida-seadus-ütleb)). Mari vajutab „Allkirjasta digitaalselt”, näeb PIN-koodi ootamise ekraani ja siis teadet „Saadetud operaatorile”.
4. **Minu statistika.** Mari näeb oma hinda teiste osalejatega võrreldes, oma säästu aastas ja seda, kui palju on ta varem üle maksnud.

### Tuleva vaade

5. **Osalejad.** Anonüümne tabel: igaühe operaator, pakett, kuutasu, kasutus ja ülemakse. Juures on kokkuvõte: mitu osalejat, mitu maksab üle ja kui palju kokku aastas. Ümberarvutus 85 745 kogujale on märgitud **hinnanguks**.
6. **Mida hange peab saavutama.** Iga kasutusprofiili kohta on sihthind, millest odavama paketiga osalejad säästavad, ja mitu inimest sellega säästaks. Siit tuleb hankepäring: mitu inimest, kuidas nad jagunevad profiilide vahel, millised on tingimused (eelnõu failis 02).
7. **Pakkumiste sisestamine.** Tuleva sisestab operaatorite pakutud paketid ja hinnad (demos näidisandmed). Vaade arvutab kohe, kes säästab ja kui palju, ning näitab, mitu liiget pakkumise vastu võttis.
8. **Aasta statistika.** Mitu osales, mitu vahetas, liikmete kogusääst aastas, keskmine sääst inimese kohta ja kui palju oli võit ühe profiili kohta. Kõik numbrid tulevad samadest näidisandmetest.

## Piirid

- **Enne tööd tee `git pull`.** Tiim muudab faile samal ajal.
- **Muuda ainult kausta `prototuup/`.** Uue faili `data/naidisvastused.csv` võid lisada. Faile `docs/` ja `hinnad.csv` ära muuda, sest need on tiimi kokkulepitud allikad.
- **Peab töötama ilma internetita.** Kõik CSS, JS ja andmed on faili sees. Ära lae midagi CDN-ist ega fonte võrgust, sest saali wifi pole kindel.
- **Arvutus järgib faili 07 reegleid täpselt.** Testjuhtumid A ja B peavad andma samad numbrid ja seda kontrollib kood ise. Vale number laval murrab usalduse.
- **Näidisandmed tehakse turuhindade põhjal.** Genereeri liikmed `hinnad.csv` hindadest ja mõistlikest eeldustest. Kasuta samu veerge mis küsimustikus (fail 07), et päris vastused saaks hiljem ühe CSV-ga sisse vahetada. Ekraanil on märge „näidisandmed”.
- **Operaatori pakkumine on hinnang.** Hinda, mille real on `KONTROLLIMATA`, ei kasutata arvutuses ilma nähtava märkuseta.
- **Isikuandmeid ei kasutata.** Nimi, isikukood ja telefoninumber on väljamõeldud ja selgelt näidisena märgitud.
- **Allkirja samm on üldine „Digiallkiri (demo)”.** See ei kopeeri Smart-ID, Mobiil-ID ega panga logot ega kujundust, sest demo ei tohi välja näha nagu päris autentimisteenus.
- **Välimus tuleva.ee eeskujul.** Rahulik, palju valget, suured numbrid ja vähe teksti. Pealkirjad on Merriweather (sõltumatu varufont Georgia), tekst Roboto (varufont süsteemi sans-serif). Värvid: sinine `#006CE6` nuppudel ja linkidel, tumesinine `#002F63` pealkirjadel, tekst `#293036`, hall tekst `#6B7074`, taust `#F5F7F9` / helesinine `#EDF7FD`, piirjoon `#D6DEE6`, roheline `#008300` säästu jaoks, punane `#DB2200` ülemakse jaoks. Nuppude nurgaraadius on 2 px ja kiri 500 paksusega. Väärtused on loetud tuleva.ee lehelt 10.10. Tuleva nimi on tekstina ja nurgas on märge „Häkatoni prototüüp”.
- **Tuleva ei soovita, kuhu sääst panna, ja ei vaheta liikme eest** (fail 06). Kogu tekst on eesti keeles.
- **Tavalised otsused tee ise.** Küsi Ülarilt ainult siis, kui arvutusreegel ja testjuhtum annavad eri tulemuse.

## Valmis tähendab

- Claude Designis on kõik 8 ekraani ja Ülari on need üle vaadanud.
- `prototuup/index.html` avaneb Macis topeltklikiga Safaris ja Chrome'is ilma internetita. Liikme lugu (ekraanid 1–4) ja Tuleva vaate (5–8) saab läbi klikkida alla 3 minuti. Esitleja liigub nooleklahvidega edasi ja tagasi. Ekraanil 7 sisestatud hind muudab ekraanide 5–8 numbreid kohe.
- Testjuhtumite tulemus on A puhul 60,00 € ja 101,88 € ning B puhul 156,00 € ja 257,88 €. Kontroll näitab tulemust (nt `?test` aadressi lõpus).
- Varuplaaniks on igast ekraanist pilt kaustas `prototuup/ekraanid/`.
- Muudatused on commititud, aga pushitud mitte. Ülari pushib ise.
- Lõpuks ütle, kus fail on, ja kirjelda tehtut 3 lausega. Rohkem pole vaja.

Enne kui teatad edenemisest, kontrolli iga väidet selle sessiooni tööriista tulemuse vastu. Teata ainult tööst, mille kohta saad tõendi näidata. Kui midagi pole veel kontrollitud, ütle seda otse. Teata tulemustest ausalt: kui testid ebaõnnestuvad, ütle seda ja näita väljundit. Kui samm jäi vahele, ütle seda. Kui midagi on tehtud ja kontrollitud, ütle seda selgelt ja ilma reservatsioonideta.
