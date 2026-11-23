import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { description, themeColor, title } from "#/lib/constants";

import { SerwistProvider } from "./serwist";

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title,
  },
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    type: "website",
  },
  other: {
    // Next.js は `appleWebApp.capable` から `mobile-web-app-capable` のみを出力するため、
    // 古い iOS Safari 向けに `apple-mobile-web-app-capable` も出力する。
    "apple-mobile-web-app-capable": "yes",
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
      <body className="fixed inset-0 bg-background">
        <SerwistProvider
          disable={process.env.NODE_ENV === "development"}
          swUrl="/service-worker.js"
        >
          {children}
        </SerwistProvider>

        <Analytics />
      </body>
    </html>
  );
}
