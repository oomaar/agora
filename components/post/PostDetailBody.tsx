"use client";

import Link from "next/link";
import { PostDetailActions } from "@/components/post/PostDetailActions";
import { PostMedia } from "@/components/post/PostMedia";
import { PostPoll } from "@/components/post/PostPoll";
import { PostStatsLine } from "@/components/post/PostStatsLine";
import { Avatar } from "@/components/ui/Avatar";
import { FollowButton } from "@/components/ui/FollowButton";
import { useSharePost } from "@/hooks/posts/useSharePost";
import { useToggleLike } from "@/hooks/posts/useToggleLike";
import { useToggleRepost } from "@/hooks/posts/useToggleRepost";
import { useVotePoll } from "@/hooks/posts/useVotePoll";
import { useToggleFollow } from "@/hooks/users/useToggleFollow";
import { AUDIENCE_LABELS } from "@/lib/posts/constants";
import { formatPostDate } from "@/utils/formatPostDate";
import { type PostDetailBodyProps } from "@/types/postDetail";

// The full post: author and Follow, text, media or poll, date, stats and the action row.
export function PostDetailBody({ post, onComment }: PostDetailBodyProps) {
  const like = useToggleLike();
  const repost = useToggleRepost();
  const vote = useVotePoll();
  const follow = useToggleFollow();
  const share = useSharePost();
  const { author } = post;
  return (
    <article className="flex flex-col gap-3.5 border-b border-ag-border-subtle p-5">
      <div className="flex items-center gap-3">
        <Link
          href={`/u/${author.handle}`}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-md outline-none focus-visible:shadow-ag-focus-ring"
        >
          <Avatar name={author.name} handle={author.handle} size="lg" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-title">{author.name}</span>
            <span className="truncate text-[13.5px] text-ag-text-secondary">
              @{author.handle}
            </span>
          </span>
        </Link>
        {!author.isSelf && (
          <FollowButton
            following={author.isFollowing}
            onToggle={() => follow.run(author)}
            aria-label={`${author.isFollowing ? "Unfollow" : "Follow"} ${author.name}`}
          />
        )}
      </div>
      <p className="whitespace-pre-line wrap-break-word text-[19px] leading-normal text-pretty">
        {post.text}
      </p>
      {post.media && <PostMedia media={post.media} />}
      {post.poll && (
        <PostPoll
          poll={{ ...post.poll, votedOptionId: post.votedOptionId }}
          onVote={(optionId) => vote.run({ post, optionId })}
        />
      )}
      <p className="text-[13.5px] text-ag-text-secondary">
        <time dateTime={post.createdAt}>{formatPostDate(post.createdAt)}</time>
        {post.audience === "following" &&
          ` · ${AUDIENCE_LABELS.following} only`}
      </p>
      <PostStatsLine post={post} />
      <PostDetailActions
        actions={[
          {
            id: "like",
            label: post.liked ? "Liked" : "Like",
            icon: "heart",
            active: post.liked,
            activeClassName: "text-ag-danger hover:text-ag-danger",
            onClick: () => like.run(post),
          },
          {
            id: "comment",
            label: "Comment",
            icon: "comment",
            onClick: onComment,
          },
          {
            id: "repost",
            label: post.reposted ? "Reposted" : "Repost",
            icon: "repost",
            active: post.reposted,
            activeClassName: "text-ag-success hover:text-ag-success",
            onClick: () => repost.run(post),
          },
          {
            id: "share",
            label: "Share",
            icon: "share",
            onClick: () => share(post),
          },
        ]}
      />
    </article>
  );
}
