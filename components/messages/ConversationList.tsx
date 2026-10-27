"use client";

import { useState } from "react";
import { ConversationListBody } from "@/components/messages/ConversationListBody";
import { NewMessageModal } from "@/components/messages/NewMessageModal";
import { IconButton } from "@/components/ui/IconButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { cn } from "@/utils/cn";
import { type ConversationListProps } from "@/types/messages";

export function ConversationList({
  activeId,
  className,
}: ConversationListProps) {
  const [search, setSearch] = useState("");
  const [composing, setComposing] = useState(false);
  return (
    <aside
      aria-label="Conversations"
      className={cn(
        "w-full flex-col border-ag-border-subtle sm:w-70 sm:flex-none sm:border-r nav:w-80",
        className,
      )}
    >
      <div className="flex flex-none items-center justify-between px-4 pb-2.5 pt-4">
        <h1 className="text-h3">Messages</h1>
        <IconButton
          icon="plus"
          label="New message"
          variant="outline"
          size="sm"
          onClick={() => setComposing(true)}
        />
      </div>
      <SearchInput
        label="Search messages"
        placeholder="Search messages"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        wrapperClassName="mx-4 mb-2.5 flex-none"
      />
      <ConversationListBody
        activeId={activeId}
        search={search}
        onNewMessage={() => setComposing(true)}
      />
      <NewMessageModal open={composing} onClose={() => setComposing(false)} />
    </aside>
  );
}
