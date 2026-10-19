"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useCompose } from "@/hooks/useCompose";
import { CURRENT_USER } from "@/lib/shell/constants";

export function ComposeModal() {
  const { isOpen, close } = useCompose();
  const [draft, setDraft] = useState("");
  return (
    <Modal
      open={isOpen}
      onClose={close}
      title="New post"
      footer={
        // Publishing is wired up with the data layer in Phase 5.6.
        <Button pill className="ml-auto" disabled>
          Post
        </Button>
      }
    >
      <div className="flex gap-3 p-4.5">
        <Avatar name={CURRENT_USER.name} handle={CURRENT_USER.handle} />
        <div className="flex flex-1 flex-col gap-3">
          <Badge variant="accent" className="self-start">
            Everyone
          </Badge>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Post text"
            placeholder="What's happening in the square?"
            className="min-h-30 w-full resize-none bg-transparent text-[18px] leading-normal text-ag-text outline-none placeholder:text-ag-text-placeholder"
          />
        </div>
      </div>
    </Modal>
  );
}
