"use client";

import { CommentList } from "@/components/post/CommentList";
import { PostDetailBody } from "@/components/post/PostDetailBody";
import { ReplyBox } from "@/components/post/ReplyBox";
import { useFocusOnHash } from "@/hooks/ui/useFocusOnHash";
import { REPLY_HASH } from "@/lib/posts/constants";
import { type PostThreadProps } from "@/types/postDetail";

// Mounts once the post has loaded, so /post/[id]#reply can focus the reply box.
export function PostThread({ post }: PostThreadProps) {
  const replyRef = useFocusOnHash<HTMLInputElement>(REPLY_HASH);
  return (
    <>
      <PostDetailBody post={post} onComment={() => replyRef.current?.focus()} />
      <ReplyBox postId={post.id} inputRef={replyRef} />
      <CommentList postId={post.id} />
    </>
  );
}
