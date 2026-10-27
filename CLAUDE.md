# Agora — Project Source of Truth

Agora is a portfolio project: a full-stack social "public square" app (feed, posts, comments, profiles, explore, notifications, messages, settings) backed by a real API, database and authentication, plus a **Demo mode** that mirrors every app route under `/demo/*` with a simulated in-browser backend. The simulated backend serves the demo only.

This file is the single source of truth for rules, phases, tasks and progress. Update the checkboxes and the progress log as work is completed.

---

## Wireframes

```
/Users/omar/Projects/agora/Agora wireframes
```

- `Agora Wireframes.dc.html` — dark theme wireframes + clickable prototype (dark is the default theme)
- `Agora Wireframes Light.dc.html` — light theme wireframes
- `Agora Design System.dc.html` — logo, colour tokens, typography, spacing, radius, elevation, shadows, core components

---

## Rules

1. Never use `interface` — always use `type` for type definitions.
2. Use Tailwind CSS only for styles — no inline styles and no plain CSS.
3. No flat code in files — code must be split: types, context, hooks, utils and functions each live in their own files (follow SOLID principles).
4. Never commit or push unless explicitly asked.
5. Never open PRs or create new branches unless explicitly asked.
6. All reusable components live in the `components` folder.
7. Avoid libraries as much as possible — build everything from scratch with our own fingerprint. Approved exceptions: `pg` (database driver, raw SQL only — no ORM) and Better Auth (authentication).
8. Simply do what is asked, no more no less.

---

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Fonts: Geist (UI) and Geist Mono (data, routes, counters)
- Database: Postgres (Neon), accessed with `pg` and hand-written SQL; schema and migrations as `.sql` files
- Auth: Better Auth — email + password and Google sign-in, sessions stored in Postgres
- Media storage: Vercel Blob (uploads phase)
- Hosting: Vercel

---

## Setup Before Phase 5

Done by the project owner; secrets go in `.env.local` (never committed), and `.env.example` lists the variable names.

- [x] Create a free Neon project at neon.tech and add its connection string as `DATABASE_URL`
- [x] Create a Google OAuth client in Google Cloud Console (Credentials → OAuth client ID → Web application) with the redirect URI `http://localhost:3000/api/auth/callback/google`; add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- [x] `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` (generated during Phase 5)

---

## Project Structure

| Folder | Holds |
|---|---|
| `app/` | Routes, layouts, `globals.css` (design tokens) |
| `components/` | All reusable components |
| `context/` | React context providers |
| `hooks/` | Custom hooks |
| `lib/` | Feature modules: constants, stores, scripts (e.g. `lib/theme/`) |
| `services/` | Data sources (API client for the app, simulated backend for the demo), database repositories, auth calls |
| `types/` | Shared type definitions |
| `utils/` | Pure helper functions |
| `db/` | SQL migrations (`db/migrations/*.sql`, applied in file-name order) |
| `scripts/` | Node scripts run with `npm run db:*` (`db:migrate`, `db:seed`) |

Phase 1 component layout: primitives in `components/ui/`, post card in `components/post/`, their class maps in `lib/ui/`. `cn` does not resolve conflicting classes, so components expose props (e.g. `divider`, `pill`, `fieldSize`) instead of relying on `className` overrides.

Phase 2 shell: route groups `(public)` and `(app)`; inside `(app)`, `(with-rail)` adds the context rail and `(no-rail)` (messages, settings) gives that space to the page. Shell components live in `components/shell/`, nav data and class maps in `lib/shell/`. Compose is URL state (`?compose`).

Phase 3 data layer: components talk only to the `DataSource` contract (`types/dataSource.ts`) through `DataProvider` (`context/DataContext.tsx`, preset `app` or `demo`). The in-browser backend lives in `services/simulated/` (database, network, activity log) and `services/seed/` (deterministic generator); hand-written seed content in `lib/seed/`, scenarios and network profiles in `lib/simulation/`, the query cache and keys in `lib/data/`. Read hooks wrap `useQuery` (loading / empty / error / success); write hooks wrap `useMutation` (optimistic update, rollback, retry).

Phase 4 public pages: components live in `components/public/`, `components/auth/` and `components/demo/`, their copy and constants in `lib/public/` and `lib/auth/`.

