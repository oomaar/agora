// Connections per server instance; Neon's pooled endpoint shares them across instances.
export const DB_POOL_MAX = 5;

export const MIGRATIONS_DIR = "db/migrations";

export const MIGRATIONS_TABLE = "schema_migrations";

// Postgres error code for a unique constraint violation.
export const UNIQUE_VIOLATION = "23505";
