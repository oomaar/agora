import { type PoolClient } from "pg";

// The pool or a client inside a transaction; repositories accept either.
export type Queryable = Pick<PoolClient, "query">;

// Repository queries select one JSON column named `view`, built by the SQL view functions.
export type ViewRow<T> = {
  view: T;
};

// Postgres column types for a bulk insert, keyed by column name.
export type ColumnTypes = Record<string, string>;

export type Migration = {
  name: string;
  sql: string;
};
