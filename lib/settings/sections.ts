import { type ComponentType } from "react";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { DemoSettings } from "@/components/settings/DemoSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { type SettingsSectionId } from "@/types/settings";

export const SETTINGS_SECTION_COMPONENTS: Record<SettingsSectionId, ComponentType> = {
  account: AccountSettings,
  privacy: PrivacySettings,
  notifications: NotificationSettings,
  appearance: AppearanceSettings,
  demo: DemoSettings,
};
