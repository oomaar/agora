"use client";

import { OwnerMenu } from "@/components/post/OwnerMenu";
import { usePostOwnerActions } from "@/hooks/posts/usePostOwnerActions";
import { type PostOwnerMenuProps } from "@/types/owner";

export function PostOwnerMenu({ post, onDeleted }: PostOwnerMenuProps) {
  return <OwnerMenu actions={usePostOwnerActions(post, onDeleted)} />;
}
