import type { MetadataRoute } from "next";

import { themeColor, title } from "#/lib/constants";

import favicon192x192 from "./manifest-icon-192x192.png";
import favicon512x512 from "./manifest-icon-512x512.png";

const ICONS = [favicon192x192, favicon512x512];

export default function manifest(): MetadataRoute.Manifest {
  const icons = ICONS.map((icon) => ({
    sizes: `${icon.width}x${icon.height}`,
    src: icon.src,
    type: "image/png",
  }));

  return {
    background_color: "#fff",
    display: "standalone",
    icons,
    name: title,
    scope: "/",
    short_name: title,
    start_url: "/",
    theme_color: themeColor,
  };
}
