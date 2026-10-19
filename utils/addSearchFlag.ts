// Appends a value-less param (`?compose`, not `?compose=`), keeping the others.
export function addSearchFlag(
  pathname: string,
  search: string,
  key: string,
): string {
  const params = new URLSearchParams(search);
  params.delete(key);
  const query = params.toString();
  return `${pathname}?${query ? `${query}&` : ""}${key}`;
}
