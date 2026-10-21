-- Polls: a post can carry 2–4 options; each person votes once and can't change their vote.

create table poll_options (
  id text primary key default 'option_' || replace(gen_random_uuid()::text, '-', ''),
  post_id text not null references posts (id) on delete cascade,
  position smallint not null check (position between 0 and 3),
  text text not null check (char_length(text) between 1 and 25),
  vote_count integer not null default 0 check (vote_count >= 0),
  unique (post_id, position)
);

create table poll_votes (
  post_id text not null references posts (id) on delete cascade,
  user_id text not null references users (id) on delete cascade,
  option_id text not null references poll_options (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- post_view gains `poll` (null without one) and `votedOptionId` (the viewer's vote).
create or replace function post_view(target posts, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'authorId', target.author_id,
  'text', target.text,
  'media', target.media,
  'poll', (
    select jsonb_build_object(
      'options', jsonb_agg(
        jsonb_build_object('id', o.id, 'text', o.text, 'voteCount', o.vote_count)
        order by o.position
      )
    )
    from poll_options o
    where o.post_id = target.id
    having count(*) > 0
  ),
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
  ),
  'votedOptionId', (
    select v.option_id from poll_votes v
    where v.post_id = target.id and v.user_id = viewer_id
  )
);
