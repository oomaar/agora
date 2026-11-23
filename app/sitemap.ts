import { type MetadataRoute } from "next";
import { SIGNUP_PATH, WELCOME_PATH } from "@/lib/auth/constants";
import { DEMO_PATH } from "@/lib/public/constants";
import { SITE_URL } from "@/lib/site/siteUrl";

// Only the pages anyone can open; everything else needs an account.
export default function sitemap(): MetadataRoute.Sitemap {
  return [WELCOME_PATH, SIGNUP_PATH, DEMO_PATH].map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
  }));
}
