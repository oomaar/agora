export function removeSearchParam(
  pathname: string,
  search: string,
  key: string,
): string {
  const params = new URLSearchParams(search);
  params.delete(key);
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
