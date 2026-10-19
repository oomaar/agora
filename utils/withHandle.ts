import { HANDLE_TOKEN } from "@/lib/shell/constants";

// "/u/:handle" → "/u/sam"
export function withHandle(path: string, handle: string): string {
  return path.replace(HANDLE_TOKEN, handle);
}
