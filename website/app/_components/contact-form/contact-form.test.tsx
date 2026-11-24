import type { useSubmit } from "@formspree/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ContactForm from "./contact-form";
import type { ContactFormValues } from "./validation";

type Submit = ReturnType<typeof useSubmit<ContactFormValues>>;
type SubmissionResult = Awaited<ReturnType<Submit>>;

const mocks = vi.hoisted(() => ({
  submit: vi.fn<Submit>(),
}));

vi.mock(import("@formspree/react"), () => ({
  FormspreeProvider: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  useSubmit: (() => mocks.submit) as typeof useSubmit,
}));

// The form only reads `kind` from the result.
const createResult = (kind: SubmissionResult["kind"]) =>
  ({ kind }) as SubmissionResult;

const values: ContactFormValues = {
  email: "you@example.com",
  message: "こんにちは",
  name: "因幡はねる",
};

const renderContactForm = () => {
  render(<ContactForm />);

  return {
    button: screen.getByRole("button"),
    email: screen.getByRole("textbox", { name: "メールアドレス" }),
    form: screen.getByRole("form", { name: "お問い合わせ" }),
    message: screen.getByRole("textbox", { name: "本文" }),
    name: screen.getByRole("textbox", { name: "お名前" }),
  };
};

const fillForm = (fields: ReturnType<typeof renderContactForm>) => {
  fireEvent.change(fields.name, { target: { value: values.name } });
  fireEvent.change(fields.email, { target: { value: values.email } });
  fireEvent.change(fields.message, { target: { value: values.message } });
};

const getValues = ({ form }: ReturnType<typeof renderContactForm>) =>
  Object.fromEntries(new FormData(form as HTMLFormElement));

describe(ContactForm, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.submit.mockResolvedValue(createResult("success"));
  });

  it("does not show any errors or results initially", () => {
    const { button } = renderContactForm();

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    expect(screen.getByRole("status").textContent).toBe("");
    expect(button.textContent).toBe("送信");
    expect(button).toHaveProperty("disabled", false);
  });

  it.each([
    ["name", "お名前の入力は必須です。"],
    ["email", "メールアドレスは必須です。"],
    ["message", "本文の入力は必須です。"],
  ] as const)(
    "shows an error when the %s field is left empty",
    (field, errorMessage) => {
      const fields = renderContactForm();

      fireEvent.blur(fields[field]);

      const alert = screen.getByRole("alert");

      expect(alert.textContent).toBe(errorMessage);
      expect(alert.id).toBe(`${field}-error`);
      expect(fields[field].getAttribute("aria-invalid")).toBe("true");
      expect(fields[field].getAttribute("aria-describedby")).toBe(
        `${field}-error`
      );
    }
  );

  it("shows an error when the email address is invalid", () => {
    const { email } = renderContactForm();

    fireEvent.change(email, { target: { value: "you.example.com" } });
    fireEvent.blur(email);

    expect(screen.getByRole("alert").textContent).toBe(
      "メールアドレスには@が必要です。"
    );
  });

  it("removes the error as soon as the field is fixed", () => {
    const { email } = renderContactForm();

    fireEvent.change(email, { target: { value: "you.example.com" } });
    fireEvent.blur(email);
    fireEvent.change(email, { target: { value: "you@example.com" } });

    expect(screen.queryByRole("alert")).toBeNull();
    expect(email.getAttribute("aria-invalid")).toBeNull();
  });

  it("does not validate a field before it loses the focus", () => {
    const { email } = renderContactForm();

    fireEvent.change(email, { target: { value: "you" } });

    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("shows the errors of all fields and focuses the first one instead of submitting an invalid form", () => {
    const { form, name } = renderContactForm();

    fireEvent.submit(form);

    expect(
      screen.getAllByRole("alert").map((alert) => alert.textContent)
    ).toStrictEqual([
      "お名前の入力は必須です。",
      "メールアドレスは必須です。",
      "本文の入力は必須です。",
    ]);
    expect(document.activeElement).toBe(name);
    expect(mocks.submit).not.toHaveBeenCalled();
  });

  it("disables the form while it is submitting", async () => {
    const submission = Promise.withResolvers<SubmissionResult>();
    mocks.submit.mockReturnValueOnce(submission.promise);

    const fields = renderContactForm();
    fillForm(fields);
    fireEvent.submit(fields.form);

    expect(fields.button.textContent).toBe("送信中…");
    expect(
      [fields.button, fields.name, fields.email, fields.message].map(
        (element) => element.hasAttribute("disabled")
      )
    ).toStrictEqual([true, true, true, true]);

    submission.resolve(createResult("success"));

    await waitFor(() => {
      expect(fields.button).toHaveProperty("disabled", false);
    });
  });

  it("sends the values, tells the success and clears the form", async () => {
    const fields = renderContactForm();
    fillForm(fields);
    fireEvent.submit(fields.form);

    await waitFor(() => {
      expect(screen.getByRole("status").textContent).toBe(
        "お問い合わせを送信しました。ありがとうございます。"
      );
    });

    expect(mocks.submit).toHaveBeenCalledExactlyOnceWith(values);
    expect(screen.queryByRole("alert")).toBeNull();
    expect(getValues(fields)).toStrictEqual({
      email: "",
      message: "",
      name: "",
    });
  });

  it.each([
    [
      "the submission is rejected",
      () => mocks.submit.mockResolvedValueOnce(createResult("error")),
    ],
    [
      "the submission throws an error",
      () => mocks.submit.mockRejectedValueOnce(new Error("Failed to send.")),
    ],
  ])("tells the failure and keeps the values when %s", async (_, setUp) => {
    setUp();

    const fields = renderContactForm();
    fillForm(fields);
    fireEvent.submit(fields.form);

    const alert = await screen.findByRole("alert");

    expect(alert.textContent).toBe(
      "送信に失敗しました。時間をおいてもう一度お試しください。"
    );
    expect(screen.getByRole("status").textContent).toBe("");
    expect(getValues(fields)).toStrictEqual(values);
    expect(fields.button).toHaveProperty("disabled", false);
  });

  it("hides the previous result when the form is submitted again", async () => {
    mocks.submit.mockResolvedValueOnce(createResult("error"));

    const fields = renderContactForm();
    fillForm(fields);
    fireEvent.submit(fields.form);
    await screen.findByRole("alert");

    fireEvent.submit(fields.form);

    await waitFor(() => {
      expect(screen.getByRole("status").textContent).not.toBe("");
    });

    expect(screen.queryByRole("alert")).toBeNull();
  });
});
