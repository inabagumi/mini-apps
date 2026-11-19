import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type FortuneRedirect from "./_components/fortune-redirect";
import LotteryPage, { metadata } from "./page";

const mocks = vi.hoisted(() => ({
  fortuneRedirect: vi.fn<() => null>(() => null),
}));

vi.mock(import("./_components/fortune-redirect"), () => ({
  default: mocks.fortuneRedirect as unknown as typeof FortuneRedirect,
}));

describe(LotteryPage, () => {
  it("renders the redirect to a fortune", () => {
    render(<LotteryPage />);

    expect(mocks.fortuneRedirect).toHaveBeenCalledOnce();
  });

  it("renders the lottery image", () => {
    render(<LotteryPage />);

    expect(screen.getByRole("img", { name: "くじ引き中..." })).toHaveAttribute(
      "width",
      "225"
    );
  });

  it("is not indexed by search engines", () => {
    expect(metadata.robots).toStrictEqual({ follow: true, index: false });
    expect(metadata.alternates.canonical).toBe("/lottery");
  });
});
