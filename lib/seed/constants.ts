import { type Trend } from "@/types/domain";

// People in the community besides the signed-in user.
export const COMMUNITY_SIZE = 40;

export const COMMENTS_PER_POST = { min: 0, max: 5 };

// Seeded posts are spread over this window.
export const MAX_POST_AGE_MINUTES = 14 * 24 * 60;

export const MEDIA_CHANCE = 0.3;

export const VIDEO_SHARE_OF_MEDIA = 0.3;

export const FOLLOW_CHANCE = 0.4;

export const SELF_LIKE_CHANCE = 0.15;

export const GENERATED_CONVERSATIONS = 2;

export const TRENDS: Trend[] = [
  {
    id: "trend_1",
    category: "Technology · Trending",
    title: "Server components",
    postCount: 2418,
  },
  {
    id: "trend_2",
    category: "Food",
    title: "Farmers markets",
    postCount: 1102,
  },
  {
    id: "trend_3",
    category: "Books",
    title: "October reading lists",
    postCount: 864,
  },
  { id: "trend_4", category: "Outdoors", title: "#FirstTenK", postCount: 512 },
  {
    id: "trend_5",
    category: "Local · Oakland",
    title: "Lake Merritt cleanup",
    postCount: 301,
  },
];
