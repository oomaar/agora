import { RailSkeleton } from "@/components/shell/RailSkeleton";
import { type RailQueryProps } from "@/types/shell";

// Loading, error and empty states for a rail card; renders `children` once data is in.
export function RailQuery<T>({
  query,
  skeleton,
  errorText,
  emptyText,
  children,
}: RailQueryProps<T>) {
  if (query.status === "loading") return <RailSkeleton {...skeleton} />;
  if (query.status === "error") {
    return (
      <div role="alert" className="flex flex-col items-start gap-1 px-4 py-2.5">
        <p className="text-[13px] text-ag-text-secondary">{errorText}</p>
        <button
          type="button"
          onClick={query.retry}
          className="cursor-pointer rounded-sm text-[13.5px] text-ag-accent-text outline-none hover:underline focus-visible:underline"
        >
          Try again
        </button>
      </div>
    );
  }
  if (query.status === "empty") {
    return (
      <p className="px-4 py-2.5 text-[13px] text-ag-text-secondary">
        {emptyText}
      </p>
    );
  }
  return children(query.data);
}
