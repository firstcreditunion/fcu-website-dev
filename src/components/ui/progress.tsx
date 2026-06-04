"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const trackVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-surface-sunken",
  {
    variants: { size: { sm: "h-1", md: "h-2", default: "h-2", lg: "h-3" } },
    defaultVariants: { size: "default" },
  }
)

const indicatorVariants = cva(
  "h-full rounded-full transition-[width] duration-[400ms] ease-out",
  {
    variants: {
      status: {
        default: "bg-primary",
        success: "bg-status-success-500",
        warning: "bg-status-warning-500",
        danger: "bg-destructive",
      },
    },
    defaultVariants: { status: "default" },
  }
)

function Progress({
  className,
  value,
  size = "default",
  status = "default",
  striped,
  indeterminate,
  children,
  ...props
}: Omit<ProgressPrimitive.Root.Props, "value"> & { value?: number | null } & VariantProps<
    typeof trackVariants
  > &
  VariantProps<typeof indicatorVariants> & {
    striped?: boolean
    indeterminate?: boolean
  }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={indeterminate ? null : (value ?? null)}
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      {children ? (
        <div className="flex items-baseline justify-between gap-3">{children}</div>
      ) : null}
      <ProgressPrimitive.Track className={cn(trackVariants({ size }))}>
        <ProgressPrimitive.Indicator
          className={cn(
            indicatorVariants({ status }),
            indeterminate && "w-[35%]! animate-progress-indeterminate",
            striped &&
              "animate-progress-stripes bg-[length:16px_16px] [background-image:linear-gradient(45deg,rgba(255,255,255,0.18)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0.18)_75%,transparent_75%,transparent)]"
          )}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn("text-[13px] font-medium tracking-[-0.005em] text-foreground", className)}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="progress-value"
      className={cn("font-mono text-[12px] tabular-nums text-foreground-muted", className)}
      {...props}
    />
  )
}

/* ── Circular ── */

const circleVariants = cva("relative inline-grid shrink-0 place-items-center", {
  variants: { size: { sm: "size-8", default: "size-12", lg: "size-[72px]" } },
  defaultVariants: { size: "default" },
})

function CircularProgress({
  value = 0,
  size = "default",
  status = "default",
  label,
  className,
}: {
  value?: number
  size?: "sm" | "default" | "lg"
  status?: "default" | "success" | "warning" | "danger"
  label?: React.ReactNode
  className?: string
}) {
  const r = 15.5
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - Math.min(100, Math.max(0, value)) / 100)
  const stroke = size === "sm" ? 3 : size === "lg" ? 5 : 4
  const color =
    status === "success"
      ? "var(--status-success-500)"
      : status === "warning"
        ? "var(--status-warning-500)"
        : status === "danger"
          ? "var(--destructive)"
          : "var(--primary)"
  const textSize = size === "sm" ? "text-[10px]" : size === "lg" ? "text-[14px]" : "text-[11px]"
  return (
    <div
      className={cn(circleVariants({ size }), className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg viewBox="0 0 36 36" className="size-full -rotate-90">
        <circle cx="18" cy="18" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth={stroke} />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-[400ms] ease-out"
        />
      </svg>
      <span
        className={cn(
          "absolute font-mono font-medium tabular-nums text-foreground",
          textSize
        )}
      >
        {label ?? `${value}%`}
      </span>
    </div>
  )
}

export { Progress, ProgressLabel, ProgressValue, CircularProgress }
