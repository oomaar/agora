import { RETURN_PATH_STORAGE_KEY } from "@/lib/demo/constants";

// Kept for the tab only. Storage can be blocked (private windows, cleared site data),
// in which case Exit demo falls back to the welcome page.
export function saveReturnPath(path: string) {
  try {
    sessionStorage.setItem(RETURN_PATH_STORAGE_KEY, path);
  } catch {}
}

export function loadReturnPath(): string | null {
  try {
    return sessionStorage.getItem(RETURN_PATH_STORAGE_KEY);
  } catch {
    return null;
  }
}
