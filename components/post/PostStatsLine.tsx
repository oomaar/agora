import { pluralize } from "@/utils/pluralize";
import { type PostStatsLineProps } from "@/types/postDetail";

export function PostStatsLine({ post }: PostStatsLineProps) {
  const stats = [
    { count: post.likeCount, noun: "like" },
    { count: post.commentCount, noun: "comment" },
    { count: post.repostCount, noun: "repost" },
  ];
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1 border-y border-ag-border-subtle py-3 text-[14px]">
      {stats.map(({ count, noun }) => (
        <span key={noun}>
          <b className="font-semibold">{count}</b>{" "}
          <span className="text-ag-text-secondary">
            {pluralize(count, noun)}
          </span>
        </span>
      ))}
    </p>
  );
}
