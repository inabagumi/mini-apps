import "./globals.css";
import { SerwistProvider } from "@serwist/turbopack/react";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { themeColor, title } from "#/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: title,
    template: `%s - ${title}`,
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
      <head />
      <body>
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
