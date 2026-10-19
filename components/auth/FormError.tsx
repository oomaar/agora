import { type FormErrorProps } from "@/types/auth";

// A form-level error from the server, announced when it appears.
export function FormError({ message }: FormErrorProps) {
  return (
    <p role="alert" className="text-caption text-ag-danger empty:hidden">
      {message}
    </p>
  );
}
