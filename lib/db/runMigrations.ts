import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { type Pool } from "pg";
import { MIGRATIONS_TABLE } from "@/lib/db/constants";
import { withTransaction } from "@/lib/db/withTransaction";
import { type Migration } from "@/types/db";

// Migrations run in file-name order: 0001_auth.sql, 0002_social.sql …
async function readMigrations(dir: string): Promise<Migration[]> {
  const names = (await readdir(dir))
    .filter((name) => name.endsWith(".sql"))
    .sort();
  return Promise.all(
    names.map(async (name) => ({
      name,
      sql: await readFile(path.join(dir, name), "utf8"),
    })),
  );
}

// Applies each pending migration in its own transaction and returns the names applied.
export async function runMigrations(
  pool: Pool,
  dir: string,
): Promise<string[]> {
  await pool.query(
    `create table if not exists ${MIGRATIONS_TABLE} (
      name text primary key,
      applied_at timestamptz not null default now()
    )`,
  );
  const applied: string[] = [];
  for (const migration of await readMigrations(dir)) {
    const ran = await withTransaction(pool, async (client) => {
      // Two runs at once wait for each other instead of applying a file twice.
      await client.query("select pg_advisory_xact_lock(hashtext($1))", [
        MIGRATIONS_TABLE,
      ]);
      const done = await client.query(
        `select 1 from ${MIGRATIONS_TABLE} where name = $1`,
        [migration.name],
      );
      if (done.rowCount) return false;
      await client.query(migration.sql);
      await client.query(`insert into ${MIGRATIONS_TABLE} (name) values ($1)`, [
        migration.name,
      ]);
      return true;
    });
    if (ran) applied.push(migration.name);
  }
  return applied;
}
