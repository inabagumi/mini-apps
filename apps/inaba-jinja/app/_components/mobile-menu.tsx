"use client";

import { Dialog } from "@base-ui/react/dialog";
import { cn } from "cn";
import Link from "next/link";
import { useRef, useState } from "react";

import Logo from "#/components/logo.svg";

interface Props {
  className?: string;
}

export default function MobileMenu({ className }: Props) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // `Dialog.Close` adds `role="button"` to non-button elements, so links close
  // the dialog by themselves to keep their link semantics.
  const close = () => setOpen(false);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger
        aria-label="メニューを開く"
        className={cn("m-2 w-10 space-y-1.5 p-2 text-slate-100", className)}
      >
        <span
          aria-hidden
          className="block h-0.5 w-full rounded-full bg-current"
        />
        <span
          aria-hidden
          className="block h-0.5 w-full rounded-full bg-current"
        />
        <span
          aria-hidden
          className="block h-0.5 w-full rounded-full bg-current"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-20 bg-black/50 transition-opacity" />
        <Dialog.Popup
          className="fixed inset-y-0 right-0 z-30 grid w-72 max-w-full grid-rows-[1fr_auto] border-l border-slate-400 bg-white"
          // Focus the menu itself when opened, as Radix UI did.
          initialFocus={popupRef}
          ref={popupRef}
          render={<nav />}
        >
          <div className="flex flex-col items-center py-2">
            <Link
              aria-label="因幡神社"
              className="block"
              href="/"
              onClick={close}
            >
              <Logo aria-hidden className="block h-8 w-auto fill-current" />
            </Link>
          </div>
          <ul className="pb-safe">
            <li className="border-t border-slate-400">
              <Link
                className="block px-4 py-3 text-right"
                href="/about"
                onClick={close}
              >
                因幡神社とは
              </Link>
            </li>
            <li className="border-t border-slate-400">
              <Link
                className="block px-4 py-3 text-right"
                href="/privacy"
                onClick={close}
              >
                プライバシーポリシー
              </Link>
            </li>
            <li className="border-t border-slate-400">
              <a
                className="block px-4 py-3 text-right"
                href="https://haneru.dev"
                onClick={close}
                rel="noopener noreferrer"
                target="_blank"
              >
                運営者情報
              </a>
            </li>
          </ul>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
