import { defineNextConfig } from "@inabagumi/config/next";

export default defineNextConfig({
  // Keep the URLs of the pages that the website used to have working. The
  // fragments are the section IDs in `lib/constants.ts`.
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
