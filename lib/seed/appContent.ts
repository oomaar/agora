import { type SeedContent } from "@/types/simulation";

// Signed-in app account, seeded from the wireframe prototype.
export const APP_CONTENT: SeedContent = {
  self: {
    name: "Sam Rivera",
    handle: "sam",
    bio: "Learning in public. Building Agora one route at a time.",
    following: 212,
    followers: 340,
  },
  people: [
    {
      name: "Lena Okafor",
      handle: "lena.builds",
      bio: "Shipping small web apps on weekends.",
    },
    {
      name: "Tomás Reyes",
      handle: "tomasr",
      bio: "Markets, bread and slow Saturdays.",
    },
    {
      name: "Priya Nair",
      handle: "priyawrites",
      bio: "Writer. Opinions on productivity, mostly negative.",
    },
    {
      name: "Jonah Kim",
      handle: "jonahk",
      bio: "Coastlines and field recordings.",
    },
    {
      name: "Nadia Idris",
      handle: "nadia.dev",
      bio: "Frontend at a small studio. Posts about CSS.",
    },
    {
      name: "Oliver Grant",
      handle: "ogrant",
      bio: "Photographer. Mostly fog.",
    },
    {
      name: "Ruth Mensah",
      handle: "ruthm",
      bio: "Urban planning nerd. Bikes.",
    },
  ],
  followed: ["lena.builds", "tomasr", "priyawrites", "jonahk"],
  suggested: ["nadia.dev", "ogrant", "ruthm"],
  posts: [
    {
      author: "lena.builds",
      text: "Finally got incremental static regeneration working for the photo pages. Build time went from 4 minutes to 40 seconds.",
      media: {
        kind: "image",
        label: "screenshot · build times before / after",
      },
      ageMinutes: 12,
      likes: 48,
      reposts: 3,
    },
    {
      author: "tomasr",
      text: "Saturday market haul. The peach guy remembered my name this week.",
      media: { kind: "image", label: "photo · 16:9" },
      ageMinutes: 60,
      likes: 132,
      reposts: 4,
    },
    {
      author: "priyawrites",
      text: "Hot take: most productivity systems are just procrastination with better fonts.",
      media: null,
      ageMinutes: 180,
      likes: 310,
      reposts: 41,
    },
    {
      author: "jonahk",
      text: "Two minutes of the tide coming in at Point Reyes. Sound on.",
      media: { kind: "video", label: "video · 2:04" },
      ageMinutes: 300,
      likes: 87,
      reposts: 9,
    },
    {
      author: "sam",
      text: "Moved my notes app off localStorage and onto a real database this weekend. Nothing broke. Suspicious.",
      media: null,
      ageMinutes: 2880,
      likes: 19,
      reposts: 0,
    },
  ],
  comments: [
    { author: "tomasr", text: "Nice. Saving this for later.", ageMinutes: 8 },
    {
      author: "priyawrites",
      text: "Curious how this holds up after a month.",
      ageMinutes: 21,
    },
    {
      author: "jonahk",
      text: "Following. Keep posting updates.",
      ageMinutes: 40,
    },
  ],
  notifications: [
    {
      kind: "like",
      actor: "lena.builds",
      postIndex: 0,
      text: "and 12 others liked your post",
      quote: "Moved my notes app off localStorage…",
      ageMinutes: 5,
      read: false,
    },
    {
      kind: "reply",
      actor: "tomasr",
      postIndex: 0,
      text: "replied to your post",
      quote: "The peach guy is a local legend.",
      ageMinutes: 18,
      read: false,
    },
    {
      kind: "follow",
      actor: "jonahk",
      postIndex: null,
      text: "started following you",
      quote: null,
      ageMinutes: 60,
      read: false,
    },
    {
      kind: "mention",
      actor: "priyawrites",
      postIndex: null,
      text: "mentioned you",
      quote: "@sam you would like this thread",
      ageMinutes: 180,
      read: true,
    },
    {
      kind: "milestone",
      actor: null,
      postIndex: 0,
      text: "Your post reached 1,000 views",
      quote: null,
      ageMinutes: 1440,
      read: true,
    },
  ],
  conversations: [
    {
      members: ["lena.builds"],
      name: null,
      unread: true,
      messages: [
        {
          from: "lena.builds",
          text: "Did you end up trying ISR for the profile pages?",
          ageMinutes: 5,
        },
        {
          from: "sam",
          text: "Yes! Revalidating every 60 seconds for now.",
          ageMinutes: 3,
        },
        {
          from: "lena.builds",
          text: "Nice. I have a small example repo that does on-demand revalidation.",
          ageMinutes: 2,
        },
        {
          from: "lena.builds",
          text: "Sending you the repo link now",
          ageMinutes: 2,
        },
      ],
    },
    {
      members: ["tomasr"],
      name: null,
      unread: true,
      messages: [
        { from: "sam", text: "That peach haul looked great.", ageMinutes: 75 },
        { from: "tomasr", text: "Market again Saturday?", ageMinutes: 60 },
      ],
    },
    {
      members: ["priyawrites"],
      name: null,
      unread: false,
      messages: [
        {
          from: "sam",
          text: "Your hot take was a little too real.",
          ageMinutes: 190,
        },
        { from: "priyawrites", text: "Ha, fair.", ageMinutes: 180 },
      ],
    },
    {
      members: ["jonahk"],
      name: null,
      unread: false,
      messages: [
        {
          from: "jonahk",
          text: "Point Reyes at sunset next time?",
          ageMinutes: 1500,
        },
        { from: "sam", text: "That video was unreal", ageMinutes: 1440 },
      ],
    },
    {
      members: ["nadia.dev", "lena.builds", "ruthm"],
      name: "Agora Builders",
      unread: false,
      messages: [
        {
          from: "ruthm",
          text: "The avatar colours look off in light mode.",
          ageMinutes: 2900,
        },
        { from: "nadia.dev", text: "pushed the fix", ageMinutes: 2880 },
      ],
    },
  ],
};
