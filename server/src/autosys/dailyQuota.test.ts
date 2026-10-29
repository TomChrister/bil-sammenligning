import { afterEach, describe, expect, it, vi } from "vitest";
import { DAILY_LIMIT, KvoteBruktOpp, KvoteUtilgjengelig, taKvote } from "./dailyQuota";

function mockRedisSvar(svar: unknown, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(svar), { status }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("taKvote", () => {
  it("slipper gjennom kall under grensen og teller med INCR + EXPIRE i Redis", async () => {
    vi.stubEnv("KV_REST_API_URL", "https://redis.example");
    vi.stubEnv("KV_REST_API_TOKEN", "hemmelig");
    const fetchMock = mockRedisSvar([{ result: 1 }, { result: 1 }]);

    await expect(taKvote()).resolves.toBeUndefined();

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://redis.example/multi-exec");
    expect(init.headers).toEqual({ Authorization: "Bearer hemmelig" });
    const kommandoer = JSON.parse(init.body);
    expect(kommandoer[0][0]).toBe("INCR");
    expect(kommandoer[0][1]).toMatch(/^autosys:\d{4}-\d{2}-\d{2}$/);
    expect(kommandoer[1][0]).toBe("EXPIRE");
  });

  it("stopper når døgngrensen er passert", async () => {
    vi.stubEnv("KV_REST_API_URL", "https://redis.example");
    vi.stubEnv("KV_REST_API_TOKEN", "hemmelig");
    mockRedisSvar([{ result: DAILY_LIMIT + 1 }, { result: 1 }]);

    await expect(taKvote()).rejects.toBeInstanceOf(KvoteBruktOpp);
  });

  it("nekter når Redis svarer med feil, i stedet for å slippe kallet gjennom", async () => {
    vi.stubEnv("KV_REST_API_URL", "https://redis.example");
    vi.stubEnv("KV_REST_API_TOKEN", "hemmelig");
    mockRedisSvar({ error: "nede" }, 500);

    await expect(taKvote()).rejects.toBeInstanceOf(KvoteUtilgjengelig);
  });

  it("nekter når Redis ikke kan nås", async () => {
    vi.stubEnv("KV_REST_API_URL", "https://redis.example");
    vi.stubEnv("KV_REST_API_TOKEN", "hemmelig");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));

    await expect(taKvote()).rejects.toBeInstanceOf(KvoteUtilgjengelig);
  });

  it("nekter på Vercel når Redis-variablene mangler", async () => {
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    vi.stubEnv("VERCEL", "1");

    await expect(taKvote()).rejects.toBeInstanceOf(KvoteUtilgjengelig);
  });

  it("teller i minnet lokalt uten Redis", async () => {
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    vi.stubEnv("VERCEL", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(taKvote()).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
