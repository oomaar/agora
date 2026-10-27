"use client";

import { createContext } from "react";
import { useComposer } from "@/hooks/posts/useComposer";
import { type Composer, type ComposerProviderProps } from "@/types/compose";

export const ComposerContext = createContext<Composer | null>(null);

// One draft for the whole app shell, so the feed's Photo and Video buttons can
// attach a file before the compose modal opens.
export function ComposerProvider({ children }: ComposerProviderProps) {
  const composer = useComposer();
  return (
    <ComposerContext.Provider value={composer}>
      {children}
    </ComposerContext.Provider>
  );
}
