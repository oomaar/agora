import { type ReactNode } from "react";

export type ToastKind = "success" | "error";

export type ToastItem = {
  id: number;
  kind: ToastKind;
  message: string;
};

export type ToastContextValue = {
  show: (kind: ToastKind, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  dismiss: (id: number) => void;
};

export type ToastProps = {
  kind: ToastKind;
  message: string;
  className?: string;
};

export type ToastViewportProps = {
  toasts: ToastItem[];
};

export type ToastKindConfig = {
  className: string;
  dotClassName: string;
};

export type ToastProviderProps = {
  children: ReactNode;
};
