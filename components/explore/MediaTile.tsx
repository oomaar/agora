import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { postPath } from "@/utils/postPath";
import { type MediaTileProps } from "@/types/explore";

// A square preview of a post's photo or video that opens the post.
export function MediaTile({ post }: MediaTileProps) {
  const { media } = post;
  if (!media) return null;
  return (
    <li>
      <Link
        href={postPath(post.id)}
        aria-label={`${media.kind === "video" ? "Video" : "Photo"} by ${post.author.name}: ${media.label}`}
        className="media-stripes relative grid aspect-square place-items-center overflow-hidden rounded-sm border border-ag-border-subtle outline-none transition-opacity hover:opacity-85 focus-visible:shadow-ag-focus-ring"
      >
        {media.src && media.kind === "video" ? (
          // The first frame stands in for a thumbnail.
          <video
            src={media.src}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 size-full object-cover"
          />
        ) : media.src ? (
          <Image
            src={media.src}
            alt=""
            fill
            sizes="(min-width: 640px) 200px, 33vw"
            className="object-cover"
          />
        ) : (
          <span className="line-clamp-2 px-2 text-center font-mono text-[11px] text-ag-text-placeholder">
            {media.label}
          </span>
        )}
        {media.kind === "video" && (
          <span className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-black/55 pl-0.5 text-white">
            <Icon name="play" size={12} />
          </span>
        )}
      </Link>
    </li>
  );
}
