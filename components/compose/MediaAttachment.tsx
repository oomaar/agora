"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MEDIA_LABELS } from "@/lib/media/constants";
import { type MediaAttachmentProps } from "@/types/compose";

// The picked photo or video under the post text: uploading with progress,
// uploaded, or failed with Retry. A file rejected before uploading only shows why.
export function MediaAttachment({
  media,
  disabled = false,
}: MediaAttachmentProps) {
  const { status, kind, previewUrl, progress, error } = media;
  if (status === "idle") return null;

  if (!previewUrl || !kind) {
    return (
      <p
        role="alert"
        className="flex items-start gap-2 rounded-md border border-ag-danger-border bg-ag-danger-surface py-2 pl-3 pr-1.5 text-[13px] text-ag-danger-text"
      >
        <span className="mt-0.5 flex-none text-ag-danger">
          <Icon name="alert" size={14} />
        </span>
        <span className="flex-1 py-0.5">{error}</span>
        <IconButton
          icon="close"
          label="Dismiss"
          size="sm"
          onClick={media.clear}
        />
      </p>
    );
  }

  const label = MEDIA_LABELS[kind].toLowerCase();
  return (
    <figure className="flex flex-col gap-2">
      <div className="media-stripes relative aspect-video overflow-hidden rounded-xl border border-ag-border-subtle">
        {kind === "image" ? (
          <Image
            src={previewUrl}
            alt="Attached photo"
            fill
            sizes="560px"
            className="object-contain"
          />
        ) : (
          <video
            src={previewUrl}
            controls
            muted
            playsInline
            aria-label="Attached video"
            className="size-full bg-black object-contain"
          />
        )}
        {!disabled && (
          <IconButton
            icon="close"
            label={`Remove ${label}`}
            variant="soft"
            size="sm"
            onClick={media.clear}
            className="absolute right-2 top-2"
          />
        )}
      </div>
      {status === "uploading" && (
        <figcaption className="flex items-center gap-3 text-[12.5px] text-ag-text-secondary">
          <ProgressBar
            value={progress}
            label={`Uploading ${label}`}
            className="flex-1"
          />
          <span className="w-9 text-right font-mono" aria-hidden="true">
            {progress}%
          </span>
        </figcaption>
      )}
      {status === "failed" && (
        <figcaption
          role="alert"
          className="flex items-center gap-3 text-[13px] text-ag-danger-text"
        >
          <span className="flex-1">{error}</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={disabled}
            onClick={() => void media.retry()}
          >
            Retry
          </Button>
        </figcaption>
      )}
    </figure>
  );
}
