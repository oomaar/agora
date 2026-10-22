import { type ProfileTab } from "@/types/dataSource";
import { type TabItem } from "@/types/tabs";
import { type ProfileEmptyCopy } from "@/types/profile";

export const PROFILE_TAB_ITEMS: TabItem<ProfileTab>[] = [
  { id: "posts", label: "Posts" },
  { id: "replies", label: "Replies" },
  { id: "media", label: "Media" },
  { id: "likes", label: "Likes" },
];

export const NAME_TOKEN = "{name}";

export const PROFILE_EMPTY_TITLES: Record<ProfileTab, string> = {
  posts: "No posts yet",
  replies: "No replies yet",
  media: "No photos or videos yet",
  likes: "No likes yet",
};

export const PROFILE_EMPTY_COPY: Record<ProfileTab, ProfileEmptyCopy> = {
  posts: {
    self: "Your posts show up here. Write your first one.",
    other: `When ${NAME_TOKEN} posts, it shows up here.`,
  },
  replies: {
    self: "Posts you reply to show up here.",
    other: `Posts ${NAME_TOKEN} replies to show up here.`,
  },
  media: {
    self: "Posts with photos and videos show up here.",
    other: `Photos and videos ${NAME_TOKEN} posts show up here.`,
  },
  likes: {
    self: "Posts you like show up here.",
    other: `Posts ${NAME_TOKEN} likes show up here.`,
  },
};
