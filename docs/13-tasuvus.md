# Tasuvus: Tuleva tulu ja kulu

*Prognoos 10.10.2026 (Marju). Kõik eeldused on **hinnang**, kui pole öeldud teisiti. Liikmete sääst on ka failis [12-uuringud](12-uuringud.md).*

## Mudel

- Üks ühispakkumine (Telia): piiramatu mobiilne internet, kõned, SMS. Hind 5–6 € kuus.
- Liitunu saab kodunett 50% ja telepaketi 30% soodsamalt (telepakett muudetud 10.10, oli 50%).
- Tuleva saab Telialt **1 € kuus** iga aktiivse numbri, kodunett ja telepaketi eest (otsus 10.10). 0,50 € tulemus on jaotises „Tundlikkus: tasu 0,50 € kuus”.
- Ainult ühistu liikmetele: 9 560 liiget 31.03.2026 seisuga (vt [häkaton](01-hakaton.md)). Liige võib kaasa võtta pere numbrid ja oma ettevõtte töötajad.

## Eeldused

| | Pess. | Baas | Opt. |
|---|---|---|---|
| Registreerub liikmetest | 10% | 20% | 30% |
| Registreerunutest vahetab | 30% | 45% | 56% |
| Numbreid liikme kohta | 1,8 | 1,8 | 1,8 |
| Lisateenuse võtab (leibkonnast) | 25% | 40% | 55% |
| Lisateenuseid leibkonna kohta | 1,6 | 1,6 | 1,6 |
| Ettevõtteid | 48 | 143 | 287 |
| Numbreid ettevõtte kohta | 4 | 4 | 4 |
| Liikme praegune hind numbri kohta | 15 € | 22 € | 30 € |

- Ettevõtete arv on 50 / 150 / 300 10 000 liikme kohta, ümber arvutatud 9 560 liikmele.
- Uusi liitujaid 2. aastal 70%, 3. aastal 60%, edasi 50% esimese aasta mahust. Aktiivsetest ühikutest säilib 85% aastas (hinnang).
- Kulu: 1 täiskoht kahekordse keskmise palgaga ≈ 69 000 € aastas koos tööandja maksudega (hinnang). Mobiilile 1. aastal 100%, edasi 50%.

## Tulemus (tasu 1 €)

| | Pess. | Baas | Opt. |
|---|---|---|---|
| Vahetab liikmeid 1. aastal | 287 | 860 | 1 606 |
| Aktiivseid ühikuid 1. / 3. / 5. aasta lõpus | 820 / 1 580 / 1 900 | 2 670 / 5 130 / 6 180 | 5 450 / 10 450 / 12 600 |
| Tuleva tulu 1. / 3. / 5. aastal | 4,9k / 16,0k / 20,3k € | 16,0k / 51,9k / 66,1k € | 32,7k / 105,8k / 134,8k € |
| Jooksev kulu kaetud | ei kunagi | 2. aastal | 2. aastal |
| Kumulatiivne tulemus 5 aastaga | −135k € | +26k € | +268k € |
| Kumulatiivselt tasa | ei kunagi | 5. aastal | 2. aastal |
| **Liikmete mobiilisääst aastas, 1. / 5. aasta** | 81k / 186k € | **420k / 971k €** | 1,19M / 2,74M € |

Mobiilisäästus on ainult mobiilinumbrid. Kodunett ja telepakett on eraldi allpool.

## Sääst koos koduinterneti ja telepaketiga (lisatud 10.10)

*Kõik on **hinnang**. Hinnad on failides [`data/koduinternet.csv`](../data/koduinternet.csv) ja [`data/telepaketid.csv`](../data/telepaketid.csv).*

Soodustus tavahinnast (koduinternet 50%, telepakett 30%, otsus 10.10) annab ühe teenuse kohta:

- **koduinternet:** umbes 176 € aastas. Tüüpiliste pakettide keskmine tavahind on 29,33 € (Telia 200 31,00 €, Elisa 100/100 25,99 €, Tele2 500 Kodunett 30,99 €);
- **telepakett:** umbes 65 € aastas. Keskmine tavahind on 17,96 € (Telia Standard 17,56 €, Elisa Populaarne Elamus 21,33 €, Tele2 Go3 TV+ 14,99 €).

Arvutuses on keskmine 120 € teenuse kohta aastas, kui internetti ja telepaketti võetakse võrdselt.

