import { AUDIENCE_LABELS } from "@/lib/posts/constants";
import { type PostAudience } from "@/types/domain";
import { type ProfilePhotoKind } from "@/types/media";
import {
  type NotificationToggleItem,
  type ThemeOption,
} from "@/types/settings";
import { type SegmentedOption } from "@/types/toggle";

export const AUDIENCE_OPTIONS: SegmentedOption<PostAudience>[] = (
  Object.keys(AUDIENCE_LABELS) as PostAudience[]
).map((value) => ({ value, label: AUDIENCE_LABELS[value] }));

export const NOTIFICATION_TOGGLES: NotificationToggleItem[] = [
  { key: "notifyLikes", label: "Likes", hint: "When someone likes your post" },
  {
    key: "notifyReplies",
    label: "Replies and mentions",
    hint: "When someone replies or mentions you",
  },
  { key: "notifyFollows", label: "New followers", hint: "When someone follows you" },
];

// The .dark and .light scopes show each theme's background whatever the current theme is.
export const THEME_OPTIONS: ThemeOption[] = [
  { value: "dark", label: "Dark", swatches: ["dark bg-ag-bg"] },
  { value: "light", label: "Light", swatches: ["light bg-ag-bg"] },
  {
    value: "system",
    label: "System",
    swatches: ["dark bg-ag-bg", "light bg-ag-bg"],
  },
];

export const SETTINGS_SKELETON_ROWS = 3;

export const SETTINGS_NAV_ITEM =
  "flex-none whitespace-nowrap rounded-sm px-3 py-2.5 text-[14px] outline-none transition-colors hover:bg-ag-nav-hover focus-visible:shadow-ag-focus-ring";

export const PROFILE_PHOTO_LABELS: Record<ProfilePhotoKind, string> = {
  avatar: "Profile photo",
  cover: "Cover image",
};

export const PROFILE_PHOTO_HINT = "JPG, PNG or WebP, up to 8 MB";
