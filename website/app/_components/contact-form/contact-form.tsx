"use client";

import FormControl from "./form-control";
import { useHandleSubmit } from "./hooks";

export default function ContactForm() {
  const [formState, handleSubmit] = useHandleSubmit("contact-form");

  return (
    <form
      aria-label="お問い合わせ"
      className="mt-6"
      noValidate
      onSubmit={handleSubmit}
    >
      <dl>
        <FormControl
          disabled={formState.isSubmitting}
          label="お名前"
          name="name"
          placeholder=""
          registerOptions={{
            required: {
              message: "お名前の入力は必須です。",
              value: true,
            },
          }}
          type="text"
        />

        <FormControl
          disabled={formState.isSubmitting}
          label="メールアドレス"
          name="email"
          placeholder="you@example.com"
          registerOptions={{
            pattern: {
              message: "メールアドレスには@が必要です。",
              value: /.+@.+/u,
            },
            required: {
              message: "メールアドレスは必須です。",
              value: true,
            },
          }}
          type="email"
        />

        <FormControl
          disabled={formState.isSubmitting}
          label="本文"
          multiline
          name="message"
          registerOptions={{
            required: {
              message: "本文の入力は必須です。",
              value: true,
            },
          }}
        />
      </dl>

      <div className="mt-4">
        <button
          className="block w-full rounded-md bg-primary px-4 py-2.5 font-bold text-ink transition-colors hover:bg-primary-light disabled:opacity-50"
          disabled={!formState.isValid || formState.isSubmitting}
          type="submit"
        >
          送信
        </button>
      </div>
    </form>
  );
}
