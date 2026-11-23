import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ShareButtons from "./share-buttons";

const TEXT = "アナタはメイド系【お料理好き】です！";
const TITLE = "テストタレントが選ばれました！";
const SHARE_URL = "https://shindan.animare.cafe/s/sJEfGEiw?s=true";

const renderShareButtons = (): void => {
  render(<ShareButtons text={TEXT} title={TITLE} url={SHARE_URL} />);
};

const getShareButton = (): HTMLElement | null =>
  screen.queryByRole("button", { name: "その他のアプリでシェアする" });

const getCopyButton = (): HTMLElement =>
  screen.getByRole("button", { name: "結果のURLをコピーする" });

const click = async (element: HTMLElement): Promise<void> => {
  // Flush the updates after the promises of the click handler settle.
  await act(() => Promise.resolve(fireEvent.click(element)));
};

describe(ShareButtons, () => {
  const writeText = vi.fn<(data: string) => Promise<void>>();

  beforeEach(() => {
    writeText.mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      ...navigator,
      clipboard: { writeText },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
    writeText.mockReset();
  });

  it("keeps the link to post the result to X", () => {
    renderShareButtons();

    const link = screen.getByRole("link", { name: "診断結果をツイートする" });
    const href = new URL(link.getAttribute("href") ?? "");

    expect(href.origin).toBe("https://twitter.com");
    expect(href.searchParams.get("text")).toBe(`${TEXT}\n`);
    expect(href.searchParams.get("url")).toBe(SHARE_URL);
  });

  it("hides the share button when the Web Share API is not available", () => {
    renderShareButtons();

    expect(getShareButton()).not.toBeInTheDocument();
    expect(getCopyButton()).toBeInTheDocument();
  });

  it("hides the share button when the data cannot be shared", () => {
    vi.stubGlobal("navigator", {
      ...navigator,
      canShare: () => false,
      share: vi.fn<(data?: ShareData) => Promise<void>>(),
    });

    renderShareButtons();

    expect(getShareButton()).not.toBeInTheDocument();
  });

  it("opens the share sheet of the OS with the result", async () => {
    const share = vi.fn<(data?: ShareData) => Promise<void>>();

    share.mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      ...navigator,
      canShare: () => true,
      share,
    });

    renderShareButtons();

    const button = getShareButton();

    expect(button).toBeInTheDocument();

    await click(button as HTMLElement);

    expect(share).toHaveBeenCalledWith({
      text: TEXT,
      title: TITLE,
      url: SHARE_URL,
    });
  });

  it("does nothing when the share sheet is closed", async () => {
    const share = vi.fn<(data?: ShareData) => Promise<void>>();

    share.mockRejectedValue(new DOMException("Canceled", "AbortError"));
    vi.stubGlobal("navigator", {
      ...navigator,
      clipboard: { writeText },
      share,
    });

    renderShareButtons();
    await click(getShareButton() as HTMLElement);

    expect(writeText).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("");
  });

  it("copies the URL when sharing fails", async () => {
    const share = vi.fn<(data?: ShareData) => Promise<void>>();

    share.mockRejectedValue(new DOMException("Denied", "NotAllowedError"));
    vi.stubGlobal("navigator", {
      ...navigator,
      clipboard: { writeText },
      share,
    });

    renderShareButtons();
    await click(getShareButton() as HTMLElement);

    expect(writeText).toHaveBeenCalledWith(SHARE_URL);
    expect(screen.getByRole("status")).toHaveTextContent("URLをコピーしました");
  });

  it("copies the URL and tells it for a while", async () => {
    vi.useFakeTimers();
    renderShareButtons();

    await click(getCopyButton());

    expect(writeText).toHaveBeenCalledWith(SHARE_URL);
    expect(screen.getByRole("status")).toHaveTextContent("URLをコピーしました");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByRole("status")).toHaveTextContent("");
  });

  it("shows the URL when it cannot be copied", async () => {
    writeText.mockRejectedValue(new DOMException("Denied", "NotAllowedError"));
    renderShareButtons();

    await click(getCopyButton());

    expect(screen.getByRole("status")).toHaveTextContent(
      `URLをコピーできませんでした。${SHARE_URL}`
    );
  });
});
