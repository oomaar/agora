import { type FieldErrors } from "@/types/auth";

export function hasFieldErrors<TField extends string>(
  errors: FieldErrors<TField>,
): boolean {
  return Object.values(errors).some(Boolean);
}
