# Ideekirjeldus: Tuleva Kogum, mobiilside ühishange (10.10.2026)

*Koostatud skilliga ideekirjeldus failide 01–15 ja prototüübi põhjal. Mustand tiimile. Asendab esitatud vormi (autopiloot, 27.09) sisu. Numbrid on näidis või **hinnang**.*

**Enne kasutamist teada**

1. Skilli kontrollpunkt „lahendus ei toetu teenusepakkuja makstavale tasule” ei ole täidetud: otsus 06 (10.10) on operaatori fikseeritud tasu. Kirjeldus ütleb selle ausalt välja.
2. Telia hind on kontrollitud 27.09 (hinnad.csv), Tele2 ja Elisa 10.10.
3. Fail 13 ja 15 annavad kulu katmiseks eri aasta. Kasutatud on faili 13 numbreid.

## Probleem

| Samm (kulu kandja vaates) | Peidetud kulu või aeg | Tegevus |
|---|---|---|
| Paketti ei vaadata üle | Piiramatu pakett maksab tavahinnaga 34,99–43,99 € kuus (Tele2, Telia, Elisa; hinnad.csv) | kustuta: hange on ise meeldetuletus |
| Parem hind tuleb välja kaubelda | Tele2 piiramatu: 24-kuulise lepinguga 15,50 €, sidumata 34,99 € (tele2.ee, 10.10.2026) | lihtsusta: üks hind kõigile |
| Odavam hind seob 24 kuuks | Lepingut ei saa ilma tasuta lõpetada | küsi nõuet: ilma sidumiseta |
| Paketti vahetatakse | Võrdlemine, vormid, Mobiil-ID tuleb uuesti aktiveerida (RIA) | kiirenda: eeltäidetud leping |

Kõige kallim samm on see, mida ei juhtu: inimene ei vaata oma paketti üle.

## Lahendus

1. **Üks pakett, kõik operaatorid.** Tuleva küsib kord aastas kõigilt operaatoritelt hinda ühele piiramatule mobiilipaketile. Võidab madalaim hind. Hange õnnestub, kui hind on vähemalt 2 € kuus odavam kui parim avalik sarnane pakkumine.
2. **Osalemiseks piisab registreerumisest.** Nõusolek ja e-post, konto. Oma paketti ega hinda ei sisestata. Osaleda saavad kõik, ka ettevõtted.
3. **Liige otsustab ise.** Ta allkirjastab eeltäidetud lepingu ise ja Tuleva edastab selle operaatorile. Tuleva ei vaheta kellegi eest.
4. **Hinnalagi.** Hind ei tõuse 24 kuu jooksul. Mahuastmel (1 000 / 5 000 / 10 000 osalejat) langeb hind kõigil.

Lisahüve: mobiilipaketi võtnu saab koduinterneti ja telepaketi 50 % tavahinnast.

## Eesmärk

| | Täna | Kogumiga |
|---|---|---|
| Piiramatu pakett | 34,99–43,99 € kuus | 6,50 € kuus (sihthind, näidis) |
| Sääst | 0 | ≈ 405 € aastas (hinnang, tavahinna vastu) |
| Sidumine | parim hind 24 kuuks | ilma sidumiseta |
| Liikme töö | võrdlemine ja kauplemine | registreerumine ja üks allkiri |

6,50 € on sihthind. Ükski operaator pole seda veel pakkunud.

## Miks kordades parem

Läbiräägitud hind on sama kõigile ega nõua sidumist. Korraldaja tasu on fikseeritud ja liikmele nähtav ega sõltu sellest, kes võidab. Võrdlusportaalidel ja maakleritel klient tasu ei näe.

## Elujõulisus

- Osalejale tasuta. Operaator maksab Tulevale iga lepingu kuumaksest sama tasu, näidis 0,50 € kuus. Sama kehtib interneti- ja telepaketi kohta.
- Tasu on kõigilt pakkujatelt sama ja võitja valikul seda arvesse ei võeta. Liige näeb tasu enne liitumist.
- Tasuvus: vt Marju prognoos ([13](13-tasuvus.md), hinnang).
- Hange kordub igal aastal.
- Elujärge ei kahjusta: liige saab alati lahkuda ja tähtajalise lepingu korral saab ta meeldetuletuse, mitte „vaheta kohe”.

## Tehnoloogia õiges järjekorras

Esimene hange tehakse tabelite ja e-kirjadega. Liikme nähtav pool töötab kohe: registreerumine, pakkumine, leping ja allkiri. Hanke halduse, kuuaruanded ja meeldetuletused automatiseerime alles pärast esimest käsitsi tsüklit.

## Enne esitamist kontrollida

- **Õigus:** kas operaatori makstav tasu teeb Tulevast vahendaja ja kas tasu avalikustamisest piisab (õigusmentor).
- **Andmekaitse:** õiguslik alus ja Tuleva roll igas etapis.
- **Äriarendus:** kas operaatorid osalevad ja nõustuvad tasu ning hinnalaega. Tele2 tingimused keelavad teenuse vahendamise ilma nõusolekuta (fail 14).
- **Tuleva:** kas ühistu põhikiri lubab sellist tulu.

## Esitusvormi lühiversioon

Sama piiramatu mobiilipakett maksab Eestis tavahinnaga 35–44 € kuus. Parema hinna saab ainult see, kes kaupleb ja seob end 24 kuuks. Tuleva Kogum küsib kord aastas kõigilt operaatoritelt ühe hinna ühele piiramatule paketile, ilma sidumiseta ja sama kõigile osalejatele. Osaleda saab igaüks, ka ettevõte. Selleks piisab nõusolekust ja e-postist. Liige otsustab ise ja allkirjastab eeltäidetud lepingu. Sihthinnaga 6,50 € on keskmine sääst ≈ 405 € aastas (hinnang). Lisaks saab ta koduinterneti ja telepaketi poole hinnaga. Tuleva saab igalt operaatorilt sama fikseeritud tasu kuus (näidis 0,50 €). Tasu on liikmele nähtav ega mõjuta võitja valikut.

## Mis muutus võrreldes esitatud vormiga

- „Autopiloot” asemel on „ühishange”. Reegleid ja automaatset vahetamist pole.
- Ulatus: kodulaen, kodukindlustus ja elekter jäid välja. Alles on üks piiramatu mobiilipakett.
- Tasu: varem „komisjon null” ja 10 % säästust. Nüüd maksab operaator fikseeritud tasu, liikmele tasuta.
- Ühe klikiga kinnitust pole. Liige allkirjastab lepingu ise.
- Varem kogujatele, nüüd kõigile, ka ettevõtetele.
- Isiklikku hinda ei küsita. Sääst on keskmine hinnang avalike hindade järgi.
- Soovitust „pane sääst III sambasse” pole (võib olla investeerimisnõustamine).
- Uus: hinnalagi 24 kuud, mahuastmed, interneti ja telepaketi soodustus 50 %.
