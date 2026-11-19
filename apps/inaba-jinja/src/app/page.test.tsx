import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { description } from "#/lib/constants";

import Page, { metadata } from "./page";

describe(Page, () => {
  it("renders the logo and the description", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { level: 1, name: "因幡神社" })
    ).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("links to the lottery page", () => {
    render(<Page />);

    expect(
      screen.getByRole("link", { name: "おみくじを引く" })
    ).toHaveAttribute("href", "/lottery");
  });

  it("sets the canonical URL to the top page", () => {
    expect(metadata.alternates.canonical).toBe("/");
    expect(metadata.openGraph.url).toBe("/");
  });
});
