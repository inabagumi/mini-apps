import { afterEach, describe, expect, it, vi } from "vitest";

describe("manifest", () => {
  afterEach(() => {
    vi.doUnmock("#/assets");
    vi.resetModules();
  });

  it("returns icons with sizes built from the image dimensions", async () => {
    const { default: manifest } = await import("./manifest");

    expect(manifest().icons).toStrictEqual([
      {
        sizes: "192x192",
        src: "/favicon-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/favicon-512x512.png",
        type: "image/png",
      },
    ]);
  });

  it("builds sizes in the order of width and height", async () => {
    vi.doMock(import("#/assets"), () => ({
      favicon192x192: { height: 96, src: "/a.png", width: 192 },
      favicon512x512: { height: 256, src: "/b.png", width: 512 },
    }));

    const { default: manifest } = await import("./manifest");

    expect(manifest().icons).toStrictEqual([
      { sizes: "192x96", src: "/a.png", type: "image/png" },
      { sizes: "512x256", src: "/b.png", type: "image/png" },
    ]);
  });
});
