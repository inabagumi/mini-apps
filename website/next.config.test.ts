import { describe, expect, it } from "vitest";

import { sections } from "#/lib/constants";

import nextConfig from "./next.config";

describe("next.config", () => {
  it("redirects only to the top page or its sections", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const destinations = new Set(
      redirects.map((redirect) => redirect.destination)
    );

    expect(redirects).not.toHaveLength(0);
    expect([...destinations].toSorted()).toStrictEqual(
      ["/", ...sections.map((section) => `/#${section.id}`)].toSorted()
    );
  });
});
