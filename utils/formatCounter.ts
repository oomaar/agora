export function formatCounter(value: number, max: number): string {
  return value > max ? `${max}+` : String(value);
}
