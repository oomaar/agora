import { DataError } from "@/services/dataError";
import { API_ERROR_MESSAGES, STATUS_BY_CODE } from "@/lib/api/constants";
import { type ApiErrorBody, type RequestOptions } from "@/types/api";
import { type DataErrorCode } from "@/types/dataSource";

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  const error = (value as ApiErrorBody | null)?.error;
  return (
    typeof error?.message === "string" &&
    Object.hasOwn(STATUS_BY_CODE, error.code)
  );
}

// Calls the API with the session cookie; failures become a DataError, like the simulated server's.
export async function request<T>(
  path: string,
  { method = "GET", body }: RequestOptions = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      method,
      credentials: "same-origin",
      cache: "no-store",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new DataError("network", API_ERROR_MESSAGES.network);
  }
  const payload: unknown = await response.json().catch(() => null);
  if (response.ok) return payload as T;
  if (isApiErrorBody(payload)) {
    throw new DataError(payload.error.code, payload.error.message);
  }
  const code: DataErrorCode = response.status === 404 ? "not-found" : "network";
  throw new DataError(code, API_ERROR_MESSAGES.server);
}
