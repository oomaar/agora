import { type KeyboardEvent } from "react";

export type RovingItemProps = {
  tabIndex: number;
  ref: (element: HTMLElement | null) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
};
