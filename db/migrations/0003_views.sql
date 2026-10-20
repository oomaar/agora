-- The JSON shapes the API returns (types/domain.ts views), built in the database.
-- `viewer_id` is the signed-in user: isSelf, isFollowing, liked, fromSelf … are from their point of view.

-- Matches JavaScript's Date#toISOString, e.g. 2026-10-20T09:30:00.000Z.
create function iso(value timestamptz) returns text
language sql immutable
return to_char(value at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');

create function user_view(target users, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'name', target.name,
  'handle', target.handle,
  'bio', target.bio,
  'location', target.location,
  'joinedAt', iso(target.created_at),
  'followingCount', target.following_count,
  'followerCount', target.follower_count,
  'isSelf', target.id = viewer_id,
  'isFollowing', exists (
    select 1 from follows f
    where f.follower_id = viewer_id and f.followee_id = target.id
  )
);

-- "Following" posts are only shown to the author's followers and the author.
create function can_see_post(target posts, viewer_id text) returns boolean
language sql stable
return target.audience = 'everyone'
  or target.author_id = viewer_id
  or exists (
    select 1 from follows f
    where f.follower_id = viewer_id and f.followee_id = target.author_id
  );

create function post_view(target posts, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'authorId', target.author_id,
  'text', target.text,
  'media', target.media,
  'audience', target.audience,
  'createdAt', iso(target.created_at),
  'likeCount', target.like_count,
  'repostCount', target.repost_count,
  'commentCount', target.comment_count,
  'author', (select user_view(u, viewer_id) from users u where u.id = target.author_id),
  'liked', exists (
    select 1 from reactions r
    where r.post_id = target.id and r.user_id = viewer_id and r.kind = 'like'
  ),
  'reposted', exists (
    select 1 from reactions r
    where r.post_id = target.id and r.user_id = viewer_id and r.kind = 'repost'
  )
);

create function comment_view(target comments, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'postId', target.post_id,
  'authorId', target.author_id,
  'text', target.text,
  'createdAt', iso(target.created_at),
  'author', (select user_view(u, viewer_id) from users u where u.id = target.author_id),
  'status', 'sent'
);

create function notification_view(target notifications, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'kind', target.kind,
  'actorId', target.actor_id,
  'postId', target.post_id,
  'text', target.text,
  'quote', target.quote,
  'createdAt', iso(target.created_at),
  'read', target.read,
  'actor', (select user_view(u, viewer_id) from users u where u.id = target.actor_id)
);

create function message_view(target messages, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'conversationId', target.conversation_id,
  'senderId', target.sender_id,
  'text', target.text,
  'createdAt', iso(target.created_at),
  'fromSelf', target.sender_id = viewer_id,
  'status', 'sent'
);

-- Members lists everyone but the viewer; memberIds starts with the viewer.
create function conversation_view(target conversations, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'name', target.name,
  'memberIds', (
    select jsonb_agg(m.user_id order by m.user_id <> viewer_id, m.user_id)
    from conversation_members m
    where m.conversation_id = target.id
  ),
  'unread', coalesce((
    select m.unread from conversation_members m
    where m.conversation_id = target.id and m.user_id = viewer_id
  ), false),
  'members', coalesce((
    select jsonb_agg(user_view(u, viewer_id) order by u.name)
    from conversation_members m
    join users u on u.id = m.user_id
    where m.conversation_id = target.id and m.user_id <> viewer_id
  ), '[]'::jsonb),
  'lastMessage', (
    select jsonb_build_object(
      'id', msg.id,
      'conversationId', msg.conversation_id,
      'senderId', msg.sender_id,
      'text', msg.text,
      'createdAt', iso(msg.created_at)
    )
    from messages msg
    where msg.conversation_id = target.id
    order by msg.created_at desc
    limit 1
  )
);

create function trend_view(target trends) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'category', target.category,
  'title', target.title,
  'postCount', target.post_count
);
