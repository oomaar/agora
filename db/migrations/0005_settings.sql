-- Per-person settings: the default audience for new posts and which activity creates notifications.
-- A missing row means the defaults; the row is created the first time a setting changes.

create table user_settings (
  user_id text primary key references users (id) on delete cascade,
  default_audience text not null default 'everyone' check (default_audience in ('everyone', 'following')),
  notify_likes boolean not null default true,
  -- Covers replies and mentions.
  notify_replies boolean not null default true,
  notify_follows boolean not null default true,
  updated_at timestamptz not null default now()
);

-- The types/domain.ts UserSettings shape, with the defaults filled in.
create function settings_view(target_id text) returns jsonb
language sql stable
return (
  select jsonb_build_object(
    'defaultAudience', coalesce(s.default_audience, 'everyone'),
    'notifyLikes', coalesce(s.notify_likes, true),
    'notifyReplies', coalesce(s.notify_replies, true),
    'notifyFollows', coalesce(s.notify_follows, true)
  )
  from (select target_id as id) u
  left join user_settings s on s.user_id = u.id
);

-- Whether the recipient wants notifications of this kind; Agora's own milestones always arrive.
create function wants_notification(recipient_id text, kind text) returns boolean
language sql stable
return coalesce((
  select case kind
    when 'like' then s.notify_likes
    when 'reply' then s.notify_replies
    when 'mention' then s.notify_replies
    when 'follow' then s.notify_follows
  end
  from user_settings s
  where s.user_id = recipient_id
), true);
