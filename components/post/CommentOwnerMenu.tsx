"use client";

import { OwnerMenu } from "@/components/post/OwnerMenu";
import { useCommentOwnerActions } from "@/hooks/posts/useCommentOwnerActions";
import { type CommentOwnerMenuProps } from "@/types/owner";

export function CommentOwnerMenu({ comment }: CommentOwnerMenuProps) {
  return <OwnerMenu actions={useCommentOwnerActions(comment)} />;
}
