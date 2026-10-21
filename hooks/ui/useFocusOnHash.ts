"use client";

import { useEffect, useRef } from "react";

// Focuses the element on mount when the URL's hash names it, e.g. /post/1#reply.
export function useFocusOnHash<T extends HTMLElement>(hash: string) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (window.location.hash === `#${hash}`) ref.current?.focus();
  }, [hash]);
  return ref;
}
