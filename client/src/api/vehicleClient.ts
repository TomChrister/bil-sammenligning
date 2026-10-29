import type { VehicleLookupRequest, VehicleLookupResponse } from "../../../shared/vehicle";

// Alltid relativt: i produksjon sender Vercel /api/* til server-tjenesten,
// og lokalt sender Vite-proxyen (vite.config.ts) det videre til port 3001.
export async function slaOppKjoretoy(kjennemerke: string): Promise<VehicleLookupResponse> {
  const body: VehicleLookupRequest = { kjennemerke };

  // Nettverksfeil eller et svar som ikke er JSON (f.eks. en HTML-feilside fra
  // Vercel ved timeout) skal bli en feilmelding, ikke et kall som aldri returnerer.
  try {
    const res = await fetch("/api/vehicle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return (await res.json()) as VehicleLookupResponse;
  } catch {
    return { ok: false, error: "Fikk ikke kontakt med tjenesten. Prøv igjen om litt." };
  }
}
