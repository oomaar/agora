import { Avatar } from "@/components/ui/Avatar";
import { conversationTitle } from "@/utils/conversationTitle";
import { type ConversationAvatarProps } from "@/types/messages";

// The other person's avatar, or initials of the group's name.
export function ConversationAvatar({
  conversation,
  size = "md",
}: ConversationAvatarProps) {
  const [person] = conversation.members;
  return conversation.name || !person ? (
    <Avatar
      name={conversationTitle(conversation)}
      handle={conversation.id}
      size={size}
    />
  ) : (
    <Avatar
      name={person.name}
      handle={person.handle}
      src={person.avatarUrl}
      size={size}
    />
  );
}
