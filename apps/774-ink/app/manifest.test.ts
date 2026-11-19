import { afterEach, describe, expect, it, vi } from "vitest";

describe("manifest", () => {
  afterEach(() => {
    vi.doUnmock("./manifest-icon-192x192.png");
    vi.doUnmock("./manifest-icon-512x512.png");
    vi.resetModules();
  });

  it("returns icons with sizes built from the image dimensions", async () => {
    const { default: manifest } = await import("./manifest");

    expect(manifest().icons).toStrictEqual([
      {
        sizes: "192x192",
        src: "/manifest-icon-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/manifest-icon-512x512.png",
        type: "image/png",
      },
    ]);
  });

  it("builds sizes in the order of width and height", async () => {
    vi.doMock(import("./manifest-icon-192x192.png"), () => ({
      default: { height: 96, src: "/a.png", width: 192 },
    }));
    vi.doMock(import("./manifest-icon-512x512.png"), () => ({
      default: { height: 256, src: "/b.png", width: 512 },
    }));

    const { default: manifest } = await import("./manifest");

    expect(manifest().icons).toStrictEqual([
      { sizes: "192x96", src: "/a.png", type: "image/png" },
      { sizes: "512x256", src: "/b.png", type: "image/png" },
    ]);
  });

  it("uses the site information", async () => {
    const { default: manifest } = await import("./manifest");

    expect(manifest()).toMatchObject({
      name: "774 ink.",
      short_name: "774 ink.",
      theme_color: "#544643",
    });
  });
});
