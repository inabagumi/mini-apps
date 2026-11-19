import { describe, expect, it } from "vitest";

import favicon512x512 from "./icon1.png";
import favicon192x192 from "./icon2.png";
import manifest from "./manifest";

describe(manifest, () => {
  it("lists the icons with their sizes", () => {
    expect(manifest().icons).toStrictEqual(
      [favicon192x192, favicon512x512].map((icon) => ({
        sizes: `${icon.width}x${icon.height}`,
        src: icon.src,
        type: "image/png",
      }))
    );
  });

  it("uses the site information", () => {
    expect(manifest()).toMatchObject({
      description:
        "因幡神社は東京都北区赤羽のどこかにある神社です。ななしいんくの因幡はねる様をご祭神としてお祀りしています。",
      name: "因幡神社",
      short_name: "因幡神社",
      shortcuts: [{ name: "おみくじを引く", url: "/lottery" }],
      theme_color: "#ff5722",
    });
  });
});
