import {
  DEFAULT_THEME,
  THEME_CHANGE_EVENT,
  THEME_MEDIA_QUERY,
  THEME_STORAGE_KEY,
} from "@/lib/theme/constants";
import { type ResolvedTheme, type Theme } from "@/types/theme";

export function subscribe(callback: () => void): () => void {
  const media = window.matchMedia(THEME_MEDIA_QUERY);
  media.addEventListener("change", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {}
  return DEFAULT_THEME;
}

// The inline theme script owns the <html> class, so read the applied result.
export function getResolvedTheme(): ResolvedTheme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function setTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
