import { getUserByHandle, nextId } from "@/services/simulated/database";
import {
  COMMENTS_PER_POST,
  MAX_POST_AGE_MINUTES,
  MEDIA_CHANCE,
  SELF_LIKE_CHANCE,
  VIDEO_SHARE_OF_MEDIA,
} from "@/lib/seed/constants";
import {
  COMMENT_TEXTS,
  IMAGE_MEDIA,
  POST_TEXTS,
  VIDEO_MEDIA,
} from "@/lib/seed/pools";
import { minutesAgo } from "@/utils/minutesAgo";
import { type Post } from "@/types/domain";
import { type PostMedia } from "@/types/post";
import { type SeedContext } from "@/types/simulation";

function randomMedia(context: SeedContext): PostMedia | null {
  const { random } = context;
  if (!random.chance(MEDIA_CHANCE)) return null;
  return random.chance(VIDEO_SHARE_OF_MEDIA)
    ? random.pick(VIDEO_MEDIA)
    : random.pick(IMAGE_MEDIA);
}

function ageOf(now: number, iso: string): number {
  return Math.floor((now - Date.parse(iso)) / 60_000);
}

function seedComments(
  context: SeedContext,
  post: Post,
  isFirst: boolean,
): void {
  const { db, random, now, content } = context;
  const others = db.users.filter(
    (user) => user.id !== post.authorId && user.id !== db.selfId,
  );
  const age = ageOf(now, post.createdAt);
  const comments = isFirst
    ? content.comments.map((comment) => ({
        authorId: getUserByHandle(db, comment.author).id,
        text: comment.text,
        ageMinutes: Math.min(comment.ageMinutes, age),
      }))
    : Array.from(
        { length: random.int(COMMENTS_PER_POST.min, COMMENTS_PER_POST.max) },
        () => ({
          authorId: random.pick(others).id,
          text: random.pick(COMMENT_TEXTS),
          ageMinutes: random.int(0, age),
        }),
      );
  for (const comment of comments) {
    db.comments.push({
      id: nextId(db, "comment"),
      postId: post.id,
      authorId: comment.authorId,
      text: comment.text,
      createdAt: minutesAgo(now, comment.ageMinutes),
    });
  }
  post.commentCount = comments.length;
}

// Hand-written posts plus one generated post per pool text, each with comments.
// Fresh accounts join an empty square, so nothing is seeded.
export function seedPosts(context: SeedContext): void {
  const { db, random, now, content, community } = context;
  if (community === "fresh") return;

  const handwritten = content.posts.map((seed) => ({
    authorId: getUserByHandle(db, seed.author).id,
    text: seed.text,
    media: seed.media,
    ageMinutes: seed.ageMinutes,
    likes: seed.likes,
    reposts: seed.reposts,
  }));
  const handwrittenHandles = new Set(
    content.people.map((person) => person.handle),
  );
  const generatedAuthors = db.users.filter(
    (user) => user.id !== db.selfId && !handwrittenHandles.has(user.handle),
  );
  const generated = random
    .sample(POST_TEXTS, POST_TEXTS.length)
    .map((text) => ({
      authorId: random.pick(generatedAuthors).id,
      text,
      media: randomMedia(context),
      ageMinutes: random.int(30, MAX_POST_AGE_MINUTES),
      likes: random.int(0, 240),
      reposts: random.int(0, 24),
    }));

  for (const seed of [...handwritten, ...generated]) {
    const post: Post = {
      id: nextId(db, "post"),
      authorId: seed.authorId,
      text: seed.text,
      media: seed.media,
      audience: "everyone",
      createdAt: minutesAgo(now, seed.ageMinutes),
      likeCount: seed.likes,
      repostCount: seed.reposts,
      commentCount: 0,
    };
    db.posts.push(post);
    seedComments(context, post, db.posts.length === 1);

    if (post.authorId !== db.selfId && random.chance(SELF_LIKE_CHANCE)) {
      db.reactions.push({
        id: nextId(db, "reaction"),
        kind: "like",
        userId: db.selfId,
        postId: post.id,
        createdAt: minutesAgo(now, random.int(0, seed.ageMinutes)),
      });
      post.likeCount = Math.max(post.likeCount, 1);
    }
  }
}
