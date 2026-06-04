import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative flex items-start gap-3.5 rounded-lg border text-[13.5px] leading-[1.55]",
  {
    variants: {
      variant: {
        info: "border-status-info-500/25 bg-status-info-50 text-status-info-700",
        success: "border-status-success-500/25 bg-status-success-50 text-status-success-700",
        warning: "border-status-warning-500/30 bg-status-warning-50 text-status-warning-700",
        danger: "border-destructive/30 bg-status-danger-50 text-status-danger-700",
        neutral: "border-border bg-surface-muted text-foreground",
      },
      display: {
        default: "px-4 py-3.5",
        banner: "rounded-none border-x-0 px-4 py-3.5",
        inline: "gap-2.5 rounded-md px-3 py-2 text-[12.5px]",
      },
    },
    defaultVariants: { variant: "info", display: "default" },
  }
)

function Alert({
  className,
  variant,
  display = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-display={display}
      role="alert"
      className={cn(alertVariants({ variant, display }), className)}
      {...props}
    />
  )
}

function AlertIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="alert-icon"
      aria-hidden
      className={cn(
        "mt-px shrink-0 text-current [&_svg]:size-5 group-data-[display=inline]/alert:[&_svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-title"
      className={cn(
        "m-0 text-[13.5px] font-semibold tracking-[-0.005em] text-current",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-description"
      className={cn(
        "m-0 text-[13px] text-current/90 text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_strong]:font-medium [&_strong]:text-current",
        className
      )}
      {...props}
    />
  )
}

function AlertActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-actions"
      className={cn("mt-1 inline-flex items-center gap-3", className)}
      {...props}
    />
  )
}

function AlertClose({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="alert-close"
      aria-label="Dismiss"
      className={cn(
        "-mt-0.5 ml-2 inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-current opacity-70 transition-[opacity,background-color] outline-none hover:bg-current/10 hover:opacity-100 focus-visible:shadow-[var(--shadow-focus)] [&_svg]:size-3.5",
        className
      )}
      {...props}
    >
      <XIcon />
    </button>
  )
}

export {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
  AlertClose,
}
