-- Better Auth tables, with the profile columns Agora keeps on each user.
-- Column names are mapped to Better Auth's fields in lib/auth/schema.ts.

create table users (
  id text primary key,
  name text not null,
  email text not null unique,
  email_verified boolean not null default false,
  image text,
  handle text not null unique check (handle ~ '^[a-z0-9._]{2,30}$'),
  bio text not null default '' check (char_length(bio) <= 160),
  location text,
  following_count integer not null default 0 check (following_count >= 0),
  follower_count integer not null default 0 check (follower_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table sessions (
  id text primary key,
  user_id text not null references users (id) on delete cascade,
  token text not null unique,
  expires_at timestamptz not null,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sessions_user_id_idx on sessions (user_id);

-- One row per sign-in method: "credential" holds the password hash, "google" the OAuth tokens.
create table accounts (
  id text primary key,
  user_id text not null references users (id) on delete cascade,
  account_id text not null,
  provider_id text not null,
  access_token text,
  refresh_token text,
  id_token text,
  access_token_expires_at timestamptz,
  refresh_token_expires_at timestamptz,
  scope text,
  password text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider_id, account_id)
);

create index accounts_user_id_idx on accounts (user_id);

create table verifications (
  id text primary key,
  identifier text not null,
  value text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index verifications_identifier_idx on verifications (identifier);

-- Sign-in and sign-up attempts per IP, shared by every server instance.
create table rate_limits (
  id text primary key,
  key text not null unique,
  count integer not null,
  last_request bigint not null
);
