import {
  type Comment,
  type Conversation,
  type Follow,
  type Message,
  type Notification,
  type NotificationKind,
  type PollVote,
  type Post,
  type Reaction,
  type Trend,
  type User,
  type UserSettings,
} from "@/types/domain";
import { type DataSource } from "@/types/dataSource";
import { type PostMedia } from "@/types/post";

export type NetworkCondition = "normal" | "slow" | "offline" | "flaky";

export type NetworkProfile = {
  label: string;
  hint: string;
  minLatencyMs: number;
  maxLatencyMs: number;
};

export type ScenarioId = "busy" | "fresh" | "flaky";

export type Scenario = {
  id: ScenarioId;
  title: string;
  description: string;
  network: NetworkCondition;
  // Fresh accounts start with no posts, follows, notifications or conversations.
  community: "busy" | "fresh";
};

export type ActivityTone = "ok" | "error" | "info";

export type ActivityEntry = {
  id: number;
  text: string;
  tone: ActivityTone;
  time: string;
};

export type SimulationState = {
  network: NetworkCondition;
  scenario: ScenarioId;
  activity: ActivityEntry[];
};

export type SimulationControls = {
  getState: () => SimulationState;
  // The preset's default scenario with no activity, so server and client render the same markup.
  getServerState: () => SimulationState;
  subscribe: (listener: () => void) => () => void;
  setNetwork: (network: NetworkCondition) => void;
  // Regenerates the seed data; restores the current scenario when none is given.
  reset: (scenario?: ScenarioId) => void;
};

export type Simulation = {
  source: DataSource;
  controls: SimulationControls;
};

export type ActivityLog = {
  getEntries: () => ActivityEntry[];
  add: (text: string, tone: ActivityTone) => void;
  clear: () => void;
};

export type ActivityMessages<T> = {
  success?: (result: T) => string;
  failure?: string;
};

export type Network = {
  request: <T>(work: () => T, messages?: ActivityMessages<T>) => Promise<T>;
  resetFailures: () => void;
};

export type Database = {
  selfId: string;
  users: User[];
  follows: Follow[];
  posts: Post[];
  comments: Comment[];
  reactions: Reaction[];
  pollVotes: PollVote[];
  notifications: Notification[];
  conversations: Conversation[];
  messages: Message[];
  trends: Trend[];
  settings: UserSettings;
  nextId: number;
};

// Hand-written content each preset is seeded from; the generator fills in the rest of the community.

export type PersonSeed = {
  name: string;
  handle: string;
  bio: string;
};

export type SelfSeed = PersonSeed & {
  following: number;
  followers: number;
};

export type PostSeed = {
  author: string;
  text: string;
  media: PostMedia | null;
  ageMinutes: number;
  likes: number;
  reposts: number;
};

export type CommentSeed = {
  author: string;
  text: string;
  ageMinutes: number;
};

export type NotificationSeed = {
  kind: NotificationKind;
  actor: string | null;
  // Index into the self author's seeded posts.
  postIndex: number | null;
  text: string;
  quote: string | null;
  ageMinutes: number;
  read: boolean;
};

export type MessageSeed = {
  from: string;
  text: string;
  ageMinutes: number;
};

export type ConversationSeed = {
  members: string[];
  name: string | null;
  unread: boolean;
  messages: MessageSeed[];
};

export type SeedContent = {
  self: SelfSeed;
  people: PersonSeed[];
  // Handles the signed-in user follows; everyone in `suggested` is left unfollowed.
  followed: string[];
  suggested: string[];
  posts: PostSeed[];
  comments: CommentSeed[];
  notifications: NotificationSeed[];
  conversations: ConversationSeed[];
};

export type DataPresetId = "app" | "demo";

export type DataPreset = {
  seed: number;
  content: SeedContent;
  scenario: ScenarioId;
};

export type GenerateSeedOptions = {
  content: SeedContent;
  scenario: Scenario;
  seed: number;
  now: number;
};

export type SeedContext = {
  db: Database;
  random: Random;
  now: number;
  content: SeedContent;
  community: Scenario["community"];
};

export type Random = {
  next: () => number;
  int: (min: number, max: number) => number;
  chance: (probability: number) => boolean;
  pick: <T>(items: readonly T[]) => T;
  sample: <T>(items: readonly T[], count: number) => T[];
};
