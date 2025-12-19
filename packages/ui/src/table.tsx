import * as React from "react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export const Table = React.forwardRef<HTMLTableElement, React.ComponentPropsWithoutRef<"table">>(function Table(
  { className, ...props },
  ref,
) {
  return (
    <div className="w-full overflow-auto rounded-md border border-border bg-surface shadow-soft">
      <table ref={ref} className={cx("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
});

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"thead">>(function TableHeader(
  { className, ...props },
  ref,
) {
  return <thead ref={ref} className={cx("bg-surface-2", className)} {...props} />;
});

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"tbody">>(function TableBody(
  { className, ...props },
  ref,
) {
  return <tbody ref={ref} className={cx("[&_tr:last-child]:border-0", className)} {...props} />;
});

export const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<"tr">>(function TableRow(
  { className, ...props },
  ref,
) {
  return <tr ref={ref} className={cx("border-b border-border transition-colors hover:bg-surface-2/60", className)} {...props} />;
});

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<"th">>(function TableHead(
  { className, ...props },
  ref,
) {
  return <th ref={ref} className={cx("px-3 py-2 text-left align-middle text-xs font-medium text-muted", className)} {...props} />;
});

export const TableCell = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<"td">>(function TableCell(
  { className, ...props },
  ref,
) {
  return <td ref={ref} className={cx("px-3 py-2 align-middle text-sm text-text", className)} {...props} />;
});

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.ComponentPropsWithoutRef<"caption">>(
  function TableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={cx("mt-2 text-sm text-muted", className)} {...props} />;
  },
);

