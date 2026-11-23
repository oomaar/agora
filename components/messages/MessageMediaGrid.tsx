import { MessageMediaTile } from "@/components/messages/MessageMediaTile";
import { MEDIA_GRID_COLUMNS } from "@/lib/messages/constants";
import { cn } from "@/utils/cn";
import { type MessageMediaGridProps } from "@/types/messages";

// 1 photo or video full width; 2 side by side; 3 with the first across the top; 4 in a square.
export function MessageMediaGrid({ media }: MessageMediaGridProps) {
  return (
    <div
      className={cn(
        "grid w-72 max-w-full gap-0.5 overflow-hidden rounded-xl",
        MEDIA_GRID_COLUMNS[media.length - 1],
      )}
    >
      {media.map((attachment, index) => (
        <MessageMediaTile
          key={`${index}:${attachment.url}`}
          attachment={attachment}
          wide={media.length === 3 && index === 0}
          single={media.length === 1}
        />
      ))}
    </div>
  );
}
