import { type ProfileStatProps } from "@/types/profile";

export function ProfileStat({ count, label }: ProfileStatProps) {
  return (
    <span>
      <b className="font-semibold">{count.toLocaleString("en-US")}</b>{" "}
      <span className="text-ag-text-secondary">{label}</span>
    </span>
  );
}
