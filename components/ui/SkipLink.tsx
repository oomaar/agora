import { MAIN_ID } from "@/lib/site/constants";

// The first stop for keyboard users: hidden until focused, it jumps past the navigation.
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_ID}`}
      className="fixed left-4 top-3 z-50 -translate-y-[calc(100%+--spacing(4))] rounded-md bg-ag-accent px-4 py-3 text-[14px] font-semibold text-ag-on-accent outline-none focus-visible:translate-y-0 focus-visible:shadow-ag-focus-ring motion-safe:transition-transform"
    >
      Skip to content
    </a>
  );
}
