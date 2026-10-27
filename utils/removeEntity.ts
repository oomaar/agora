// Returns `value` with every object whose id matches dropped from the lists it's in.
// Untouched branches keep their identity, like replaceEntity.
export function removeEntity<T>(value: T, id: string): T {
  if (Array.isArray(value)) {
    let changed = false;
    const next: unknown[] = [];
    for (const item of value) {
      if ((item as { id?: unknown } | null)?.id === id) {
        changed = true;
        continue;
      }
      const kept = removeEntity(item, id);
      if (kept !== item) changed = true;
      next.push(kept);
    }
    return (changed ? next : value) as T;
  }
  if (value === null || typeof value !== "object") return value;
  let changed = false;
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    const kept = removeEntity(child, id);
    if (kept !== child) changed = true;
    next[key] = kept;
  }
  return (changed ? next : value) as T;
}
