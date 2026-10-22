import { type NotificationKind } from "@/types/domain";
import { type NotificationFilter } from "@/types/dataSource";
import { type TabItem } from "@/types/tabs";
import { type NotificationEmptyCopy } from "@/types/notifications";

export const NOTIFICATION_TAB_ITEMS: TabItem<NotificationFilter>[] = [
  { id: "all", label: "All" },
  { id: "mentions", label: "Mentions & replies" },
];

export const NOTIFICATION_KIND_LABELS: Record<NotificationKind, string> = {
  like: "Like",
  reply: "Reply",
  follow: "Follow",
  mention: "Mention",
  milestone: "Milestone",
};

// Theme tokens, so the labels keep their contrast in light mode too.
export const NOTIFICATION_KIND_CLASSES: Record<NotificationKind, string> = {
  like: "text-ag-danger",
  reply: "text-ag-text",
  follow: "text-ag-success",
  mention: "text-ag-accent-text",
  milestone: "text-ag-demo-text",
};

export const NOTIFICATION_EMPTY_COPY: Record<NotificationFilter, NotificationEmptyCopy> = {
  all: {
    title: "Nothing here yet",
    description: "Likes, replies, mentions and new followers show up here.",
  },
  mentions: {
    title: "No mentions or replies yet",
    description: "When someone replies to your post or mentions you, it shows up here.",
  },
};

// Milestones come from Agora itself.
export const AGORA_SENDER = "Agora";
