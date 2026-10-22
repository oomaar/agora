import { type Metadata } from "next";
import { ExploreView } from "@/components/explore/ExploreView";
import { SEARCH_PARAM } from "@/lib/explore/constants";
import { SEARCH_QUERY_MAX_LENGTH } from "@/lib/api/constants";

export const metadata: Metadata = { title: "Explore" };

export default async function ExplorePage({
  searchParams,
}: PageProps<"/explore">) {
  const value = (await searchParams)[SEARCH_PARAM];
  const query = (typeof value === "string" ? value : "")
    .trim()
    .slice(0, SEARCH_QUERY_MAX_LENGTH);
  return <ExploreView query={query} />;
}
