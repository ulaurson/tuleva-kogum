# Prototüübi ehitusbriif (10.10.2026)

*Koostatud Ülari intervjuu põhjal (prompt-master). See on ülesanne ehitajale, inimesele või Claude'ile. Arvutusreeglid ja testjuhtumid on failis [07](07-prototuubi-lahtealused.md), siin neid ei korrata.*

## Töö

Ehita Tuleva Kogumi demo ühe HTML-failina `prototuup/index.html`. Demo jutustab ühe loo: üks liige maksab üle, temasuguseid on palju, Tuleva teeb hanke, liige näeb oma pakkumist ja allkirjastab valmis lepingu ise.

## Miks

Ehitan Tuleva häkatoni prototüüpi (väljakutse 3, kollektiivne ostujõud). Pühapäeval klikib esitleja selle 3-minutilise liftikõne ajal läbi Tuleva nõukogu ees. Nõukogu otsustab, kas idee on kordades parem kui praegu turul, kas see on teostatav ja kas see sobib Tuleva väärtustega (null infomüra, usaldus). Demo peab olema üks sujuv lugu, mis ei saa laval katki minna.

Loe enne alustamist: [02 idee](02-idee.md), [04 õigus](04-oigus.md), [06 otsused](06-otsused.md), [07 lähtealused](07-prototuubi-lahtealused.md), [data/hinnad.csv](../data/hinnad.csv).

## Mida žürii näeb

Ekraanid on järjekorras. Kuidas need täpselt välja näevad, otsustab ehitaja.

1. **Mari:** väljamõeldud liige vanuses 35–45. Tal on praegune pakett, kuutasu ja tegelik kasutus ning ekraanil on tema ülemakse aastas.
2. **Grupp:** umbes 25 näidisliiget. Näha on, mitu neist maksab üle ja kui palju kokku aastas. Ümberarvutus 85 745 kogujale on märgitud sõnaga **hinnang**.
3. **Hankepäring:** mitu inimest osaleb, kuidas nad jagunevad kasutusprofiilide vahel ja millised on hanketingimused (eelnõu failis 02).
4. **Mari isiklik pakkumine:** kolm hinda kõrvuti: praegu, täna avalike hindadega ja hankega (**hinnang**). Lisaks sääst aastas ja nupp „Vaheta”. Liige otsustab ise.
5. **Leping:** valmis täidetud leping väljamõeldud andmetega. Liige vajutab „Allkirjasta digitaalselt”, siis tuleb PIN-koodi ootamise ekraan ja lõpuks teade „Saadetud operaatorile”.

## Piirid

- **Muuda ainult kausta `prototuup/`.** Uue faili `data/naidisvastused.csv` võid lisada. Faile `docs/` ja `hinnad.csv` ära muuda, sest need on tiimi kokkulepitud allikad.
- **Peab töötama ilma internetita.** Kõik CSS, JS ja andmed on faili sees. Ära lae midagi CDN-ist ega fonte võrgust, sest saali wifi pole kindel.
- **Arvutus järgib faili 07 reegleid täpselt.** Testjuhtumid A ja B peavad andma samad numbrid ja seda kontrollib kood ise. Vale number laval murrab usalduse.
- **Näidisandmed tehakse turuhindade põhjal.** Genereeri liikmed `hinnad.csv` hindadest ja mõistlikest eeldustest. Kasuta samu veerge mis küsimustikus (fail 07), et päris vastused saaks hiljem ühe CSV-ga sisse vahetada. Ekraanil on märge „näidisandmed”.
- **Operaatori pakkumine on hinnang.** Hinda, mille real on `KONTROLLIMATA`, ei kasutata arvutuses ilma nähtava märkuseta.
- **Isikuandmeid ei kasutata.** Nimi, isikukood ja telefoninumber on väljamõeldud ja selgelt näidisena märgitud.
- **Allkirja samm on üldine „Digiallkiri (demo)”.** See ei kopeeri Smart-ID, Mobiil-ID ega panga logot ega kujundust, sest demo ei tohi välja näha nagu päris autentimisteenus.
- **Välimus tuleva.ee eeskujul.** Rahulik, palju valget, suured numbrid ja vähe teksti. Tuleva nimi on tekstina ja nurgas on märge „Häkatoni prototüüp”.
- **Tuleva ei soovita, kuhu sääst panna, ja ei vaheta liikme eest** (fail 06). Kogu tekst on eesti keeles.
- **Tavalised otsused tee ise.** Küsi Ülarilt ainult siis, kui arvutusreegel ja testjuhtum annavad eri tulemuse.

## Valmis tähendab

- `prototuup/index.html` avaneb Macis topeltklikiga Safaris ja Chrome'is ilma internetita. Kõik 5 ekraani saab läbi klikkida alla 3 minuti. Esitleja liigub nooleklahvidega edasi ja tagasi.
- Testjuhtumite tulemus on A puhul 60,00 € ja 101,88 € ning B puhul 156,00 € ja 257,88 €. Kontroll näitab tulemust (nt `?test` aadressi lõpus).
- Varuplaaniks on igast ekraanist pilt kaustas `prototuup/ekraanid/`.
- Muudatused on commititud, aga pushitud mitte. Ülari pushib ise.
- Lõpuks ütle, kus fail on, ja kirjelda tehtut 3 lausega. Rohkem pole vaja.

Enne kui teatad edenemisest, kontrolli iga väidet selle sessiooni tööriista tulemuse vastu. Teata ainult tööst, mille kohta saad tõendi näidata. Kui midagi pole veel kontrollitud, ütle seda otse. Teata tulemustest ausalt: kui testid ebaõnnestuvad, ütle seda ja näita väljundit. Kui samm jäi vahele, ütle seda. Kui midagi on tehtud ja kontrollitud, ütle seda selgelt ja ilma reservatsioonideta.
