import { type ExploreTab } from "@/types/explore";
import { type TabItem } from "@/types/tabs";

export const EXPLORE_PATH = "/explore";

export const SEARCH_PARAM = "q";

export const EXPLORE_TAB_ITEMS: TabItem<ExploreTab>[] = [
  { id: "top", label: "Top" },
  { id: "people", label: "People" },
  { id: "posts", label: "Posts" },
  { id: "media", label: "Media" },
  { id: "topics", label: "Topics" },
];

// How many of each the Top tab shows before "Show all".
export const TOP_TRENDS_LIMIT = 5;

export const TOP_PEOPLE_LIMIT = 3;

export const TOP_MEDIA_LIMIT = 6;

export const EXPLORE_SKELETON_ROWS = 3;
