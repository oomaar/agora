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

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  busy: boolean;
  error: string | null;
  onConfirm: () => void;
  onClose: () => void;
};
