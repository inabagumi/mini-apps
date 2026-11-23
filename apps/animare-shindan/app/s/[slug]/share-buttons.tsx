"use client";

import { Copy, Share2 } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { JSX } from "react";

import { Button, ExternalButtonLink } from "@/components/button";
import { cn } from "@/lib/cn";
import { createTweetURL } from "@/lib/share";

/** How long the feedback of copying the URL stays on the screen. */
const FEEDBACK_DURATION = 3000;

type CopyStatus = "idle" | "copied" | "failed";

const subscribe = (): (() => void) => () => {
  // The support of the Web Share API never changes while the page is open,
  // so there is nothing to subscribe to.
};

/**
 * Whether the Web Share API can share the given data. This is always `false`
 * on the server so that the share button only appears after hydration.
 */
const useCanShare = (data: ShareData): boolean =>
  useSyncExternalStore(
    subscribe,
    () =>
      typeof navigator.share === "function" &&
      (typeof navigator.canShare !== "function" || navigator.canShare(data)),
    () => false
  );

const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === "AbortError";

interface Props {
  className?: string;
  /** The text of the post, which doesn't include the URL. */
  text: string;
  title: string;
  url: string;
}

export default function ShareButtons({
  className,
  text,
  title,
  url,
}: Props): JSX.Element {
  const shareData = { text, title, url };
  const canShare = useCanShare(shareData);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const showCopyStatus = (status: CopyStatus): void => {
    clearTimeout(timerRef.current);
    setCopyStatus(status);
    timerRef.current = setTimeout(() => {
      setCopyStatus("idle");
    }, FEEDBACK_DURATION);
  };

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
      showCopyStatus("copied");
    } catch {
      showCopyStatus("failed");
    }
  };

  const handleShare = async (): Promise<void> => {
    try {
      await navigator.share(shareData);
    } catch (error) {
      // The user closed the share sheet.
      if (isAbortError(error)) {
        return;
      }

      // Fall back to copying the URL when sharing fails for other reasons.
      await handleCopy();
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <ExternalButtonLink
        className="sm:max-w-80"
        href={createTweetURL(url, `${text}\n`)}
        variant="share"
      >
        診断結果をツイートする
      </ExternalButtonLink>

      {canShare && (
        <Button className="sm:max-w-80" onClick={handleShare} variant="share">
          <Share2 aria-hidden="true" className="size-5 shrink-0" />
          その他のアプリでシェアする
        </Button>
      )}

      <Button className="sm:max-w-80" onClick={handleCopy} variant="secondary">
        <Copy aria-hidden="true" className="size-5 shrink-0" />
        結果のURLをコピーする
      </Button>

      <output
        className={cn(
          "block min-h-lh text-center text-sm",
          copyStatus === "failed" ? "text-muted" : "text-brand-strong"
        )}
      >
        {copyStatus === "copied" && "URLをコピーしました"}
        {copyStatus === "failed" && (
          <>
            URLをコピーできませんでした。
            <br />
            <span className="break-all select-all">{url}</span>
          </>
        )}
      </output>
    </div>
  );
}
