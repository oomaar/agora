// Averages loudness samples (0–1) into `bars` bars, scaled so the loudest is 1.
export function downsampleLevels(samples: number[], bars: number): number[] {
  if (!samples.length) return [];
  const count = Math.min(bars, samples.length);
  const averages = Array.from({ length: count }, (_, index) => {
    const start = Math.floor((index * samples.length) / count);
    const end = Math.max(
      start + 1,
      Math.floor(((index + 1) * samples.length) / count),
    );
    const slice = samples.slice(start, end);
    return slice.reduce((sum, level) => sum + level, 0) / slice.length;
  });
  const loudest = Math.max(...averages) || 1;
  return averages.map((level) => Math.round((level / loudest) * 100) / 100);
}
