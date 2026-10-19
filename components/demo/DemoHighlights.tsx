import { DEMO_HIGHLIGHTS } from "@/lib/public/constants";

export function DemoHighlights() {
  return (
    <ul className="grid gap-5 border-t border-ag-border-subtle pt-6 text-[13.5px] leading-normal text-ag-text-secondary sm:grid-cols-3">
      {DEMO_HIGHLIGHTS.map((highlight) => (
        <li key={highlight.title}>
          <h2 className="mb-1 font-semibold text-ag-text">{highlight.title}</h2>
          {highlight.text}
        </li>
      ))}
    </ul>
  );
}
