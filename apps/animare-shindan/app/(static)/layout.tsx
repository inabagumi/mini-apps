import Link from "next/link";
import type { JSX, ReactNode } from "react";

import { createLineShareURL, createTweetURL } from "@/lib/share";
import pkg from "@/package.json";

import lineLogo from "./line.svg";
import twitterLogo from "./twitter.svg";

interface Props {
  children: ReactNode;
}

export default function StaticLayout({ children }: Props): JSX.Element {
  return (
    <>
      <header className="mx-auto flex w-full max-w-page items-center justify-between gap-4 py-5">
        <Link
          className="block rounded-[3px] bg-[#212121] py-0 pr-[0.2em] pl-[0.5em] text-[1.0625rem] leading-loose tracking-[7px] text-white no-underline"
          href="/"
        >
          ANiMARE
        </Link>

        <nav aria-label="シェア">
          <ul className="m-0 flex list-none gap-2 p-0">
            <li className="block">
              <a
                className="flex size-11 items-center justify-center rounded-full bg-white transition-[box-shadow] duration-150 hover:shadow-[0_4px_0_rgb(0_0_0/0.2)] active:shadow-[inset_0_3px_0_rgb(0_0_0/0.2)] sm:size-12"
                href={createTweetURL(new URL("/", pkg.homepage).toString())}
                rel="noopener noreferrer"
                target="_blank"
              >
                {/* oxlint-disable-next-line nextjs/no-img-element */}
                <img
                  alt="Xでシェアする"
                  className="size-5 sm:size-6"
                  height="24"
                  src={twitterLogo.src}
                  width="24"
                />
              </a>
            </li>
            <li className="block">
              <a
                className="flex size-11 items-center justify-center rounded-full bg-white transition-[box-shadow] duration-150 hover:shadow-[0_4px_0_rgb(0_0_0/0.2)] active:shadow-[inset_0_3px_0_rgb(0_0_0/0.2)] sm:size-12"
                href={createLineShareURL(new URL("/", pkg.homepage).toString())}
                rel="noopener noreferrer"
                target="_blank"
              >
                {/* oxlint-disable-next-line nextjs/no-img-element */}
                <img
                  alt="LINEでシェアする"
                  className="size-5 sm:size-6"
                  height="24"
                  src={lineLogo.src}
                  width="24"
                />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="pt-6 sm:pt-16">
        <div className="mx-auto w-full max-w-page rounded-[20px] border-4 border-ink bg-white px-5 py-7 text-ink sm:px-8 sm:py-10">
          {children}
        </div>
      </main>
    </>
  );
}
