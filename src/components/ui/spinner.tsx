import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva("inline-block shrink-0 animate-spin", {
  variants: {
    size: {
      sm: "size-3.5",
      default: "size-5",
      lg: "size-8",
      xl: "size-12",
    },
    variant: {
      default: "text-primary",
      muted: "text-foreground-muted",
      success: "text-status-success-700",
      white: "text-neutral-0",
    },
  },
  defaultVariants: { size: "default", variant: "default" },
})

function Spinner({
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<"svg"> & VariantProps<typeof spinnerVariants>) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        className="opacity-[0.18]"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="56.5"
        strokeDashoffset="42"
      />
    </svg>
  )
}

export { Spinner, spinnerVariants }
