import { type ReactNode } from "react";
import { type PollOption } from "@/types/domain";

export type PostAuthor = {
  name: string;
  handle: string;
  avatarUrl?: string | null;
};

export type PostMediaKind = "image" | "video";

export type PostMedia = {
  kind: PostMediaKind;
  label: string;
  src?: string;
  // Uploaded media's pixel size; missing on seed placeholders.
  width?: number;
  height?: number;
};

export type PostStats = {
  comments: number;
  reposts: number;
  likes: number;
};

export type PostPollData = {
  options: PollOption[];
  votedOptionId: string | null;
};

export type PostPollProps = {
  poll: PostPollData;
  onVote?: (optionId: string) => void;
};

export type PostCardProps = {
  author: PostAuthor;
  time: string;
  edited?: boolean;
  // Shown at the end of the header, e.g. the ⋯ menu on your own posts.
  menu?: ReactNode;
  text: string;
  media?: PostMedia;
  poll?: PostPollData;
  stats: PostStats;
  liked?: boolean;
  reposted?: boolean;
  pending?: boolean;
  divider?: boolean;
  onOpen?: () => void;
  onVote?: (optionId: string) => void;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
  className?: string;
};

export type PostMediaProps = {
  media: PostMedia;
  className?: string;
};

export type PostActionsProps = {
  stats: PostStats;
  liked?: boolean;
  reposted?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
};

export type MediaViewerProps = {
  open: boolean;
  onClose: () => void;
  media: PostMedia & { src: string };
};
