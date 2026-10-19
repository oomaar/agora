import { type DataErrorCode } from "@/types/dataSource";

export class DataError extends Error {
  readonly code: DataErrorCode;

  constructor(code: DataErrorCode, message: string) {
    super(message);
    this.name = "DataError";
    this.code = code;
  }
}

export function toDataError(error: unknown): DataError {
  if (error instanceof DataError) return error;
  return new DataError("network", "Something went wrong. Try again.");
}
