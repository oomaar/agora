import "server-only";
import { type PoolClient, type QueryResultRow } from "pg";
import { DataError } from "@/services/dataError";
import { pool } from "@/lib/db/pool";
import { withTransaction } from "@/lib/db/withTransaction";
import { type Queryable, type ViewRow } from "@/types/db";

export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = [],
  db: Queryable = pool,
): Promise<T[]> {
  const result = await db.query<T>(text, params);
  return result.rows;
}

export async function selectViews<T>(
  text: string,
  params: unknown[],
  db: Queryable = pool,
): Promise<T[]> {
  const rows = await query<ViewRow<T>>(text, params, db);
  return rows.map((row) => row.view);
}

// The first view, or a not-found error with `missing` as its message.
export async function selectView<T>(
  text: string,
  params: unknown[],
  missing: string,
  db: Queryable = pool,
): Promise<T> {
  const [view] = await selectViews<T>(text, params, db);
  if (view === undefined) throw new DataError("not-found", missing);
  return view;
}

export function transaction<T>(
  work: (client: PoolClient) => Promise<T>,
): Promise<T> {
  return withTransaction(pool, work);
}
