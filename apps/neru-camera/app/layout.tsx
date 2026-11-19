import "tailwindcss/tailwind.css";
import { SerwistProvider } from "@serwist/turbopack/react";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { title } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : null,
  title: {
    default: title,
    template: `%s - ${title}`,
  },
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
