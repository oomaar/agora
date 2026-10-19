// True when the pathname is one of the paths or nested under one.
export function matchesPath(pathname: string, paths: string[]): boolean {
  return paths.some(
    (path) =>
      pathname === path || (path !== "/" && pathname.startsWith(`${path}/`)),
  );
}
