import { searchPosts } from "@/services/database/posts";
import { searchPeople } from "@/services/database/users";
import { withViewer } from "@/lib/api/withViewer";
import { SEARCH_QUERY_MAX_LENGTH } from "@/lib/api/constants";
import { type SearchResults } from "@/types/dataSource";

export const GET = withViewer(async ({ request, viewerId }): Promise<SearchResults> => {
  const term = (request.nextUrl.searchParams.get("q") ?? "")
    .trim()
    .slice(0, SEARCH_QUERY_MAX_LENGTH);
  const [people, posts] = await Promise.all([
    searchPeople(viewerId, term),
    searchPosts(viewerId, term),
  ]);
  return { people, posts };
});
