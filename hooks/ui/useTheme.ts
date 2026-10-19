"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_RESOLVED_THEME, DEFAULT_THEME } from "@/lib/theme/constants";
import {
  getResolvedTheme,
  getTheme,
  setTheme,
  subscribe,
} from "@/lib/theme/themeStore";
import { type UseThemeResult } from "@/types/theme";

export function useTheme(): UseThemeResult {
  const theme = useSyncExternalStore(subscribe, getTheme, () => DEFAULT_THEME);
  const resolvedTheme = useSyncExternalStore(
    subscribe,
    getResolvedTheme,
    () => DEFAULT_RESOLVED_THEME,
  );
  return { theme, resolvedTheme, setTheme };
}
