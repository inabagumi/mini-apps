import nextMDX from "@next/mdx";
import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
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
    remotePatterns: [
      {
        hostname: "images.ctfassets.net",
        pathname: `/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/**`,
      },
    ],
  },
  pageExtensions: ["tsx", "mdx", "ts"],
  reactStrictMode: true,
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
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
      },
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
};

export default withMDX(nextConfig);
