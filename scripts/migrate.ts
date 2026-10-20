import { createPool } from "@/lib/db/createPool";
import { MIGRATIONS_DIR } from "@/lib/db/constants";
import { runMigrations } from "@/lib/db/runMigrations";

// npm run db:migrate
const pool = createPool();
try {
  const applied = await runMigrations(pool, MIGRATIONS_DIR);
  console.log(
    applied.length
      ? `Applied ${applied.length} migration(s): ${applied.join(", ")}`
      : "The database is up to date.",
  );
} finally {
  await pool.end();
}
