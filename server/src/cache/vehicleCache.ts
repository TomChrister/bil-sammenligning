import { MemoryCache } from "./memoryCache";
import type { Vehicle } from "../../../shared/vehicle";

/**
 * Ett Autosys-kall returnerer både tekniske data (endres nesten aldri) og
 * registreringsstatus/EU-kontrollfrist (kan endre seg). Siden begge deler
 * kommer fra samme kall, gir det ikke mening å ha separat lang TTL for det
 * tekniske — det ville enten sløse kvote (kalle på nytt bare for status) eller
 * servere utdatert status. Vi bruker derfor én TTL, satt kort nok til at
 * registreringsstatus/kontrollfrist ikke blir stale i praksis.
 */
const VEHICLE_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutter

export const vehicleCache = new MemoryCache<Vehicle>(VEHICLE_CACHE_TTL_MS);
