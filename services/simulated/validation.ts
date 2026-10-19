import { DataError } from "@/services/dataError";

// Trims and checks length the way a real API would before saving.
export function requireText(
  value: string,
  maxLength: number,
  label: string,
): string {
  const text = value.trim();
  if (!text) throw new DataError("validation", `${label} can't be empty.`);
  if (text.length > maxLength) {
    throw new DataError(
      "validation",
      `${label} can be up to ${maxLength} characters.`,
    );
  }
  return text;
}
