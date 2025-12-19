import * as React from "react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export type InputProps = React.ComponentPropsWithoutRef<"input">;

const base =
  "flex h-9 w-full rounded border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-2 aria-invalid:border-status-error";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cx(base, className)} {...props} />;
});

