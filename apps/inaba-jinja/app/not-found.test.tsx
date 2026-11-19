import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound, { metadata } from "./not-found";

describe(NotFound, () => {
  it("renders the not found message in the content layout", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: "ページが見つかりません" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "申し訳ありませんがお探しのページを見つけられませんでした。"
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("sets the title with the site name", () => {
    expect(metadata.title).toBe("ページが見つかりません - 因幡神社");
  });
});
