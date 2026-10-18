import { type ReactNode } from "react";
import { type IconName } from "@/types/icon";

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: IconName;
  actions?: ReactNode;
  compact?: boolean;
  className?: string;
};

export type ErrorStateProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  compact?: boolean;
  className?: string;
};
