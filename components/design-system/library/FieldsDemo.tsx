import { DsCard } from "@/components/design-system/DsCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SearchInput } from "@/components/ui/SearchInput";

export function FieldsDemo() {
  return (
    <DsCard title="Input, textarea, search · 1.4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          placeholder="sam@example.com"
          fieldSize="lg"
        />
        <Input
          label="Handle"
          defaultValue="@sam"
          hint="Letters, numbers and dots."
        />
        <Input
          label="Display name"
          defaultValue=""
          error="Display name can't be empty."
        />
        <Input label="Disabled" defaultValue="Can't edit this" disabled />
        <Input placeholder="Write a message…" pill aria-label="Message" />
        <SearchInput
          label="Search Agora"
          placeholder="Search people, posts and topics"
        />
      </div>
      <Textarea
        label="Bio"
        defaultValue="Learning in public. Building Agora one route at a time."
      />
    </DsCard>
  );
}
