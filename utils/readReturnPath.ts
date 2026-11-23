import { DEMO_PATH } from "@/lib/public/constants";
import { matchesPath } from "@/utils/matchesPath";

// Resolved against a placeholder origin: anything that leaves it ("//evil.example",
// "https://…", "/\t/evil.example") is another site.
const BASE_ORIGIN = "https://agora.invalid";

// Only paths on this site and outside the demo: "/settings/demo" passes;
// other sites and "/demo/home" don't.
export function readReturnPath(
  value: string | null | undefined,
): string | null {
  if (!value?.startsWith("/")) return null;
  let url: URL;
  try {
    url = new URL(value, BASE_ORIGIN);
  } catch {
    return null;
  }
  if (url.origin !== BASE_ORIGIN) return null;
  if (matchesPath(url.pathname, [DEMO_PATH])) return null;
  return `${url.pathname}${url.search}${url.hash}`;
}
