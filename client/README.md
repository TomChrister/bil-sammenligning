# Client

React + TypeScript + Tailwind (Vite). Snakker med backend i `../server` —
se rot-READMEen for hvordan man starter begge.

```bash
npm install
npm run dev
```

I dev sender Vite-proxyen (`vite.config.ts`) alle kall til `/api` videre til
serveren på `http://localhost:3001`.

Anbefalingsmotoren kjører client-side (importert fra `../shared/recommendation`)
— ingen ekstra nettverkskall trengs etter at kjøretøydata er hentet.
