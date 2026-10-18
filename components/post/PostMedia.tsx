import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/utils/cn";
import { type PostMediaProps } from "@/types/post";

export function PostMedia({ media, className }: PostMediaProps) {
  return (
    <div
      className={cn(
        "relative grid aspect-video w-full place-items-center overflow-hidden rounded-xl border border-ag-border-subtle media-stripes",
        className,
      )}
    >
      {media.src ? (
        <Image src={media.src} alt={media.label} fill sizes="(min-width: 640px) 600px, 100vw" className="object-cover" />
      ) : (
        <span
          className={cn(
            "font-mono text-mono text-ag-text-placeholder",
            media.kind === "video" && "absolute bottom-3 left-3.5",
          )}
        >
          {media.label}
        </span>
      )}
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
