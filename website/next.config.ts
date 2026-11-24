import { defineNextConfig } from "@inabagumi/config/next";

/**
 * The sections of the products (`id` in `lib/products.ts`) by the names that
 * the previous URLs used.
 */
const productSections = {
  "animare-search": "shinju-date",
  "animare-shindan": "animare-shindan",
  hanerubeat: "hanerubeat",
  heartbeat: "hanerubeat",
  "inaba-jinja": "inaba-jinja",
  "neru-camera": "neru-camera",
  "shinju-date": "shinju-date",
};

export default defineNextConfig({
  // Keep the URLs of the pages that the website used to have working. The
  // fragments are the IDs of the sections of the top page.
  redirects() {
    return Promise.resolve([
      {
        destination: "/#about",
        permanent: true,
        source: "/about",
      },
      {
        destination: "/#about",
        permanent: true,
        source: "/docs",
      },
      {
        destination: "/#contact",
        permanent: true,
        source: "/contact",
      },
      ...Object.entries(productSections).flatMap(([name, id]) => [
        {
          destination: `/#${id}`,
          permanent: true,
          source: `/docs/${name}`,
        },
        {
          destination: `/#${id}`,
          permanent: true,
          source: `/products/${name}.html`,
        },
      ]),
      // The products that are no longer listed.
      {
        destination: "/",
        permanent: true,
        source:
          "/:section(products|docs)/:name(21g|npm-packages|eslint-config|prettier-config|renovate-config):extension(\\.html)?",
      },
      {
        destination: "/#products",
        permanent: true,
        source: "/docs/:name",
      },
      {
        destination: "/#products",
        permanent: true,
        source: "/products/:name.html",
      },
    ]);
  },
});
