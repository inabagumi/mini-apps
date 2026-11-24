import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TextField from "./text-field";

describe(TextField, () => {
  it("renders a single-line text field by default", () => {
    render(<TextField aria-label="お名前" />);

    const field = screen.getByRole("textbox", { name: "お名前" });

    expect(field.tagName).toBe("INPUT");
    expect(field.getAttribute("type")).toBe("text");
  });

  it("keeps the given type", () => {
    render(<TextField aria-label="メールアドレス" type="email" />);

    expect(
      screen
        .getByRole("textbox", { name: "メールアドレス" })
        .getAttribute("type")
    ).toBe("email");
  });

  it("renders a textarea when it is multiline", () => {
    render(<TextField aria-label="本文" multiline rows={10} />);

    const field = screen.getByRole("textbox", { name: "本文" });

    expect(field.tagName).toBe("TEXTAREA");
    expect(field.getAttribute("rows")).toBe("10");
    expect(field.getAttribute("multiline")).toBeNull();
  });

  it("lets the given class names override the default ones", () => {
    render(<TextField aria-label="本文" className="px-4 text-ink" multiline />);

    const { classList } = screen.getByRole("textbox", { name: "本文" });

    expect(classList).toContain("px-4");
    expect(classList).not.toContain("px-3");
    expect(classList).toContain("text-ink");
    expect(classList).toContain("text-base");
  });
});
