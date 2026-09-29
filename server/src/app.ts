import express from "express";
import cors from "cors";
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

  // Klienten kjører på et annet origin (port) enn serveren og henter JSON via
  // CORS, som allerede styrer hvem som får lov. Helmets standard
  // Cross-Origin-Resource-Policy ("same-origin") blokkerer akkurat den
  // lovlige cross-origin-hentingen i nettlesere som håndhever CORP, så den
  // løsnes eksplisitt her i stedet for å bli overrasket av et brutt kall.
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
    }),
  );
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api", vehicleLookupRateLimit, vehicleRouter);

  return app;
}
