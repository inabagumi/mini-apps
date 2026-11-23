import "./globals.css";
import { SerwistProvider } from "@serwist/turbopack/react";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "cn";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";
import type { JSX } from "react";

import pkg from "@/package.json";

import ReleaseLink from "./release-link";

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
    <html
      className={cn(
        notoSans.variable,
        "bg-brand bg-[repeating-linear-gradient(150deg,rgb(255_255_255/0.05),rgb(255_255_255/0.05)_9px,transparent_10px,transparent_19px)] font-sans leading-[1.8] font-bold"
      )}
      lang="ja"
    >
      <head prefix="og: https://ogp.me/ns#">
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-dvh flex-col text-base text-ink antialiased">
        <div className="grow px-4 sm:px-6">{children}</div>

        <footer className="mt-10 flex flex-col items-center gap-6 border-t-6 border-ink bg-white px-4 pt-5 pb-8">
          <Suspense>
            <ReleaseLink href="/list" />
          </Suspense>

          <p className="text-center text-sm tracking-wide sm:text-base">
            {"Copyright 2018-2023 "}
            <a
              className="rounded-sm text-inherit no-underline hover:underline"
              href="https://haneru.dev/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Haneru Developers
            </a>
          </p>
        </footer>

        <Analytics />
        <SerwistProvider
          disable={process.env.NODE_ENV === "development"}
          swUrl="/sw.js"
        />
      </body>
    </html>
  );
}
