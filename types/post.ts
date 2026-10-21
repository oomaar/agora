import { type PollOption } from "@/types/domain";

export type PostAuthor = {
  name: string;
  handle: string;
  avatarUrl?: string;
};

export type PostMediaKind = "image" | "video";

export type PostMedia = {
  kind: PostMediaKind;
  label: string;
  src?: string;
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
