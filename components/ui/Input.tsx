"use client";

import { useId } from "react";
import { Field } from "@/components/ui/Field";
import {
  FIELD_BORDER,
  FIELD_BORDER_ERROR,
  FIELD_CONTROL_BASE,
  FIELD_SIZES,
} from "@/lib/ui/field";
import { cn } from "@/utils/cn";
import { type InputProps } from "@/types/field";

export function Input({
  label,
  hint,
  error,
  fieldSize = "md",
  pill = false,
  id,
  className,
  wrapperClassName,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <Field
      id={inputId}
      label={label}
      hint={hint}
      error={error}
      className={wrapperClassName}
    >
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${inputId}-message` : undefined}
        className={cn(
          FIELD_CONTROL_BASE,
          FIELD_SIZES[fieldSize],
          error ? FIELD_BORDER_ERROR : FIELD_BORDER,
          pill ? "rounded-full px-4.5" : "rounded-md px-3.5",
          className,
        )}
        {...props}
      />
    </Field>
  );
}
