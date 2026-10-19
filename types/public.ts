import { type ReactNode } from "react";
import { type ScenarioId } from "@/types/simulation";

export type PublicSplitLayoutProps = {
  children: ReactNode;
};

export type DemoHighlight = {
  title: string;
  text: string;
};

export type ScenarioOptionProps = {
  scenario: ScenarioId;
  checked: boolean;
  onSelect: (scenario: ScenarioId) => void;
};
