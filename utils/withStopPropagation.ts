import { type SyntheticEvent } from "react";

// For controls inside a clickable container: run the callback without
// triggering the container's own click.
export function withStopPropagation(callback?: () => void) {
  return (event: SyntheticEvent) => {
    event.stopPropagation();
    callback?.();
  };
}
