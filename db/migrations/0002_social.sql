-- The public square: follows, posts, comments, reactions, notifications, messages and trends.
-- Ids carry a prefix (post_, comment_ …) like the simulated backend, so the query cache can tell entities apart.

create table follows (
  follower_id text not null references users (id) on delete cascade,
  followee_id text not null references users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followee_id),
  check (follower_id <> followee_id)
);

create index follows_followee_id_idx on follows (followee_id);

create table posts (
  id text primary key default 'post_' || replace(gen_random_uuid()::text, '-', ''),
  author_id text not null references users (id) on delete cascade,
  text text not null check (char_length(text) between 1 and 280),
  media jsonb,
  audience text not null default 'everyone' check (audience in ('everyone', 'following')),
  like_count integer not null default 0 check (like_count >= 0),
  repost_count integer not null default 0 check (repost_count >= 0),
  comment_count integer not null default 0 check (comment_count >= 0),
  created_at timestamptz not null default now()
);

create index posts_created_at_idx on posts (created_at desc);
create index posts_author_id_created_at_idx on posts (author_id, created_at desc);

create table comments (
  id text primary key default 'comment_' || replace(gen_random_uuid()::text, '-', ''),
  post_id text not null references posts (id) on delete cascade,
  author_id text not null references users (id) on delete cascade,
  text text not null check (char_length(text) between 1 and 280),
  created_at timestamptz not null default now()
);

create index comments_post_id_created_at_idx on comments (post_id, created_at desc);
create index comments_author_id_created_at_idx on comments (author_id, created_at desc);

create table reactions (
  id text primary key default 'reaction_' || replace(gen_random_uuid()::text, '-', ''),
  kind text not null check (kind in ('like', 'repost')),
  user_id text not null references users (id) on delete cascade,
  post_id text not null references posts (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, post_id, kind)
);

create index reactions_post_id_idx on reactions (post_id);
create index reactions_user_id_kind_created_at_idx on reactions (user_id, kind, created_at desc);

create table notifications (
  id text primary key default 'notification_' || replace(gen_random_uuid()::text, '-', ''),
  recipient_id text not null references users (id) on delete cascade,
  kind text not null check (kind in ('like', 'reply', 'follow', 'mention', 'milestone')),
  -- null when Agora itself is the sender (milestones).
  actor_id text references users (id) on delete cascade,
  post_id text references posts (id) on delete cascade,
  text text not null,
  quote text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index notifications_recipient_id_created_at_idx on notifications (recipient_id, created_at desc);

create table conversations (
  id text primary key default 'conversation_' || replace(gen_random_uuid()::text, '-', ''),
  -- Group conversations have a name; one-to-one conversations use the other member's name.
  name text,
  created_at timestamptz not null default now()
);

-- Unread is per member: a new message marks the conversation unread for everyone but the sender.
create table conversation_members (
  conversation_id text not null references conversations (id) on delete cascade,
  user_id text not null references users (id) on delete cascade,
  unread boolean not null default false,
  primary key (conversation_id, user_id)
);

create index conversation_members_user_id_idx on conversation_members (user_id);

create table messages (
  id text primary key default 'message_' || replace(gen_random_uuid()::text, '-', ''),
  conversation_id text not null references conversations (id) on delete cascade,
  sender_id text not null references users (id) on delete cascade,
  text text not null check (char_length(text) between 1 and 1000),
  created_at timestamptz not null default now()
);

create index messages_conversation_id_created_at_idx on messages (conversation_id, created_at);

create table trends (
  id text primary key,
  category text not null,
  title text not null,
  post_count integer not null default 0,
  position integer not null
);
