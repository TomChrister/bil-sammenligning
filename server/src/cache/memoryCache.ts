type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

/**
 * Enkel in-memory TTL-cache. Ingen persistens — nullstilles ved restart.
 */
export class MemoryCache<T> {
  private store = new Map<string, CacheEntry<T>>();

  constructor(
    private readonly ttlMs: number,
    private readonly sweepAbove = 1000,
  ) {}

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
    const now = Date.now();
    // Utløpte oppføringer slettes ellers bare når samme nøkkel leses igjen,
    // så uten denne ryddingen vokser Map-en med hvert nye kjennemerke.
    if (this.store.size >= this.sweepAbove) {
      for (const [k, entry] of this.store) {
        if (now > entry.expiresAt) this.store.delete(k);
      }
    }
    this.store.set(key, { value, expiresAt: now + this.ttlMs });
  }
}
