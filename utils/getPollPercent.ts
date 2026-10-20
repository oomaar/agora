// Whole-number share of the votes; 0 before anyone has voted.
export function getPollPercent(votes: number, total: number): number {
  return total === 0 ? 0 : Math.round((votes / total) * 100);
}
