import { type ConversationView } from "@/types/domain";

// Sorts conversations by their latest message, newest first.
export function byLatestMessage(
  a: ConversationView,
  b: ConversationView,
): number {
  return (b.lastMessage?.createdAt ?? "").localeCompare(
    a.lastMessage?.createdAt ?? "",
  );
}
