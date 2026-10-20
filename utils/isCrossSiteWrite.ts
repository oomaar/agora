const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];

// A write whose Origin isn't this site. The session cookie is SameSite=Lax already;
// this is a second check against cross-site request forgery.
export function isCrossSiteWrite(request: Request): boolean {
  if (SAFE_METHODS.includes(request.method)) return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== request.headers.get("host");
  } catch {
    return true;
  }
}
