"use client";

import { SettingRow } from "@/components/settings/SettingRow";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SettingsQuery } from "@/components/settings/SettingsQuery";
import { Toggle } from "@/components/ui/Toggle";
import { useUpdateSettings } from "@/hooks/settings/useUpdateSettings";
import { NOTIFICATION_TOGGLES } from "@/lib/settings/constants";

export function NotificationSettings() {
  const update = useUpdateSettings();
  return (
    <SettingsPanel
      title="Notifications"
      description="Choose which activity shows up in your notifications."
    >
      <SettingsQuery>
        {(settings) => (
          <div className="flex flex-col">
            {NOTIFICATION_TOGGLES.map((toggle) => (
              <SettingRow
                key={toggle.key}
                label={toggle.label}
                hint={toggle.hint}
              >
                <Toggle
                  label={toggle.label}
                  checked={settings[toggle.key]}
                  onChange={(checked) => update.run({ [toggle.key]: checked })}
                />
              </SettingRow>
            ))}
          </div>
        )}
      </SettingsQuery>
    </SettingsPanel>
  );
}
