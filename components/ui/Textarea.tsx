"use client";

import { useId } from "react";
import { Field } from "@/components/ui/Field";
import {
  FIELD_BORDER,
  FIELD_BORDER_ERROR,
  FIELD_CONTROL_BASE,
} from "@/lib/ui/field";
import { cn } from "@/utils/cn";
import { type TextareaProps } from "@/types/field";

export function Textarea({
  label,
  hint,
  error,
  id,
  rows = 3,
  className,
  wrapperClassName,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  return (
    <Field
      id={textareaId}
      label={label}
      hint={hint}
      error={error}
      className={wrapperClassName}
    >
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${textareaId}-message` : undefined}
        className={cn(
          FIELD_CONTROL_BASE,
          error ? FIELD_BORDER_ERROR : FIELD_BORDER,
          "min-h-16 resize-none rounded-md px-3 py-2.5 leading-normal",
          className,
        )}
        {...props}
      />
    </Field>
  );
}
