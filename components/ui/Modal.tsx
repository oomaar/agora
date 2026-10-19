"use client";

import { useId } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { useDialog } from "@/hooks/ui/useDialog";
import { cn } from "@/utils/cn";
import { type ModalProps } from "@/types/modal";

export function Modal({
  open,
  onClose,
  title,
  variant = "modal",
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
        isSheet
          ? "mx-0 mb-0 mt-auto w-full max-w-none rounded-t-[22px] border border-b-0 border-ag-border bg-ag-surface shadow-ag-xl"
          : "mx-auto mb-auto mt-20 w-145 max-w-[calc(100%-32px)] rounded-2xl elev-2",
        className,
      )}
    >
      <div className="flex flex-col">
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
        {children}
        {footer && (
          <div className="flex items-center gap-2 border-t border-ag-border-subtle px-4.5 py-3">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
