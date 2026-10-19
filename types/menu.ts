import { type ReactNode } from "react";
import { type IconName } from "@/types/icon";

export type MenuAlign = "start" | "end";

export type MenuSide = "bottom" | "top";

export type MenuItem = {
  id: string;
  label: string;
  icon?: IconName;
  danger?: boolean;
  onSelect: () => void;
};

export type MenuProps = {
  label: string;
  trigger: ReactNode;
  items: MenuItem[];
  align?: MenuAlign;
  side?: MenuSide;
  triggerClassName?: string;
  className?: string;
};
