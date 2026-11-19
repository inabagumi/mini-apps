import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PrivacyLayout, { metadata } from "./layout";

describe(PrivacyLayout, () => {
  it("renders the title and the children", () => {
    render(<PrivacyLayout>本文</PrivacyLayout>);

    expect(
      screen.getByRole("heading", { level: 1, name: "プライバシーポリシー" })
    ).toBeInTheDocument();
    expect(screen.getByText("本文")).toBeInTheDocument();
  });

  it("sets the title and the canonical URL", () => {
    expect(metadata.title).toBe("プライバシーポリシー");
    expect(metadata.alternates.canonical).toBe("/privacy");
    expect(metadata.openGraph.url).toBe("/privacy");
  });
});
