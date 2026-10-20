import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/getSession";
import { HOME_PATH } from "@/lib/auth/constants";

// The welcome and sign-up pages send signed-in visitors to the feed.
// Checked here rather than in the proxy, so a stale cookie can't cause a redirect loop.
export async function redirectIfSignedIn(): Promise<void> {
  if (await getSession()) redirect(HOME_PATH);
}
