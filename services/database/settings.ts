import "server-only";
import { selectView } from "@/lib/db/query";
import { NOT_FOUND } from "@/lib/api/constants";
import { type UserSettings } from "@/types/domain";
import { type SettingsUpdate } from "@/types/dataSource";

export function getSettings(viewerId: string): Promise<UserSettings> {
  return selectView(
    "select settings_view($1) as view",
    [viewerId],
    NOT_FOUND.user,
  );
}

// Creates the row on the first change; settings left out of the update keep their value.
export function updateSettings(
  viewerId: string,
  {
    defaultAudience,
    notifyLikes,
    notifyReplies,
    notifyFollows,
  }: SettingsUpdate,
): Promise<UserSettings> {
  return selectView(
    `with saved as (
       insert into user_settings as s (user_id, default_audience, notify_likes, notify_replies, notify_follows)
       values ($1, coalesce($2, 'everyone'), coalesce($3, true), coalesce($4, true), coalesce($5, true))
       on conflict (user_id) do update set
         default_audience = coalesce($2, s.default_audience),
         notify_likes = coalesce($3, s.notify_likes),
         notify_replies = coalesce($4, s.notify_replies),
         notify_follows = coalesce($5, s.notify_follows),
         updated_at = now()
       returning *
     )
     select jsonb_build_object(
       'defaultAudience', default_audience,
       'notifyLikes', notify_likes,
       'notifyReplies', notify_replies,
       'notifyFollows', notify_follows
     ) as view
     from saved`,
    [
      viewerId,
      defaultAudience ?? null,
      notifyLikes ?? null,
      notifyReplies ?? null,
      notifyFollows ?? null,
    ],
    NOT_FOUND.user,
  );
}
