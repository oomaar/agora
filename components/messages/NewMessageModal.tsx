"use client";

import { useEffect, useRef, useState } from "react";
import { useAppRouter } from "@/hooks/shell/useAppRouter";
import { NewMessagePeople } from "@/components/messages/NewMessagePeople";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";
import { useStartConversation } from "@/hooks/messages/useStartConversation";
import { useDebouncedValue } from "@/hooks/ui/useDebouncedValue";
import { PEOPLE_SEARCH_DELAY_MS } from "@/lib/messages/constants";
import { conversationPath } from "@/utils/conversationPath";
import { type UserView } from "@/types/domain";
import { type NewMessageModalProps } from "@/types/messages";

// Pick a person to open (or start) the conversation with them.
export function NewMessageModal({ open, onClose }: NewMessageModalProps) {
  const router = useAppRouter();
  const start = useStartConversation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const term = useDebouncedValue(search.trim(), PEOPLE_SEARCH_DELAY_MS);

  // Runs after the dialog opens, so the cursor lands in the search box.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = () => {
    setSearch("");
    setPendingId(null);
    onClose();
  };

  const pick = async (person: UserView) => {
    setPendingId(person.id);
    const conversation = await start.run(person);
    setPendingId(null);
    if (!conversation) return;
    close();
    router.push(conversationPath(conversation.id));
  };

  return (
    <Modal open={open} onClose={close} title="New message">
      <div className="px-4.5 pb-2 pt-4">
        <SearchInput
          ref={inputRef}
          label="Search people"
          placeholder="Search people"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {open && (
        <NewMessagePeople term={term} pendingId={pendingId} onPick={pick} />
      )}
    </Modal>
  );
}
