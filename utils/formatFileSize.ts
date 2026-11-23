const UNITS = ["KB", "MB", "GB"];

// 812 B, 48 KB, 1.4 MB.
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  let size = bytes / 1024;
  let unit = 0;
  while (size >= 1024 && unit < UNITS.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size < 10 && unit > 0 ? size.toFixed(1) : Math.round(size)} ${UNITS[unit]}`;
}
