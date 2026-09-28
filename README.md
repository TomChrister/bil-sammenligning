# Bilmatch

Hobbyprosjekt: slå opp et norsk registreringsnummer, se tekniske data fra Statens
vegvesen (Autosys), oppgi kilometerstand, tilstand og noen få spørsmål om
situasjonen din, og få en veiledende rangering av salgskanaler (privatsalg,
forhandlerauksjon, fastpris-oppkjøp, kommisjon, innbytte og auksjonshus), med
faktiske aktører — som Nettbil, FINN og Rebil — foreslått under riktig kanal.

Ikke en offisiell eller Vegvesen-godkjent tjeneste. Ingen prisestimat gis.

## Struktur

```
client/   React + TypeScript + Tailwind (Vite)
server/   Node.js + Express, kaller Autosys enkeltoppslag
shared/   Typer og anbefalingsmotor delt mellom client og server
```

Anbefalingsmotoren (`shared/recommendation/`) er ren TypeScript uten
avhengighet til Node eller Express, og kjører derfor direkte i klienten —
ingen ekstra nettverkskall trengs for å beregne anbefalingen når
kjøretøydata og brukerinput allerede foreligger.

## Komme i gang

```bash
# Server
cd server
cp .env.example .env   # fyll inn AUTOSYS_API_KEY
npm install
npm run generate:types # henter OpenAPI-spec og genererer typer fra Autosys
npm run dev             # http://localhost:3001

# Client (i et eget terminalvindu)
cd client
npm install
npm run dev              # http://localhost:5173
```

## Datakilde og personvern

- Tekniske kjøretøydata hentes fra Statens vegvesen sitt Autosys
  enkeltoppslag-API. Data er lisensiert under CC BY 4.0 — kreditert i UI.
- Kilometerstand, servicehistorikk, skadehistorikk, heftelser, utstyrsnivå,
  antall eiere og markedspris finnes ikke i datasettet og oppgis av brukeren.
- Ingen eierdata hentes eller lagres.
- Kjennemerke sendes som POST-body til vår egen backend (aldri i URL/query),
  og logges aldri i klartekst på serveren — se `server/src/utils/maskPlate.ts`.
- API-nøkkelen ligger kun i `server/.env`, aldri i frontend-bundlen.

Se `server/README.md` for mer om Autosys-integrasjonen.
