import { createCn } from "cn/config";

/**
 * Merges class names like `cn` from the `cn` package, and also knows the
 * theme variables and utilities defined in `app/globals.css` so that they
 * conflict with the right classes.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "bg-image": [{ bg: ["page-pattern", "bar-stripes"] }],
      break: [{ break: ["auto-phrase"] }],
    },
    theme: {
      animate: ["fade-in", "bar-in", "loading-dots"],
      breakpoint: ["xs"],
      container: ["page", "narrow"],
      leading: ["heading", "compact", "lead", "body"],
      radius: ["subtle", "balloon", "window"],
      shadow: ["raised", "pressed"],
      text: [
        "13",
        "15",
        "17",
        "22",
        "28",
        "fluid-hero",
        "fluid-title",
        "fluid-result",
      ],
      tracking: ["heading", "badge", "logo"],
    },
  },
});
