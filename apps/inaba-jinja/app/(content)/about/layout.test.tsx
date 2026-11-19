import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutLayout, { metadata } from "./layout";

describe(AboutLayout, () => {
  it("renders the title and the children", () => {
    render(<AboutLayout>本文</AboutLayout>);

    expect(
      screen.getByRole("heading", { level: 1, name: "因幡神社とは" })
    ).toBeInTheDocument();
    expect(screen.getByText("本文")).toBeInTheDocument();
  });

  it("sets the title", () => {
    expect(metadata.title).toBe("因幡神社とは");
    expect(metadata.twitter.title).toBe("因幡神社とは - 因幡神社");
  });

  it("sets the canonical URL and the Open Graph URL to /about", () => {
    expect(metadata.alternates.canonical).toBe("/about");
    expect(metadata.openGraph.url).toBe("/about");
  });
});
