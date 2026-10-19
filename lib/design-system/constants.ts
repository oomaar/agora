import {
  type ColorGroup,
  type ContrastSample,
  type ElevationStep,
  type RadiusStep,
  type ShadowToken,
  type SpacingStep,
  type TypeStyle,
} from "@/types/designSystem";
import { type ResolvedTheme } from "@/types/theme";
import { type PostCardProps } from "@/types/post";
import { type MenuItem } from "@/types/menu";

export const DS_VERSION = "v0.1";

export const COLOR_GROUPS: ColorGroup[] = [
  {
    name: "Surface",
    description: "Backgrounds, from page to raised",
    tokens: [
      {
        name: "--ag-bg",
        dark: "#0e1012",
        light: "#fbfaf7",
        use: "App background, feed",
        swatchClassName: "bg-ag-bg",
      },
      {
        name: "--ag-surface",
        dark: "#15181b",
        light: "#ffffff",
        use: "Cards, inputs, modals",
        swatchClassName: "bg-ag-surface",
      },
      {
        name: "--ag-raised",
        dark: "#1f2428",
        light: "#efece6",
        use: "Active nav, other-person chat bubble",
        swatchClassName: "bg-ag-raised",
      },
      {
        name: "--ag-hover",
        dark: "#13161a",
        light: "#f3f1ec",
        use: "Row hover",
        swatchClassName: "bg-ag-hover",
      },
      {
        name: "--ag-nav-hover",
        dark: "#1a1e22",
        light: "#f0eee9",
        use: "Sidebar nav and user card hover",
        swatchClassName: "bg-ag-nav-hover",
      },
      {
        name: "--ag-unread",
        dark: "#13171b",
        light: "#fff6ec",
        use: "Unread notification row",
        swatchClassName: "bg-ag-unread",
      },
      {
        name: "--ag-media",
        dark: "#171a1e",
        light: "#efece6",
        use: "Media placeholder, skeleton",
        swatchClassName: "bg-ag-media",
      },
      {
        name: "--ag-media-stripe",
        dark: "#14171a",
        light: "#f6f4ef",
        use: "Second stripe of the media placeholder",
        swatchClassName: "bg-ag-media-stripe",
      },
      {
        name: "--ag-skeleton",
        dark: "#1e2227",
        light: "#e6e3dd",
        use: "Skeleton lines and avatars",
        swatchClassName: "bg-ag-skeleton",
      },
      {
        name: "--ag-skeleton-media",
        dark: "#181b1f",
        light: "#efede8",
        use: "Skeleton media blocks",
        swatchClassName: "bg-ag-skeleton-media",
      },
      {
        name: "--ag-scrim",
        dark: "rgba(5,6,8,.72)",
        light: "rgba(30,25,15,.35)",
        use: "Backdrop behind modals and sheets",
        swatchClassName: "bg-ag-scrim",
      },
    ],
  },
  {
    name: "Border",
    description: "Hairlines and control outlines",
    tokens: [
      {
        name: "--ag-border-subtle",
        dark: "#22262b",
        light: "#e6e2da",
        use: "Dividers between rows",
        swatchClassName: "bg-ag-border-subtle",
      },
      {
        name: "--ag-border",
        dark: "#2a2f35",
        light: "#d9d4ca",
        use: "Cards, inputs, chips",
        swatchClassName: "bg-ag-border",
      },
      {
        name: "--ag-border-strong",
        dark: "#3a4047",
        light: "#bfb9ae",
        use: "Secondary buttons",
        swatchClassName: "bg-ag-border-strong",
      },
    ],
  },
  {
    name: "Text",
    description: "Three levels only",
    tokens: [
      {
        name: "--ag-text",
        dark: "#e9ecef",
        light: "#1d1b17",
        use: "Primary copy, headings",
        swatchClassName: "bg-ag-text",
      },
      {
        name: "--ag-text-secondary",
        dark: "#9ba3ab",
        light: "#6b665d",
        use: "Handles, timestamps, meta",
        swatchClassName: "bg-ag-text-secondary",
      },
      {
        name: "--ag-text-placeholder",
        dark: "#7d858d",
        light: "#8a847a",
        use: "Placeholders, disabled",
        swatchClassName: "bg-ag-text-placeholder",
      },
    ],
  },
  {
    name: "Accent · Agora amber",
    description: "Primary actions and brand",
    tokens: [
      {
        name: "--ag-accent",
        dark: "#f0a35e",
        light: "#f0a35e",
        use: "Primary button, active tab, badges",
        swatchClassName: "bg-ag-accent",
      },
      {
        name: "--ag-accent-hover",
        dark: "#f6b67a",
        light: "#e8954c",
        use: "Primary hover",
        swatchClassName: "bg-ag-accent-hover",
      },
      {
        name: "--ag-on-accent",
        dark: "#1a1208",
        light: "#1a1208",
        use: "Text on accent",
        swatchClassName: "bg-ag-on-accent",
      },
      {
        name: "--ag-accent-text",
        dark: "#f0a35e",
        light: "#a65a1c",
        use: "Links, accent text",
        swatchClassName: "bg-ag-accent-text",
      },
      {
        name: "--ag-accent-soft",
        dark: "#3a2c1d",
        light: "#f7e3cf",
        use: "Tinted chip, muted post button",
        swatchClassName: "bg-ag-accent-soft",
      },
      {
        name: "--ag-accent-border",
        dark: "#4a3620",
        light: "#edc9a4",
        use: "Accent outline (audience chip)",
        swatchClassName: "bg-ag-accent-border",
      },
    ],
  },
  {
    name: "Demo · violet",
    description: "Everything that signals simulated data",
    tokens: [
      {
        name: "--ag-demo",
        dark: "#9d8cff",
        light: "#9d8cff",
        use: "DEMO pill, selected network",
        swatchClassName: "bg-ag-demo",
      },
      {
        name: "--ag-on-demo",
        dark: "#120f24",
        light: "#120f24",
        use: "Text on demo",
        swatchClassName: "bg-ag-on-demo",
      },
      {
        name: "--ag-demo-surface",
        dark: "#1b1834",
        light: "#ece8ff",
        use: "Demo bar, simulation card",
        swatchClassName: "bg-ag-demo-surface",
      },
      {
        name: "--ag-demo-soft",
        dark: "#221e3f",
        light: "#e3ddfc",
        use: "Demo button hover, soft demo pill",
        swatchClassName: "bg-ag-demo-soft",
      },
      {
        name: "--ag-demo-border",
        dark: "#3b3470",
        light: "#cfc6f5",
        use: "Demo outlines",
        swatchClassName: "bg-ag-demo-border",
      },
      {
        name: "--ag-demo-text",
        dark: "#e3deff",
        light: "#2b2166",
        use: "Text on demo surfaces",
        swatchClassName: "bg-ag-demo-text",
      },
      {
        name: "--ag-demo-text-muted",
        dark: "#c8c3e6",
        light: "#4a4280",
        use: "Secondary text on demo surfaces",
        swatchClassName: "bg-ag-demo-text-muted",
      },
    ],
  },
  {
    name: "Status",
    description: "Feedback from actions",
    tokens: [
      {
        name: "--ag-success",
        dark: "#5cc28f",
        light: "#2f9a64",
        use: "Success dot, activity",
        swatchClassName: "bg-ag-success",
      },
      {
        name: "--ag-success-surface",
        dark: "#12241b",
        light: "#e9f7ef",
        use: "Success toast",
        swatchClassName: "bg-ag-success-surface",
      },
      {
        name: "--ag-success-text",
        dark: "#c9f0da",
        light: "#1e5c3a",
        use: "Success toast text",
        swatchClassName: "bg-ag-success-text",
      },
      {
        name: "--ag-success-border",
        dark: "#24503a",
        light: "#a9dcbf",
        use: "Success toast outline",
        swatchClassName: "bg-ag-success-border",
      },
      {
        name: "--ag-danger",
        dark: "#f07171",
        light: "#d64545",
        use: "Error, liked heart, destructive",
        swatchClassName: "bg-ag-danger",
      },
      {
        name: "--ag-on-danger",
        dark: "#2a0d0d",
        light: "#ffffff",
        use: "Text on danger button",
        swatchClassName: "bg-ag-on-danger",
      },
      {
        name: "--ag-danger-surface",
        dark: "#1d1414",
        light: "#fdeeee",
        use: "Error panel, toast",
        swatchClassName: "bg-ag-danger-surface",
      },
      {
        name: "--ag-danger-text",
        dark: "#ffd0d0",
        light: "#8f1f1f",
        use: "Error panel text",
        swatchClassName: "bg-ag-danger-text",
      },
      {
        name: "--ag-danger-text-muted",
        dark: "#d2aaaa",
        light: "#8a4b4b",
        use: "Error panel description",
        swatchClassName: "bg-ag-danger-text-muted",
      },
      {
        name: "--ag-danger-border",
        dark: "#5a3030",
        light: "#e7b0b0",
        use: "Error toast outline",
        swatchClassName: "bg-ag-danger-border",
      },
    ],
  },
  {
    name: "Avatar palette",
    description: "Assigned per user by hash of the handle",
    tokens: [
      {
        name: "--ag-avatar-1",
        dark: "#7cc4a4",
        light: "#7cc4a4",
        use: "Sage",
        swatchClassName: "bg-ag-avatar-1",
      },
      {
        name: "--ag-avatar-2",
        dark: "#e57f8f",
        light: "#e57f8f",
        use: "Rose",
        swatchClassName: "bg-ag-avatar-2",
      },
      {
        name: "--ag-avatar-3",
        dark: "#6fb3e8",
        light: "#6fb3e8",
        use: "Sky",
        swatchClassName: "bg-ag-avatar-3",
      },
      {
        name: "--ag-avatar-4",
        dark: "#d9c26a",
        light: "#d9c26a",
        use: "Ochre",
        swatchClassName: "bg-ag-avatar-4",
      },
      {
        name: "--ag-on-avatar",
        dark: "#0e1012",
        light: "#1d1b17",
        use: "Initials on avatar",
        swatchClassName: "bg-ag-on-avatar",
      },
    ],
  },
  {
    name: "Controls",
    description: "Parts of interactive controls",
    tokens: [
      {
        name: "--ag-knob",
        dark: "#e9ecef",
        light: "#ffffff",
        use: "Toggle switch knob",
        swatchClassName: "bg-ag-knob",
      },
    ],
  },
];

