"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaViewer } from "@/components/media/MediaViewer";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/utils/cn";
import { type PostMediaProps } from "@/types/post";

// Uploaded photos and video keep their own shape (very tall ones are capped in
// height, never cropped); a photo opens full size. Seed placeholders stay striped.
// Clicks on uploaded media stay here, so a post card behind it doesn't open.
export function PostMedia({ media, className }: PostMediaProps) {
  const [viewing, setViewing] = useState(false);
  const { src, width, height } = media;
  const sized = Boolean(width && height);

  if (src && media.kind === "video") {
    return (
      <video
        src={src}
        width={width}
        height={height}
        controls
        playsInline
        preload="metadata"
        aria-label={media.label}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "max-h-128 w-full rounded-xl border border-ag-border-subtle bg-black object-contain",
          sized ? "h-auto" : "aspect-video",
          className,
        )}
      />
    );
  }

  if (src) {
    return (
      <div onClick={(event) => event.stopPropagation()} className={className}>
        <button
          type="button"
          onClick={() => setViewing(true)}
          aria-label={`View ${media.label.toLowerCase()} full size`}
          className={cn(
            "block cursor-zoom-in overflow-hidden rounded-xl border border-ag-border-subtle outline-none focus-visible:shadow-ag-focus-ring",
            sized ? "w-fit max-w-full" : "media-stripes relative aspect-video w-full",
          )}
        >
          {sized ? (
            <Image
              src={src}
              alt={media.label}
              width={width}
              height={height}
              sizes="(min-width: 640px) 600px, 100vw"
              className="h-auto max-h-128 w-auto max-w-full"
            />
          ) : (
            <Image
              src={src}
              alt={media.label}
              fill
              sizes="(min-width: 640px) 600px, 100vw"
              className="object-contain"
            />
          )}
        </button>
        <MediaViewer
          open={viewing}
          onClose={() => setViewing(false)}
          media={{ ...media, src }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative grid aspect-video w-full place-items-center overflow-hidden rounded-xl border border-ag-border-subtle media-stripes",
        className,
      )}
    >
      <span
        className={cn(
          "font-mono text-mono text-ag-text-placeholder",
          media.kind === "video" && "absolute bottom-3 left-3.5",
        )}
      >
        {media.label}
      </span>
      {media.kind === "video" && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-14 place-items-center rounded-full border border-ag-border-strong bg-black/55 pl-1 text-white">
            <Icon name="play" size={20} title="Play video" />
          </span>
        </span>
      )}
    </div>
  );
}
