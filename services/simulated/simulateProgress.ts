// Creeps towards 90% while a simulated upload waits on the network; returns a stop function.
export function simulateProgress(
  onProgress?: (percent: number) => void,
): () => void {
  if (!onProgress) return () => {};
  let percent = 0;
  const timer = setInterval(() => {
    percent += (90 - percent) * 0.25;
    onProgress(Math.round(percent));
  }, 100);
  return () => clearInterval(timer);
}
