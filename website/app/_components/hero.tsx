import Link from "next/link";

import { tagline, title } from "#/lib/constants";

import LogoMark from "./logo-mark";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate text-white on-slate">
      <LogoMark className="pointer-events-none absolute top-1/2 right-0 size-96 -translate-y-1/2 text-white/5 max-md:hidden" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 text-xl sm:text-2xl">{tagline}</p>
        <p className="mt-8">
          <Link
            className="inline-block rounded-md border-2 border-primary px-6 py-2.5 text-lg font-bold text-primary transition-colors hover:bg-primary hover:text-ink"
            href="/#products"
          >
            プロダクトを見る
          </Link>
        </p>
      </div>
    </div>
  );
}
