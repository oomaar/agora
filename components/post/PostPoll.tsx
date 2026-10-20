"use client";

import { Icon } from "@/components/ui/Icon";
import {
  POLL_OPTION_BUTTON,
  POLL_RESULT_BAR,
  POLL_RESULT_FILL,
} from "@/lib/ui/poll";
import { getPollPercent } from "@/utils/getPollPercent";
import { pluralize } from "@/utils/pluralize";
import { withStopPropagation } from "@/utils/withStopPropagation";
import { cn } from "@/utils/cn";
import { type PostPollProps } from "@/types/post";

// Options to vote on until the viewer votes, then the results.
export function PostPoll({ poll, onVote }: PostPollProps) {
  const total = poll.options.reduce((sum, option) => sum + option.voteCount, 0);
  const voted = poll.votedOptionId !== null;
  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-2">
        {poll.options.map((option) => {
          if (!voted) {
            return (
              <li key={option.id}>
                <button
                  type="button"
                  disabled={!onVote}
                  onClick={withStopPropagation(() => onVote?.(option.id))}
                  className={POLL_OPTION_BUTTON}
                >
                  <span className="truncate">{option.text}</span>
                </button>
              </li>
            );
          }
          const percent = getPollPercent(option.voteCount, total);
          const isVote = option.id === poll.votedOptionId;
          return (
            <li
              key={option.id}
              className="relative flex h-9.5 items-center gap-2 overflow-hidden rounded-md px-3.5 text-[14px]"
            >
              <progress
                value={percent}
                max={100}
                aria-hidden="true"
                className={cn(
                  POLL_RESULT_BAR,
                  isVote ? POLL_RESULT_FILL.voted : POLL_RESULT_FILL.other,
                )}
              />
              <span
                className={cn(
                  "relative flex min-w-0 flex-1 items-center gap-1.5",
                  isVote && "font-semibold",
                )}
              >
                <span className="truncate">{option.text}</span>
                {isVote && (
                  <span className="flex-none text-ag-accent-text">
                    <Icon name="check" size={15} title="Your vote" />
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "relative font-mono text-mono",
                  isVote ? "text-ag-text" : "text-ag-text-secondary",
                )}
              >
                {percent}%
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-caption text-ag-text-secondary">
        {total} {pluralize(total, "vote")}
      </p>
    </div>
  );
}
