import type { Metadata, Viewport } from "next";

import { appleTouchIcon, card, favicon256x256 } from "#/assets";

import "./globals.css";

const canonical = "https://774.ink/";

export const metadata: Metadata = {
  title: "774 ink.",
  description: "もしかして: 774 inc.",
  icons: {
    icon: favicon256x256.src,
    apple: appleTouchIcon.src,
  },
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    images: [
      {
        url: new URL(card.src, canonical).toString(),
        width: card.width,
        height: card.height,
        alt: "Did you mean: 774 inc.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#544643",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="bg-[#544643] font-[sans-serif] leading-none text-white"
      lang="ja"
    >
      <body>{children}</body>
    </html>
  );
}
