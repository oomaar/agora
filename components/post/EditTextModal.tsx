"use client";

import { useState } from "react";
import { CharacterCounter } from "@/components/compose/CharacterCounter";
import { ComposeError } from "@/components/compose/ComposeError";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { type EditTextModalProps } from "@/types/owner";

// Starts from the current text each time it's mounted; Save needs a real change.
export function EditTextModal({
  open,
  title,
  label,
  initialText,
  maxLength,
  saving,
  error,
  onSave,
  onClose,
}: EditTextModalProps) {
  const [text, setText] = useState(initialText);
  const unchanged = text.trim() === initialText.trim();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <span className="ml-auto" />
          <CharacterCounter length={text.length} max={maxLength} />
          <Button
            variant="secondary"
            size="sm"
            disabled={saving}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            loading={saving}
            disabled={!text.trim() || text.length > maxLength || unchanged}
            onClick={() => onSave(text)}
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </>
      }
    >
      <div className="p-4.5">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          readOnly={saving}
          autoFocus
          aria-label={label}
          className="min-h-30 w-full resize-none bg-transparent text-[17px] leading-normal text-ag-text outline-none"
        />
      </div>
      {error && <ComposeError message={error} />}
    </Modal>
  );
}