Phase 5 backend: Postgres through one `pg` pool (`lib/db/pool.ts`, server-only; `lib/db/createPool.ts` for scripts). Schema, indexes and checks are hand-written SQL in `db/migrations/`; `0003_views.sql` defines SQL functions (`user_view`, `post_view` …) that return the exact `types/domain.ts` view JSON, and `can_see_post` hides "following" posts from non-followers. Repositories in `services/database/` select one `view` column per row (`$1` is always the viewer); writes that touch counters or notifications run in a transaction. Route handlers in `app/api/*` wrap `withViewer` (`lib/api/withViewer.ts`): session check, cross-site write check, JSON result, errors as `{ error: { code, message } }`; input parsing lives in `lib/api/input.ts` and paths in `lib/api/endpoints.ts`. The app's `DataProvider` uses `services/api/createApiSource.ts`; the demo keeps the simulation. Scripts import app code through a small `@/` resolver (`scripts/loader/`) and run on Node's built-in TypeScript support. `npm run db:seed` fills an empty database from the app preset (`--reset` replaces everything).

Phase 5 auth: Better Auth (`lib/auth/auth.ts`) with email + password and Google, sessions and rate limits in Postgres; its tables and column mapping are in `0001_auth.sql` and `lib/auth/schema.ts`. The sign-up hook (`lib/auth/prepareNewUser.ts`) checks the name and handle and gives Google sign-ups a handle; `/update-user` is disabled so profile changes go through `PATCH /api/me`. `proxy.ts` only checks that the `agora.session_token` cookie exists; `(app)/layout.tsx`, the welcome / sign-up pages (`redirectIfSignedIn`) and every API route check the session against the database (`lib/auth/getSession.ts`). Browser calls go through `services/auth/authApi.ts`, which maps Better Auth errors to form fields.

Phase 6 feed & post: the feed lives in `components/feed/` (`HomeFeed` with tabs in `PageHeader`, `FeedList` states, `InlineComposer` opens `?compose`); `components/post/PostItem.tsx` wires a `PostView` to the presentational `PostCard` (open, like, repost, vote, share, comment → `/post/[id]#reply`). Post detail is `PostDetail` → `PostThread` (body, `ReplyBox`, `CommentList`); `PageHeader` takes `back` and tabs as children. The compose modal keeps its draft in `useComposer` (validated with the server's own `requireText` / `requirePollOptions` before sending); its parts are in `components/compose/`. Polls: `0004_polls.sql` (`poll_options`, `poll_votes`, `post_view` gains `poll` and `votedOptionId`), 2–4 options of up to 25 characters, one vote per person that can't be changed, `PUT /api/posts/[id]/vote`. Copy and constants in `lib/posts/constants.ts`.

Phase 7 profile, explore & notifications: `components/profile/` (`ProfileView` → `ProfileHeader` + `ProfilePosts` tabs), `components/explore/` (`ExploreView` with the search in `?q=` read by the page; Top shows discovery without a search and results with one; `ExploreQuery` holds each section's states) and `components/notifications/` (`NotificationsView` with Mark all as read in `PageHeader`'s `action`; rows link to their post or profile). Lists of posts go through `components/post/PostList.tsx` (loading, error, empty, "all caught up"), which `FeedList` also uses. Copy and constants in `lib/profile/`, `lib/explore/` and `lib/notifications/`.

Phase 8 messages & settings: `components/messages/` (`MessagesLayout` keeps `ConversationList` mounted beside the thread; `ChatThread` → `ChatHeader`, `ChatMessages` with day separators, `ChatComposer`; `NewMessageModal` searches people and calls `startConversation`, which reuses or creates the one-to-one conversation) and `components/settings/` (`SettingsLayout` with `SettingsNav` and Log out; one panel per section through `lib/settings/sections.ts`). Settings live in `user_settings` (`0005_settings.sql`, `GET` / `PATCH /api/me/settings`): the default audience seeds the composer, and the notification switches are checked by `wants_notification` before a like, reply, mention or follow notification is created. "Active now" means the other person's latest message is under 5 minutes old (there's no presence tracking). The theme stays on the device. Constants in `lib/messages/` and `lib/settings/`.

