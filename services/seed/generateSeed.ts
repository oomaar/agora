import { createEmptyDatabase } from "@/services/simulated/database";
import { seedInbox } from "@/services/seed/seedInbox";
import { seedPeople } from "@/services/seed/seedPeople";
import { seedPosts } from "@/services/seed/seedPosts";
import { TRENDS } from "@/lib/seed/constants";
import { createRandom } from "@/utils/createRandom";
import { type Database, type GenerateSeedOptions } from "@/types/simulation";

// Deterministic: the same seed and scenario always produce the same community.
export function generateSeed({
  content,
  scenario,
  seed,
  now,
}: GenerateSeedOptions): Database {
  const context = {
    db: createEmptyDatabase(),
    random: createRandom(seed),
    now,
    content,
    community: scenario.community,
  };
  seedPeople(context);
  seedPosts(context);
  seedInbox(context);
  context.db.trends = TRENDS.map((trend) => ({ ...trend }));
  return context.db;
}
