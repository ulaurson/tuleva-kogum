# Operaatori tuvastamine telefoninumbri järgi

**Arendusnõue 10.10.2026:** kui inimene sisestab tooteankeeti oma Eesti telefoninumbri, teeb rakendus päringu ja täidab sideettevõtja välja. Inimene kinnitab tulemuse ning täpsustab teenusebrändi. Eesmärk on vähendada käsitsi sisestamist ja parandada hanke lähteandmeid.

**Teostuse seis 10.10.2026:** [Twilio Lookup v2 kohalik katse](../prototuup/twilio-katse/README.md) on teostatud ja ühendus lubatud numbri päringuga kontrollitud. Ühisesse veebirakendusse ühendamine on veel tegemata. TTJA masinliidese ligipääs ja kasutustingimused on endiselt kinnitamata.

## Olemasolev kood

- [Server](../prototuup/twilio-katse/server.mjs) teeb päringu Twiliole ja tagastab sideettevõtja, allika, aja ning numbri tüübi.
- [Katsevorm](../prototuup/twilio-katse/index.html) näitab vastust ja laseb inimesel operaatori ning teenusebrändi kinnitada.
- [Rakendusse ühendamise juhis](../prototuup/twilio-katse/INTEGRATSIOON.md) kirjeldab HTTP API-t ja ankeedi väljade seost vastusega.
- Piloot lubab aktiveerimisest 72 tundi ja kuni 100 väljakutset. Võtmed ja katseolek on kohalikus privaatses kaustas; neid ei lisata reposse.

Kohalik ühenduse test ei tõenda teisaldatud numbri operaatoriinfo täpsust. See vajab võrdlust teadaoleva tulemusega. Põhirakendus vajab oma serveriseadistust ja autentimist; pilooti ei avata muutmata kujul internetti.

## Mida ametlik allikas kinnitab

