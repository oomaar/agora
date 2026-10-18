// Small marks need thicker strokes to stay legible.
export function getLogoStrokeWidth(size: number): number {
  if (size < 20) return 2.8;
  if (size >= 40) return 2.2;
  return 2.4;
}