export const CONTRAST_SAMPLES: Record<ResolvedTheme, ContrastSample[]> = {
  dark: [
    { label: "text-primary 14.9:1", className: "bg-ag-surface text-ag-text" },
    {
      label: "text-secondary 7.1:1",
      className: "bg-ag-surface text-ag-text-secondary",
    },
    { label: "on-accent 8.9:1", className: "bg-ag-accent text-ag-on-accent" },
    {
      label: "demo-text 13:1",
      className: "bg-ag-demo-surface text-ag-demo-text",
    },
  ],
  light: [
    {
      label: "text-primary 17:1",
      className: "border border-ag-border-subtle bg-ag-surface text-ag-text",
    },
    {
      label: "text-secondary 5.7:1",
      className:
        "border border-ag-border-subtle bg-ag-surface text-ag-text-secondary",
    },
    {
      label: "accent-text 5.1:1",
      className:
        "border border-ag-border-subtle bg-ag-surface text-ag-accent-text",
    },
    {
      label: "demo-text 11.4:1",
      className: "bg-ag-demo-surface text-ag-demo-text",
    },
  ],
};

export const TYPE_SCALE: TypeStyle[] = [
  {
    name: "display",
    className: "text-display",
    sample: "A public square",
    spec: "44 / 1.1 · 600 · −3%",
  },
  {
    name: "h1",
    className: "text-h1",
    sample: "Explore Agora with a simulated backend",
    spec: "36 / 1.1 · 600 · −2.5%",
  },
  {
    name: "h2",
    className: "text-h2",
    sample: "Desktop prototype",
    spec: "22 / 1.2 · 600 · −1%",
  },
  {
    name: "h3",
    className: "text-h3",
    sample: "Home · Notifications",
    spec: "19 / 1.3 · 600",
  },
  {
    name: "post-lg",
    className: "text-post-lg",
    sample: "Anyone else's sourdough starter sulking this week?",
    spec: "19 / 1.5 · 400",
  },
  {
    name: "title",
    className: "text-title",
    sample: "Aiko Tanaka",
    spec: "15 / 1.4 · 600",
  },
  {
    name: "body",
    className: "text-body",
    sample: "Our neighborhood library just started lending sewing machines.",
    spec: "15 / 1.5 · 400",
  },
  {
    name: "body-sm",
    className: "text-body-sm",
    sample: "Couldn't load your feed. Try again.",
    spec: "14 / 1.5 · 400",
  },
  {
    name: "caption",
    className: "text-caption",
    sample: "@aiko.t · 4m · 23 likes",
    spec: "12.5 / 1.4 · 400",
  },
  {
    name: "mono",
    className: "font-mono text-mono",
    sample: "agora.app/demo/home · 14:02:11",
    spec: "12 / 1.4 · Mono 400",
  },
];

