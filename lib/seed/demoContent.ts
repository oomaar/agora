import { type SeedContent } from "@/types/simulation";

// Demo persona (Maya), seeded from the wireframe prototype.
export const DEMO_CONTENT: SeedContent = {
  self: {
    name: "Maya Chen",
    handle: "maya.demo",
    bio: "Demo account. Everything here is simulated and resets when you leave.",
    following: 48,
    followers: 96,
  },
  people: [
    {
      name: "Aiko Tanaka",
      handle: "aiko.t",
      bio: "Library regular. Learning to sew.",
    },
    {
      name: "Marcus Bell",
      handle: "marcusb",
      bio: "Sourdough, mostly. Sometimes bagels.",
    },
    { name: "Sofia Lindqvist", handle: "sofial", bio: "Sketching on trains." },
    { name: "Dev Patel", handle: "devp", bio: "New runner. Slow and steady." },
    { name: "Nora Haddad", handle: "norah", bio: "Runs a small book club." },
    { name: "Ben Ortiz", handle: "benortiz", bio: "Weekend woodworker." },
    { name: "Hana Sato", handle: "hana.s", bio: "Ceramics and cats." },
    {
      name: "Leo Park",
      handle: "leopark",
      bio: "Trail runner, slow and happy.",
    },
  ],
  followed: ["aiko.t", "marcusb", "sofial", "devp", "norah"],
  suggested: ["benortiz", "hana.s", "leopark"],
  posts: [
    {
      author: "aiko.t",
      text: "Our neighborhood library just started lending sewing machines. Booked one for Thursday.",
      media: { kind: "image", label: "photo · library shelf" },
      ageMinutes: 4,
      likes: 23,
      reposts: 1,
    },
    {
      author: "marcusb",
      text: "Anyone else's sourdough starter sulking this week? Mine hasn't risen since the heatwave.",
      media: null,
      ageMinutes: 26,
      likes: 41,
      reposts: 2,
    },
    {
      author: "sofial",
      text: "Sketchbook page from the train this morning.",
      media: { kind: "image", label: "sketch · 1:1" },
      ageMinutes: 60,
      likes: 96,
      reposts: 5,
    },
    {
      author: "devp",
      text: "Ran my first 10k without stopping. Slow, but done.",
      media: { kind: "video", label: "run recap · 0:48" },
      ageMinutes: 120,
      likes: 158,
      reposts: 6,
    },
    {
      author: "norah",
      text: "Reading list for October: The Overstory, Piranesi, and something short to recover.",
      media: null,
      ageMinutes: 240,
      likes: 64,
      reposts: 3,
    },
    {
      author: "maya.demo",
      text: "First week on Agora. Say hi if you like long walks and short books.",
      media: null,
      ageMinutes: 1440,
      likes: 12,
      reposts: 0,
    },
  ],
  comments: [
    { author: "norah", text: "Love this, thanks for sharing.", ageMinutes: 6 },
    {
      author: "marcusb",
      text: "Same thing happened to me last week.",
      ageMinutes: 18,
    },
    { author: "aiko.t", text: "Following for the update.", ageMinutes: 33 },
  ],
  notifications: [
    {
      kind: "like",
      actor: "devp",
      postIndex: 0,
      text: "and 4 others liked your post",
      quote: "First week on Agora…",
      ageMinutes: 2,
      read: false,
    },
    {
      kind: "reply",
      actor: "aiko.t",
      postIndex: 0,
      text: "replied to your post",
      quote: "Hi! Long walks, yes. Short books, always.",
      ageMinutes: 9,
      read: false,
    },
    {
      kind: "follow",
      actor: "sofial",
      postIndex: null,
      text: "started following you",
      quote: null,
      ageMinutes: 40,
      read: false,
    },
    {
      kind: "mention",
      actor: "norah",
      postIndex: null,
      text: "mentioned you",
      quote: "@maya.demo join the book club?",
      ageMinutes: 120,
      read: true,
    },
  ],
  conversations: [
    {
      members: ["aiko.t"],
      name: null,
      unread: true,
      messages: [
        {
          from: "aiko.t",
          text: "Are you coming to the sewing session at the library?",
          ageMinutes: 7,
        },
        {
          from: "maya.demo",
          text: "I think so. Is Thursday evening okay?",
          ageMinutes: 4,
        },
        { from: "aiko.t", text: "Thursday works for me!", ageMinutes: 3 },
      ],
    },
    {
      members: ["marcusb"],
      name: null,
      unread: true,
      messages: [
        {
          from: "maya.demo",
          text: "My starter is sulking again.",
          ageMinutes: 40,
        },
        { from: "marcusb", text: "Try feeding it twice a day", ageMinutes: 30 },
      ],
    },
    {
      members: ["sofial"],
      name: null,
      unread: false,
      messages: [
        {
          from: "maya.demo",
          text: "Loved your train sketch.",
          ageMinutes: 130,
        },
        { from: "sofial", text: "Can I share your photo?", ageMinutes: 120 },
      ],
    },
    {
      members: ["norah", "aiko.t", "sofial"],
      name: "Book club",
      unread: false,
      messages: [
        {
          from: "aiko.t",
          text: "What are we reading first?",
          ageMinutes: 1460,
        },
        { from: "norah", text: "Piranesi first?", ageMinutes: 1440 },
      ],
    },
  ],
};
