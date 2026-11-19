import type { Redis } from "@upstash/redis";
import type { createClient } from "contentful";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

interface Collection {
  items: { sys: { id: string } }[];
  limit: number;
  skip: number;
  total: number;
}

interface Query {
  limit: number;
  skip?: number;
}

const mocks = vi.hoisted(() => {
  const getEntries = vi.fn<(query: Query) => Promise<Collection>>();
  const getEntry = vi.fn<(id: string) => Promise<{ sys: { id: string } }>>();

  return {
    cacheLife: vi.fn<(profile: unknown) => void>(),
    createClient: vi.fn<
      (params: { accessToken: string; space: string }) => {
        withoutUnresolvableLinks: {
          getEntries: typeof getEntries;
          getEntry: typeof getEntry;
        };
      }
    >(() => ({ withoutUnresolvableLinks: { getEntries, getEntry } })),
    eval: vi.fn<(script: string, keys: string[], args: string[]) => void>(),
    exec: vi.fn<() => Promise<[string | null]>>(),
    getEntries,
    getEntry,
    spop: vi.fn<(key: string) => Promise<string | null>>(),
  };
});

vi.mock(import("contentful"), () => ({
  createClient: mocks.createClient as unknown as typeof createClient,
}));

vi.mock(import("next/cache"), () => ({
  cacheLife: mocks.cacheLife,
}));

vi.mock(import("#/lib/redis"), () => ({
  redisClient: {
    multi: () => ({ eval: mocks.eval, exec: mocks.exec }),
    spop: mocks.spop,
  } as unknown as Redis,
}));

const loadModule = () => import("./contentful");

const createCollection = (
  ids: string[],
  total: number,
  limit = 100
): Collection => ({
  items: ids.map((id) => ({ sys: { id } })),
  limit,
  skip: 0,
  total,
});

const range = (start: number, end: number): string[] =>
  Array.from({ length: end - start }, (_, index) => `fortune-${start + index}`);

describe("lib/contentful", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN", "access-token");
    vi.stubEnv("NEXT_PUBLIC_CONTENTFUL_SPACE_ID", "space-id");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("getClient", () => {
    it("creates a client with the access token and space ID", async () => {
      const { getClient } = await loadModule();

      getClient();

      expect(mocks.createClient).toHaveBeenCalledWith({
        accessToken: "access-token",
        space: "space-id",
      });
    });

    it("reuses the client once it is created", async () => {
      const { getClient } = await loadModule();

      expect(getClient()).toBe(getClient());
      expect(mocks.createClient).toHaveBeenCalledOnce();
    });

    it("throws a TypeError when the access token is missing", async () => {
      vi.stubEnv("NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN", "");
      const { getClient } = await loadModule();

      expect(() => getClient()).toThrow(
        new TypeError("The access token is required.")
      );
    });

    it("throws a TypeError when the space ID is missing", async () => {
      vi.stubEnv("NEXT_PUBLIC_CONTENTFUL_SPACE_ID", "");
      const { getClient } = await loadModule();

      expect(() => getClient()).toThrow(
        new TypeError("The space ID is required.")
      );
    });
  });

  describe("getFortune", () => {
    it("returns the entry for the ID", async () => {
      mocks.getEntry.mockResolvedValueOnce({ sys: { id: "fortune-1" } });
      const { getFortune } = await loadModule();

      await expect(getFortune("fortune-1")).resolves.toStrictEqual({
        sys: { id: "fortune-1" },
      });
      expect(mocks.getEntry).toHaveBeenCalledWith("fortune-1");
    });

    it("revalidates the entry every 30 seconds", async () => {
      mocks.getEntry.mockResolvedValueOnce({ sys: { id: "fortune-1" } });
      const { getFortune } = await loadModule();

      await getFortune("fortune-1");

      expect(mocks.cacheLife).toHaveBeenCalledExactlyOnceWith({
        revalidate: 30,
      });
    });

    it("throws a TypeError when the ID is missing", async () => {
      const { getFortune } = await loadModule();

      await expect(getFortune()).rejects.toThrow(
        new TypeError("The fortune ID is required.")
      );
      expect(mocks.getEntry).not.toHaveBeenCalled();
    });
  });

  describe("getFortuneIDs", () => {
    it("caches the IDs with the max profile", async () => {
      mocks.getEntries.mockResolvedValueOnce(createCollection(["a"], 1));
      const { getFortuneIDs } = await loadModule();

      await getFortuneIDs();

      expect(mocks.cacheLife).toHaveBeenCalledExactlyOnceWith("max");
    });

    it("returns the IDs of a single page", async () => {
      mocks.getEntries.mockResolvedValueOnce(
        createCollection(["a", "b", "c"], 3)
      );
      const { getFortuneIDs } = await loadModule();

      await expect(getFortuneIDs()).resolves.toStrictEqual(["a", "b", "c"]);
      expect(mocks.getEntries).toHaveBeenCalledOnce();
    });

    it("returns the IDs of all pages when there are more than 100 entries", async () => {
      const total = 250;
      mocks.getEntries.mockImplementation(({ limit, skip = 0 }) =>
        Promise.resolve(
          createCollection(
            range(skip, Math.min(skip + limit, total)),
            total,
            limit
          )
        )
      );
      const { getFortuneIDs } = await loadModule();

      const ids = await getFortuneIDs();

      expect(ids).toStrictEqual(range(0, total));
      expect(new Set(ids).size).toBe(total);
      expect(mocks.getEntries).toHaveBeenCalledTimes(3);
      expect(mocks.getEntries).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 100 })
      );
      expect(mocks.getEntries).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 200 })
      );
    });
  });

  describe("getAnyFortuneID", () => {
    it("returns the ID popped from Redis", async () => {
      mocks.spop.mockResolvedValueOnce("fortune-1");
      const { getAnyFortuneID } = await loadModule();

      await expect(getAnyFortuneID()).resolves.toBe("fortune-1");
      expect(mocks.spop).toHaveBeenCalledWith("fortunes");
      expect(mocks.getEntries).not.toHaveBeenCalled();
      expect(mocks.exec).not.toHaveBeenCalled();
    });

    it("registers the IDs from Contentful and returns one when Redis is empty", async () => {
      mocks.spop.mockResolvedValueOnce(null);
      mocks.getEntries.mockResolvedValueOnce(
        createCollection(["a", "b", "c"], 3)
      );
      mocks.exec.mockResolvedValueOnce(["b"]);
      const { getAnyFortuneID } = await loadModule();

      await expect(getAnyFortuneID()).resolves.toBe("b");
      expect(mocks.eval).toHaveBeenCalledWith(
        expect.any(String),
        ["fortunes"],
        ["a", "b", "c"]
      );
      expect(mocks.exec).toHaveBeenCalledOnce();
    });

    it("throws a TypeError when no fortune exists", async () => {
      mocks.spop.mockResolvedValueOnce(null);
      mocks.getEntries.mockResolvedValueOnce(createCollection([], 0));
      mocks.exec.mockResolvedValueOnce([null]);
      const { getAnyFortuneID } = await loadModule();

      await expect(getAnyFortuneID()).rejects.toThrow(
        new TypeError("Fortune doesn't exist.")
      );
    });
  });
});
