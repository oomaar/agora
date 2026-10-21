"use client";

import { useRouter } from "next/navigation";
import { PostCard } from "@/components/post/PostCard";
import { useSharePost } from "@/hooks/posts/useSharePost";
import { useToggleLike } from "@/hooks/posts/useToggleLike";
import { useToggleRepost } from "@/hooks/posts/useToggleRepost";
import { useVotePoll } from "@/hooks/posts/useVotePoll";
import { REPLY_HASH } from "@/lib/posts/constants";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { postPath } from "@/utils/postPath";
import { type PostItemProps } from "@/types/feed";

// A post card wired to the data layer: opens the post, likes, reposts, votes and shares.
export function PostItem({ post }: PostItemProps) {
  const router = useRouter();
  const like = useToggleLike();
  const repost = useToggleRepost();
  const vote = useVotePoll();
  const share = useSharePost();
  return (
    <PostCard
      author={post.author}
      time={formatRelativeTime(post.createdAt)}
      text={post.text}
      media={post.media ?? undefined}
      poll={
        post.poll
          ? { ...post.poll, votedOptionId: post.votedOptionId }
          : undefined
      }
      stats={{
        comments: post.commentCount,
        reposts: post.repostCount,
        likes: post.likeCount,
      }}
      liked={post.liked}
      reposted={post.reposted}
      onOpen={() => router.push(postPath(post.id))}
      onVote={(optionId) => vote.run({ post, optionId })}
      onLike={() => like.run(post)}
      onComment={() => router.push(postPath(post.id, REPLY_HASH))}
      onRepost={() => repost.run(post)}
      onShare={() => share(post)}
    />
  );
}
