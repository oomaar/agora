import { SETTINGS_SECTION_COMPONENTS } from "@/lib/settings/sections";
import { type SettingsSectionViewProps } from "@/types/settings";

export function SettingsSectionView({ section }: SettingsSectionViewProps) {
  const Section = SETTINGS_SECTION_COMPONENTS[section];
  return <Section />;
}
