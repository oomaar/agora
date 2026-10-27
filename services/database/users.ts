import "server-only";
import { DataError } from "@/services/dataError";
import { createNotification, removeNotification } from "@/services/database/notifications";
import { query, selectView, selectViews, transaction } from "@/lib/db/query";
import { UNIQUE_VIOLATION } from "@/lib/db/constants";
import { NOT_FOUND } from "@/lib/api/constants";
import { SEARCH_LIMIT } from "@/lib/data/constants";
import { escapeLike } from "@/utils/escapeLike";
import { type Queryable } from "@/types/db";
import { type UserView } from "@/types/domain";
import { type ProfileUpdate } from "@/types/dataSource";
import { type ProfilePhotoKind } from "@/types/media";

// In every query $1 is the viewer.

export function getUserById(
  viewerId: string,
  userId: string,
  db?: Queryable,
): Promise<UserView> {
  return selectView(
    "select user_view(u, $1) as view from users u where u.id = $2",
    [viewerId, userId],
    NOT_FOUND.user,
    db,
  );
}

export function getUserByHandle(
  viewerId: string,
  handle: string,
): Promise<UserView> {
  return selectView(
    "select user_view(u, $1) as view from users u where u.handle = $2",
    [viewerId, handle.toLowerCase()],
    NOT_FOUND.user,
  );
}

// The most-followed people the viewer doesn't follow yet.
export function getSuggestedPeople(
  viewerId: string,
  limit: number,
): Promise<UserView[]> {
  return selectViews(
    `select user_view(u, $1) as view from users u
     where u.id <> $1
       and not exists (
         select 1 from follows f where f.follower_id = $1 and f.followee_id = u.id
       )
     order by u.follower_count desc, u.id
     limit $2`,
    [viewerId, limit],
  );
}

export function searchPeople(
  viewerId: string,
  term: string,
): Promise<UserView[]> {
  return selectViews(
    `select user_view(u, $1) as view from users u
     where u.id <> $1
       and ($2 = '' or u.name ilike $3 or u.handle ilike $3 or u.bio ilike $3)
     order by u.follower_count desc, u.id
     limit $4`,
    [viewerId, term, `%${escapeLike(term)}%`, SEARCH_LIMIT],
  );
}

// Follows or unfollows, keeping both users' counts in step. Repeating a request changes nothing.
export function setFollow(
  viewerId: string,
  userId: string,
  following: boolean,
): Promise<UserView> {
  return transaction(async (client) => {
    await getUserById(viewerId, userId, client);
    if (userId === viewerId) {
      throw new DataError("validation", "You can't follow yourself.");
    }
    const changed = following
      ? await client.query(
          "insert into follows (follower_id, followee_id) values ($1, $2) on conflict do nothing",
          [viewerId, userId],
        )
      : await client.query(
          "delete from follows where follower_id = $1 and followee_id = $2",
          [viewerId, userId],
        );
    if (changed.rowCount) {
      await client.query(
        `update users set
           follower_count = greatest(0, follower_count + case when id = $2 then $3::int else 0 end),
           following_count = greatest(0, following_count + case when id = $1 then $3::int else 0 end)
         where id in ($1, $2)`,
        [viewerId, userId, following ? 1 : -1],
      );
      const notification = {
        recipientId: userId,
        kind: "follow",
        actorId: viewerId,
        postId: null,
      } as const;
      if (following) {
        await createNotification(client, { ...notification, quote: null });
      } else {
        await removeNotification(client, notification);
      }
    }
    return getUserById(viewerId, userId, client);
  });
}

export async function updateProfile(
  viewerId: string,
  { name, handle, bio }: ProfileUpdate,
): Promise<UserView> {
  try {
    await query(
      "update users set name = $2, handle = $3, bio = $4, updated_at = now() where id = $1",
      [viewerId, name, handle, bio],
    );
  } catch (error) {
    if ((error as { code?: string }).code === UNIQUE_VIOLATION) {
      throw new DataError("validation", `@${handle} is already taken.`);
    }
    throw error;
  }
  return getUserById(viewerId, viewerId);
}

const PHOTO_COLUMN: Record<ProfilePhotoKind, string> = {
  avatar: "avatar_url",
  cover: "cover_url",
};

// Sets or removes (null) the viewer's profile photo or cover.
export async function setProfilePhoto(
  viewerId: string,
  kind: ProfilePhotoKind,
  url: string | null,
): Promise<UserView> {
  await query(
    `update users set ${PHOTO_COLUMN[kind]} = $2, updated_at = now() where id = $1`,
    [viewerId, url],
  );
  return getUserById(viewerId, viewerId);
}
