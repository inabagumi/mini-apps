import { describe, expect, it } from "vitest";

import { metadata, viewport } from "./layout";

describe("layout", () => {
  it("sets the theme color in the viewport", () => {
    expect(viewport.themeColor).toBe("#544643");
  });

  it("does not set the theme color in the other metadata", () => {
    expect(metadata.other).toBeUndefined();
  });

  it("builds the metadata from NEXT_PUBLIC_BASE_URL", () => {
    expect(metadata.metadataBase).toStrictEqual(new URL("https://774.test"));
    expect(metadata.title).toBe("774 ink.");
    expect(metadata.description).toBe("もしかして: 774 inc.");
  });
});
