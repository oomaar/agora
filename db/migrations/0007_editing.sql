-- Authors can edit and delete their posts and comments; edits are marked.

alter table posts add column edited_at timestamptz;
alter table comments add column edited_at timestamptz;

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
  'editedAt', iso(target.edited_at),
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

create or replace function comment_view(target comments, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'postId', target.post_id,
  'authorId', target.author_id,
  'text', target.text,
  'createdAt', iso(target.created_at),
  'editedAt', iso(target.edited_at),
  'author', (select user_view(u, viewer_id) from users u where u.id = target.author_id),
  'status', 'sent'
);
