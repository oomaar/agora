import { RailCard } from "@/components/shell/RailCard";
import { SuggestedPerson } from "@/components/shell/SuggestedPerson";
import { SUGGESTED_PEOPLE } from "@/lib/shell/constants";

export function WhoToFollowCard() {
  return (
    <RailCard title="Who to follow">
      <ul>
        {SUGGESTED_PEOPLE.map((person) => (
          <SuggestedPerson key={person.handle} person={person} />
        ))}
      </ul>
    </RailCard>
  );
}
