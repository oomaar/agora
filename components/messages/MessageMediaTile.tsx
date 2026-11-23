"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaViewer } from "@/components/media/MediaViewer";
import { MEDIA_LABELS } from "@/lib/media/constants";
import { cn } from "@/utils/cn";
import { type MessageMediaTileProps } from "@/types/messages";

// One photo or video in a message. Alone, it keeps its own shape (capped in
// height); in a grid, tiles are square and cropped. A photo opens full size.
export function MessageMediaTile({
  attachment,
  wide,
  single,
}: MessageMediaTileProps) {
  const [viewing, setViewing] = useState(false);
  const { kind, url, width, height } = attachment;
  const sized = single && width && height ? { width, height } : null;
  const shape = sized
    ? null
    : cn(
        wide && "col-span-2",
        wide ? "aspect-2/1" : single ? "aspect-4/3" : "aspect-square",
      );
  const sizes = single || wide ? "288px" : "144px";

  if (kind === "video") {
    return (
      <video
        src={url}
        width={sized?.width}
        height={sized?.height}
        controls
        playsInline
        preload="metadata"
        aria-label={MEDIA_LABELS.video}
        className={cn(
          "w-full bg-black",
          sized
            ? "h-auto max-h-80 object-contain"
            : cn(shape, "h-full object-cover"),
        )}
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setViewing(true)}
        aria-label="View photo full size"
        className={cn(
          "relative block w-full cursor-zoom-in overflow-hidden bg-ag-media outline-none focus-visible:shadow-ag-focus-ring",
          shape,
        )}
      >
        {sized ? (
          <Image
            src={url}
            alt={MEDIA_LABELS.image}
            width={sized.width}
            height={sized.height}
            sizes={sizes}
            className="h-auto max-h-80 w-full object-cover"
          />
        ) : (
          <Image
            src={url}
            alt={MEDIA_LABELS.image}
            fill
            sizes={sizes}
            className="object-cover"
          />
        )}
      </button>
      <MediaViewer
        open={viewing}
        onClose={() => setViewing(false)}
        media={{
          kind: "image",
          label: MEDIA_LABELS.image,
          src: url,
          width,
          height,
        }}
      />
    </>
  );
}
