import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContentLayout from "./layout";

describe(ContentLayout, () => {
  it("renders the logo linking to the top page", () => {
    render(<ContentLayout>本文</ContentLayout>);

    expect(screen.getByRole("link", { name: "因幡神社" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("renders the children in the main landmark", () => {
    render(<ContentLayout>本文</ContentLayout>);

    expect(screen.getByRole("main")).toHaveTextContent("本文");
  });
});
