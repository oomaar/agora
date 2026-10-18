import { type ResolvedTheme, type Theme } from "@/lib/theme/types";

export const THEME_STORAGE_KEY = "agora-theme";
export const THEME_CHANGE_EVENT = "agora-theme-change";
export const THEME_MEDIA_QUERY = "(prefers-color-scheme: light)";
export const DEFAULT_THEME: Theme = "dark";
export const DEFAULT_RESOLVED_THEME: ResolvedTheme = "dark";
