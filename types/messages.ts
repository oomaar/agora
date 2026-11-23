import { type ReactNode } from "react";
import { type AvatarSize } from "@/types/avatar";
import {
  type ConversationView,
  type MessageAttachment,
  type MessageView,
  type OutgoingAttachment,
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
  // Members typing right now.
  typing: UserView[];
};

export type ChatMessagesProps = {
  conversation: ConversationView;
  messages: MessageView[];
  typing: UserView[];
  onRetry: (message: MessageView) => void;
};

export type TypingIndicatorProps = {
  people: UserView[];
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
  conversationId: string;
  onSend: (text: string, attachments: OutgoingAttachment[]) => void;
};

export type ChatAttachmentTrayProps = {
  attachments: OutgoingAttachment[];
  onRemove: (id: string) => void;
};

export type ChatAttachmentTileProps = {
  attachment: OutgoingAttachment;
  onRemove: () => void;
};

export type ChatNoticeProps = {
  message: string;
  onDismiss: () => void;
};

export type VoiceRecorderBarProps = {
  elapsedMs: number;
  levels: number[];
  // The microphone is still being opened.
  starting: boolean;
  onCancel: () => void;
  onSend: () => void;
};

export type VoiceRecorderStatus = "idle" | "starting" | "recording";

export type RecordingSession = {
  stream: MediaStream;
  recorder: MediaRecorder;
  chunks: Blob[];
  context: AudioContext;
  timer: ReturnType<typeof setInterval>;
  // Loudness (0–1) every sample interval, for the waveform.
  samples: number[];
  startedAt: number;
};

export type MessageAttachmentsProps = {
  attachments: MessageAttachment[];
  fromSelf: boolean;
};

export type MessageMediaGridProps = {
  media: MessageAttachment[];
};

export type MessageMediaTileProps = {
  attachment: MessageAttachment;
  // Stretched across the grid (the first of three).
  wide: boolean;
  single: boolean;
};

export type MessageFileProps = {
  attachment: MessageAttachment;
  fromSelf: boolean;
};

export type VoiceNotePlayerProps = {
  attachment: MessageAttachment;
  fromSelf: boolean;
};

export type WaveformProps = {
  levels: number[];
  // Bars up to this fraction (0–1) show as played.
  progress?: number;
  // Classes for played and unplayed bars.
  playedClassName: string;
  restClassName: string;
  className?: string;
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
