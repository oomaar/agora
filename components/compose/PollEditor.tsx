"use client";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import {
  POLL_MAX_OPTIONS,
  POLL_MIN_OPTIONS,
  POLL_OPTION_MAX_LENGTH,
} from "@/lib/data/constants";
import { type PollEditorProps } from "@/types/compose";

export function PollEditor({
  options,
  onChange,
  disabled = false,
}: PollEditorProps) {
  return (
    <fieldset
      disabled={disabled}
      className="flex flex-col gap-2 rounded-lg border border-ag-border p-3"
    >
      <legend className="sr-only">Poll options</legend>
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={option}
            onChange={(event) =>
              onChange(
                options.map((item, at) =>
                  at === index ? event.target.value : item,
                ),
              )
            }
            maxLength={POLL_OPTION_MAX_LENGTH}
            placeholder={`Option ${index + 1}`}
            aria-label={`Option ${index + 1}`}
            fieldSize="sm"
            wrapperClassName="min-w-0 flex-1"
          />
          {index >= POLL_MIN_OPTIONS && (
            <IconButton
              icon="close"
              label={`Remove option ${index + 1}`}
              size="sm"
              onClick={() => onChange(options.filter((_, at) => at !== index))}
            />
          )}
        </div>
      ))}
      <div className="flex flex-wrap justify-between gap-2">
        {options.length < POLL_MAX_OPTIONS && (
          <Button
            variant="secondary"
            size="sm"
            icon="plus"
            onClick={() => onChange([...options, ""])}
          >
            Add option
          </Button>
        )}
        <Button
          variant="dangerOutline"
          size="sm"
          className="ml-auto"
          onClick={() => onChange(null)}
        >
          Remove poll
        </Button>
      </div>
    </fieldset>
  );
}
