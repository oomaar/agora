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

export type PostCardProps = {
  author: PostAuthor;
  time: string;
  text: string;
  media?: PostMedia;
  stats: PostStats;
  liked?: boolean;
  pending?: boolean;
  divider?: boolean;
  onOpen?: () => void;
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
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
};
