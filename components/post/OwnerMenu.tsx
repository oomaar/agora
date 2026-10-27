"use client";

import { useState } from "react";
import { EditTextModal } from "@/components/post/EditTextModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Icon } from "@/components/ui/Icon";
import { Menu } from "@/components/ui/Menu";
import { OWNED_LABELS } from "@/lib/posts/owner";
import { type OwnerDialog, type OwnerMenuProps } from "@/types/owner";

// The ⋯ menu on your own post or comment: Edit opens the text, Delete asks first.
// Clicks stay inside, so a post card behind it doesn't open.
export function OwnerMenu({ actions }: OwnerMenuProps) {
  const [dialog, setDialog] = useState<OwnerDialog>(null);
  // Remounts the edit dialog so it starts from the current text.
  const [editCount, setEditCount] = useState(0);
  const { title, deleteDescription } = OWNED_LABELS[actions.noun];
  const busy = actions.saving || actions.deleting;

  const close = () => {
    if (busy) return;
    actions.resetErrors();
    setDialog(null);
  };

  return (
    <span onClick={(event) => event.stopPropagation()} className="flex-none">
      <Menu
        label={`${title} options`}
        trigger={<Icon name="more" size={18} />}
        align="end"
        items={[
          {
            id: "edit",
            label: "Edit",
            onSelect: () => {
              setEditCount((count) => count + 1);
              setDialog("edit");
            },
          },
          {
            id: "delete",
            label: "Delete",
            danger: true,
            onSelect: () => setDialog("delete"),
          },
        ]}
      />
      <EditTextModal
        key={editCount}
        open={dialog === "edit"}
        title={`Edit ${actions.noun}`}
        label={`${title} text`}
        initialText={actions.text}
        maxLength={actions.maxLength}
        saving={actions.saving}
        error={actions.saveError}
        onSave={async (text) => {
          if (await actions.save(text)) setDialog(null);
        }}
        onClose={close}
      />
      <ConfirmDialog
        open={dialog === "delete"}
        title={`Delete ${actions.noun}?`}
        description={deleteDescription}
        confirmLabel="Delete"
        busy={actions.deleting}
        error={actions.deleteError}
        onConfirm={async () => {
          if (await actions.remove()) setDialog(null);
        }}
        onClose={close}
      />
    </span>
  );
}
