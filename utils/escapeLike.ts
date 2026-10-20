// "100%_done" → "100\%\_done", so search text matches literally inside ILIKE.
export function escapeLike(term: string): string {
  return term.replace(/[\\%_]/g, "\\$&");
}
