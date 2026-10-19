export function isNavItemActive(pathname: string, match: string[]): boolean {
  return match.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
