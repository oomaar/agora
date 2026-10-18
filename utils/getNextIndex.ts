// Maps navigation keys to the next index in a list, wrapping at both ends.
export function getNextIndex(key: string, current: number, length: number): number | null {
  if (length === 0) return null;
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % length;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + length) % length;
    case "Home":
      return 0;
    case "End":
      return length - 1;
    default:
      return null;
  }
}
