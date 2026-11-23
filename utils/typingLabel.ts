import { firstName } from "@/utils/firstName";
import { type UserView } from "@/types/domain";

// "Lena is typing…", "Lena and Omar are typing…", "Several people are typing…".
export function typingLabel(people: UserView[]): string {
  const names = people.map((person) => firstName(person.name));
  if (names.length === 1) return `${names[0]} is typing…`;
  if (names.length === 2) return `${names[0]} and ${names[1]} are typing…`;
  return "Several people are typing…";
}