| | Pess. | Baas | Opt. |
|---|---|---|---|
| Vahetab liikmeid 1. aastal | 287 | 860 | 1 606 |
| Lisateenuse võtab (leibkonnast) | 25% | 40% | 55% |
| Lisateenuste sääst 1. aastal | 14k € | 66k € | 170k € |
| Mobiili sääst 1. aastal (tabel ülal) | 81k € | 420k € | 1,19M € |
| **Liikmete sääst kokku 1. aastal** | **94k €** | **486k €** | **1,36M €** |

**Ühe leibkonna näide:** üks number ja nii internet kui telepakett. Mobiil kuni ≈ 405 € (prototüübi arvutus tavahinna vastu, vt [otsused](06-otsused.md)), internet 176 € ja telepakett 65 €, kokku kuni ≈ 646 € aastas.

**Piirang:** sääst on arvutatud tavahinna vastu. Kes maksab juba kampaaniahinda, säästab vähem. Tele2 Kodunett on kampaanias 24 kuuks juba umbes 50% odavam, nii et Tele2 kampaaniakliendile on meie internetisoodustuse lisaväärtus selle aja jooksul ligikaudu null. Meie soodustus kehtib aga seni, kuni inimene on Tuleva kaudu klient, ja ilma 24-kuulise sidumiseta.

## Kuupõhine vaade

Ülal on liitujad ühtlaselt üle aasta. Kui leping sõlmitakse 1. kuul, tuleb laine: 60% esimese aasta liitujatest 2.–3. kuul, ülejäänud 4.–12. kuul lepingute lõppedes (hinnang). Lahkumine ~1,3% kuus.

Baasi kuutulu 1. aastal (tasu 1 €):

| Kuu | 1. | 2. | 3. | 4. | 6. | 12. |
|---|---|---|---|---|---|---|
| Ühtlane | 223 € | 442 € | 659 € | 873 € | 1 292 € | 2 484 € |
| Laine 2.–3. kuul | 0 € | 802 € | 1 593 € | 1 690 € | 1 881 € | 2 424 € |

| | Pess. | Baas | Opt. |
|---|---|---|---|
| 1. aasta tulu: ühtlane → laine | 5,1k → 6,4k € | 16,5k → 21,0k € | 33,7k → 42,7k € |
| Jooksev kulu kaetud: ühtlane / laine | ei kunagi | 16. / 16. kuu | 13. / 13. kuu |

Kuupõhine 1. aasta tulu on aastatabelist ~3% suurem, sest liitumise kuu loetakse täiskuuks. Laine tõstab 1. aasta tulu ~25%, aga tasuvuse aega ei muuda. Selle määrab kogunenud ühikute arv.

## Tundlikkus: tasu 0,50 € kuus

Sama mudel, Tuleva tasu 0,50 € kuus ühiku kohta (varasem näidis).

| | Pess. | Baas | Opt. |
|---|---|---|---|
| Tulu 1. / 5. aastal | 2,5k / 10,2k € | 8,0k / 33,0k € | 16,4k / 67,4k € |
| Jooksev kulu kaetud | ei kunagi | 6. aastal | 2. aastal |
| Kumulatiivne tulemus 5 aastaga | −171k € | −91k € | +30k € |
| Kumulatiivselt tasa | ei kunagi | mitte 15 aasta jooksul | 5. aastal |

## Järeldused

1. Baasis on liikmete sääst 15–30 korda suurem kui Tuleva tulu.
2. Tasuvuseks on vaja ~2 900 aktiivset ühikut (34 500 € ÷ 12 €). Baas jõuab sinna 2. aastal ja kumulatiivselt tasa 5. aastal. 0,50 € tasuga on vaja ~5 750 ühikut ja baas ei jõua 15 aasta jooksul tasa.
3. Pessimistlik stsenaarium (287 vahetajat) ei tasu end ära kummagi tasu juures.
4. Liitumislaine 2.–3. kuul tõstab 1. aasta tulu, aga tasuvuse aega ei muuda.
5. Ettevõtted on tugev hoob: 143 ettevõtet toob sama palju numbreid kui 320 vahetavat liiget.
6. 5,50 € hinnast jääb Teliale ilma käibemaksuta ~4,44 €. Tuleva tasu 1 € on sellest 23% (0,50 € oleks 11%). Mida suurem tasu, seda väiksem on tõenäosus, et Telia nõustub.

## Lahtine

- Mudel eeldab ainult ühistu liikmeid. PR #2 avas hanke ka teistele, siis on maht suurem.
- Kas Telia pakub 5–6 €-ga ja maksab 1 € tasu? Väljakaubeldud hindade kohta on vaja allikat ja kuupäeva.
- Tegelik registreerumise ja vahetamise osakaal: selle mõõdab esimene hange.
