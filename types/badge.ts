import { type ReactNode } from "react";

export type BadgeVariant = "demo" | "demoSoft" | "accent" | "outline";

export type BadgeProps = {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
};

export type CounterTone = "accent" | "neutral";

export type CounterProps = {
  value: number;
  max?: number;
  tone?: CounterTone;
  label?: string;
  className?: string;
};
