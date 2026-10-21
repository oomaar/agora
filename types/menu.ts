import { type ReactNode } from "react";
import { type IconName } from "@/types/icon";

export type MenuAlign = "start" | "end";

export type MenuSide = "bottom" | "top";

export type MenuTriggerVariant = "icon" | "chip";

export type MenuItem = {
  id: string;
  label: string;
  icon?: IconName;
  danger?: boolean;
  // Set on every item to make the menu a single choice; the selected one shows a check.
  selected?: boolean;
  onSelect: () => void;
};

export type MenuProps = {
  label: string;
  trigger: ReactNode;
  items: MenuItem[];
  align?: MenuAlign;
  side?: MenuSide;
  triggerVariant?: MenuTriggerVariant;
  triggerClassName?: string;
  className?: string;
};
