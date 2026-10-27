import { type ConversationView } from "@/types/domain";

// Group conversations have a name; one-to-one conversations use the other member's.
export function conversationTitle(conversation: ConversationView): string {
  return (
    conversation.name ??
    conversation.members.map((member) => member.name).join(", ")
  );
}
