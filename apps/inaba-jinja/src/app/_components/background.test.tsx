import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Background from "./background";

describe(Background, () => {
  it("renders the main visual hidden from assistive technologies", () => {
    const { container } = render(<Background />);

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });
});
