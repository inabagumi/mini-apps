import type { MetadataRoute } from "next";

import { baseUrl } from "#/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${baseUrl}/` }];
}
