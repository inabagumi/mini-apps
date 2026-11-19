import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import sitemap from "./sitemap";

const mocks = vi.hoisted(() => ({
  getFortuneIDs: vi.fn<() => Promise<string[]>>(),
}));

vi.mock(import("@/lib/contentful"), () => ({
  getFortuneIDs: mocks.getFortuneIDs,
}));

describe(sitemap, () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://inaba-jinja.test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds the URLs from NEXT_PUBLIC_BASE_URL", async () => {
    mocks.getFortuneIDs.mockResolvedValueOnce(["fortune-1", "fortune-2"]);

    const items = await sitemap();

    expect(items.map(({ url }) => url)).toStrictEqual([
      "https://inaba-jinja.test/",
      "https://inaba-jinja.test/about",
      "https://inaba-jinja.test/privacy",
      "https://inaba-jinja.test/kuji/fortune-1",
      "https://inaba-jinja.test/kuji/fortune-2",
    ]);
  });
});
