# Prototüübi lähtealused

*See ei ole spetsifikatsioon. Siin on see, mida demo peab tõestama, ja varem kokku lepitud arvutusreeglid, et tiim ei peaks neid uuesti välja mõtlema.*

## Mida demo peab 3 minutiga tõestama

1. **Sama teenuse eest makstakse väga erinevalt.** Päris andmed häkatoni osalejatelt: mitu maksab üle ja kui palju.
2. **Grupp koos on suur.** N osalejat, kokku X € ülemakset aastas. Ümberarvutus Tuleva 85 745 kogujale märgitakse **hinnanguks**.
3. **Hankepäring on valmis.** Kiri operaatoritele: mitu inimest, kasutusprofiilide jaotus, tingimused.
4. **Liige näeb isiklikku pakkumist ja otsustab ise.** Praegune hind, pakkumise hind, sääst aastas, Tuleva tasu (vt [õigus](04-oigus.md)), sõnum „Hind ei tõuse 24 kuu jooksul. Kui grupp kasvab, võib see langeda.” (vt [otsused](06-otsused.md)), info lisahüve kohta (koduinternet ja telepakett 50% tavahinnast), nupp „vaheta”. Seejärel näeb liige valmis täidetud lepingut koos operaatori lepingueelse teabe ja lühikokkuvõttega (ESS § 95¹, vt [õigus](04-oigus.md#mida-seadus-ütleb)), allkirjastab selle (demos simuleeritud) ja lubab selle operaatorile saata.

## Piirangud

- Üks sujuv demo, mida vähem liikuvaid osi, seda väiksem risk laval.
- Peab töötama ka ilma internetita, kui andmed on sisse laetud.
- Käsitsi sisestus peab alati töötama. Kui kasutame AI-d (nt arvelt paketi ja hinna lugemine), on see lisa, mitte ainus tee.
- Varuplaan: ekraanipildid igast sammust ja eelnevalt salvestatud grupivaade.
- Ei mingeid isikuandmeid repos ega ekraanil.
- Operaatorite pakkumised on demos näidisandmed, kui päris vastust pole. See tuleb laval ausalt öelda.

## Arvutusreeglid

Sisend: `hind_praegu` (€/kuu), `kasutus_gb` (viimase 3 kuu keskmine), `puhver = 1,2`.

**Kui liige kuutasu ei sisesta** (otsus 10.10): `hind_praegu` on sama operaatori avalik hind paketile, mis vastab liikme paketi nimele või mahule. Kui leping on tähtajaline ja operaatoril on 24 kuu hind, kasuta seda, muidu sidumata hinda. Ekraanil on märge „avalik hind, mitte sinu arve”.

1. **Vajalik maht** = `kasutus_gb × 1,2`.
2. **Sobiv pakett** = odavaim pakett, mille maht ≥ vajalik maht. Piiramatu = 9999 GB.
3. **Ülemakse kuus** = max(0, `hind_praegu` − sobiva paketi hind).
4. **Aastasääst** = ülemakse kuus × 12.
5. Kui sobiv pakett on sama operaatori juures: „vaheta pakett iseteeninduses”, muidu „vii number üle”.
6. Minuteid ja SMS-e arvutus ei arvesta.
7. Juriidilise isiku numbrit võrdleme samade tavapakettidega (`hinnad.csv`), äripakette ei kasuta (otsus 10.10).

### Kaks stsenaariumi, näita eraldi

- **Täna:** avalikud hinnad ilma sidumiseta (`hind_kuupohine_eur`).
- **Hange (hinnang):** eeldame, et hange täidab hanketingimuse: vähemalt 2 € kuus alla parima avaliku sarnase pakkumise, ilma sidumiseta (vt [idee](02-idee.md#lahendus)). Arvutuses on hanke hind täpselt 2 € alla. Parim avalik sarnane pakkumine on odavaim kontrollitud hind paketile, mille maht ≥ vajalik maht. Hinnaks võetakse `hind_24k_eur`, kui see on olemas, muidu `hind_kuupohine_eur`.

### Testjuhtumid

Kui kood annab teise tulemuse, on arvutuses viga. Uuendatud 10.10 koos `hinnad.csv`-ga.

| Juhtum | Praegu | Kasutus | Täna, avalikud hinnad | Hange (hinnang) |
|---|---|---|---|---|
| A | Tele2 17 GB, 15,99 € | 6 GB | Tele2 9 GB 10,99 € → **60,00 € aastas** | parim avalik Tele2 17 GB 8,50 € (24 kuud) − 2 € = 6,50 € → **113,88 € aastas** |
| B | Tele2 Piiramatu, 34,99 € | 20 GB | Elisa 25 GB 16,99 € (kontrollimata hind) → 216,00 €; kontrollitud hindadest Tele2 55 GB 21,99 € → **156,00 € aastas** | parim avalik Tele2 Piiramatu 15,50 € (24 kuud) − 2 € = 13,50 € → **257,88 € aastas** |

## Küsimustik osalejatele (side)

Eesmärk: 20+ päris vastust, täitmine alla 3 minuti. Sissejuhatus vormis:

> Kogume anonüümselt mobiilipakettide andmeid, et näidata, kui palju häkatoni osalejad sama teenuse eest üle maksavad. Me ei küsi nime ega telefoninumbrit. Andmeid kasutatakse ainult selle häkatoni esitluses ja need kustutatakse pärast häkatoni.

1. **Operaator:** Telia / Elisa / Tele2 / muu
2. **Paketi nimi:** vaba tekst (nt „17 GB”)
3. **Kuutasu eurodes:** arvelt, koos käibemaksuga, ühe numbri kohta. Kui ei tea, jäta tühjaks
4. **Leping:** tähtajaline (24 kuud) / tähtajatu / ei tea
5. **Kui tähtajaline, millal lõpeb?** kuu ja aasta (valikuline)
6. **Tegelik andmekasutus kuus (GB):** viimase 3 kuu keskmine iseteenindusest. Kui ei leia: alla 5 / 5–15 / 15–50 / üle 50 / ei tea
7. **Mitu numbrit on sinu arvel?** 1 / 2 / 3+
8. **Millal viimati paketti üle vaatasid või vahetasid?** alla aasta / 1–3 aastat / üle 3 aasta / mitte kunagi
9. **Kui kaua kulus küsimuse 6 vastuse leidmiseks?** alla minuti / 1–5 min / üle 5 min / ei leidnud
10. **Kas registreeruksid Tuleva ühishankesse, kui see ei kohusta vahetama?** jah / ei / ei tea *(uus, 10.10)*

Küsimus 9 mõõdab liikme ajakulu: kui paljud ei leia isegi oma kasutust üles, on see tõend, et ülevaatus iseenesest ei juhtu.

**Mida vastustest näidata:** mitu maksab üle ja keskmiselt kui palju kuus; osalejate kogu ülemakse aastas; mitu pole paketti üle 3 aasta üle vaadanud; mitu registreeruks hankesse.

## Tooteankeedi operaatoripäring

**Arendusnõue 10.10:** tooteankeeti numbri sisestamisel kontrollib rakendus sideettevõtjat välise päringuga. [Twilio kohalik katse](../prototuup/twilio-katse/README.md) on teostatud; põhirakendusse ühendamine on veel tegemata. Inimene kinnitab tulemuse ja teenusebrändi. Käsitsi valik peab alati töötama. Voog, allikad ja vastuvõtukriteeriumid on failis [18](18-operaatori-paring.md).

See täiendus ei lisa telefoninumbrit ülalolevasse anonüümsesse häkatoniküsitlusse. Võrguta demo kasutab käsitsi valikut või märgistatud näidisvastust ega väida, et päris TTJA päring toimus.
