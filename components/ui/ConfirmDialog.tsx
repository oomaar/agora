"use client";

import { ComposeError } from "@/components/compose/ComposeError";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { type ConfirmDialogProps } from "@/types/modal";

// Asks before something that can't be undone; the danger button confirms.
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  busy,
  error,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <span className="ml-auto" />
          <Button
            variant="secondary"
            size="sm"
            disabled={busy}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="danger" size="sm" loading={busy} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="px-4.5 py-4 text-body-sm text-ag-text-secondary">
        {description}
      </p>
      {error && <ComposeError message={error} />}
    </Modal>
  );
}
