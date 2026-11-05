"use client";

import { useId } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { useDialog } from "@/hooks/ui/useDialog";
import {
  DIALOG_FADE,
  MODAL_FULL_SCREEN_ON_PHONE,
  MODAL_VARIANTS,
} from "@/lib/ui/modal";
import { cn } from "@/utils/cn";
import { type ModalProps } from "@/types/modal";

export function Modal({
  open,
  onClose,
  title,
  variant = "modal",
  fullScreenOnPhone = false,
  footer,
  className,
  children,
}: ModalProps) {
  const titleId = useId();
  const {
    ref,
    onCancel,
    onClose: onDialogClose,
    onClick,
  } = useDialog(open, onClose);
  const isSheet = variant === "sheet";
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={onCancel}
      onClose={onDialogClose}
      onClick={onClick}
      className={cn(
        "p-0 text-ag-text backdrop:bg-ag-scrim",
        DIALOG_FADE,
        MODAL_VARIANTS[variant],
        fullScreenOnPhone && MODAL_FULL_SCREEN_ON_PHONE,
        className,
      )}
    >
      <div
        className={cn("flex flex-col", fullScreenOnPhone && "max-sm:h-full")}
      >
        {isSheet && (
          <span
            aria-hidden="true"
            className="mt-2.5 h-1 w-10 self-center rounded-[2px] bg-ag-border-strong"
          />
        )}
        <div
          className={cn(
            "flex items-center justify-between gap-4 px-4.5 py-3.5",
            !isSheet && "border-b border-ag-border-subtle",
          )}
        >
          <h2
            id={titleId}
            className={isSheet ? "text-[17px] font-semibold" : "text-title"}
          >
            {title}
          </h2>
          <IconButton
            icon="close"
            label="Close"
            variant="soft"
            size="sm"
            onClick={onClose}
          />
        </div>
        {fullScreenOnPhone ? (
          <div className="max-sm:min-h-0 max-sm:flex-1 max-sm:overflow-y-auto">
            {children}
          </div>
        ) : (
          children
        )}
        {footer && (
          <div className="flex items-center gap-2 border-t border-ag-border-subtle px-4.5 pb-[max(--spacing(3),env(safe-area-inset-bottom))] pt-3">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