// Bar width is 3× the step so small steps stay visible.
export const SPACING_SCALE: SpacingStep[] = [
  {
    name: "space-1",
    px: 4,
    barClassName: "w-[12px]",
    use: "Icon to label, tight stacks",
  },
  {
    name: "space-1.5",
    px: 6,
    barClassName: "w-[18px]",
    use: "Chip gaps, meta rows",
  },
  { name: "space-2", px: 8, barClassName: "w-[24px]", use: "Button groups" },
  {
    name: "space-2.5",
    px: 10,
    barClassName: "w-[30px]",
    use: "Form label to field",
  },
  {
    name: "space-3",
    px: 12,
    barClassName: "w-[36px]",
    use: "Avatar to content",
  },
  { name: "space-3.5", px: 14, barClassName: "w-[42px]", use: "Nav item gap" },
  {
    name: "space-4",
    px: 16,
    barClassName: "w-[48px]",
    use: "Card padding (sm)",
  },
  { name: "space-5", px: 20, barClassName: "w-[60px]", use: "Feed row inset" },
  { name: "space-6", px: 24, barClassName: "w-[72px]", use: "Card padding" },
  { name: "space-8", px: 32, barClassName: "w-[96px]", use: "Page gutter" },
  { name: "space-12", px: 48, barClassName: "w-[144px]", use: "Section gap" },
  { name: "space-16", px: 64, barClassName: "w-[192px]", use: "Doc margins" },
];

