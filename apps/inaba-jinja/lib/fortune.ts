import type { Asset } from "contentful";

import type { FortuneEntry } from "./contentful";

export const generateFortuneName = (fortune: FortuneEntry): string =>
  `第${fortune.fields.number}番『${fortune.fields.blessing}』`;

export const getImageURL = (
  asset: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
): string => {
  if (!asset.fields.file?.url) {
    throw new TypeError("The asset file URL is required.");
  }

  const url = new URL(asset.fields.file.url, "https://images.ctfassets.net");

  return url.toString();
};
