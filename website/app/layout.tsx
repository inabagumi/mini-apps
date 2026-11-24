import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { baseUrl, description, tagline, title } from "#/lib/constants";

import SiteFooter from "./_components/site-footer";
import SiteHeader from "./_components/site-header";

export const metadata: Metadata = {
  description,
  metadataBase: new URL(baseUrl),
  openGraph: {
    siteName: title,
    type: "website",
  },
  title: {
    default: `${tagline} | ${title}`,
    template: `%s | ${title}`,
  },
  twitter: {
    card: "summary_large_image",
  },
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html
      className="bg-background font-sans text-foreground antialiased motion-safe:scroll-smooth"
      lang="ja"
    >
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />

        <main className="grow">{children}</main>

        <SiteFooter />

        <Analytics />
      </body>
    </html>
  );
}
