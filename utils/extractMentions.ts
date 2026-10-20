const MENTION_PATTERN = /(?:^|[^a-z0-9._@])@([a-z0-9._]{2,30})/gi;

// "Thanks @Lena.builds and @tomasr!" → ["lena.builds", "tomasr"]
export function extractMentions(text: string): string[] {
  const handles = [...text.matchAll(MENTION_PATTERN)].map((match) =>
    match[1].toLowerCase().replace(/\.+$/, ""),
  );
  return [...new Set(handles)];
}
