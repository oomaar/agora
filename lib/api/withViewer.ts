import "server-only";
import { DataError } from "@/services/dataError";
import { getSession } from "@/lib/auth/getSession";
import { API_ERROR_MESSAGES, STATUS_BY_CODE } from "@/lib/api/constants";
import { isCrossSiteWrite } from "@/utils/isCrossSiteWrite";
import {
  type ApiErrorBody,
  type RouteHandler,
  type ViewerHandler,
} from "@/types/api";
import { type DataErrorCode } from "@/types/dataSource";

function errorResponse(code: DataErrorCode, message: string): Response {
  const body: ApiErrorBody = { error: { code, message } };
  return Response.json(body, { status: STATUS_BY_CODE[code] });
}

// Wraps a route handler: rejects cross-site writes and signed-out requests, returns
// the handler's result as JSON, and turns errors into { error: { code, message } }.
export function withViewer<TParams = Record<string, never>>(
  handler: ViewerHandler<TParams>,
): RouteHandler<TParams> {
  return async (request, { params }) => {
    try {
      if (isCrossSiteWrite(request)) {
        return errorResponse("forbidden", API_ERROR_MESSAGES.forbidden);
      }
      const session = await getSession();
      if (!session) {
        return errorResponse("unauthorized", API_ERROR_MESSAGES.unauthorized);
      }
      const data = await handler({
        request,
        params: await params,
        viewerId: session.userId,
      });
      return Response.json(data);
    } catch (error) {
      if (error instanceof DataError) {
        return errorResponse(error.code, error.message);
      }
      console.error(error);
      return errorResponse("network", API_ERROR_MESSAGES.server);
    }
  };
}
