import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SimpleTitle from "./simple-title";

describe(SimpleTitle, () => {
  it("renders the children as a heading", () => {
    render(<SimpleTitle>タイトル</SimpleTitle>);

    expect(
      screen.getByRole("heading", { level: 1, name: "タイトル" })
    ).toBeInTheDocument();
  });
});
