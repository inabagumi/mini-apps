import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import LotteryPage, { metadata } from "./page";

const mocks = vi.hoisted(() => ({
  getAnyFortuneID: vi.fn<() => Promise<string>>(),
  noStore: vi.fn<() => void>(),
  redirect: vi.fn<(props: { idPromise: Promise<string> }) => null>(() => null),
}));

vi.mock(import("next/cache"), () => ({ unstable_noStore: mocks.noStore }));

vi.mock(import("@/lib/contentful"), () => ({
  getAnyFortuneID: mocks.getAnyFortuneID,
}));

vi.mock(import("./_components/redirect"), () => ({
  default: mocks.redirect,
}));

describe(LotteryPage, () => {
  it("opts out of caching and passes a fortune ID to the redirect", async () => {
    mocks.getAnyFortuneID.mockResolvedValueOnce("fortune-1");

    render(<LotteryPage />);

    expect(mocks.noStore).toHaveBeenCalledOnce();
    expect(mocks.getAnyFortuneID).toHaveBeenCalledOnce();
    await expect(mocks.redirect.mock.lastCall?.[0].idPromise).resolves.toBe(
      "fortune-1"
    );
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
