import { DEMO_PATH } from "@/lib/public/constants";
import { matchesPath } from "@/utils/matchesPath";

// Only paths on this site and outside the demo: "/settings/demo" passes;
// "//evil.example", "https://…" and "/demo/home" don't.
export function readReturnPath(
  value: string | null | undefined,
): string | null {
  if (
    !value?.startsWith("/") ||
    value.startsWith("//") ||
    value.startsWith("/\\")
  )
    return null;
  const pathname = value.split(/[?#]/)[0];
  return matchesPath(pathname, [DEMO_PATH]) ? null : value;
}
