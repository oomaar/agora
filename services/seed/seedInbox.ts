import { getUserByHandle, nextId } from "@/services/simulated/database";
import { GENERATED_CONVERSATIONS } from "@/lib/seed/constants";
import { MESSAGE_TEXTS } from "@/lib/seed/pools";
import { minutesAgo } from "@/utils/minutesAgo";
import { type ConversationSeed, type SeedContext } from "@/types/simulation";

const DAY_MINUTES = 24 * 60;

function generatedConversations(context: SeedContext): ConversationSeed[] {
  const { db, random, content } = context;
  const handwritten = new Set(content.people.map((person) => person.handle));
  const followed = db.users.filter(
    (user) =>
      !handwritten.has(user.handle) &&
      db.follows.some(
        (follow) =>
          follow.followerId === db.selfId && follow.followeeId === user.id,
      ),
  );
  return random.sample(followed, GENERATED_CONVERSATIONS).map((user) => {
    const age = random.int(2, 6) * DAY_MINUTES;
    return {
      members: [user.handle],
      name: null,
      unread: false,
      messages: [
        {
          from: user.handle,
          text: random.pick(MESSAGE_TEXTS),
          ageMinutes: age + 30,
        },
        {
          from: content.self.handle,
          text: random.pick(MESSAGE_TEXTS),
          ageMinutes: age,
        },
      ],
    };
  });
}

// Notifications and conversations; a fresh account has neither.
export function seedInbox(context: SeedContext): void {
  const { db, now, content, community } = context;
  if (community === "fresh") return;

  const selfPosts = db.posts.filter((post) => post.authorId === db.selfId);
  for (const seed of content.notifications) {
    db.notifications.push({
      id: nextId(db, "notification"),
      kind: seed.kind,
      actorId: seed.actor ? getUserByHandle(db, seed.actor).id : null,
      postId:
        seed.postIndex === null
          ? null
          : (selfPosts[seed.postIndex]?.id ?? null),
      text: seed.text,
      quote: seed.quote,
      createdAt: minutesAgo(now, seed.ageMinutes),
      read: seed.read,
    });
  }

  for (const seed of [
    ...content.conversations,
    ...generatedConversations(context),
  ]) {
    const conversation = {
      id: nextId(db, "conversation"),
      memberIds: [
        db.selfId,
        ...seed.members.map((handle) => getUserByHandle(db, handle).id),
      ],
      name: seed.name,
      unread: seed.unread,
    };
    db.conversations.push(conversation);
    for (const message of seed.messages) {
      db.messages.push({
        id: nextId(db, "message"),
        conversationId: conversation.id,
        senderId: getUserByHandle(db, message.from).id,
        text: message.text,
        createdAt: minutesAgo(now, message.ageMinutes),
      });
    }
  }
}
