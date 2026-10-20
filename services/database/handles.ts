import "server-only";
import { query } from "@/lib/db/query";
import { HANDLE_SUFFIX_ATTEMPTS } from "@/lib/api/constants";
import { toHandle } from "@/utils/toHandle";
import { type Queryable } from "@/types/db";

export async function isHandleTaken(
  handle: string,
  db?: Queryable,
): Promise<boolean> {
  const rows = await query(
    "select 1 from users where handle = $1",
    [handle],
    db,
  );
  return rows.length > 0;
}

// "Omar Ali" → "omar.ali", or "omar.ali4821" when that's taken. Used for Google sign-ups, which don't pick a handle.
export async function findAvailableHandle(source: string): Promise<string> {
  const base = toHandle(source).slice(0, 24).replace(/\.$/, "");
  const root = base.length >= 2 ? base : "member";
  const candidates = [
    root,
    ...Array.from(
      { length: HANDLE_SUFFIX_ATTEMPTS },
      () => `${root}${Math.floor(1000 + Math.random() * 9000)}`,
    ),
  ];
  const taken = new Set(
    (
      await query<{ handle: string }>(
        "select handle from users where handle = any($1)",
        [candidates],
      )
    ).map((row) => row.handle),
  );
  const available = candidates.find((candidate) => !taken.has(candidate));
  if (!available) throw new Error(`No free handle found for "${root}".`);
  return available;
}
