"use client";

import { SettingRow } from "@/components/settings/SettingRow";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SettingsQuery } from "@/components/settings/SettingsQuery";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useUpdateSettings } from "@/hooks/settings/useUpdateSettings";
import { AUDIENCE_OPTIONS } from "@/lib/settings/constants";

export function PrivacySettings() {
  const update = useUpdateSettings();
  return (
    <SettingsPanel
      title="Privacy & safety"
      description="Control who sees what you share."
    >
      <SettingsQuery>
        {(settings) => (
          <SettingRow
            label="Default audience"
            hint="Who can see your new posts. You can still change it for each post."
          >
            <SegmentedControl
              label="Default audience"
              options={AUDIENCE_OPTIONS}
              value={settings.defaultAudience}
              onChange={(defaultAudience) => update.run({ defaultAudience })}
              className="w-full flex-none sm:w-56"
            />
          </SettingRow>
        )}
      </SettingsQuery>
    </SettingsPanel>
  );
}
