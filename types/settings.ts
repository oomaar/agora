import { type ReactNode } from "react";
import { type FieldErrors } from "@/types/auth";
import { type UserSettings, type UserView } from "@/types/domain";
import { type ProfileUpdate } from "@/types/dataSource";
import { type RovingItemProps } from "@/types/selection";
import { type Theme } from "@/types/theme";

export type SettingsSectionId =
  | "account"
  | "privacy"
  | "notifications"
  | "appearance"
  | "demo";

export type SettingsLayoutProps = {
  children: ReactNode;
};

export type SettingsSectionViewProps = {
  section: SettingsSectionId;
};

export type SettingsPanelProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export type SettingsQueryProps = {
  children: (settings: UserSettings) => ReactNode;
};

export type SettingRowProps = {
  label: string;
  hint: string;
  children: ReactNode;
};

export type NotificationSettingKey = "notifyLikes" | "notifyReplies" | "notifyFollows";

export type NotificationToggleItem = {
  key: NotificationSettingKey;
  label: string;
  hint: string;
};

export type ThemeOption = {
  value: Theme;
  label: string;
  // Classes for each half of the preview; one entry fills the whole swatch.
  swatches: string[];
};

export type ThemeCardProps = RovingItemProps & {
  option: ThemeOption;
  selected: boolean;
  onSelect: () => void;
};

export type AccountFormProps = {
  user: UserView;
};

export type ProfileField = keyof ProfileUpdate;

export type AccountForm = {
  values: ProfileUpdate;
  setValue: (field: ProfileField, value: string) => void;
  errors: FieldErrors<ProfileField>;
  formError: string | null;
  changed: boolean;
  saving: boolean;
  submit: () => void;
};