export const RADIUS_SCALE: RadiusStep[] = [
  { name: "r-xs", px: "6px", className: "rounded-xs", use: "Tags" },
  { name: "r-sm", px: "8px", className: "rounded-sm", use: "Small buttons" },
  { name: "r-md", px: "10px", className: "rounded-md", use: "Buttons, inputs" },
  { name: "r-lg", px: "12px", className: "rounded-lg", use: "Cards" },
  { name: "r-xl", px: "14px", className: "rounded-xl", use: "Media, panels" },
  { name: "r-2xl", px: "16px", className: "rounded-2xl", use: "Modals" },
  {
    name: "r-full",
    px: "999px",
    className: "rounded-full",
    use: "Pills, avatars",
  },
];

export const ELEVATION_SCALE: ElevationStep[] = [
  { name: "elev-0", className: "elev-0", use: "Border only. Cards, rail." },
  { name: "elev-1", className: "elev-1", use: "Toasts, menus." },
  { name: "elev-2", className: "elev-2", use: "Modals + scrim." },
];

export const SHADOW_TOKENS: ShadowToken[] = [
  {
    name: "--ag-shadow-none",
    dark: "none",
    light: "none",
    use: "Posts, rows, rail cards",
    className: "shadow-ag-none",
    darkSurfaceClassName: "bg-ag-surface",
  },
  {
    name: "--ag-shadow-sm",
    dark: "0 2px 8px rgba(0,0,0,.35)",
    light: "0 1px 3px rgba(40,30,10,.08), 0 2px 8px rgba(40,30,10,.06)",
    use: "Hovered media, dropdown triggers",
    className: "shadow-ag-sm",
    darkSurfaceClassName: "bg-ag-surface",
  },
  {
    name: "--ag-shadow-md",
    dark: "0 10px 30px rgba(0,0,0,.5)",
    light: "0 6px 20px rgba(40,30,10,.14)",
    use: "Floating compose button (mobile)",
    className: "shadow-ag-md",
    darkSurfaceClassName: "bg-ag-raised",
  },
  {
    name: "--ag-shadow-lg",
    dark: "0 16px 40px rgba(0,0,0,.5)",
    light: "0 12px 32px rgba(40,30,10,.14)",
    use: "Toasts, menus, popovers",
    className: "shadow-ag-lg",
    darkSurfaceClassName: "bg-ag-raised",
  },
  {
    name: "--ag-shadow-xl",
    dark: "0 30px 80px rgba(0,0,0,.6)",
    light: "0 24px 64px rgba(40,30,10,.18)",
    use: "Modals, bottom sheets, prototype frame",
    className: "shadow-ag-xl",
    darkSurfaceClassName: "bg-ag-raised",
  },
  {
    name: "--ag-focus-ring",
    dark: "0 0 0 3px rgba(240,163,94,.45)",
    light: "0 0 0 3px rgba(166,90,28,.35)",
    use: "Keyboard focus on any control",
    className: "shadow-ag-focus-ring",
    darkSurfaceClassName: "bg-ag-surface",
  },
];

