import { describe, expect, it } from "vitest";

import { metadata, viewport } from "./layout";

describe("layout", () => {
  it("sets the theme color in the viewport", () => {
    expect(viewport.themeColor).toBe("#544643");
  });

  it("does not set the theme color in the other metadata", () => {
    expect(metadata.other).toBeUndefined();
  });
});
