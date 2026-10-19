# Agora — Project Source of Truth

Agora is a portfolio project: a social "public square" app (feed, posts, comments, profiles, explore, notifications, messages, settings) plus a **Demo mode** that mirrors every app route under `/demo/*` with a simulated in-browser backend.

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
7. Avoid libraries as much as possible — build everything from scratch with our own fingerprint.
8. Simply do what is asked, no more no less.

---

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Fonts: Geist (UI) and Geist Mono (data, routes, counters)

---

## Project Structure

| Folder | Holds |
|---|---|
| `app/` | Routes, layouts, `globals.css` (design tokens) |
| `components/` | All reusable components |
| `context/` | React context providers |
| `hooks/` | Custom hooks |
| `lib/` | Feature modules: constants, stores, scripts (e.g. `lib/theme/`) |
| `services/` | Data sources and the simulated backend |
| `types/` | Shared type definitions |
| `utils/` | Pure helper functions |

Phase 1 component layout: primitives in `components/ui/`, post card in `components/post/`, their class maps in `lib/ui/`. `cn` does not resolve conflicting classes, so components expose props (e.g. `divider`, `pill`, `fieldSize`) instead of relying on `className` overrides.

Phase 2 shell: route groups `(public)` and `(app)`; inside `(app)`, `(with-rail)` adds the context rail and `(no-rail)` (messages, settings) gives that space to the page. Shell components live in `components/shell/`, nav data and class maps in `lib/shell/`. Compose is URL state (`?compose`).

Breakpoints (min-width): `sm:` 640 · `nav:` 900 · `rail:` 1100 — Tailwind defaults are disabled.

---

## Delivery Estimate

- **Start:** 2026-10-18
- **Target delivery:** 2026-12-20 (~9 weeks)

| Phase | Name | Target end |
|---|---|---|
| 0 | Foundation & design system tokens | 2026-10-25 |
| 1 | Core UI components | 2026-11-01 |
| 2 | App shell & navigation | 2026-11-08 |
| 3 | Data layer & simulated backend | 2026-11-15 |
| 4 | Public pages (welcome, sign up, demo landing) | 2026-11-19 |
| 5 | Feed, post & compose | 2026-11-29 |
| 6 | Profile, explore, notifications | 2026-12-04 |
| 7 | Messages & settings | 2026-12-09 |
| 8 | Demo mode experience | 2026-12-13 |
| 9 | Mobile, accessibility & polish | 2026-12-17 |
| 10 | QA, performance & deployment | 2026-12-20 |

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

- [ ] 3.1 Domain types: User, Post, Comment, Reaction, Notification, Conversation, Message, Trend
- [ ] 3.2 Data-source abstraction (one contract, swappable implementations) so app and demo share components
- [ ] 3.3 In-browser simulated server with realistic latency
- [ ] 3.4 Network conditions: Normal, Slow, Offline, Flaky
- [ ] 3.5 Seed data generator (~40 people with profiles, posts, photos, conversations)
- [ ] 3.6 Scenarios: Busy community, Fresh account, Flaky network
- [ ] 3.7 Activity log in plain language ("Your like was saved")
- [ ] 3.8 Data hooks with loading / empty / error / success states
- [ ] 3.9 Optimistic updates with retry on failure

### Phase 4 — Public Pages

- [ ] 4.1 Welcome & sign in (`/`)
- [ ] 4.2 Create account (`/signup`)
- [ ] 4.3 Demo landing (`/demo`): signed-in-as card, scenario picker, feature highlights, Enter demo
- [ ] 4.4 Auth state (context + hooks) and route protection

### Phase 5 — Feed, Post & Compose

- [ ] 5.1 Home feed (`/home`) with For you / Following tabs
- [ ] 5.2 Inline composer (text, photo, video)
- [ ] 5.3 Feed states: loading skeletons, empty, error, "You're all caught up"
- [ ] 5.4 Post actions: like, comment, repost, share
- [ ] 5.5 Post detail (`/post/[id]`): stats, follow, reply box, comments, failed comment + retry, unavailable post
- [ ] 5.6 Compose modal: audience, photo / video / poll, character counter, validation errors, posting → published

### Phase 6 — Profile, Explore, Notifications

- [ ] 6.1 Profile (`/u/[handle]`): cover, avatar, bio, meta, following / followers, Edit profile
- [ ] 6.2 Profile tabs: Posts, Replies, Media, Likes
- [ ] 6.3 Explore (`/explore`): search, tabs (Top, People, Posts, Media, Topics), Trending today, People to follow, Photos & video
- [ ] 6.4 Notifications (`/notifications`): All / Mentions & replies, unread styling, Mark all as read

### Phase 7 — Messages & Settings

- [ ] 7.1 Messages (`/messages/[id]`): two-pane route, conversation list + search, new message
- [ ] 7.2 Chat thread: header (Active now, View profile), day separators, message meta, send
- [ ] 7.3 Settings (`/settings/[section]`): Account, Privacy & safety, Notifications, Appearance, Demo, Log out
- [ ] 7.4 Account form (display name, handle, bio, save changes)
- [ ] 7.5 Appearance (theme picker) and Notification toggles

### Phase 8 — Demo Mode Experience

- [ ] 8.1 Mirror every app route under `/demo/*` with the same components, demo data source only
- [ ] 8.2 Persistent demo bar: signed in as, scenario, Reset, Exit demo
- [ ] 8.3 Simulation card in the right rail: network selector + recent activity
- [ ] 8.4 Entry points: Welcome page, sidebar card, Settings › Demo, direct link
- [ ] 8.5 Exit returns to where the user came from; Reset restores the scenario

### Phase 9 — Mobile, Accessibility & Polish

- [ ] 9.1 Mobile single column, bottom tab bar (Home, Explore, Alerts, Messages, Profile)
- [ ] 9.2 Floating compose button → full-screen sheet
- [ ] 9.3 Messages: list → thread navigation on mobile
- [ ] 9.4 Simulation card as a bottom sheet from the demo bar; demo bar pinned
- [ ] 9.5 Minimum 44px tap targets
- [ ] 9.6 Accessibility: keyboard navigation, focus states, ARIA, contrast checks per design system
- [ ] 9.7 Transitions and micro-interactions

### Phase 10 — QA, Performance & Deployment

- [ ] 10.1 Lint and type-check clean
- [ ] 10.2 Manual QA against wireframes (dark + light)
- [ ] 10.3 Performance pass (bundle size, images, Lighthouse)
- [ ] 10.4 SEO metadata, favicon / app icon
- [ ] 10.5 README for the portfolio
- [ ] 10.6 Deployment

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
