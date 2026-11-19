import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { description, title as siteName, themeColor } from "#/lib/constants";

import Background from "./_components/background";
import MobileMenu from "./_components/mobile-menu";

export const metadata: Metadata = {
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
};

export const viewport: Viewport = {
  themeColor,
  viewportFit: "cover",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body>
        <div className="md:grid md:min-h-dvh md:grid-rows-[1fr_auto]">
          <MobileMenu className="fixed top-safe right-safe md:hidden" />

          <div className="pt-safe pr-safe pl-safe">{children}</div>

          <footer className="hidden bg-black/80 pr-safe pb-safe pl-safe text-sm text-slate-100 md:block">
            <nav className="p-4">
              <ul className="flex items-center justify-end gap-4">
                <li>
                  <Link className="hover:underline" href="/about">
                    因幡神社とは
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/privacy">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <a
                    className="hover:underline"
                    href="https://haneru.dev/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    運営者情報
                  </a>
                </li>
              </ul>
            </nav>
          </footer>
        </div>

        <Background />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
