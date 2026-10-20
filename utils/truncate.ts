// Cuts text to `max` characters, ending with an ellipsis when shortened.
export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
