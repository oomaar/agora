import { type ExploreSectionProps } from "@/types/explore";

export function ExploreSection({ title, children }: ExploreSectionProps) {
  return (
    <section className="border-b border-ag-border-subtle pb-3 last:border-b-0">
      <h2 className="px-5 pb-2.5 pt-4.5 text-[16px] font-semibold">{title}</h2>
      {children}
    </section>
  );
}
