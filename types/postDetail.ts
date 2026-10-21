import { type Ref } from "react";
import { type CommentView, type PostView } from "@/types/domain";
import { type IconName } from "@/types/icon";

export type PostDetailProps = {
  postId: string;
};

export type PostThreadProps = {
  post: PostView;
};

export type PostDetailBodyProps = {
  post: PostView;
  onComment: () => void;
};

export type PostDetailAction = {
  id: string;
  label: string;
  icon: IconName;
  active?: boolean;
  activeClassName?: string;
  onClick: () => void;
};

export type PostDetailActionsProps = {
  actions: PostDetailAction[];
};

export type PostStatsLineProps = {
  post: PostView;
};

export type ReplyBoxProps = {
  postId: string;
  inputRef: Ref<HTMLInputElement>;
};

export type CommentListProps = {
  postId: string;
};

export type CommentItemProps = {
  comment: CommentView;
  onRetry: (comment: CommentView) => void;
};
