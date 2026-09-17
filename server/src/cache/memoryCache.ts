type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

/**
 * Enkel in-memory TTL-cache. Ingen persistens — nullstilles ved restart.
 * Brukes med ulik TTL for tekniske data (lang) vs. registreringsstatus/EU-kontroll (kort),
 * siden sistnevnte endres oftere.
 */
export class MemoryCache<T> {
  private store = new Map<string, CacheEntry<T>>();

  constructor(private readonly ttlMs: number) {}

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T): void {
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }
}
