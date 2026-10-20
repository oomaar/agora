import { register } from "node:module";

// Loaded with `node --import` so scripts can import app code through the `@/` alias.
register("./hooks.ts", import.meta.url);
