import { defineNextConfig } from "@inabagumi/config/next";
import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  options: {
    rehypePlugins: [
      [
        "rehype-external-links",
        {
          rel: ["noopener", "noreferrer"],
          target: "_blank",
        },
      ],
    ],
    remarkPlugins: ["remark-gfm"],
  },
});

// The mock server (`mocks/contentful`) serves the images of the assets
// from the same host as the API.
const contentfulMockURL = process.env.CONTENTFUL_HOST
  ? new URL(
      `${process.env.CONTENTFUL_INSECURE === "true" ? "http" : "https"}://${process.env.CONTENTFUL_HOST}`
    )
  : undefined;

const nextConfig = defineNextConfig({
  cacheComponents: true,
  partialPrefetching: true,
  headers() {
    return [
      {
        headers: [
          {
            key: "referrer-policy",
            value: "same-origin, strict-origin-when-cross-origin",
          },
        ],
        source: "/(.*)",
      },
    ];
  },
  images: {
    // The mock server usually runs on localhost.
    dangerouslyAllowLocalIP: Boolean(contentfulMockURL),
    qualities: [70, 75, 80],
    remotePatterns: [
      {
        hostname: "images.ctfassets.net",
        pathname: `/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/**`,
      },
      ...(contentfulMockURL
        ? [
            {
              hostname: contentfulMockURL.hostname,
              pathname: `/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/**`,
              port: contentfulMockURL.port,
              protocol: contentfulMockURL.protocol.slice(0, -1) as
                | "http"
                | "https",
            },
          ]
        : []),
    ],
  },
  pageExtensions: ["tsx", "mdx", "ts"],
  redirects() {
    return [
      {
        destination: "/lottery",
        permanent: true,
        source: "/kuji",
      },
      {
        destination: "/about",
        permanent: true,
        source: "/disclaimer",
      },
    ];
  },
  turbopack: {
    rules: {
      "*.svg": {
        as: "*.js",
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              babel: false,
              dimensions: false,
            },
          },
        ],
      },
    },
  },
});

export default withMDX(nextConfig);
