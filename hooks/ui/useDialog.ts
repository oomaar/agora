"use client";

import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from "react";

// Syncs a native <dialog> with React state. The browser provides the focus trap,
// Escape handling, top layer and ::backdrop.
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return {
    ref,
    // Escape: let React state drive the close.
    onCancel: (event: SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      onClose();
    },
    // The browser can still force-close (e.g. repeated Escape); keep state in sync.
    onClose: () => {
      if (open) onClose();
    },
    // A click on the dialog element itself is a click on the backdrop.
    onClick: (event: MouseEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
  };
}
