# Salgsvurdering: kartlegging og revidert poengsystem

## Markedet, sortert etter modell

Seks arketyper dekker det norske markedet. Enkeltaktørene er oppføringer under en arketype,
på samme måte som elskling skiller mellom avtaletyper først og leverandører etterpå.

| Arketype | Aktører | Hvem betaler | Tid til oppgjør |
|---|---|---|---|
| Forhandlerauksjon | Nettbil, Bilskifte, Bilnett | Forhandleren, gratis for selger | Dager |
| Fastpris-oppkjøp | Rebil, Mobile, Biloppkjøp.no, lokale oppkjøpere | Ingen separat kostnad, marginen ligger i tilbudet | 1 til 7 dager |
| Privatsalg | FINN motor | Annonsepakke | Uker |
| Kommisjon / bilmegler | Car4Sale, lokale forhandlere (Komplett Autosalg, Dinbruktbil) | Fast gebyr eller provisjon | 30 til 90 dager |
| Innbytte | Enhver forhandler ved nybilkjøp | Ingen direkte kostnad | Ved levering |
| Auksjonshus | Auksjonen.no | Varierer | Varierer |

Verifisert mot primærkilde: Nettbil (testsenter med NAF og Viking, over 2 000 forhandlere,
betales av kjøpende forhandler), Mobile (fastpris, tar ikke Tesla, MC, lastebil eller gamle
biler), Car4Sale (16 990 kr av salgssummen pluss klargjøring rundt 1 800 kr, ingen salg gir
ingen gebyr). Resten er merket `uverifisert: true` i `providers.ts` fordi tallene stammer fra
aktørenes egen markedsføring eller fra en konkurrents sammenligning.

## Hva som ble endret i poengsystemet

**Basispoeng.** Uten en utgangsposisjon var resultatet skjevt. Privatsalg ble nevnt i nesten
alle regler og beveget seg derfor mest, mens innbytte bare kunne løftes av én regel.
`BASISPOENG` sier hva som er fornuftig for en gjennomsnittlig bil, og reglene flytter derfra.

**Bug rettet i EU-kontroll.** `-1 * (dagerTil(...) ?? 0)` ga `dagerSiden = 0` når datoen
manglet eller ikke lot seg parse, som trigget «nylig bestått EU-kontroll» på biler der vi
ikke visste noe som helst. Nå returneres ingenting når datoen mangler. Utgått kontroll er
dessuten skilt fra kontroll som nærmer seg, siden konsekvensen er helt ulik.

**Veteranregelen var farlig.** Alder over 30 år ga automatisk pluss til privatsalg. En sliten
1996-modell er ikke en samlerbil. Bonusen krever nå at tilstanden er god eller meget god, og
motsatt utfall gir uttelling til fastpris-oppkjøp.

**Kilometerstand vurderes mot alder.** 150 000 km på to år og på femten år er to forskjellige
biler. Regelen bruker nå km per år, med en egen absoluttgrense på 250 000.

**Nye inputfelter som betyr mye.** `hastverk` og `onsketInnsats` er i praksis det som avgjør
kanalvalg for folk flest, og manglet helt. `heftelser` og `antattVerdi` er lagt til fordi pant
blokkerer privatsalg og fordi et fast meglergebyr er uforsvarlig på en rimelig bil.

**Nye regler:** kjørbarhet (ikke kjørbar bil diskvalifiserer flere kanaler), heftelser,
verdinivå, og utvidelse av elbilregelen slik at god rekkevidde også gir utslag.

**Tilstandsskalaen** er utvidet fra tre til fem trinn, med `god` og `ikke-kjorbar`.
Eksisterende data med tre trinn må migreres.

**Magiske tall er samlet** i `VEKT`, slik at justering skjer ett sted.

**Resultatet normaliseres** til en indeks fra 40 til 100. Bunnen er bevisst ikke null, fordi
også den dårligst rangerte kanalen er et mulig valg. Indeksen er en rangering, ikke et
prisanslag, og UI må si det.

## Løse tråder

1. `erElektrisk()` matcher på tekst. Bytt til `kodeVerdi` fra Autosys, og skill rene elbiler
   fra ladbar hybrid og hydrogen.
2. Geografi mangler. Flere oppkjøpere er regionale, og Nettbil krever at bilen kjøres til
   testsenter. Postnummer i input og dekningsområde per aktør er neste naturlige steg.
3. Varebil klasse 2 og mva-registrerte biler oppfører seg annerledes. Feltene finnes i
   Autosys under `kjoringensArt` og avgiftskode.
4. Legg inn `sistVerifisert` i UI, og en rutine for gjennomgang. Utdaterte gebyrer er den
   vanligste måten en sammenligningstjeneste mister troverdighet på.
5. Skriv snapshot-tester per arketype: en fem år gammel dieselbil med normal km, en femten år
   gammel bil i dårlig stand, en velholdt veteran, en eldre elbil med kort rekkevidde og en
   bil som ikke er kjørbar. Da ser du med én gang om en justering velter rangeringen et sted
   du ikke hadde tenkt på.
