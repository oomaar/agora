let counter = 0;

// Client-side id for optimistic items until the server returns the real one.
export function createTempId(): string {
  counter += 1;
  return `temp_${counter}`;
}
