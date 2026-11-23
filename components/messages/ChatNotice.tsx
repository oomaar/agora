import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { type ChatNoticeProps } from "@/types/messages";

// Why a file or voice note couldn't be added, above the composer.
export function ChatNotice({ message, onDismiss }: ChatNoticeProps) {
  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-md border border-ag-danger-border bg-ag-danger-surface py-1.5 pl-3 pr-1.5 text-[13px] text-ag-danger-text"
    >
      <span className="mt-1 flex-none text-ag-danger">
        <Icon name="alert" size={14} />
      </span>
      <span className="flex-1 py-0.5">{message}</span>
      <IconButton icon="close" label="Dismiss" size="sm" onClick={onDismiss} />
    </p>
  );
}
