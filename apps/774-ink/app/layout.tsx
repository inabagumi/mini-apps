import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { description, themeColor, title } from "#/lib/constants";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    type: "website",
  },
  title,
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
    <html
      className="bg-[#544643] font-[sans-serif] leading-none text-white"
      lang="ja"
    >
      <body>
        {children}

        <Analytics />
      </body>
    </html>
  );
}