export const SHADOW_NOTES = [
  {
    title: "Pair with a surface step.",
    body: "In dark mode a floating element also moves up one surface (--ag-surface → --ag-raised), since shadows are hard to see on near-black.",
  },
  {
    title: "Warm in light mode.",
    body: "Light shadows use a warm brown tint (40, 30, 10) instead of black so they match the paper background.",
  },
  {
    title: "No shadows on feed items.",
    body: "Posts, rows and rail cards stay flat with borders. Only toasts, menus, the compose button and modals float.",
  },
];

export const LOGO_USAGE = [
  "Wordmark is Geist Bold, lowercase, tracking −3.5%. Gap between mark and wordmark = 0.3 × mark size.",
  "Clear space around the lockup = half the mark height.",
  "Keep the tile amber with dark strokes on both themes. Don't recolour, outline or rotate it.",
  "Below 20px, thicken strokes to 2.8.",
];

export const LAYOUT_NOTES = [
  "Desktop shell: nav 248 · content flexible (≈640 reading width) · rail 340.",
  "Breakpoints: rail hides <1100, nav collapses to icons <900, mobile <640 with bottom tabs.",
  "Minimum hit target 44px on touch.",
];

export const THEMES: ResolvedTheme[] = ["dark", "light"];

export const SAMPLE_POSTS: Pick<
  PostCardProps,
  "author" | "time" | "text" | "media" | "stats"
>[] = [
  {
    author: { name: "Aiko Tanaka", handle: "aiko.t" },
    time: "4m",
    text: "Our neighborhood library just started lending sewing machines. Booked one for Thursday.",
    media: { kind: "image", label: "photo · library shelf" },
    stats: { comments: 4, reposts: 1, likes: 23 },
  },
  {
    author: { name: "Marcus Bell", handle: "marcusb" },
    time: "26m",
    text: "Anyone else's sourdough starter sulking this week? Mine hasn't risen since the heatwave.",
    stats: { comments: 17, reposts: 2, likes: 41 },
  },
  {
    author: { name: "Dev Patel", handle: "devp" },
    time: "2h",
    text: "Ran my first 10k without stopping. Slow, but done.",
    media: { kind: "video", label: "run recap · 0:48" },
    stats: { comments: 32, reposts: 6, likes: 158 },
  },
];

export const SAMPLE_PEOPLE = [
  { name: "Aiko Tanaka", handle: "aiko.t" },
  { name: "Marcus Bell", handle: "marcusb" },
  { name: "Sofia Lindqvist", handle: "sofial" },
  { name: "Dev Patel", handle: "devp" },
  { name: "Nora Haddad", handle: "norah" },
];

export const SAMPLE_MENU_LABELS: Pick<
  MenuItem,
  "id" | "label" | "icon" | "danger"
>[] = [
  { id: "share", label: "Copy link", icon: "share" },
  { id: "profile", label: "View profile", icon: "user" },
  { id: "mute", label: "Mute @marcusb", icon: "bell" },
  { id: "report", label: "Report post", icon: "alert", danger: true },
];
