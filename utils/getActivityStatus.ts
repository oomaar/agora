import { ACTIVE_NOW_MINUTES } from "@/lib/messages/constants";
import { type ConversationView, type MessageView } from "@/types/domain";
import { type ActivityStatus } from "@/types/messages";

// There's no presence tracking: a person is "Active now" when their latest message is recent.
export function getActivityStatus(
  conversation: ConversationView,
  messages: MessageView[],
): ActivityStatus {
  const [person, ...others] = conversation.members;
  if (!person || others.length) {
    return {
      label: `${conversation.members.length + 1} members`,
      active: false,
    };
  }
  const latest = messages.findLast((message) => message.senderId === person.id);
  const active =
    latest !== undefined &&
    Date.now() - new Date(latest.createdAt).getTime() <
      ACTIVE_NOW_MINUTES * 60_000;
  return active
    ? { label: "Active now", active: true }
    : { label: `@${person.handle}`, active: false };
}
