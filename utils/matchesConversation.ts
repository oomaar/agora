import { conversationTitle } from "@/utils/conversationTitle";
import { type ConversationView } from "@/types/domain";

// Matches the title, a member's handle or the last message, ignoring case.
export function matchesConversation(
  conversation: ConversationView,
  search: string,
): boolean {
  const term = search.trim().toLowerCase();
  if (!term) return true;
  return [
    conversationTitle(conversation),
    ...conversation.members.map((member) => member.handle),
    conversation.lastMessage?.text ?? "",
  ].some((field) => field.toLowerCase().includes(term));
}
