import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MobileMenu from "./mobile-menu";

const openMenu = async () => {
  fireEvent.click(screen.getByRole("button", { name: "メニューを開く" }));

  return await screen.findByRole("dialog");
};

describe(MobileMenu, () => {
  it("is closed initially", () => {
    render(<MobileMenu />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("applies the class name to the trigger", () => {
    render(<MobileMenu className="fixed" />);

    expect(screen.getByRole("button", { name: "メニューを開く" })).toHaveClass(
      "fixed"
    );
  });

  it("opens the menu with the links", async () => {
    render(<MobileMenu />);

    const dialog = await openMenu();

    expect(dialog.tagName).toBe("NAV");
    expect(screen.getByRole("link", { name: "因幡神社" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "因幡神社とは" })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(
      screen.getByRole("link", { name: "プライバシーポリシー" })
    ).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "運営者情報" })).toHaveAttribute(
      "href",
      "https://haneru.dev"
    );
  });

  it("focuses the menu itself when opened", async () => {
    render(<MobileMenu />);

    const dialog = await openMenu();

    await waitFor(() => {
      expect(dialog).toHaveFocus();
    });
  });

  it("closes the menu when a link is clicked", async () => {
    render(<MobileMenu />);

    await openMenu();
    fireEvent.click(screen.getByRole("link", { name: "運営者情報" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes the menu when the Escape key is pressed", async () => {
    render(<MobileMenu />);

    const dialog = await openMenu();
    fireEvent.keyDown(dialog, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
