import { type RailCardProps } from "@/types/shell";

export function RailCard({ title, children }: RailCardProps) {
  return (
    <section className="flex flex-col rounded-xl border border-ag-border-subtle py-1.5">
      <h2 className="px-4 py-2.5 text-title">{title}</h2>
      {children}
    </section>
  );
}
