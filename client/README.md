# Client

React + TypeScript + Tailwind (Vite). Snakker med backend i `../server` —
se rot-READMEen for hvordan man starter begge.

```bash
cp .env.example .env   # justér VITE_API_BASE_URL om backend kjører på annen port
npm install
npm run dev
```

Anbefalingsmotoren kjører client-side (importert fra `../shared/recommendation`)
— ingen ekstra nettverkskall trengs etter at kjøretøydata er hentet.
