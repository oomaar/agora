"use client";

import { useRef, type KeyboardEvent } from "react";
import { getNextIndex } from "@/utils/getNextIndex";
import { type RovingItemProps } from "@/types/selection";

// One tab stop for the group; arrow keys, Home and End move and select.
export function useRovingSelection<T extends string>(
  ids: T[],
  value: T,
  onChange: (id: T) => void,
): (id: T) => RovingItemProps {
  const elements = useRef(new Map<T, HTMLElement>());

  return (id) => ({
    tabIndex: id === value ? 0 : -1,
    ref: (element) => {
      if (element) elements.current.set(id, element);
      else elements.current.delete(id);
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      const next = getNextIndex(event.key, ids.indexOf(id), ids.length);
      if (next === null) return;
      event.preventDefault();
      const nextId = ids[next];
      onChange(nextId);
      elements.current.get(nextId)?.focus();
    },
  });
}
