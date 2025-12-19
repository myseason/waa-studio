import * as React from "react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export type CardProps = React.ComponentPropsWithoutRef<"div">;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card({ className, ...props }, ref) {
  return <div ref={ref} className={cx("rounded-md border border-border bg-surface shadow-soft", className)} {...props} />;
});

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cx("flex flex-col gap-1.5 p-4", className)} {...props} />;
});

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<"h3">>(function CardTitle(
  { className, ...props },
  ref,
) {
  return <h3 ref={ref} className={cx("text-sm font-semibold leading-none tracking-tight text-text", className)} {...props} />;
});

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<"p">>(
  function CardDescription({ className, ...props }, ref) {
    return <p ref={ref} className={cx("text-sm text-muted", className)} {...props} />;
  },
);

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cx("p-4 pt-0", className)} {...props} />;
});

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(function CardFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cx("flex items-center p-4 pt-0", className)} {...props} />;
});

