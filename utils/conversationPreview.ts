import { NO_MESSAGES_PREVIEW } from "@/lib/messages/constants";
import { firstName } from "@/utils/firstName";
import { type ConversationView } from "@/types/domain";

// "You: See you there", "Nadia: pushed the fix" in groups, or the text alone.
export function conversationPreview(conversation: ConversationView): string {
  const { lastMessage, members, name } = conversation;
  if (!lastMessage) return NO_MESSAGES_PREVIEW;
  // Members leave out the signed-in user, so an unknown sender is them.
  const sender = members.find((member) => member.id === lastMessage.senderId);
  if (!sender) return `You: ${lastMessage.text}`;
  return name
    ? `${firstName(sender.name)}: ${lastMessage.text}`
    : lastMessage.text;
}
