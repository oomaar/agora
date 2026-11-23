// The loudness (0–1) of one buffer of microphone samples (bytes centred on 128),
// boosted so ordinary speech fills most of a bar.
export function readLevel(buffer: Uint8Array): number {
  let sum = 0;
  for (const sample of buffer) {
    const value = (sample - 128) / 128;
    sum += value * value;
  }
  return Math.min(1, Math.sqrt(sum / buffer.length) * 4);
}
