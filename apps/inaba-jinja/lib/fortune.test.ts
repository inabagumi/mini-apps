import type { Asset } from "contentful";
import { describe, expect, it } from "vitest";

import type { FortuneEntry } from "./contentful";
import { generateFortuneName, getImageURL } from "./fortune";

const createFortune = (fields: Partial<FortuneEntry["fields"]>) =>
  ({ fields }) as FortuneEntry;

const createAsset = (url?: string) =>
  ({
    fields: {
      file: url ? { url } : undefined,
    },
  }) as Asset<"WITHOUT_UNRESOLVABLE_LINKS">;

describe(generateFortuneName, () => {
  it("formats the number and blessing of the fortune", () => {
    const fortune = createFortune({ blessing: "大吉", number: 1 });

    expect(generateFortuneName(fortune)).toBe("第1番『大吉』");
  });
});

describe(getImageURL, () => {
  it("resolves a protocol-relative URL with https", () => {
    const asset = createAsset(
      "//images.ctfassets.net/space/asset/hash/image.jpg"
    );

    expect(getImageURL(asset)).toBe(
      "https://images.ctfassets.net/space/asset/hash/image.jpg"
    );
  });

  it("throws a TypeError when the file URL is missing", () => {
    const asset = createAsset();

    expect(() => getImageURL(asset)).toThrow(TypeError);
  });
});
