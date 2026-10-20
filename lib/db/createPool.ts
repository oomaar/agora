import pg from "pg";
import { DB_POOL_MAX } from "@/lib/db/constants";

// Used by the app (lib/db/pool.ts) and by the migrate and seed scripts.
export function createPool(): pg.Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  return new pg.Pool({ connectionString, max: DB_POOL_MAX });
}
