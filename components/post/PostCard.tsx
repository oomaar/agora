import { Avatar } from "@/components/ui/Avatar";
import { PostActions } from "@/components/post/PostActions";
import { PostMedia } from "@/components/post/PostMedia";
import { PostPoll } from "@/components/post/PostPoll";
import { cn } from "@/utils/cn";
import { type PostCardProps } from "@/types/post";

export function PostCard({
  author,
  time,
  text,
  media,
  poll,
  stats,
  liked,
  reposted,
  pending = false,
  divider = true,
  onOpen,
  onVote,
  onLike,
  onComment,
  onRepost,
  onShare,
  className,
}: PostCardProps) {
  return (
    <article
      onClick={onOpen}
      aria-busy={pending || undefined}
      className={cn(
        "flex gap-3 px-5 py-4 transition-colors",
        divider && "border-b border-ag-border-subtle",
        onOpen && "cursor-pointer hover:bg-ag-hover",
        pending && "opacity-55",
        className,
      )}
    >
      <Avatar
        name={author.name}
        handle={author.handle}
        src={author.avatarUrl}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex min-w-0 items-baseline gap-1.5 text-[14px]">
          <span className="truncate font-semibold">{author.name}</span>
          <span className="truncate text-ag-text-secondary">
            @{author.handle} · {pending ? "Posting…" : time}
          </span>
        </div>
        <p className="whitespace-pre-line wrap-break-word text-body text-pretty">
          {text}
        </p>
        {media && <PostMedia media={media} />}
        {poll && <PostPoll poll={poll} onVote={pending ? undefined : onVote} />}
        {!pending && (
          <PostActions
            stats={stats}
            liked={liked}
            reposted={reposted}
            onLike={onLike}
            onComment={onComment}
            onRepost={onRepost}
            onShare={onShare}
          />
        )}
      </div>
    </article>
  );
}
