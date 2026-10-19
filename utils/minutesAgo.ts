// ISO timestamp `minutes` before `now` (epoch ms).
export function minutesAgo(now: number, minutes: number): string {
  return new Date(now - minutes * 60_000).toISOString();
}
