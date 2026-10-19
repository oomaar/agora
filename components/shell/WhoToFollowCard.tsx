"use client";

import { RailCard } from "@/components/shell/RailCard";
import { RailQuery } from "@/components/shell/RailQuery";
import { SuggestedPerson } from "@/components/shell/SuggestedPerson";
import { useSuggestedPeople } from "@/hooks/users/useSuggestedPeople";
import { RAIL_SUGGESTION_LIMIT } from "@/lib/shell/constants";

export function WhoToFollowCard() {
  const people = useSuggestedPeople(RAIL_SUGGESTION_LIMIT);
  return (
    <RailCard title="Who to follow">
      <RailQuery
        query={people}
        skeleton={{ variant: "person", rows: RAIL_SUGGESTION_LIMIT }}
        errorText="Couldn't load suggestions."
        emptyText="No suggestions right now."
      >
        {(items) => (
          <ul>
            {items.map((person) => (
              <SuggestedPerson key={person.id} person={person} />
            ))}
          </ul>
        )}
      </RailQuery>
    </RailCard>
  );
}
