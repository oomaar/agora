import { type MetadataRoute } from "next";
import { WELCOME_PATH } from "@/lib/auth/constants";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  THEME_ACCENT,
  THEME_BACKGROUND,
} from "@/lib/site/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: WELCOME_PATH,
    display: "standalone",
    background_color: THEME_BACKGROUND,
    theme_color: THEME_ACCENT,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
