import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SerwistProvider } from "./serwist";

import "styles/globals.css";

const title = process.env.NEXT_PUBLIC_TITLE || "";
const description = process.env.NEXT_PUBLIC_DESCRIPTION;
const themeColor = "#fff59d";

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title,
  },
  description,
  icons: {
    apple: "/img/heart-icon-152x152.png",
    icon: [
      {
        sizes: "16x16",
        type: "image/png",
        url: "/img/heart-icon-16x16.png",
      },
      {
        sizes: "32x32",
        type: "image/png",
        url: "/img/heart-icon-32x32.png",
      },
    ],
    other: [
      {
        color: themeColor,
        rel: "mask-icon",
        url: "/img/heart.svg",
      },
    ],
  },
  manifest: "/manifest.json",
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : null,
  openGraph: {
    images: [
      {
        height: 630,
        url: "/img/main-visual.jpg",
        width: 1200,
      },
    ],
    type: "website",
  },
  other: {
    // Next.js は `appleWebApp.capable` から `mobile-web-app-capable` のみを出力するため、
    // 古い iOS Safari 向けに `apple-mobile-web-app-capable` も出力する。
    "apple-mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#222",
    "msapplication-TileImage": "/img/mstile.png",
  },
  title: {
    default: title,
    template: `%s - ${title}`,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor,
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <head prefix="og: http://ogp.me/ns#" />
      <body>
        <SerwistProvider
          disable={process.env.NODE_ENV === "development"}
          swUrl="/service-worker.js"
        >
          {children}
        </SerwistProvider>
      </body>
    </html>
  );
}
