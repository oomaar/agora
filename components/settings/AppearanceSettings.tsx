"use client";

import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { ThemeCard } from "@/components/settings/ThemeCard";
import { useRovingSelection } from "@/hooks/ui/useRovingSelection";
import { useTheme } from "@/hooks/ui/useTheme";
import { THEME_OPTIONS } from "@/lib/settings/constants";

// Saved on this device only.
export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const getItemProps = useRovingSelection(
    THEME_OPTIONS.map((option) => option.value),
    theme,
    setTheme,
  );
  return (
    <SettingsPanel
      title="Appearance"
      description="Dark is the default. System follows your device's setting. Saved on this device."
    >
      <div role="radiogroup" aria-label="Theme" className="flex gap-2">
        {THEME_OPTIONS.map((option) => (
          <ThemeCard
            key={option.value}
            option={option}
            selected={option.value === theme}
            onSelect={() => setTheme(option.value)}
            {...getItemProps(option.value)}
          />
        ))}
      </div>
    </SettingsPanel>
  );
}
