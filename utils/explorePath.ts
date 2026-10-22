import { EXPLORE_PATH, SEARCH_PARAM } from "@/lib/explore/constants";

// "Server components" → "/explore?q=Server%20components"
export function explorePath(query: string): string {
  return `${EXPLORE_PATH}?${new URLSearchParams({ [SEARCH_PARAM]: query })}`;
}
