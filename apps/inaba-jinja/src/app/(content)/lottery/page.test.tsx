import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import LotteryPage, { metadata } from "./page";

const mocks = vi.hoisted(() => ({
  getAnyFortuneID: vi.fn<() => Promise<string>>(),
  noStore: vi.fn<() => void>(),
  redirect: vi.fn<(props: { idPromise: Promise<string> }) => null>(() => null),
}));

vi.mock(import("next/cache"), () => ({ unstable_noStore: mocks.noStore }));

vi.mock(import("#/lib/contentful"), () => ({
  getAnyFortuneID: mocks.getAnyFortuneID,
}));

vi.mock(import("./_components/redirect"), () => ({
  default: mocks.redirect,
}));

describe(LotteryPage, () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("opts out of caching and passes a fortune ID to the redirect after 2 seconds", async () => {
    vi.useFakeTimers();
    mocks.getAnyFortuneID.mockResolvedValueOnce("fortune-1");

    render(<LotteryPage />);

    expect(mocks.noStore).toHaveBeenCalledOnce();
    expect(mocks.getAnyFortuneID).toHaveBeenCalledOnce();

    const onResolve = vi.fn<(id: string) => void>();
    const idPromise =
      mocks.redirect.mock.lastCall?.[0].idPromise.then(onResolve);

    await vi.advanceTimersByTimeAsync(1999);
    expect(onResolve).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(onResolve).toHaveBeenCalledExactlyOnceWith("fortune-1");

    await idPromise;
  });

  it("renders the lottery image", () => {
    mocks.getAnyFortuneID.mockResolvedValueOnce("fortune-1");

    render(<LotteryPage />);

    expect(screen.getByRole("img", { name: "くじ引き中..." })).toHaveAttribute(
      "width",
      "600"
    );
  });

  it("is not indexed by search engines", () => {
    expect(metadata.robots).toStrictEqual({ follow: true, index: false });
    expect(metadata.alternates.canonical).toBe("/lottery");
  });
});
