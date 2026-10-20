import { type NextRequest } from "next/server";
import { type NotificationKind } from "@/types/domain";
import { type DataErrorCode } from "@/types/dataSource";

export type JsonBody = Record<string, unknown>;

export type ViewerContext<TParams> = {
  request: NextRequest;
  params: TParams;
  // The signed-in user making the request.
  viewerId: string;
};

export type ViewerHandler<TParams> = (
  context: ViewerContext<TParams>,
) => Promise<unknown>;

export type RouteHandler<TParams> = (
  request: NextRequest,
  context: { params: Promise<TParams> },
) => Promise<Response>;

export type IdParams = { id: string };

export type HandleParams = { handle: string };

export type UserIdParams = { userId: string };

// Every failed API response has this body.
export type ApiErrorBody = {
  error: { code: DataErrorCode; message: string };
};

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

export type ActivityKind = Exclude<NotificationKind, "milestone">;

export type NotificationInput = {
  recipientId: string;
  kind: ActivityKind;
  actorId: string;
  postId: string | null;
  quote: string | null;
};

export type MentionInput = {
  actorId: string;
  postId: string;
  text: string;
  // Users already notified another way, e.g. the author of the post being replied to.
  exclude: string[];
};

// The columns a write needs from the post it touches.
export type PostTarget = {
  author_id: string;
  text: string;
};
