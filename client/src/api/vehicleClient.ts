import type { VehicleLookupRequest, VehicleLookupResponse } from "../../../shared/vehicle";

// I dev kjører server og klient på hver sin port, så kallet må gå til den
// separate serverporten. I produksjon (Vercel services) ligger client og
// server bak samme domene via /api/*-rewriten, så kallet skal være relativt.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? "http://localhost:3001" : "");

export async function slaOppKjoretoy(kjennemerke: string): Promise<VehicleLookupResponse> {
  const body: VehicleLookupRequest = { kjennemerke };

  const res = await fetch(`${API_BASE_URL}/api/vehicle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return (await res.json()) as VehicleLookupResponse;
}
