import "./globals.css";
import { SerwistProvider } from "@serwist/turbopack/react";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";
import type { JSX } from "react";

import pkg from "../package.json";
import ReleaseLink from "./release-link";

import styles from "./layout.module.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(pkg.homepage),
  title: {
    default: "あなたのオタクタイプ診断 by あにまーれ",
    template: "%s | #あにまーれオタクタイプ診断",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">): JSX.Element {
  return (
    <html className={notoSans.variable} lang="ja">
      <head prefix="og: https://ogp.me/ns#">
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className={styles.wrapper}>
          <div className={styles.content}>{children}</div>

          <footer className={styles.footer}>
            <Suspense>
              <ReleaseLink href="/list" />
            </Suspense>

            <p className={styles.copyright}>
              {"Copyright 2018-2023 "}
              <a
                className={styles.copyrightLink}
                href="https://haneru.dev/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Haneru Developers
              </a>
            </p>
          </footer>
        </div>

        <Analytics />
        <SerwistProvider
          disable={process.env.NODE_ENV === "development"}
          swUrl="/sw.js"
        />
      </body>
    </html>
  );
}
