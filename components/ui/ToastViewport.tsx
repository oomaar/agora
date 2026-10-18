import { Toast } from "@/components/ui/Toast";
import { type ToastViewportProps } from "@/types/toast";

export function ToastViewport({ toasts }: ToastViewportProps) {
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-7 z-50 flex flex-col items-center gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} kind={toast.kind} message={toast.message} className="pointer-events-auto" />
      ))}
    </div>
  );
}
