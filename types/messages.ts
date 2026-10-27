import { type ReactNode } from "react";
import { type AvatarSize } from "@/types/avatar";
import {
  type ConversationView,
  type MessageView,
  type UserView,
} from "@/types/domain";

export type MessagesLayoutProps = {
  children: ReactNode;
};

export type ConversationListProps = {
  // The conversation open in the thread pane, if any.
  activeId: string | null;
  className?: string;
};

export type ConversationListBodyProps = {
  activeId: string | null;
  search: string;
  onNewMessage: () => void;
};

export type ConversationRowProps = {
  conversation: ConversationView;
  active: boolean;
};

export type ConversationAvatarProps = {
  conversation: ConversationView;
  size?: AvatarSize;
};

export type NewMessageModalProps = {
  open: boolean;
  onClose: () => void;
};

export type NewMessagePeopleProps = {
  term: string;
  // The person whose conversation is being opened.
  pendingId: string | null;
  onPick: (person: UserView) => void;
};

export type ChatThreadProps = {
  conversationId: string;
};

export type ChatHeaderProps = {
  conversation: ConversationView;
  messages: MessageView[];
};

export type ChatMessagesProps = {
  conversation: ConversationView;
  messages: MessageView[];
  onRetry: (message: MessageView) => void;
};

export type MessageBubbleProps = {
  message: MessageView;
  // Shown above messages from others in group conversations.
  sender: UserView | null;
  // The latest message, when it's yours and has arrived.
  delivered: boolean;
  onRetry: (message: MessageView) => void;
};

export type DaySeparatorProps = {
  label: string;
};

export type ChatComposerProps = {
  onSend: (text: string) => void;
};

export type MessageDay = {
  key: string;
  label: string;
  messages: MessageView[];
};

export type ActivityStatus = {
  label: string;
  active: boolean;
};