TTJA andmebaasist saab otsida Eestis kasutatava numbri ja sideettevõtja, kellele number on väljastatud. Andmebaas ei sisalda lõppkasutaja nime ega kontaktandmeid. Avalikus päringus sisestatakse number ilma riigikoodi ja tühikuteta ning vajutatakse „Otsi”. [TTJA numeratsioon](https://www.ttja.ee/eraklient/side-ja-meediateenused/sideteenused-numeratsioon/numeratsioon), [sisestusjuhis](https://www.ttja.ee/en/private-client/communications/communication-services/numbering), [avalik numbripäring](https://nba.ttja.ee/numbriparing.aspx). Kontrollitud 10.10.2026; TTJA selgitusleht uuendatud 19.06.2025.

Operaatorit ei määrata numbri alguse järgi. Klient saab operaatorit vahetades numbri säilitada. [TTJA numbriliikuvus](https://www.ttja.ee/eraklient/side-ja-meediateenused/sideteenused-numeratsioon/numbriliikuvus), kontrollitud 10.10.2026.

Päringust ei tuletata kasutaja nime, numbri omanikku, paketti, kuutasu, lepingu lõppu ega lõpetamistasu. Sideettevõtja vastus ei kinnita teenusebrändi: näiteks vastusest „Telia Eesti AS” üksi ei piisa Telia, Diili ja Superi eristamiseks. Paketi ja lepingu andmed annab inimene eraldi.

## Ankeedi voog

1. Inimene sisestab oma numbri. Välja juures on selgitus: „Kontrollime numbri järgi sideettevõtjat. Paketi ja lepingu andmed lisad ise.”
2. Rakendus normaliseerib numbri ja kontrollib, kas see sobib Eesti numbripäringuks. Käsitletakse riigikoodiga `+372`, `00372` ja riigikoodita sisendit. Tühikud ja lubatud eraldajad eemaldatakse; numbri kehtivust ei otsustata ainult pikkuse järgi.
3. Piloodis algab päring pärast korrektse numbri sisestamist, nõusolekut ja nupuvajutust. Iga klahvivajutus päringut ei käivita. Välise teenuse kutsumine käib serveri kaudu.
4. Õnnestunud vastus täidab sideettevõtja välja. Inimene näeb tulemust ja päringu aega ning kinnitab või parandab valiku. Teenusebränd küsitakse eraldi, kui päring seda ei kinnita.
5. Kui liides puudub, teenus ei vasta või numbrit ei leita, näidatakse selget teadet ja inimene valib operaatori ise. Ankeedi täitmine saab jätkuda.
6. Kinnitatud operaator ja teenusebränd lähevad osaleja andmetesse. Hankepäringus kasutatakse operaatorite jaotust koondina; telefoninumbrit ei lisata vaikimisi operaatoritele saadetavasse koondpäringusse.

**Voog:** number → serveri päring → sideettevõtja → kasutaja kinnitus ja teenusebränd → paketi ning lepingu andmed → hanke koondandmed.

## Liidese valik ja käivitamise eeldused

Piloodis kasutatakse Twilio Lookup v2 paketti `line_type_intelligence`. Aadress, autentimine ja katse piirid on [käivitusjuhises](../prototuup/twilio-katse/README.md) ning [ühendamisjuhises](../prototuup/twilio-katse/INTEGRATSIOON.md). API konto ja võti seadistatakse serveris eraldi. TTJA kinnitatud masinliides jääb võimalikuks alternatiiviks, mille ligipääs on kinnitamata.

Enne ühise veebirakenduse päringute käivitamist tuleb kinnitada:

- kellelt saab liidese ja ligipääsu ning kas Tuleva tohib seda selleks eesmärgiks kasutada;
- kas vastus kajastab ka teisaldatud numbreid, kui kiiresti info uueneb ja kas vastus sisaldab ainult sideettevõtjat või ka teenusebrändi;
- autentimine, maksumus, päringulimiidid, ajalõpp ja lubatud vahemälu kehtivusaeg;
- millised andmed teenusele saadetakse, kuidas inimest sellest teavitatakse ning kui kaua tulemust ja numbrit hoitakse.

TTJA avaliku veebivormi olemasolu ei tõenda avaliku API ega masspäringute kasutusõigust. TTJA kasutusjuhend kirjeldab numbriloa omaniku masinliidest, kuid avaliku päringu esitaja veebiliidest. Juhend on **15.07.2019** seisuga ja ei kinnita Tuleva tänast ligipääsu. [NBA kasutusjuhend](https://www.ttja.ee/sites/default/files/documents/2021-01/nba_kasutusjuhend.pdf), vaadatud 10.10.2026.

Käsitsi operaatorivalik töötab alati ja abi juures on TTJA avaliku päringu link. Avaliku vormi automaatset kraapimist ei käsitleta kokkulepitud API-na.

## Andmed ja vead

Allolev on tooteankeedi kavandatav andmemudel. Piloodi API tagastab väiksema vastuse; väljade vastavus on [ühendamisjuhises](../prototuup/twilio-katse/INTEGRATSIOON.md).

| Väli | Sisu |
|---|---|
| `phone_e164` | Normaliseeritud number, ainult privaatses rakenduse andmehoidlas vastavalt säilitamisreeglile |
| `lookup_status` | `idle`, `loading`, `ok`, `not_found`, `unavailable` või `unsupported` |
| `registry_carrier` | Päringus tagastatud sideettevõtja; tühi, kui kinnitatud vastust pole |
| `lookup_source` | Tegelik kasutatud teenus; demo korral eraldi tähis `demo` |
| `lookup_checked_at` | Tegeliku vastuse saamise aeg; demo või käsitsi valik ei loo pärispäringu aega |
| `confirmed_carrier` | Kasutaja kinnitatud või käsitsi valitud operaator |
| `service_brand` | Kasutaja kinnitatud teenusebränd, näiteks Diil |
| `carrier_confirmation_source` | Kasutaja kinnitas päringu / parandas päringut / valis käsitsi |

Päringulimiit ja ajalõpp eristatakse teenuse vea põhjuses. Vea korral ei täideta operaatorit oletusega. Numbri muutmisel tühistatakse vana tulemus ja kinnitus; hilinenud vastus eelmise numbri kohta ei tohi uut valikut üle kirjutada. Aegunud vahemälu vastust ei esitata värskelt kontrollituna.

Täisnumbreid ega tegelikke päringuvastuseid ei panda avalikku reposse, vealogidesse, analüütikasse ega demoandmetesse. Operaatoripäring ei tõenda, et number kuulub ankeedi täitjale, ega asenda lepingu sõlmimise isiku- ja esindusõiguse kontrolli.

## Prototüüp ja vastuvõtukriteeriumid

See on **tooteankeedi nõue**. [Anonüümne häkatoniküsitlus](07-prototuubi-lahtealused.md#küsimustik-osalejatele-side) jääb numbrita. Ilma internetita demos kasutatakse käsitsi valikut või selgelt märgistatud näidisvastust. Päris telefoninumbritega kontrolli demos ei tehta.

- Sama numbri toetatud sisestuskujud normaliseeritakse üheks; vigast või toetamata sisendit välisele teenusele ei saadeta.
- Päris teenus tagastab sideettevõtja, allika ja kontrolli aja; kasutaja kinnitab operaatori ning teenusebrändi.
- Puuduv liides, ajalõpp, limiit ja puuduv tulemus jätavad käsitsi valiku kasutatavaks.
- Numbri muutmine eemaldab vana tulemuse ja kinnituse; hilinenud vastus ei täida vale numbri välja.
- Käsitsi valik, näidisvastus ja päris päring on eristatavad. Demo ei näita teeseldud edukat TTJA kontrolli.
- Sideettevõtja vastusest ei tuletata teenusebrändi, paketti, hinda, lepingu lõppu ega numbri omanikku.
- Automaatkontroll aktiveeritakse alles pärast liidese ligipääsu ja kasutustingimuste kinnitamist. Testimiseks kasutatakse teenuse testkeskkonda või selleks määratud testnumbreid.
