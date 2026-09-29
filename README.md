# Bilmatch

Bilmatch hjelper deg å finne ut hvordan du bør selge bilen din.

1. Skriv inn et norsk registreringsnummer.
2. Se tekniske data om bilen, hentet fra Statens vegvesen (Autosys).
3. Oppgi kilometerstand, tilstand og noen få spørsmål om situasjonen din, for
   eksempel hvor raskt du må selge og hvor mye innsats du vil legge i salget.
4. Få en veiledende rangering av salgskanaler: privatsalg, forhandlerauksjon,
   fastpris-oppkjøp, kommisjon, innbytte og auksjonshus. Under hver kanal
   foreslås faktiske aktører, som Nettbil, FINN og Rebil.

Rangeringen er en indeks, ikke et prisanslag. Tjenesten gir ingen prisestimat,
og er et hobbyprosjekt, ikke en offisiell eller Vegvesen-godkjent tjeneste.

## Tech stack

| Del | Teknologi |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4 |
| Backend | Node.js, Express 4, TypeScript |
| Sikkerhet | Helmet, CORS, express-rate-limit |
| Datakilde | Statens vegvesen Autosys enkeltoppslag-API, med typer generert fra OpenAPI via openapi-typescript |
| Tester | Vitest |
| Hosting | Vercel (Vercel Services), Vercel Analytics |

Det finnes ingen database. Kjøretøyoppslag caches i minnet på serveren i 15 minutter.

## Hvordan prosjektet er satt opp

Prosjektet består av tre deler:

- **`client`** er en ren frontend (SPA) bygget med Vite. Den henter
  kjøretøydata fra serveren og beregner selve anbefalingen i nettleseren.
- **`server`** er et lite Express-API. Det har ett formål: å slå opp bilen i
  Autosys med API-nøkkelen, som aldri skal ut til nettleseren, og gi klienten
  et flatt, normalisert `Vehicle`-objekt.
- **`shared`** inneholder typer og anbefalingsmotoren. Begge delene importerer
  herfra. Motoren er ren TypeScript uten avhengighet til Node eller Express,
  så den kjører direkte i klienten uten ekstra nettverkskall.

Flyten ser slik ut:

```
Nettleser (client)
  │  POST /api/vehicle { kjennemerke }
  ▼
Express (server) ──► Autosys API (Statens vegvesen)
  │  normalisert Vehicle
  ▼
Nettleser: brukeren svarer på spørsmål → shared/recommendation → rangering
```

### Deploy på Vercel

Hele appen deployes som ett Vercel-prosjekt med
[Vercel Services](https://vercel.com/docs/services), konfigurert i
`vercel.json` i roten:

- `/api/*` går til `server`-tjenesten (Express).
- Alt annet går til `client`-tjenesten (Vite). Undersider faller tilbake til
  `index.html`, så direkte lenker fungerer.

Client og server ligger på samme domene, så klienten kaller `/api` relativt,
og CORS er ikke nødvendig i produksjon. Hver deploy bygger og publiserer
begge tjenestene samtidig.

Miljøvariabler som må settes i Vercel-prosjektet:

- `AUTOSYS_HOST`
- `AUTOSYS_API_KEY`

Ikke sett `VITE_API_BASE_URL` i Vercel. Den er bare for lokal utvikling.

## Prosjektstruktur

```
bil-sammenligning/
├── vercel.json                 Vercel Services: tjenester og ruting
├── client/                     Frontend (React + Vite)
│   ├── public/                 Favicons og webmanifest
│   └── src/
│       ├── api/                Kall mot backend (vehicleClient.ts)
│       ├── components/         Skjermer og visninger (skjema, resultat, anbefaling)
│       ├── design-system/      Egne UI-komponenter, tokens og Tailwind-tema
│       ├── lib/                Hjelpefunksjoner for presentasjon av kanaler
│       ├── styles/             Globale stiler
│       ├── App.tsx             Hovedflyt mellom stegene
│       └── main.tsx            Inngangspunkt, inkl. Vercel Analytics
├── server/                     Backend (Express)
│   ├── scripts/                generate-types.mjs: genererer Autosys-typer
│   └── src/
│       ├── autosys/            HTTP-klient, normalisering og genererte typer
│       ├── cache/              In-memory TTL-cache for kjøretøyoppslag
│       ├── middleware/         Rate limiting
│       ├── routes/             /api/vehicle
│       ├── utils/              Validering og maskering av kjennemerke
│       ├── app.ts              Express-app (middleware og ruter)
│       └── index.ts            Starter serveren
└── shared/                     Delt mellom client og server
    ├── vehicle.ts              Vehicle-typen og API-kontrakten
    └── recommendation/         Anbefalingsmotor: regler, aktører, poeng og tester
```

## Komme i gang lokalt

```bash
# Server
cd server
cp .env.example .env    # fyll inn AUTOSYS_API_KEY
npm install
npm run generate:types  # henter OpenAPI-spec og genererer typer fra Autosys
npm run dev             # http://localhost:3001

# Client (i et eget terminalvindu)
cd client
cp .env.example .env
npm install
npm run dev             # http://localhost:5173
```

Tester for anbefalingsmotoren kjøres fra `server`:

```bash
cd server
npm test
```

## Datakilde og personvern

- Tekniske kjøretøydata hentes fra Autosys enkeltoppslag-API hos Statens
  vegvesen. Dataene er lisensiert under CC BY 4.0, og Statens vegvesen er
  oppgitt som kilde i appen.
- Kilometerstand, servicehistorikk, skadehistorikk, heftelser, utstyrsnivå,
  antall eiere og markedspris finnes ikke i datasettet, så brukeren oppgir dem.
- Ingen eierdata hentes eller lagres.
- Kjennemerket sendes som POST-body til vår egen backend, aldri i URL eller
  query. Det logges aldri i klartekst på serveren, se
  `server/src/utils/maskPlate.ts`.
- API-nøkkelen ligger bare på serveren, aldri i frontend-bundlen.

Se `server/README.md` for mer om Autosys-integrasjonen og
`shared/recommendation/README.md` for hvordan poengsystemet fungerer.
