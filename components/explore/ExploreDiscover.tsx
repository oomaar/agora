"use client";

import { ExploreQuery } from "@/components/explore/ExploreQuery";
import { ExploreSection } from "@/components/explore/ExploreSection";
import { MediaGrid } from "@/components/explore/MediaGrid";
import { PersonCard } from "@/components/explore/PersonCard";
import { TrendList } from "@/components/explore/TrendList";
import { useSearch } from "@/hooks/explore/useSearch";
import { useTrends } from "@/hooks/explore/useTrends";
import { useSuggestedPeople } from "@/hooks/users/useSuggestedPeople";
import {
  TOP_MEDIA_LIMIT,
  TOP_PEOPLE_LIMIT,
  TOP_TRENDS_LIMIT,
} from "@/lib/explore/constants";
import { hasMedia } from "@/utils/hasMedia";

// The Top tab before searching: what's trending, who to follow and recent photos.
export function ExploreDiscover() {
  const trends = useTrends();
  const people = useSuggestedPeople(TOP_PEOPLE_LIMIT);
  // An empty search returns the most-liked posts.
  const popular = useSearch("");
  return (
    <>
      <ExploreSection title="Trending today">
        <ExploreQuery
          query={trends}
          errorText="Couldn't load trends."
          emptyText="Nothing is trending right now."
        >
          {(items) => <TrendList trends={items.slice(0, TOP_TRENDS_LIMIT)} />}
        </ExploreQuery>
      </ExploreSection>
      <ExploreSection title="People to follow">
        <ExploreQuery
          query={people}
          errorText="Couldn't load suggestions."
          emptyText="You already follow everyone we'd suggest."
        >
          {(items) => (
            <ul className="grid gap-2.5 px-5 pb-3 sm:grid-cols-3">
              {items.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </ul>
          )}
        </ExploreQuery>
      </ExploreSection>
      <ExploreSection title="Photos & video">
        <ExploreQuery
          query={popular}
          errorText="Couldn't load photos and videos."
          emptyText="No photos or videos yet."
          isEmpty={(results) => !results.posts.some(hasMedia)}
        >
          {(results) => (
            <MediaGrid
              posts={results.posts.filter(hasMedia).slice(0, TOP_MEDIA_LIMIT)}
            />
          )}
        </ExploreQuery>
      </ExploreSection>
    </>
  );
}