Phase 9 media uploads: files go from the browser straight to Vercel Blob. `POST /api/uploads` checks the type and size (`utils/checkUpload.ts`, shared with the browser) and signs a short-lived client token for one pathname, `<purpose>/<userId>/<uuid>.<ext>` (`services/blob/createUploadGrant.ts`, the same token format as `@vercel/blob`, which isn't a dependency); `services/api/uploadToBlob.ts` PUTs the file with XMLHttpRequest for progress. Saving a URL (post media, `PUT /api/me/photos/[kind]`) goes through `readOwnedMedia`, which only accepts files in that user's folder of our store and takes photo / video from the extension. `0006_media.sql` adds `users.avatar_url` and `cover_url` (Better Auth's `image` stays unused). The `DataSource` gains `uploadMedia` (the simulated one returns a local object URL) and `setProfilePhoto`. `useMediaUpload` (`hooks/media/`) holds one file's preview, progress, failure and retry; the compose draft lives in `ComposerContext` so the feed's Photo / Video buttons attach a file before the modal opens. Profile photos save as soon as they upload (Settings › Account). Types and limits in `lib/media/constants.ts`; Blob images are allowed in `next.config.ts`.

Editing (9.5 – 9.7): `0007_editing.sql` adds `edited_at` to posts and comments (`editedAt` in the views). `PATCH` / `DELETE /api/posts/[id]` and `/api/comments/[id]` are author-only (403 otherwise); deleting a post takes its comments, reactions, votes and notifications with it, deleting a comment drops the count and, once the person has no comments left on the post, its "replied" notification. Edits change the text only. `OwnerMenu` (`components/post/`) is the ⋯ menu with `EditTextModal` and `ConfirmDialog`, fed by `usePostOwnerActions` / `useCommentOwnerActions`; the cache's `removeEntity` drops a deleted item from every list. Uploads measure width and height in the browser (`utils/readMediaSize.ts`), the API keeps them in `posts.media`, and `PostMedia` shows media at that shape (capped at 512px tall, never cropped); a photo opens `MediaViewer` with its real size and the original file.

Hooks are grouped by feature: `hooks/data/` (provider access, `useQuery`, `useMutation`, simulation), `hooks/posts/`, `hooks/users/`, `hooks/explore/`, `hooks/notifications/`, `hooks/messages/`, `hooks/settings/`, `hooks/media/`, `hooks/shell/` (compose, unread counts), `hooks/auth/` (session, sign-in, sign-up and Google) and `hooks/ui/` (component behaviour, toast, theme).

Breakpoints (min-width): `sm:` 640 · `nav:` 900 · `rail:` 1100 — Tailwind defaults are disabled.

---

## Delivery Estimate

- **Start:** 2026-10-18
- **Target delivery:** 2027-01-09 (~12 weeks; moved from 2026-12-20 when the app became full-stack)

| Phase | Name | Target end |
|---|---|---|
| 0 | Foundation & design system tokens | 2026-10-25 |
| 1 | Core UI components | 2026-11-01 |
| 2 | App shell & navigation | 2026-11-08 |
| 3 | Data layer & simulated backend | 2026-11-15 |
| 4 | Public pages (welcome, sign up, demo landing) | 2026-11-19 |
| 5 | Backend, database & authentication | 2026-11-30 |
| 6 | Feed, post & compose | 2026-12-10 |
| 7 | Profile, explore, notifications | 2026-12-15 |
| 8 | Messages & settings | 2026-12-21 |
| 9 | Media uploads | 2026-12-26 |
| 10 | Demo mode experience | 2026-12-31 |
| 11 | Mobile, accessibility & polish | 2027-01-05 |
| 12 | QA, performance & deployment | 2027-01-09 |

---

## Phases & Tasks

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

### Phase 0 — Foundation & Design System Tokens

- [x] 0.1 Initialise Next.js project
- [x] 0.2 Add `cn` class-merging utility (`utils/cn.ts`)
- [x] 0.3 Colour tokens for dark and light themes (`--ag-*` in `app/globals.css`, mapped to Tailwind)
- [x] 0.4 Theme system: types, constants, no-flash script, `useTheme` hook (light / dark / system)
- [x] 0.5 Typography scale (Geist + Geist Mono) as Tailwind utilities
- [x] 0.6 Spacing scale (4px base, 2px half-steps under 16), radius, elevation and shadow tokens
- [x] 0.7 Breakpoints: mobile `<640`, nav-icons `<900`, rail-hidden `<1100`
- [x] 0.8 Folder structure: `components/`, `lib/`, `types/`, `context/`, `hooks/`, `utils/`, `services/`

### Phase 1 — Core UI Components (`components/`)

- [x] 1.1 Logo (mark + wordmark, sizes 16 / 24 / 40, app icon)
- [x] 1.2 Icon set (custom SVG icons, built in-house)
- [x] 1.3 Button (Primary, Secondary, Demo, Danger, Follow; sizes; loading state)
- [x] 1.4 Input, Textarea, Search input
- [x] 1.5 Avatar (initials + image)
- [x] 1.6 Tabs (with counter badge)
- [x] 1.7 Badge / counter
- [x] 1.8 Toast (success, error) + toast provider
- [x] 1.9 Modal / sheet with scrim (elev-2)
- [x] 1.10 Menu / dropdown (elev-1)
- [x] 1.11 Toggle switch, segmented control (theme, network)
- [x] 1.12 Skeleton loaders
- [x] 1.13 State blocks: Empty, Error (with recovery actions)
- [x] 1.14 Post card

### Phase 2 — App Shell & Navigation

- [x] 2.1 Three-column shell: nav 248 · content (~640 reading width) · context rail 340
- [x] 2.2 Sidebar nav (Home, Explore, Notifications, Messages, Profile, Settings, New post, user card, "Try the demo" card)
- [x] 2.3 Context rail (search, Trending, Who to follow, footer links)
- [x] 2.4 Responsive behaviour: rail hides `<1100`, nav collapses to icons `<900`, bottom tab bar `<640`
- [x] 2.5 Route groups: public `/`, `/signup`, `/demo`; app `/home`, `/post/[id]`, `/u/[handle]`, `/explore`, `/notifications`, `/messages/[id]`, `/settings/[section]`
- [x] 2.6 Compose modal reachable on any route via `?compose`

### Phase 3 — Data Layer & Simulated Backend

- [x] 3.1 Domain types: User, Post, Comment, Reaction, Notification, Conversation, Message, Trend
- [x] 3.2 Data-source abstraction (one contract, swappable implementations) so app and demo share components — the app switches to the API data source in Phase 5
- [x] 3.3 In-browser simulated server with realistic latency
- [x] 3.4 Network conditions: Normal, Slow, Offline, Flaky
- [x] 3.5 Seed data generator (~40 people with profiles, posts, photos, conversations)
- [x] 3.6 Scenarios: Busy community, Fresh account, Flaky network
- [x] 3.7 Activity log in plain language ("Your like was saved")
- [x] 3.8 Data hooks with loading / empty / error / success states
- [x] 3.9 Optimistic updates with retry on failure

### Phase 4 — Public Pages

- [x] 4.1 Welcome & sign in (`/`)
- [x] 4.2 Create account (`/signup`)
- [x] 4.3 Demo landing (`/demo`): signed-in-as card, scenario picker, feature highlights, Enter demo
- [x] 4.4 Auth state (context + hooks) and route protection — simulated for now; replaced by real auth in 5.5 – 5.6

### Phase 5 — Backend, Database & Authentication

- [x] 5.1 Postgres on Neon: `pg` connection pool, environment variables (`.env.example`), server-only database module
- [x] 5.2 Schema and migrations in raw SQL: users, follows, posts, comments, reactions, notifications, conversations, members, messages, trends; migration runner script
- [x] 5.3 Database seed script: fills the database with the starter community from the seed generator
- [x] 5.4 Repositories: hand-written SQL queries for every `DataSource` read and write, returning the same view types
- [x] 5.5 Better Auth: email + password sign-up and sign-in (handle and display name on the user), Google sign-in, sessions in Postgres, rate limiting
- [x] 5.6 Real sessions in the app: `proxy.ts` and `(app)/layout.tsx` read the Better Auth session; sign-in / sign-up forms and Log out call it; remove the simulated auth and `localStorage` accounts
- [x] 5.7 API: route handlers for every endpoint, with session checks, input validation and consistent error responses; notifications created by likes, follows, replies and mentions
- [x] 5.8 API data source (`services/api/`) implementing `DataSource`; the app preset uses it, the demo keeps the simulation

### Phase 6 — Feed, Post & Compose

- [x] 6.1 Home feed (`/home`) with For you / Following tabs
- [x] 6.2 Inline composer (text; photo and video in Phase 9)
- [x] 6.3 Feed states: loading skeletons, empty, error, "You're all caught up"
- [x] 6.4 Post actions: like, comment, repost, share
- [x] 6.5 Post detail (`/post/[id]`): stats, follow, reply box, comments, failed comment + retry, unavailable post
- [x] 6.6 Compose modal: audience, poll, character counter, validation errors, posting → published

### Phase 7 — Profile, Explore, Notifications

- [x] 7.1 Profile (`/u/[handle]`): cover, avatar, bio, meta, following / followers, Edit profile
- [x] 7.2 Profile tabs: Posts, Replies, Media, Likes
- [x] 7.3 Explore (`/explore`): search, tabs (Top, People, Posts, Media, Topics), Trending today, People to follow, Photos & video
- [x] 7.4 Notifications (`/notifications`): All / Mentions & replies, unread styling, Mark all as read

### Phase 8 — Messages & Settings

- [x] 8.1 Messages (`/messages/[id]`): two-pane route, conversation list + search, new message
- [x] 8.2 Chat thread: header (Active now, View profile), day separators, message meta, send
- [x] 8.3 Settings (`/settings/[section]`): Account, Privacy & safety, Notifications, Appearance, Demo, Log out
- [x] 8.4 Account form (display name, handle, bio, save changes)
- [x] 8.5 Appearance (theme picker) and Notification toggles

### Phase 9 — Media Uploads

- [x] 9.1 Vercel Blob storage: signed upload endpoint with session check, file type and size limits
- [x] 9.2 Photo and video in the composer and compose modal: pick, preview, upload progress, remove, failed upload + retry
- [x] 9.3 Avatar and cover uploads in Edit profile
- [x] 9.4 Media rendering in posts, profile Media tab and Explore (Next.js `Image`, video player)
- [x] 9.5 Edit and delete your own posts (⋯ menu, edit dialog, delete confirmation, "Edited" label)
- [x] 9.6 Edit and delete your own comments
- [x] 9.7 Media at its own shape (width and height saved at upload) and a full-size photo viewer

### Phase 10 — Demo Mode Experience

- [ ] 10.1 Mirror every app route under `/demo/*` with the same components, demo data source only
- [ ] 10.2 Persistent demo bar: signed in as, scenario, Reset, Exit demo
- [ ] 10.3 Simulation card in the right rail: network selector + recent activity
- [ ] 10.4 Entry points: Welcome page, sidebar card, Settings › Demo, direct link
- [ ] 10.5 Exit returns to where the user came from; Reset restores the scenario

### Phase 11 — Mobile, Accessibility & Polish

- [ ] 11.1 Mobile single column, bottom tab bar (Home, Explore, Alerts, Messages, Profile)
- [ ] 11.2 Floating compose button → full-screen sheet
- [ ] 11.3 Messages: list → thread navigation on mobile
- [ ] 11.4 Simulation card as a bottom sheet from the demo bar; demo bar pinned
- [ ] 11.5 Minimum 44px tap targets
- [ ] 11.6 Accessibility: keyboard navigation, focus states, ARIA, contrast checks per design system
- [ ] 11.7 Transitions and micro-interactions
- [ ] 11.8 Product screenshot on the welcome page (dark + light)

### Phase 12 — QA, Performance & Deployment

- [ ] 12.1 Lint and type-check clean
- [ ] 12.2 Manual QA against wireframes (dark + light)
- [ ] 12.3 Performance pass (bundle size, images, Lighthouse)
- [ ] 12.4 SEO metadata, favicon / app icon
- [ ] 12.5 README for the portfolio
- [ ] 12.6 Security review: auth flows, session cookies, API authorization, rate limits
- [ ] 12.7 Deployment: Vercel + Neon + Blob, production environment variables, Google OAuth production redirect URL

---

## Progress Log

| Date | Phase / Task | Notes |
|---|---|---|
| 2026-10-18 | Planning | CLAUDE.md rewritten with rules, phases and delivery estimate |
| 2026-10-18 | 0.1 – 0.4 | Tokens verified against design system; theme script injected in `<head>`; theme store split from hook; body styles moved to Tailwind |
| 2026-10-18 | 0.5 – 0.6 | Type scale, spacing, radius and shadows verified against design system; `elev-0/1/2` utilities added; body defaults to `text-body font-sans` |
| 2026-10-18 | 0.7 – 0.8 | Breakpoints `sm` / `nav` / `rail` replace Tailwind defaults; folders created and files moved (`utils/cn.ts`, `hooks/useTheme.ts`, `types/theme.ts`). **Phase 0 complete** |
| 2026-10-18 | Design system page | Dev-only `/design-system` route (404 in production) mirroring the wireframe design system; `.dark` scope added so dark and light render side by side; tokens added: `on-danger`, `success-border`, `danger-border`, `on-avatar` |
| 2026-10-18 | 1.1 – 1.14 | Logo, custom icon set (lucide-react removed), Button / FollowButton / IconButton, Input / Textarea / SearchInput, Avatar, Tabs, Badge / Counter, Toast + `ToastProvider`, Modal / sheet (native `<dialog>`), Menu, Toggle, SegmentedControl, Skeletons, Empty / Error states, PostCard. New tokens: scrim, skeleton, media stripe, knob, accent border, demo soft, danger muted text. Showcased in `/design-system` section 07. **Phase 1 complete** |
| 2026-10-19 | 2.1 – 2.6 | Three-column shell (248 · 640 · 340) with sticky sidebar and rail; sidebar nav with active state, counters, New post, Try the demo card, user card + account menu; context rail (search → `/explore?q=`, Trending, Who to follow, footer); rail hides `<1100`, nav icons `<900`, bottom tab bar `<640`; route groups with placeholder pages (unknown settings sections 404); compose modal on any route via `?compose`, other params kept. New token: `nav-hover`. `Menu` gained a `side` prop. Shell data is placeholder until Phase 3. **Phase 2 complete** |
| 2026-10-19 | 3.1 – 3.9 | Domain + view types; `DataSource` contract and `DataProvider` (presets `app` / `demo`); simulated server with 300–800ms latency (2–2.6s slow), Offline and Flaky (every other request fails) conditions; seeded community of 40 people per persona with posts, media, comments, likes, notifications and conversations (same seed → same data); scenarios Busy / Fresh / Flaky with reset; plain-language activity log; query cache with entity patching, read hooks for every endpoint and mutation hooks (likes, reposts, follows revert with a toast; comments and messages go sending → sent / failed + retry). Shell placeholders replaced: user card, unread counters, Trending and Who to follow now load through hooks with skeleton and error states. **Phase 3 complete** |
| 2026-10-19 | 4.1 – 4.4 | Welcome page: split layout with pitch, sign-in form (filled in with the sample account `sam@example.com` / `agora-2026`) and the live-demo card; Create account form with field validation (taken handles and emails rejected); demo landing with persona card, scenario picker (native radios) and highlights, Enter demo → `/demo/home?scenario=…` (route built in the demo phase). Simulated auth service with the same latency as the data layer; session cookie, `proxy.ts` redirects, `AuthProvider` + `useSession`; Log out clears the session; the Profile nav link uses the signed-in handle; a new account is seeded as a fresh community under its own name. `PublicPlaceholder` removed. **Phase 4 complete** |
| 2026-10-19 | Scope change | The app becomes full-stack: Postgres (Neon) with `pg` and raw SQL, Better Auth (email + password, Google), Vercel Blob for media; the simulated backend serves the demo only. New Phase 5 (backend, database & auth) and Phase 9 (media uploads); later phases renumbered; product screenshot added as 11.8; target delivery moved to 2027-01-09 |
| 2026-10-20 | 5.1 – 5.8 | Neon Postgres through `pg` (SSL `verify-full`); `.env.example`; migrations 0001 auth tables · 0002 social tables (prefixed ids, checks, indexes) · 0003 SQL view functions; migration runner with an advisory lock; seed script loads the app preset's community (41 people, 50 posts) with Sam as the only sign-in. Repositories for every `DataSource` read and write; 20 API routes with session checks, cross-site write check, input validation and `{ error: { code, message } }` responses; likes, follows, replies and mentions create notifications (unlike / unfollow take them back). Better Auth: email + password, Google (handle generated), sessions and rate limits in Postgres (3 sign-in attempts per 10 seconds), `agora.` cookie prefix. Forms call Better Auth; Continue with Google on welcome and sign-up; signed-in redirects moved from the proxy to the pages so a stale cookie can't loop. App preset uses the API data source; demo keeps the simulation. Simulated auth, `localStorage` accounts and the session-seeded simulation removed. `requireText` moved to `utils/`. **Phase 5 complete** |
| 2026-10-20 | 6.1 – 6.6 | Home feed with For you / Following tabs in the sticky header; inline composer opens the compose modal; feed loading skeletons, empty (Write a post, Find people), error with Try again, "You're all caught up". Post actions: optimistic like and repost (repost highlighted), share copies the link, comment opens the post with the reply box focused. Post detail: back button, author + Follow, date and audience, stats line, action row, reply box, comments with Sending… / Not sent + Retry, empty and unavailable states. Compose modal: audience menu (Everyone / Followers), poll editor (2–4 options), character counter, validation errors, Posting… → published toast, failed publish keeps the draft. Polls end to end: migration `0004_polls.sql`, vote endpoint, simulated source, optimistic voting with results bars. `Menu` gained a chip trigger and single-choice items; `Input` accepts a ref. **Phase 6 complete** |
| 2026-10-21 | Favicon & titles | `app/icon.svg` (logo mark); page titles through a root template ("Home · Agora", "@sam · Agora") and a real site description |
| 2026-10-21 | 7.1 – 7.4 | Profile: cover placeholder (uploads in 9.3), large avatar, Edit profile (→ Settings › Account) or Follow with the follower count updating at once, bio, location and join date, following / followers; Posts, Replies, Media and Likes tabs with empty copy for your own profile and others'; unknown handles show "doesn't exist". Explore: search box writes `?q=` (the rail search lands here too), pill tabs Top / People / Posts / Media / Topics; without a search Top shows Trending today, People to follow cards and a Photos & video grid; with one it shows matching people (Show all people) and posts, or "No results"; trends search their title. Notifications: All / Mentions & replies, unread dot and surface, kind label and time, Agora milestones with the logo, rows open their post or profile, Mark all as read (disabled when nothing is unread). Shared `PostList` for post lists; `PageHeader` gained an `action` slot. **Phase 7 complete** |
| 2026-10-27 | 8.1 – 8.5 | Messages: two panes (list 320 · thread), list search, unread dot and text, "You:" / sender-name previews, + opens New message (people search, reuses an existing one-to-one conversation or starts one); thread header with Active now / handle / member count and View profile, day separators, Sending… → Delivered, Not delivered + Retry, Enter sends, opening marks read, unknown conversation state; on phones the list and the thread show one at a time. Settings: sub-nav with Account, Privacy & safety, Notifications, Appearance, Demo and Log out (scrolls across the top on phones). Account form (display name, handle, bio) checked in the browser and on the server, saving refreshes the session so the Profile link follows a new handle. Privacy: default audience for new posts. Notifications: Likes, Replies and mentions, New followers switches, saved at once and enforced when notifications are created. Appearance: Dark / Light / System cards. Demo: Open demo card. Migration `0005_settings.sql`; new `DataSource` methods `startConversation`, `getSettings`, `updateSettings` in both sources. **Phase 8 complete** |
| 2026-10-27 | 9.1 – 9.4 | Uploads straight from the browser to Vercel Blob with a hand-written client: `POST /api/uploads` checks the file (photos JPG / PNG / WebP / GIF up to 8 MB, video MP4 / WebM / MOV up to 50 MB; profile photos JPG / PNG / WebP) and signs a 10-minute token for one path in the user's folder; the API only saves URLs from that folder. Composer: Photo and Video in the feed's inline composer and the compose modal, preview, progress bar, remove, failed upload with Retry; posting waits for the upload. Settings › Account: profile photo and cover with Upload / Change / Remove, saved as soon as they upload. Rendering: photos through `next/image`, video with native controls (first frame as the Explore tile), cover and avatars everywhere. Migration `0006_media.sql`; new `DataSource` methods `uploadMedia` and `setProfilePhoto`; `BLOB_READ_WRITE_TOKEN` in `.env.example`. **Phase 9 complete** |
| 2026-10-27 | 9.5 – 9.7 | Add-ons: edit and delete your own posts and comments from a ⋯ menu (edit dialog with counter, delete confirmation, "Edited" label, deleted items leave every list, deleting on the post page goes Home); author-only API with 403s; media keeps its own shape using the size measured at upload, and photos open full size with their real dimensions and Open original. Migration `0007_editing.sql`; new `DataSource` methods `updatePost`, `deletePost`, `updateComment`, `deleteComment` |
