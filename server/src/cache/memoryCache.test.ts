import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryCache } from "./memoryCache";

afterEach(() => {
  vi.useRealTimers();
});

describe("MemoryCache", () => {
  it("returnerer verdien før TTL og ingenting etterpå", () => {
    vi.useFakeTimers();
    const cache = new MemoryCache<string>(1000);
    cache.set("a", "x");
    expect(cache.get("a")).toBe("x");
    vi.advanceTimersByTime(1001);
    expect(cache.get("a")).toBeUndefined();
  });

  it("rydder utløpte oppføringer når cachen blir full", () => {
    vi.useFakeTimers();
    const cache = new MemoryCache<number>(1000, 3);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);
    vi.advanceTimersByTime(1001);
    cache.set("d", 4);
    expect((cache as unknown as { store: Map<string, unknown> }).store.size).toBe(1);
    expect(cache.get("d")).toBe(4);
  });
});
