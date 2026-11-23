"use client";

import { useLayoutEffect, useRef } from "react";

// Keeps a scroll container at its end whenever `trigger` changes, e.g. a new
// message or someone starting to type.
export function useScrollToEnd<T extends HTMLElement>(
  trigger: string | number,
) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [trigger]);
  return ref;
}
