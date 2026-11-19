import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import KujiLoading from "./loading";

describe(KujiLoading, () => {
  it("renders the placeholders of the fortune page", () => {
    const { container } = render(<KujiLoading />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(2);
  });

  it("renders the share button as a non-link placeholder", () => {
    render(<KujiLoading />);

    expect(screen.getByText("Xに共有する").tagName).toBe("SPAN");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
