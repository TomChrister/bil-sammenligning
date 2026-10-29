import express from "express";
import helmet from "helmet";
import { vehicleRouter } from "./routes/vehicle";
import { vehicleLookupRateLimit } from "./middleware/rateLimit";

export function createApp() {
  const app = express();

  // Antall reverse proxy-hopp foran appen (Vercel/Render/Fly/Nginx o.l. er
  // typisk ett hopp). Uten dette ser express-rate-limit enten proxyens IP for
  // alle klienter (én delt kvote for absolutt alle) eller stoler blindt på en
  // klient-satt X-Forwarded-For hvis appen faktisk ikke står bak noen proxy.
  // Sett TRUST_PROXY=0 i miljøer uten proxy foran appen.
  app.set("trust proxy", Number(process.env.TRUST_PROXY ?? 1));

  // Klienten kaller alltid /api på samme origin: via Vercel-rewriten i
  // produksjon og via Vite-proxyen lokalt. Derfor trengs verken CORS eller
  // unntak fra Helmets standard Cross-Origin-Resource-Policy.
  app.use(helmet());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api", vehicleLookupRateLimit, vehicleRouter);

  return app;
}
