import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Empty({
  className,
  bordered,
  ...props
}: React.ComponentProps<"div"> & { bordered?: boolean }) {
  return (
    <div
      data-slot="empty"
      data-bordered={bordered}
      className={cn(
        "flex w-full min-w-0 flex-col items-center justify-center px-6 py-12 text-center text-balance",
        "data-[bordered=true]:rounded-xl data-[bordered=true]:border data-[bordered=true]:border-dashed data-[bordered=true]:border-border-strong data-[bordered=true]:bg-surface",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex flex-col items-center", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-3.5 grid size-16 shrink-0 place-items-center rounded-full [&_svg]:pointer-events-none [&_svg]:size-7 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-subtle text-primary",
        neutral: "bg-surface-sunken text-foreground-subtle",
        success: "bg-status-success-50 text-status-success-700",
        danger: "bg-status-danger-50 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function EmptyMedia({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "text-[16px] font-semibold tracking-[-0.012em] text-foreground",
        className
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "mt-1.5 max-w-[40ch] text-[13.5px] leading-[1.55] text-pretty text-foreground-muted [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "mt-3.5 inline-flex flex-wrap items-center justify-center gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
