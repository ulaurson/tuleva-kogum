# Tiimi arutelud

*Häkatoni ajal tiimis arutatud teemad, mida teistes failides veel pole. Uus punkt lisatakse lõppu. Kui punktist saab otsus, kantakse see [otsustesse](06-otsused.md).*

**Staatused:** arutlusel · otsustatud (vt [otsused](06-otsused.md)) · prototüübis

**Uue punkti vorm:** pealkiri ja kuupäev, staatus, mida arutati, mida juba teame (viitega allikale), mis on lahtine, mida see prototüübis tähendab.

## 1. Kodulehe voog peab vastama liikme kahtlustele enne vahetust (10.10)

**Staatus:** arutlusel

Liige ei jäta vahetamata ainult hinna pärast. Teda peatavad küsimused, millele ta ei tea vastust. Kodulehe voog peab neile vastama juba seal, kus küsimus tekib, mitte alles hiljem või eraldi KKK-s.

| Liikme küsimus | Mida juba teame | Mis on lahtine |
|---|---|---|
| Kas mul on tähtajaline leping? Kuidas ma sellest aru saan? | Küsimustikus on vastusevariant „ei tea” (vt [lähtealused](07-prototuubi-lahtealused.md#küsimustik-osalejatele-side)). Juhist, kust seda vaadata, meil veel pole | Kust näeb seda Tele2, Telia ja Elisa klient (iseteenindus, arve, leping)? Kas lepingu lõppkuupäev on seal kirjas? |
| Kas saan lepingu ilma trahvita lõpetada või pean lõpuni ootama? | Kui leping on pooleli, kehtib hanke pakkumine 12 kuud ja liige saab meeldetuletuse, kui tema leping lõpeb (vt [idee](02-idee.md#käivitajad)) | Mis maksab ennetähtaegne lõpetamine, näiteks saadud soodustuse tagasimaks või seadme järelmaks? Kontrollida seadusest ja kolme operaatori tingimustest, allika ja kuupäevaga |
| Mida pean tegema, kui Tuleva pakkumise vastu võtan? Kas sellega kaasneb palju vaeva või ebamugavusi? | Number jääb samaks. Üleviimine on tasuta, mobiilinumbril 3–25 tööpäeva, ja uus operaator lõpetab vana lepingu kliendi volitusel (TTJA, vt [faktid](03-faktid.md#turg-ja-käitumine)). Leping on süsteemis valmis täidetud ja liige allkirjastab selle digitaalselt (vt [idee](02-idee.md#lahendus)). Uuel lepingul on 14-päevane taganemisõigus (õigusmentori hinnang, vt [õigus](04-oigus.md)) | Kuidas liige saab uue SIM-kaardi (post, esindus, eSIM)? Kas üleviimise ajal on hetk, kui telefon ei tööta? Mis saab vana operaatori viimasest arvest? |

### Mida see prototüübis tähendab

[Ehitusbriifis](09-prototuubi-briif.md) seda veel pole. Kui tiim otsustab, puudutab see registreerimist ja briifi ekraane 4 (pakkumine) ja 5 (leping).

- Küsimuse „Kas sul on tähtajaline pakett?” juurde lisada abi, kust seda vaadata.
- Kui leping on tähtajaline, ei kirjuta voog „vaheta kohe”. Ta näitab, millal saab vahetada ilma lisatasuta, ja pakub meeldetuletust.
- Pakkumise vaates enne nuppu „vaheta” on sammud ja ajakulu lühidalt kirjas: number jääb samaks, üleviimine on tasuta, vana leping lõpetatakse liikme eest, 14 päeva saab taganeda.
- Liikmele lubame ainult seda, mis on allikaga kontrollitud. Kuni lõpetamise tasud on kontrollimata, ei kirjuta voog „ilma trahvita”.

## 2. Kuidas Tuleva Kogum ise raha teenib (10.10)

**Staatus:** arutlusel

Tuleva Kogum on eraldi äri ja peab ennast ära tasuma, et saaks liikmetele head teenust pakkuda. Praegune mõte (Ülari, 10.10): Tuleva teenib tasu iga liikme pealt, kes pakkumise vastu võtab, ja **selle tasu maksab operaator**.

| Küsimus | Mida juba teame | Mis on lahtine |
|---|---|---|
| Kas see läheb vastuollu senise põhimõttega? | Jah. Senine põhimõte 1 on „Tuleva ei võta operaatoritelt vahendustasu” ja see on olnud idee peamine eristaja (vt [otsused](06-otsused.md)). Võrdlusportaalidel ja välismaa ühisostudel (OCU) maksab korraldajale võitja, ja just seda huvide konflikti oleme seni välja toonud | Kas tiim muudab põhimõtet? Kui jah, tuleb uuendada otsused, README reegel 3 ja esitluse sõnum |
| Kuidas huvide konflikti vähendada? | **Hinnang:** kõik pakkujad maksavad sama fikseeritud tasu uue kliendi kohta, see on hanketingimustes avalik ega mõjuta võitja valikut. Liige näeb enne vahetamist, et Tuleva saab tasu ja kui suure | Kas see on žüriile piisav? Kas operaatorid nõustuvad? |
| Kui suur on tulu? | **Hinnang** näidisandmete põhjal (56 % osalejatest vahetab): 20 € tasuga ja 1 000 osalejaga ≈ 11 200 € aastas. 10 000 liikme juures on äri väike | Tasu suurus. Tegelik vahetajate osa |
| Mida see seaduse mõttes tähendab? | Õigusmentor: edukustasu on lubatud, kui see on enne lepingut selgelt öeldud (vt [õigus](04-oigus.md)) | Kas operaatori makstav tasu teeb Tulevast vahendaja, kellele kehtivad lisanõuded? Küsida õigusmentorilt |

Alternatiiv, mis säilitab eristaja: tasu maksab liige ise, näiteks 10 % esimese aasta säästust ja ainult siis, kui ta vahetab (sama mudel oli autopiloodi ideel).

### Mida see prototüübis tähendab

- Prototüübis on praegu operaatori makstav tasu, näidis 20 € jõustunud lepingu kohta.
- Pakkumise ekraan ütleb liikmele: „Sulle tasuta. Tuleva saab iga uue liikme eest operaatorilt sama tasu, olenemata sellest, kes hanke võitis.”
- Hanke ja pakkumiste vaates on kirjas, et tasu on kõigilt pakkujatelt sama ja võitja valikul seda arvesse ei võeta.
- Aasta statistikas on Tuleva tulu (14 × 20 € = 280 €; 1 000 osalejaga ≈ 11 200 €) ja tasu liikmele 0 €.
