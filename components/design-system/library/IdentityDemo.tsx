import { DsCard } from "@/components/design-system/DsCard";
import { Logo } from "@/components/ui/Logo";
import { AppIcon } from "@/components/ui/AppIcon";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Counter } from "@/components/ui/Counter";
import { ICON_NAMES } from "@/lib/ui/iconShapes";
import { SAMPLE_PEOPLE } from "@/lib/design-system/constants";
import { type AvatarSize } from "@/types/avatar";

const AVATAR_SIZES: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];

export function IdentityDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 nav:grid-cols-2">
      <DsCard title="Logo · 1.1">
        <div className="flex flex-wrap items-center gap-6">
          <Logo size="sm" />
          <Logo size="md" />
          <Logo size="lg" />
          <Logo size="md" showWordmark={false} />
          <AppIcon />
        </div>
      </DsCard>
      <DsCard title="Icons · 1.2">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2">
          {ICON_NAMES.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1.5 rounded-sm py-2 text-ag-text"
            >
              <Icon name={name} />
              <span className="font-mono text-[10.5px] text-ag-text-secondary">
                {name}
              </span>
            </div>
          ))}
        </div>
      </DsCard>
      <DsCard title="Avatar · 1.5">
        <div className="flex flex-wrap items-end gap-3">
          {AVATAR_SIZES.map((size) => (
            <Avatar key={size} name="Aiko Tanaka" handle="aiko.t" size={size} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PEOPLE.map((person) => (
            <Avatar
              key={person.handle}
              name={person.name}
              handle={person.handle}
            />
          ))}
        </div>
        <p className="text-caption text-ag-text-secondary">
          Colour comes from a hash of the handle.
        </p>
      </DsCard>
      <DsCard title="Badge & counter · 1.7">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="demo">Demo</Badge>
          <Badge variant="demoSoft">Demo</Badge>
          <Badge variant="accent">Everyone</Badge>
          <Badge variant="outline">design system · v0.1</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Counter value={3} />
          <Counter value={2} tone="neutral" />
          <Counter value={42} />
          <Counter value={250} />
        </div>
      </DsCard>
    </div>
  );
}
