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

/** @type {import('next').NextConfig} */
const nextConfig = {
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
