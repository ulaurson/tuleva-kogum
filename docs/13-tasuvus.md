# Tasuvus: Tuleva tulu ja kulu

*Prognoos 10.10.2026 (Marju). Kõik eeldused on **hinnang**, kui pole öeldud teisiti. Liikmete säästu mudel on eraldi failis [12-uuringud](12-uuringud.md).*

## Mudel

- Üks ühispakkumine (Telia): piiramatu mobiilne internet, kõned, SMS. Hind 5–6 € kuus.
- Liitunu saab kodunett ja telepaketi 50% soodsamalt.
- Tuleva saab Telialt **0,50 € kuus** iga aktiivse numbri, kodunett ja telepaketi eest.
- Ainult ühistu liikmetele (~10 000). Liige võib kaasa võtta pere numbrid ja oma ettevõtte töötajad.

## Eeldused

| | Pess. | Baas | Opt. |
|---|---|---|---|
| Registreerub liikmetest | 10% | 20% | 30% |
| Registreerunutest vahetab | 30% | 45% | 56% |
| Numbreid liikme kohta | 1,8 | 1,8 | 1,8 |
| Lisateenuse võtab (leibkonnast) | 25% | 40% | 55% |
| Lisateenuseid leibkonna kohta | 1,6 | 1,6 | 1,6 |
| Ettevõtteid | 50 | 150 | 300 |
| Numbreid ettevõtte kohta | 4 | 4 | 4 |
| Liikme praegune hind numbri kohta | 15 € | 22 € | 30 € |

- Uusi liitujaid 2. aastal 70%, 3. aastal 60%, edasi 50% esimese aasta mahust. Aktiivsetest ühikutest säilib 85% aastas (hinnang).
- Kulu: 1 täiskoht keskmise palgaga ≈ 34 500 € aastas (hinnang). Mobiilile 1. aastal 100%, edasi 50%.

## Tulemus

| | Pess. | Baas | Opt. |
|---|---|---|---|
| Vahetab liikmeid 1. aastal | 300 | 900 | 1 680 |
| Aktiivseid ühikuid 1. / 3. / 5. aasta lõpus | 860 / 1 650 / 1 990 | 2 800 / 5 360 / 6 460 | 5 700 / 10 930 / 13 180 |
| Tuleva tulu 1. / 3. / 5. aastal | 2,6k / 8,3k / 10,6k € | 8,4k / 27,1k / 34,6k € | 17,1k / 55,3k / 70,5k € |
| Jooksev kulu kaetud | ei kunagi | 2. aastal | 2. aastal |
| Kumulatiivne tulemus 5 aastaga | −66k € | +18k € | +145k € |
| Kumulatiivselt tasa | ei kunagi | 4. aastal | 2. aastal |
| **Liikmete sääst aastas, 1. / 5. aasta** | 84k / 195k € | **440k / 1,0M €** | 1,2M / 2,9M € |

Liikmete säästus on ainult mobiilinumbrid, kodunett ja telepakett ei ole arvestatud. Nende sääst on eraldi allpool.

## Sääst koos koduinterneti ja telepaketiga (lisatud 10.10)

*Kõik on **hinnang**. Hinnad on failides [`data/koduinternet.csv`](../data/koduinternet.csv) ja [`data/telepaketid.csv`](../data/telepaketid.csv).*

50% tavahinnast annab ühe teenuse kohta:

- **koduinternet:** umbes 176 € aastas. Tüüpiliste pakettide keskmine tavahind on 29,33 € (Telia 200 31,00 €, Elisa 100/100 25,99 €, Tele2 500 Kodunett 30,99 €);
- **telepakett:** umbes 108 € aastas. Keskmine tavahind on 17,96 € (Telia Standard 17,56 €, Elisa Populaarne Elamus 21,33 €, Tele2 Go3 TV+ 14,99 €).

Arvutuses on keskmine 142 € teenuse kohta aastas, kui internetti ja telepaketti võetakse võrdselt.

| | Pess. | Baas | Opt. |
|---|---|---|---|
| Vahetab liikmeid 1. aastal | 300 | 900 | 1 680 |
| Lisateenuse võtab (leibkonnast) | 25% | 40% | 55% |
| Lisateenuste sääst 1. aastal | 17k € | 82k € | 210k € |
| Mobiili sääst 1. aastal (tabel ülal) | 84k € | 440k € | 1,2M € |
| **Liikmete sääst kokku 1. aastal** | **101k €** | **522k €** | **1,41M €** |

**Ühe leibkonna näide:** üks number ja nii internet kui telepakett. Mobiil kuni ≈ 405 € (prototüübi arvutus tavahinna vastu, vt [otsused](06-otsused.md)), internet 176 € ja telepakett 108 €, kokku kuni ≈ 689 € aastas.

**Piirang:** sääst on arvutatud tavahinna vastu. Kes maksab juba kampaaniahinda, säästab vähem. Tele2 Kodunett on kampaanias 24 kuuks juba umbes 50% odavam, nii et Tele2 kampaaniakliendile on meie soodustuse lisaväärtus selle aja jooksul ligikaudu null. Meie soodustus kehtib aga seni, kuni inimene on Tuleva kaudu klient, ja ilma 24-kuulise sidumiseta.

## Järeldused

1. Baasis on liikmete sääst 30–50 korda suurem kui Tuleva tulu.
2. Tasuvuseks on vaja ~2 900 aktiivset ühikut (17 250 € ÷ 6 €). Baas jõuab sinna 2. aastal.
3. Ettevõtted on tugev hoob: 150 ettevõtet toob sama palju numbreid kui 330 vahetavat liiget.
4. 5,50 € hinnast jääb Teliale ilma käibemaksuta ~4,44 €. Tuleva tasu on sellest 11%.

## Lahtine

- Mudel eeldab ainult ühistu liikmeid (~10 000). PR #2 avas hanke ka teistele, siis on maht suurem. Uuendus 10.10: liikmeid oli 31.03.2026 seisuga 9 560 (vt [häkaton](01-hakaton.md)).
- Kas Telia pakub 5–6 €-ga? Väljakaubeldud hindade kohta on vaja allikat ja kuupäeva.
- Tegelik registreerumise ja vahetamise osakaal: selle mõõdab esimene hange.
- Tasu operaatorilt läheb vastuollu põhimõttega „Tuleva ei võta operaatoritelt vahendustasu” ([arutelu](10-arutelu.md) p 2). Uuendus 10.10: tiim otsustas fikseeritud tasu kasuks (vt [otsused](06-otsused.md)).
