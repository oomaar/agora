import { type ReactNode } from "react";
import { type ResolvedTheme } from "@/types/theme";

export type ColorToken = {
  name: string;
  dark: string;
  light: string;
  use: string;
  swatchClassName: string;
};

export type ColorGroup = {
  name: string;
  description: string;
  tokens: ColorToken[];
};

export type TypeStyle = {
  name: string;
  className: string;
  sample: string;
  spec: string;
};

export type SpacingStep = {
  name: string;
  px: number;
  barClassName: string;
  use: string;
};

export type RadiusStep = {
  name: string;
  px: string;
  className: string;
  use: string;
};

export type ShadowToken = {
  name: string;
  dark: string;
  light: string;
  use: string;
  className: string;
  darkSurfaceClassName: string;
};

export type ElevationStep = {
  name: string;
  className: string;
  use: string;
};

export type ContrastSample = {
  label: string;
  className: string;
};

export type SectionHeaderProps = {
  index: string;
  title: string;
  description?: string;
};

export type DsCardProps = {
  title?: string;
  // Replaces the default gap and padding.
  spacing?: string;
  // Content runs edge to edge; only the title keeps padding.
  flush?: boolean;
  className?: string;
  children: ReactNode;
};

export type ThemePanelProps = {
  theme: ResolvedTheme;
  // Replaces the default gap, padding and radius.
  spacing?: string;
  className?: string;
  children: ReactNode;
};

export type ThemedProps = {
  theme: ResolvedTheme;
};
