// "Joined March 2026"
export function formatJoinDate(iso: string): string {
  const month = new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return `Joined ${month}`;
}
