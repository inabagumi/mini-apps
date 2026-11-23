import { createCn } from "cn/config";

/**
 * Merges class names like `cn` from the `cn` package, and also knows the
 * theme variables defined in `app/globals.css` so that they conflict with the
 * right classes.
 */
export const cn = createCn({
  extend: {
    theme: {
      animate: ["dash"],
    },
  },
});
