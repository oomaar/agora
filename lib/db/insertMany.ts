import { type ColumnTypes, type Queryable } from "@/types/db";

// One INSERT for all rows: each column is sent as a typed array and unnested back into rows.
// Table and column names come from code, never from input.
export async function insertMany(
  db: Queryable,
  table: string,
  columns: ColumnTypes,
  rows: Record<string, unknown>[],
): Promise<void> {
  if (!rows.length) return;
  const names = Object.keys(columns);
  const arrays = names.map((name) => rows.map((row) => row[name] ?? null));
  const unnest = names
    .map((name, index) => `$${index + 1}::${columns[name]}[]`)
    .join(", ");
  await db.query(
    `insert into ${table} (${names.join(", ")}) select * from unnest(${unnest})`,
    arrays,
  );
}
