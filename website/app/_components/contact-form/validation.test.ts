import { describe, expect, it } from "vitest";

import { validate, validateField } from "./validation";

describe(validateField, () => {
  it.each([
    ["name", "お名前の入力は必須です。"],
    ["email", "メールアドレスは必須です。"],
    ["message", "本文の入力は必須です。"],
  ] as const)("requires the %s field", (name, message) => {
    expect(validateField(name, "")).toBe(message);
    expect(validateField(name, " \n")).toBe(message);
  });

  it("requires an at sign in the email address", () => {
    expect(validateField("email", "you.example.com")).toBe(
      "メールアドレスには@が必要です。"
    );
    expect(validateField("email", "you@example.com")).toBeUndefined();
  });

  it("accepts any text in the name and the message", () => {
    expect(validateField("name", "因幡はねる")).toBeUndefined();
    expect(validateField("message", "こんにちは")).toBeUndefined();
  });
});

describe(validate, () => {
  it("returns the errors of the invalid fields only", () => {
    expect(
      validate({ email: "you.example.com", message: "こんにちは", name: "" })
    ).toStrictEqual({
      email: "メールアドレスには@が必要です。",
      name: "お名前の入力は必須です。",
    });
  });

  it("returns no errors when all of the fields are valid", () => {
    expect(
      validate({
        email: "you@example.com",
        message: "こんにちは",
        name: "因幡はねる",
      })
    ).toStrictEqual({});
  });
});
