import { type ReactNode } from "react";
import { type ActivityEntry } from "@/types/simulation";

export type AppMode = "app" | "demo";

export type ModeOnlyProps = {
  // Renders the children only in this mode.
  mode: AppMode;
  children: ReactNode;
};

export type DemoProvidersProps = {
  children: ReactNode;
};

export type ActivityListProps = {
  entries: ActivityEntry[];
};

export type DemoLandingProps = {
  // Where Back and Exit demo lead.
  returnPath: string;
};
