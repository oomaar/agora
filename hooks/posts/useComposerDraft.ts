"use client";

import { useContext } from "react";
import { ComposerContext } from "@/context/ComposerContext";
import { type Composer } from "@/types/compose";

export function useComposerDraft(): Composer {
  const context = useContext(ComposerContext);
  if (!context) {
    throw new Error("useComposerDraft must be used inside <ComposerProvider>");
  }
  return context;
}
