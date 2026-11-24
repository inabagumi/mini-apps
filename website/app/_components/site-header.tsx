import Link from "next/link";

import { sections, title } from "#/lib/constants";

import LogoMark from "./logo-mark";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link className="flex items-center gap-2 rounded-sm font-bold" href="/">
          <span className="rounded-sm bg-white text-black">
            <LogoMark className="size-8" />
          </span>
          <span className="max-sm:sr-only">{title}</span>
        </Link>

        <nav aria-label="ページ内" className="ml-auto">
          <ul className="flex items-center text-sm sm:gap-2 sm:text-base">
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  className="block rounded-sm px-2 py-1.5 hover:text-accent"
                  href={`/#${section.id}`}
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
