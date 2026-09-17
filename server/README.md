# Server

Express-backend som kaller Statens vegvesen sitt Autosys enkeltoppslag-API,
normaliserer responsen til et flatt `Vehicle`-objekt, og serverer det til
klienten. Ingen database — alt er in memory.

## Oppsett

```bash
cp .env.example .env   # fyll inn AUTOSYS_API_KEY fra bestillingsbekreftelsen din
npm install
npm run generate:types  # genererer src/autosys/types.generated.ts fra Autosys' OpenAPI-spec
npm run dev
```

## Endepunkter

- `GET /health` — enkel healthcheck
- `POST /api/vehicle` — body `{ "kjennemerke": "EB11111" }`, returnerer normalisert `Vehicle`

Kjennemerke sendes bevisst som POST-body og ikke som query-parameter, siden det
regnes som en personopplysning (GDPR) og ikke skal havne i URL-en, serverlogger,
Referer-header eller analytics.

## Autosys-integrasjon

- Host og auth-header er bekreftet mot brukerens bestillingsbekreftelse:
  `GET {AUTOSYS_HOST}/enkeltoppslag/kjoretoydata?kjennemerke=...` med header
  `SVV-Authorization: Apikey <nøkkel>`.
- `src/autosys/client.ts` gjør selve HTTP-kallet.
- `src/autosys/normalize.ts` flater ut den dypt nøstede responsen til et
  `Vehicle`-objekt (`shared/vehicle.ts`) — frontend ser aldri råstrukturen.
- `src/autosys/types.generated.ts` er auto-generert fra `{AUTOSYS_HOST}/v3/api-docs`
  via `npm run generate:types`. Ikke rediger manuelt.
- Ett Autosys-kall gir både tekniske data og registreringsstatus/EU-kontroll
  samtidig, så `src/cache/vehicleCache.ts` bruker én cache med moderat TTL
  (15 min) i stedet for separate lang/kort TTL — se kommentar i filen for
  resonnementet.
- `src/middleware/rateLimit.ts` begrenser antall oppslag per klient per
  minutt, som et vern mot å brenne av døgnkvoten på 50 000 kall.
- Kjennemerke logges aldri i klartekst — se `src/utils/maskPlate.ts`.

## Anbefalingsmotor

Ligger i `../shared/recommendation/` (rules.ts + engine.ts), ikke i `server/`,
fordi den er ren TypeScript-logikk uten avhengighet til Node/Express og derfor
kan kjøre direkte i klienten. Enhetstester: `../shared/recommendation/engine.test.ts`.

```bash
npm test
```
