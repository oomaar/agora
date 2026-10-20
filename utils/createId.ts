// "post" → "post_3f2b…": prefixed like every other id, so the query cache can tell entities apart.
export function createId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`;
}
