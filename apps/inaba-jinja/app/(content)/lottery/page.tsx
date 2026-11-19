import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { title as siteName, twitterAccount } from "#/lib/constants";

import FortuneRedirect from "./_components/fortune-redirect";
import kujiImage from "./kuji.png";

const title = "おみくじを引いています...";

export const metadata = {
  alternates: {
    canonical: "/lottery",
  },
  openGraph: {
    title,
    url: "/lottery",
  },
  robots: {
    follow: true,
    index: false,
  },
  title,
  twitter: {
    site: `@${twitterAccount}`,
    title: `${title} - ${siteName}`,
  },
} satisfies Metadata;

export default function LotteryPage() {
  return (
    <div className="mt-8 mb-4 flex h-full flex-col items-center justify-center">
      <Suspense fallback={null}>
        <FortuneRedirect />
      </Suspense>

      <div className="mx-auto max-w-full animate-shake">
        <Image
          alt="くじ引き中..."
          className="h-auto max-w-full"
          height={kujiImage.height / 2}
          preload
          quality={80}
          src={kujiImage}
          width={kujiImage.width / 2}
        />
      </div>
    </div>
  );
}
