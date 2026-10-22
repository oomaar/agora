"use client";

import { ExploreQuery } from "@/components/explore/ExploreQuery";
import { PostItem } from "@/components/post/PostItem";
import { useSearch } from "@/hooks/explore/useSearch";
import { type ExploreTabContentProps } from "@/types/explore";

// Without a search: the most-liked posts.
export function ExplorePosts({ query }: ExploreTabContentProps) {
  const search = useSearch(query);
  return (
    <ExploreQuery
      query={search}
      errorText="Couldn't load posts."
      emptyText={query ? `No posts match “${query}”.` : "No posts yet."}
      isEmpty={(results) => !results.posts.length}
    >
      {(results) => (
        <>
          {results.posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </>
      )}
    </ExploreQuery>
  );
}
