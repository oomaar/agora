"use client";

import { useParams } from "next/navigation";
import { ConversationList } from "@/components/messages/ConversationList";
import { cn } from "@/utils/cn";
import { type MessagesLayoutProps } from "@/types/messages";

// List and thread side by side; on phones only one shows: the list, or the open thread.
// The height leaves room for the bottom tab bar below `sm` and the demo bar above.
export function MessagesLayout({ children }: MessagesLayoutProps) {
  const params = useParams<{ id?: string }>();
  const activeId = params.id ?? null;
  return (
    <div className="flex h-[calc(100dvh-78px-var(--ag-shell-top,0px))] sm:h-[calc(100dvh-var(--ag-shell-top,0px))]">
      <ConversationList
        activeId={activeId}
        className={activeId ? "hidden sm:flex" : "flex"}
      />
      <section
        aria-label="Conversation"
        className={cn(
          "min-w-0 flex-1 flex-col",
          activeId ? "flex" : "hidden sm:flex",
        )}
      >
        {children}
      </section>
    </div>
  );
}
