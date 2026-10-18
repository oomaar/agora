import Image from "next/image";
import { AVATAR_SIZES } from "@/lib/ui/avatar";
import { getAvatarColor } from "@/utils/getAvatarColor";
import { getInitials } from "@/utils/getInitials";
import { cn } from "@/utils/cn";
import { type AvatarProps } from "@/types/avatar";

export function Avatar({
  name,
  handle,
  src,
  size = "md",
  className,
}: AvatarProps) {
  const config = AVATAR_SIZES[size];
  return (
    <span
      className={cn(
        "relative grid flex-none place-items-center overflow-hidden rounded-full text-ag-on-avatar",
        config.className,
        getAvatarColor(handle),
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={config.px}
          height={config.px}
          className="size-full object-cover"
        />
      ) : (
        <>
          <span aria-hidden="true">{getInitials(name)}</span>
          <span className="sr-only">{name}</span>
        </>
      )}
    </span>
  );
}
