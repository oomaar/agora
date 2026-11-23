import { Icon } from "@/components/ui/Icon";
import { fileExtension } from "@/utils/fileExtension";
import { formatFileSize } from "@/utils/formatFileSize";
import { cn } from "@/utils/cn";
import { type MessageFileProps } from "@/types/messages";

// A document: its name, type and size. Opens (or downloads) in a new tab. The type
// comes from the stored file, not the name the sender's browser gave it.
export function MessageFile({ attachment, fromSelf }: MessageFileProps) {
  const { name, size, url } = attachment;
  const details = [fileExtension(url), formatFileSize(size)]
    .filter(Boolean)
    .join(" · ");
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      download={name}
      className={cn(
        "flex w-64 max-w-full items-center gap-3 rounded-xl px-3 py-2.5 outline-none transition-colors focus-visible:shadow-ag-focus-ring",
        fromSelf
          ? "bg-black/10 hover:bg-black/15"
          : "border border-ag-border-subtle bg-ag-surface hover:bg-ag-hover",
      )}
    >
      <span
        className={cn(
          "grid size-9 flex-none place-items-center rounded-lg",
          fromSelf
            ? "bg-ag-on-accent text-ag-accent"
            : "bg-ag-accent-soft text-ag-accent-text",
        )}
      >
        <Icon name="file" size={18} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[13.5px] font-medium">
          <span className="sr-only">Download </span>
          {name}
        </span>
        <span
          className={cn(
            "text-[12px]",
            fromSelf ? "text-ag-on-accent" : "text-ag-text-secondary",
          )}
        >
          {details}
        </span>
      </span>
      <Icon name="download" size={16} className="flex-none" />
    </a>
  );
}
