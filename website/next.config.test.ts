import { describe, expect, it } from "vitest";

import { sections } from "#/lib/constants";
import products from "#/lib/products";

import nextConfig from "./next.config";

const getRedirects = async () => (await nextConfig.redirects?.()) ?? [];

describe("next.config", () => {
  it("redirects only to the top page or its sections", async () => {
    const redirects = await getRedirects();
    const fragments = [...sections, ...products].map(({ id }) => `/#${id}`);

    expect(redirects).not.toHaveLength(0);

    for (const redirect of redirects) {
      expect(["/", ...fragments]).toContain(redirect.destination);
    }
  });

  it.each(products)(
    "redirects the previous URLs of $title to its section",
    async ({ id }) => {
      const redirects = await getRedirects();
      const destinations = Object.fromEntries(
        redirects.map((redirect) => [redirect.source, redirect.destination])
      );

      expect(destinations[`/docs/${id}`]).toBe(`/#${id}`);
      expect(destinations[`/products/${id}.html`]).toBe(`/#${id}`);
    }
  );

  it("redirects the renamed products to their current sections", async () => {
    const redirects = await getRedirects();
    const destinations = Object.fromEntries(
      redirects.map((redirect) => [redirect.source, redirect.destination])
    );

    expect(destinations["/docs/heartbeat"]).toBe("/#hanerubeat");
    expect(destinations["/docs/animare-search"]).toBe("/#shinju-date");
  });

  it("puts the redirects of the products before the fallbacks", async () => {
    const redirects = await getRedirects();
    const sources = redirects.map((redirect) => redirect.source);

    expect(sources.indexOf("/docs/neru-camera")).toBeLessThan(
      sources.indexOf("/docs/:name")
    );
    expect(sources.indexOf("/products/neru-camera.html")).toBeLessThan(
      sources.indexOf("/products/:name.html")
    );
  });
});
