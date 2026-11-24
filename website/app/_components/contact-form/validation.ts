export const fieldNames = ["name", "email", "message"] as const;

export type FieldName = (typeof fieldNames)[number];

export type ContactFormValues = Record<FieldName, string>;

export type FieldErrors = Partial<Record<FieldName, string>>;

const validators: Record<FieldName, (value: string) => string | undefined> = {
  email: (value) => {
    if (!value) {
      return "メールアドレスは必須です。";
    }

    return /.+@.+/u.test(value) ? undefined : "メールアドレスには@が必要です。";
  },
  message: (value) => (value ? undefined : "本文の入力は必須です。"),
  name: (value) => (value ? undefined : "お名前の入力は必須です。"),
};

/**
 * Returns the error message of the field, or `undefined` if the value is
 * valid. A value that consists only of whitespace is treated as empty.
 */
export const validateField = (
  name: FieldName,
  value: string
): string | undefined => validators[name](value.trim());

/**
 * Returns the error messages of the invalid fields.
 */
export const validate = (values: ContactFormValues): FieldErrors => {
  const errors: FieldErrors = {};

  for (const name of fieldNames) {
    const error = validateField(name, values[name]);

    if (error) {
      errors[name] = error;
    }
  }

  return errors;
};
