import { type OwnedNoun } from "@/types/owner";

export const OWNED_LABELS: Record<
  OwnedNoun,
  { title: string; deleteDescription: string }
> = {
  post: {
    title: "Post",
    deleteDescription:
      "This can't be undone. Its comments, likes and reposts go with it.",
  },
  comment: {
    title: "Comment",
    deleteDescription: "This can't be undone.",
  },
};
