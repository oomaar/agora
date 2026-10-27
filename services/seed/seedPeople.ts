import { nextId } from "@/services/simulated/database";
import { COMMUNITY_SIZE, FOLLOW_CHANCE } from "@/lib/seed/constants";
import { BIOS, LOCATIONS, PERSON_NAMES } from "@/lib/seed/pools";
import { minutesAgo } from "@/utils/minutesAgo";
import { toHandle } from "@/utils/toHandle";
import { type User } from "@/types/domain";
import { type PersonSeed, type SeedContext } from "@/types/simulation";

const DAY_MINUTES = 24 * 60;

function createUser(context: SeedContext, person: PersonSeed): User {
  const { db, random, now } = context;
  return {
    id: nextId(db, "user"),
    name: person.name,
    handle: person.handle,
    bio: person.bio,
    location: random.chance(0.7) ? random.pick(LOCATIONS) : null,
    avatarUrl: null,
    coverUrl: null,
    joinedAt: minutesAgo(now, random.int(200, 1800) * DAY_MINUTES),
    followingCount: random.int(20, 600),
    followerCount: random.int(30, 2400),
  };
}

function generatedPeople(context: SeedContext): PersonSeed[] {
  const taken = new Set([
    context.content.self.handle,
    ...context.content.people.map((person) => person.handle),
  ]);
  const count = COMMUNITY_SIZE - context.content.people.length;
  return PERSON_NAMES.map((name) => ({
    name,
    handle: toHandle(name),
    bio: context.random.pick(BIOS),
  }))
    .filter((person) => !taken.has(person.handle))
    .slice(0, count);
}

// The signed-in user, the hand-written people, then generated people up to the community size.
export function seedPeople(context: SeedContext): void {
  const { db, content, community, now, random } = context;
  const fresh = community === "fresh";

  const self = createUser(context, content.self);
  self.joinedAt = minutesAgo(now, fresh ? 0 : 400 * DAY_MINUTES);
  self.followingCount = fresh ? 0 : content.self.following;
  self.followerCount = fresh ? 0 : content.self.followers;
  db.selfId = self.id;

  const people = [...content.people, ...generatedPeople(context)].map(
    (person) => createUser(context, person),
  );
  db.users = [self, ...people];

  if (fresh) return;
  for (const person of people) {
    const handpicked = content.followed.includes(person.handle);
    const suggested = content.suggested.includes(person.handle);
    const isGenerated = !content.people.some(
      (seed) => seed.handle === person.handle,
    );
    if (
      handpicked ||
      (isGenerated && !suggested && random.chance(FOLLOW_CHANCE))
    ) {
      db.follows.push({ followerId: self.id, followeeId: person.id });
    }
    if (random.chance(FOLLOW_CHANCE)) {
      db.follows.push({ followerId: person.id, followeeId: self.id });
    }
  }
}
