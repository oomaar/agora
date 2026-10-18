import {
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";

export type FieldSize = "sm" | "md" | "lg";

export type FieldProps = {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  hint?: string;
  error?: string;
  fieldSize?: FieldSize;
  pill?: boolean;
  wrapperClassName?: string;
};

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  label: string;
  wrapperClassName?: string;
};
