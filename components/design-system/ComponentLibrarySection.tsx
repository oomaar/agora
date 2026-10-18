import { SectionHeader } from "@/components/design-system/SectionHeader";
import { IdentityDemo } from "@/components/design-system/library/IdentityDemo";
import { ButtonsDemo } from "@/components/design-system/library/ButtonsDemo";
import { FieldsDemo } from "@/components/design-system/library/FieldsDemo";
import { NavigationDemo } from "@/components/design-system/library/NavigationDemo";
import { OverlaysDemo } from "@/components/design-system/library/OverlaysDemo";
import { StatesDemo } from "@/components/design-system/library/StatesDemo";
import { PostCardDemo } from "@/components/design-system/library/PostCardDemo";

export function ComponentLibrarySection() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        index="07"
        title="Component library"
        description="The real components from components/, interactive. Follows the current theme."
      />
      <IdentityDemo />
      <ButtonsDemo />
      <FieldsDemo />
      <NavigationDemo />
      <OverlaysDemo />
      <StatesDemo />
      <PostCardDemo />
    </section>
  );
}
