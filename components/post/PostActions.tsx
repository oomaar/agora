"use client";

import { Icon } from "@/components/ui/Icon";
import { POST_ACTION } from "@/lib/ui/post";
import { withStopPropagation } from "@/utils/withStopPropagation";
import { cn } from "@/utils/cn";
import { type PostActionsProps } from "@/types/post";

export function PostActions({
  stats,
  liked = false,
  reposted = false,
  onLike,
  onComment,
  onRepost,
  onShare,
}: PostActionsProps) {
  return (
    <div className="flex gap-7 pt-0.5 text-[13px] text-ag-text-secondary">
      <button
        type="button"
        onClick={withStopPropagation(onComment)}
        aria-label={`Comment, ${stats.comments} comments`}
        className={POST_ACTION}
      >
        <Icon name="comment" size={17} />
        {stats.comments}
      </button>
      <button
        type="button"
        onClick={withStopPropagation(onRepost)}
        aria-pressed={reposted}
        aria-label={`Repost, ${stats.reposts} reposts`}
        className={cn(
          POST_ACTION,
          reposted && "text-ag-success hover:text-ag-success",
        )}
      >
        <Icon name="repost" size={17} />
        {stats.reposts}
      </button>
      <button
        type="button"
        onClick={withStopPropagation(onLike)}
        aria-pressed={liked}
        aria-label={`Like, ${stats.likes} likes`}
        className={cn(
          POST_ACTION,
          liked && "text-ag-danger hover:text-ag-danger",
        )}
      >
        <Icon name="heart" size={17} filled={liked} />
        {stats.likes}
      </button>
      <button
        type="button"
        onClick={withStopPropagation(onShare)}
        aria-label="Share"
        className={POST_ACTION}
      >
        <Icon name="share" size={17} />
      </button>
    </div>
  );
}
