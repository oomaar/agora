import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { TAP_TARGET } from "@/lib/ui/tapTarget";
import { formatFileSize } from "@/utils/formatFileSize";
import { cn } from "@/utils/cn";
import { type ChatAttachmentTileProps } from "@/types/messages";

// A picked file waiting to be sent: a thumbnail for photos and video, the name
// and size for documents. × removes it.
export function ChatAttachmentTile({
  attachment,
  onRemove,
}: ChatAttachmentTileProps) {
  const { kind, name, size, previewUrl } = attachment;
  const visual = kind === "image" || kind === "video";
  return (
    <div
      className={cn(
        "relative flex h-18 flex-none overflow-hidden rounded-lg border border-ag-border-subtle",
        visual
          ? "w-18 bg-ag-media"
          : "w-48 items-center gap-2.5 bg-ag-raised pl-3 pr-8",
      )}
    >
      {kind === "image" && (
        <Image
          src={previewUrl}
          alt={name}
          fill
          sizes="72px"
          className="object-cover"
        />
      )}
      {kind === "video" && (
        <>
          <video
            src={previewUrl}
            muted
            playsInline
            preload="metadata"
            aria-label={name}
            className="size-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center text-white">
            <span className="grid size-7 place-items-center rounded-full bg-black/55 pl-0.5">
              <Icon name="play" size={12} />
            </span>
          </span>
        </>
      )}
      {!visual && (
        <>
          <span className="grid size-9 flex-none place-items-center rounded-lg bg-ag-accent-soft text-ag-accent-text">
            <Icon name="file" size={18} />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[13px] font-medium">{name}</span>
            <span className="text-[12px] text-ag-text-secondary">
              {formatFileSize(size)}
            </span>
          </span>
        </>
      )}
      <span className="absolute right-1 top-1">
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          title={`Remove ${name}`}
          className={cn(
            TAP_TARGET,
            "grid size-5.5 cursor-pointer place-items-center rounded-full bg-black/65 text-white outline-none transition-[scale] active:scale-90 focus-visible:shadow-ag-focus-ring",
          )}
        >
          <Icon name="close" size={12} strokeWidth={2.4} />
        </button>
      </span>
    </div>
  );
}
