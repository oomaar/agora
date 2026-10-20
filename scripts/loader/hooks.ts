import { existsSync, statSync } from "node:fs";
import { type ResolveHook } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../../", import.meta.url);

// "@/lib/db/pool" → lib/db/pool.ts, the same alias tsconfig gives Next.js.
const CANDIDATE_SUFFIXES = ["", ".ts", "/index.ts"];

function isFile(url: URL): boolean {
  const filePath = fileURLToPath(url);
  return existsSync(filePath) && statSync(filePath).isFile();
}

export const resolve: ResolveHook = (specifier, context, nextResolve) => {
  if (!specifier.startsWith("@/")) return nextResolve(specifier, context);
  const base = new URL(specifier.slice(2), ROOT).href;
  for (const suffix of CANDIDATE_SUFFIXES) {
    const url = new URL(base + suffix);
    if (isFile(url)) return { url: url.href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
};
