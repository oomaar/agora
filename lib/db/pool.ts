import "server-only";
import { type Pool } from "pg";
import { createPool } from "@/lib/db/createPool";

const globalForDb = globalThis as typeof globalThis & { agoraPool?: Pool };

// One pool per server process, kept on globalThis so dev reloads reuse it.
export const pool = globalForDb.agoraPool ?? createPool();

if (process.env.NODE_ENV !== "production") globalForDb.agoraPool = pool;
