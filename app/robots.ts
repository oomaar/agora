import { type MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site/siteUrl";

// The public pages and the demo can be crawled; the API can't.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/design-system"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
