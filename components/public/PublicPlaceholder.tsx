import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { type PublicPlaceholderProps } from "@/types/shell";

// Stand-in for the public pages until Phase 4 builds them.
export function PublicPlaceholder({ title, link }: PublicPlaceholderProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <Logo size="lg" />
      <h1 className="text-h2">{title}</h1>
      <Link href={link.href} className="text-body-sm text-ag-accent-text hover:underline">
        {link.label}
      </Link>
    </main>
  );
}
