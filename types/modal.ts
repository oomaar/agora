import { type ReactNode } from "react";

export type ModalVariant = "modal" | "sheet";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  variant?: ModalVariant;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
};
