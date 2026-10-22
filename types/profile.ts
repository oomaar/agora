import { type UserView } from "@/types/domain";

export type ProfileViewProps = {
  handle: string;
};

export type ProfileHeaderProps = {
  user: UserView;
};

export type ProfilePostsProps = {
  user: UserView;
};

export type ProfileEmptyCopy = {
  // Shown on your own profile.
  self: string;
  // Shown on someone else's; "{name}" is replaced with their first name.
  other: string;
};

export type ProfileStatProps = {
  count: number;
  label: string;
};
