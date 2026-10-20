import { Icon } from "@/components/ui/Icon";
import { type ComposeErrorProps } from "@/types/compose";

export function ComposeError({ message }: ComposeErrorProps) {
  return (
    <p
      role="alert"
      className="mx-4.5 mb-3.5 flex items-start gap-2.5 rounded-md border border-ag-danger-border bg-ag-danger-surface px-3.5 py-3 text-[13.5px] leading-[1.45] text-ag-danger-text"
    >
      <span className="mt-px flex-none text-ag-danger">
        <Icon name="alert" size={16} />
      </span>
      {message}
    </p>
  );
}
