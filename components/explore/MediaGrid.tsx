import { MediaTile } from "@/components/explore/MediaTile";
import { type MediaGridProps } from "@/types/explore";

export function MediaGrid({ posts }: MediaGridProps) {
  return (
    <ul className="grid grid-cols-3 gap-1 px-5 pb-3">
      {posts.map((post) => (
        <MediaTile key={post.id} post={post} />
      ))}
    </ul>
  );
}
