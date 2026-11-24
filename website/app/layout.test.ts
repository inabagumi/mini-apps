import { describe, expect, it } from "vitest";

import { metadata } from "./layout";

describe("layout", () => {
  it("builds the metadata of the website", () => {
    expect(metadata.metadataBase).toStrictEqual(new URL("https://haneru.dev"));
    expect(metadata.title).toStrictEqual({
      default: "ねるねるアプリの世界へようこそ | Haneru Developers",
      template: "%s | Haneru Developers",
    });
    expect(metadata.description).toContain("Haneru Developers");
  });
});
