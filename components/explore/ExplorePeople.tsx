"use client";

import { ExploreQuery } from "@/components/explore/ExploreQuery";
import { PersonRow } from "@/components/explore/PersonRow";
import { useSearch } from "@/hooks/explore/useSearch";
import { type ExploreTabContentProps } from "@/types/explore";

export function ExplorePeople({ query }: ExploreTabContentProps) {
  const search = useSearch(query);
  return (
    <ExploreQuery
      query={search}
      errorText="Couldn't load people."
      emptyText={query ? `No people match “${query}”.` : "Nobody here yet."}
      isEmpty={(results) => !results.people.length}
    >
      {(results) => (
        <ul className="py-2">
          {results.people.map((person) => (
            <PersonRow key={person.id} person={person} />
          ))}
        </ul>
      )}
    </ExploreQuery>
  );
}
