import { NO_MESSAGES_PREVIEW } from "@/lib/messages/constants";
import { attachmentSummary } from "@/utils/attachmentSummary";
import { firstName } from "@/utils/firstName";
import { type ConversationView } from "@/types/domain";

// "You: See you there", "Nadia: pushed the fix" in groups, or the text alone.
// A message without text shows its attachments: "Photo", "Voice note · 0:12".
export function conversationPreview(conversation: ConversationView): string {
  const { lastMessage, members, name } = conversation;
  if (!lastMessage) return NO_MESSAGES_PREVIEW;
  const text = lastMessage.text || attachmentSummary(lastMessage.attachments);
  // Members leave out the signed-in user, so an unknown sender is them.
  const sender = members.find((member) => member.id === lastMessage.senderId);
  if (!sender) return `You: ${text}`;
  return name ? `${firstName(sender.name)}: ${text}` : text;
}
