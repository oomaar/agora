"use client";

import { useLayoutEffect, useRef } from "react";

// Keeps a scroll container at its end whenever `count` changes, e.g. a new message.
export function useScrollToEnd<T extends HTMLElement>(count: number) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [count]);
  return ref;
}
