"use client";

import { Icon } from "@/components/ui/Icon";
import { Menu } from "@/components/ui/Menu";
import { AUDIENCE_LABELS } from "@/lib/posts/constants";
import { POST_AUDIENCES } from "@/lib/api/constants";
import { type AudiencePickerProps } from "@/types/compose";

export function AudiencePicker({
  value,
  onChange,
  disabled = false,
}: AudiencePickerProps) {
  if (disabled) {
    return (
      <span className="inline-flex self-start rounded-full border border-ag-accent-border px-2.5 py-0.75 text-caption text-ag-accent-text opacity-60">
        {AUDIENCE_LABELS[value]}
      </span>
    );
  }
  return (
    <Menu
      label={`Audience: ${AUDIENCE_LABELS[value]}`}
      trigger={
        <>
          {AUDIENCE_LABELS[value]}
          <Icon name="chevronDown" size={14} />
        </>
      }
      triggerVariant="chip"
      align="start"
      className="self-start"
      items={POST_AUDIENCES.map((audience) => ({
        id: audience,
        label: AUDIENCE_LABELS[audience],
        selected: audience === value,
        onSelect: () => onChange(audience),
      }))}
    />
  );
}
