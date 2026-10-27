"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { useSearch } from "@/hooks/explore/useSearch";
import { PEOPLE_SKELETON_COUNT } from "@/lib/messages/constants";
import { type NewMessagePeopleProps } from "@/types/messages";

// Without a search, the most-followed people.
export function NewMessagePeople({
  term,
  pendingId,
  onPick,
}: NewMessagePeopleProps) {
  const results = useSearch(term);

  if (results.status === "loading") {
    return (
      <div role="status" aria-label="Loading people" className="pb-2">
        {Array.from({ length: PEOPLE_SKELETON_COUNT }, (_, index) => (
          <div key={index} className="flex items-center gap-3 px-4.5 py-2.5">
            <Skeleton shape="circle" className="size-9 flex-none" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="w-[40%]" />
              <Skeleton className="w-[25%]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.status === "error") {
    return (
      <ErrorState
        compact
        title="Couldn't load people"
        description={results.error.message}
        actions={
          <Button variant="danger" size="sm" onClick={results.retry}>
            Try again
          </Button>
        }
        className="mx-4.5 mb-4"
      />
    );
  }

  if (!results.data.people.length) {
    return (
      <p className="px-4.5 pb-6 pt-4 text-center text-body-sm text-ag-text-secondary">
        No people match “{term}”
      </p>
    );
  }

  return (
    <ul className="max-h-90 overflow-y-auto pb-2">
      {results.data.people.map((person) => (
        <li key={person.id}>
          <button
            type="button"
            onClick={() => onPick(person)}
            disabled={pendingId !== null}
            aria-busy={pendingId === person.id || undefined}
            className="flex w-full cursor-pointer items-center gap-3 px-4.5 py-2.5 text-left outline-none transition-colors hover:bg-ag-hover focus-visible:shadow-ag-focus-ring disabled:cursor-default"
          >
            <Avatar name={person.name} handle={person.handle} size="sm" />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-[14px] font-semibold">
                {person.name}
              </span>
              <span className="truncate text-[13px] text-ag-text-secondary">
                @{person.handle}
              </span>
            </span>
            {pendingId === person.id && (
              <Spinner label="Opening conversation" />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
