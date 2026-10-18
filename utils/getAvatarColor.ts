import { AVATAR_COLORS } from "@/lib/ui/avatar";
import { hashString } from "@/utils/hashString";

export function getAvatarColor(handle: string): string {
  return AVATAR_COLORS[hashString(handle.toLowerCase()) % AVATAR_COLORS.length];
}
