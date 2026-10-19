// Returns `value` with every object whose id matches replaced by `update(object)`.
// Untouched branches keep their identity, so unchanged queries don't re-render.
export function replaceEntity<T>(
  value: T,
  id: string,
  update: (entity: { id: string }) => { id: string },
): T {
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const replaced = replaceEntity(item, id, update);
      if (replaced !== item) changed = true;
      return replaced;
    });
    return (changed ? next : value) as T;
  }
  if (value === null || typeof value !== "object") return value;
  let changed = false;
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    const replaced = replaceEntity(child, id, update);
    if (replaced !== child) changed = true;
    next[key] = replaced;
  }
  const result = changed ? next : (value as Record<string, unknown>);
  return (result.id === id ? update(result as { id: string }) : result) as T;
}
