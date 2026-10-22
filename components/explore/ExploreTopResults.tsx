"use client";

import { ExploreSection } from "@/components/explore/ExploreSection";
import { PersonRow } from "@/components/explore/PersonRow";
import { PostItem } from "@/components/post/PostItem";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { useSearch } from "@/hooks/explore/useSearch";
import {
  EXPLORE_SKELETON_ROWS,
  TOP_PEOPLE_LIMIT,
} from "@/lib/explore/constants";
import { type ExploreTabContentProps } from "@/types/explore";

// The Top tab after searching: a few matching people, then matching posts.
export function ExploreTopResults({
  query,
  onTabChange,
}: ExploreTabContentProps) {
  const search = useSearch(query);

  if (search.status === "loading") {
    return (
      <div role="status" aria-label="Searching">
        {Array.from({ length: EXPLORE_SKELETON_ROWS }, (_, index) => (
          <PostSkeleton key={index} withMedia={false} />
        ))}
      </div>
    );
  }

  if (search.status === "error") {
    return (
      <ErrorState
        title="Couldn't search Agora"
        description={search.error.message}
        actions={
          <Button variant="danger" onClick={search.retry}>
            Try again
          </Button>
        }
        className="mx-5 my-6"
      />
    );
  }

  if (search.status === "empty") {
    return (
      <EmptyState
        icon="search"
        title={`No results for “${query}”`}
        description="Try a different word, or check the spelling."
      />
    );
  }

  const { people, posts } = search.data;
  return (
    <>
      {people.length > 0 && (
        <ExploreSection title="People">
          <ul>
            {people.slice(0, TOP_PEOPLE_LIMIT).map((person) => (
              <PersonRow key={person.id} person={person} />
            ))}
          </ul>
          {people.length > TOP_PEOPLE_LIMIT && (
            <Button
              variant="secondary"
              size="sm"
              className="mx-5 mt-1"
              onClick={() => onTabChange("people")}
            >
              Show all people
            </Button>
          )}
        </ExploreSection>
      )}
      {posts.length > 0 && (
        <ExploreSection title="Posts">
          <div className="border-t border-ag-border-subtle">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </ExploreSection>
      )}
    </>
  );
}
