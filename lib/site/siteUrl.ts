// Where the site lives, for absolute links in metadata (Open Graph, sitemap).
// Vercel sets the production domain; locally it's BETTER_AUTH_URL or localhost.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.BETTER_AUTH_URL ?? "http://localhost:3000");
