"use client";

import { useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
} from "@/lib/theme/constants";
import { type ResolvedTheme, type Theme } from "@/lib/theme/types";

const query = "(prefers-color-scheme: light)";

function subscribe(callback: () => void): () => void {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {}
  return DEFAULT_THEME;
}

function getResolvedTheme(): ResolvedTheme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function setTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function useTheme(): {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
} {
  const theme = useSyncExternalStore(subscribe, getTheme, () => DEFAULT_THEME);
  const resolvedTheme = useSyncExternalStore(
    subscribe,
    getResolvedTheme,
    (): ResolvedTheme => "dark",
  );
  return { theme, resolvedTheme, setTheme };
}
