-- Chat: up to 4 attachments per message (photos, video, documents, voice notes) and
-- typing status. A message needs text, attachments, or both.

-- message_view uses the table's row type, so it's recreated around the change.
drop function message_view(messages, text);

alter table messages
  add column attachments jsonb not null default '[]'::jsonb,
  drop constraint messages_text_check,
  add constraint messages_content_check check (
    char_length(text) <= 1000
    and case
      when jsonb_typeof(attachments) = 'array' then
        jsonb_array_length(attachments) <= 4
        and (char_length(text) > 0 or jsonb_array_length(attachments) > 0)
      else false
    end
  );

-- When the member's browser last said they were typing; it counts for a few seconds.
alter table conversation_members add column typing_at timestamptz;

create function message_view(target messages, viewer_id text) returns jsonb
language sql stable
return jsonb_build_object(
  'id', target.id,
  'conversationId', target.conversation_id,
  'senderId', target.sender_id,
  'text', target.text,
  'attachments', target.attachments,
  'createdAt', iso(target.created_at),
  'fromSelf', target.sender_id = viewer_id,
  'status', 'sent'
);

-- Members lists everyone but the viewer; memberIds starts with the viewer.
create or replace function conversation_view(target conversations, viewer_id text) returns jsonb
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
      'attachments', msg.attachments,
      'createdAt', iso(msg.created_at)
    )
    from messages msg
    where msg.conversation_id = target.id
    order by msg.created_at desc
    limit 1
  )
);
