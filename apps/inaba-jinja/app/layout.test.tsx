import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import RootLayout, { metadata, viewport } from "./layout";

vi.mock(import("@vercel/analytics/react"), () => ({
  Analytics: () => null,
}));

vi.mock(import("@vercel/speed-insights/next"), () => ({
  SpeedInsights: () => null,
}));

const renderLayout = () =>
  render(<RootLayout>本文</RootLayout>, { container: document });

describe(RootLayout, () => {
  it("renders the document in Japanese", () => {
    renderLayout();

    expect(document.documentElement).toHaveAttribute("lang", "ja");
    expect(document.body).toHaveTextContent("本文");
  });

  it("renders the mobile menu trigger", () => {
    renderLayout();

    expect(
      screen.getByRole("button", { name: "メニューを開く" })
    ).toBeInTheDocument();
  });

  it("renders the footer links", () => {
    renderLayout();

    const footer = within(screen.getByRole("contentinfo"));

    expect(footer.getByRole("link", { name: "因幡神社とは" })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(
      footer.getByRole("link", { name: "プライバシーポリシー" })
    ).toHaveAttribute("href", "/privacy");
    expect(footer.getByRole("link", { name: "運営者情報" })).toHaveAttribute(
      "href",
      "https://haneru.dev/"
    );
  });

  it("builds the metadata from NEXT_PUBLIC_BASE_URL", () => {
    expect(metadata.metadataBase).toStrictEqual(
      new URL("https://inaba-jinja.test")
    );
    expect(metadata.title).toStrictEqual({
      default: "因幡神社",
      template: "%s - 因幡神社",
    });
    expect(viewport.themeColor).toBe("#ff5722");
  });
});
