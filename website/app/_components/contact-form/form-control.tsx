import type { ChangeEventHandler, FocusEventHandler } from "react";

import TextField from "./text-field";
import type { FieldName } from "./validation";

type Field = HTMLInputElement | HTMLTextAreaElement;

export default function FormControl({
  autoComplete,
  disabled = false,
  error,
  label,
  multiline = false,
  name,
  onBlur,
  onChange,
  placeholder,
  type = "text",
}: Readonly<{
  autoComplete?: string;
  disabled?: boolean;
  error?: string | undefined;
  label: string;
  multiline?: boolean;
  name: FieldName;
  onBlur?: FocusEventHandler<Field>;
  onChange?: ChangeEventHandler<Field>;
  placeholder?: string;
  type?: string;
}>) {
  const fieldProps = {
    "aria-describedby": error ? `${name}-error` : undefined,
    "aria-invalid": error ? true : undefined,
    autoComplete,
    disabled,
    id: name,
    name,
    onBlur,
    onChange,
    placeholder,
    required: true,
  };

  return (
    <div className="mt-2 first:mt-0">
      <dt className="mb-1">
        <label htmlFor={name}>{label}</label>
      </dt>

      <dd>
        {multiline ? (
          // The minimum height keeps 10 rows in the browsers that support
          // `field-sizing`, where `rows` has no effect.
          <TextField {...fieldProps} className="min-h-64" multiline rows={10} />
        ) : (
          <TextField {...fieldProps} type={type} />
        )}

        {/* Reserve the height of a line so that an error does not shift the fields below. */}
        <p className="mt-1 ml-2 min-h-5 text-sm leading-5">
          {error ? (
            <span className="text-danger" id={`${name}-error`} role="alert">
              {error}
            </span>
          ) : null}
        </p>
      </dd>
    </div>
  );
}
