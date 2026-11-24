import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FormControl from "./form-control";

describe(FormControl, () => {
  it.each([
    ["single-line", false],
    ["multiline", true],
  ] as const)("associates the label with the %s field", (_, multiline) => {
    render(<FormControl label="本文" multiline={multiline} name="message" />);

    const field = screen.getByRole("textbox", { name: "本文" });

    expect(field.id).toBe("message");
    expect(field.getAttribute("name")).toBe("message");
    expect(field).toHaveProperty("required", true);
  });

  it.each([
    ["single-line", false],
    ["multiline", true],
  ] as const)("disables the %s field", (_, multiline) => {
    render(
      <FormControl disabled label="本文" multiline={multiline} name="message" />
    );

    expect(screen.getByRole("textbox", { name: "本文" })).toHaveProperty(
      "disabled",
      true
    );
  });

  it.each([
    ["single-line", false],
    ["multiline", true],
  ] as const)("describes the %s field with its error", (_, multiline) => {
    render(
      <FormControl
        error="本文の入力は必須です。"
        label="本文"
        multiline={multiline}
        name="message"
      />
    );

    const field = screen.getByRole("textbox", { name: "本文" });
    const alert = screen.getByRole("alert");

    expect(alert.textContent).toBe("本文の入力は必須です。");
    expect(alert.id).toBe("message-error");
    expect(field.getAttribute("aria-invalid")).toBe("true");
    expect(field.getAttribute("aria-describedby")).toBe("message-error");
  });

  it("does not mark the field as invalid without an error", () => {
    render(<FormControl label="本文" name="message" />);

    const field = screen.getByRole("textbox", { name: "本文" });

    expect(screen.queryByRole("alert")).toBeNull();
    expect(field.getAttribute("aria-invalid")).toBeNull();
    expect(field.getAttribute("aria-describedby")).toBeNull();
  });
});
