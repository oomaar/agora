-- Profile photos uploaded to Vercel Blob. Post photos and video use posts.media.
-- Better Auth's users.image stays unused.

alter table users
  add column avatar_url text,
  add column cover_url text;

create or replace function user_view(target users, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'name', target.name,
  'handle', target.handle,
  'bio', target.bio,
  'location', target.location,
  'avatarUrl', target.avatar_url,
  'coverUrl', target.cover_url,
  'joinedAt', iso(target.created_at),
  'followingCount', target.following_count,
  'followerCount', target.follower_count,
  'isSelf', target.id = viewer_id,
  'isFollowing', exists (
    select 1 from follows f
    where f.follower_id = viewer_id and f.followee_id = target.id
  )
);
