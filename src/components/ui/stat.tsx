import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Stat block — a single number, told well.
 *
 * Faithful port of the FCU hand-off `marketing.css` `.stat` family. Anchors
 * marketing claims ("4.85% p.a.", "$0 fees") and summarises dashboard data
 * ("Total balance"). Compose from the parts below; the minimum is one value.
 *
 *   <Stat bordered>
 *     <StatLabel>Total balance</StatLabel>
 *     <StatValue mono>$48,837.54</StatValue>
 *     <StatTrend direction="up">+$1,204.50 this month</StatTrend>
 *   </Stat>
 */

const statVariants = cva("flex min-w-0 flex-col rounded-lg bg-transparent", {
  variants: {
    // Size drives the value/label scale via descendant utilities, mirroring the
    // hand-off cascade (`.stat--sm .stat-value`, `.stat--hero .stat-value`).
    size: {
      sm: "gap-1 px-4 py-3.5 [&_[data-slot=stat-value]]:text-[20px] [&_[data-slot=stat-value]]:tracking-[-0.02em] [&_[data-slot=stat-label]]:text-[12px]",
      md: "gap-1.5 p-5",
      hero: "gap-3 px-1 py-8 text-left [&_[data-slot=stat-value]]:text-[clamp(48px,7vw,88px)] [&_[data-slot=stat-value]]:tracking-[-0.04em] [&_[data-slot=stat-label]]:text-[14px]",
    },
    // Bordered — sits as its own card without a Card wrapper.
    bordered: {
      true: "border border-border bg-card shadow-[var(--shadow-xs)]",
      false: "",
    },
    // Accent — primary rail across the top, like `.card--accent-primary`.
    accent: {
      true: "border-t-[3px] border-t-primary",
      false: "",
    },
  },
  defaultVariants: { size: "md", bordered: false, accent: false },
})

function Stat({
  className,
  size,
  bordered,
  accent,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof statVariants>) {
  return (
    <div
      data-slot="stat"
      className={cn(statVariants({ size, bordered, accent }), className)}
      {...props}
    />
  )
}

function StatEyebrow({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stat-eyebrow"
      className={cn(
        "font-mono text-[10.5px] font-normal tracking-[0.04em] uppercase text-foreground-subtle",
        className
      )}
      {...props}
    />
  )
}

function StatLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stat-label"
      className={cn(
        "text-[13px] font-medium tracking-[-0.005em] text-foreground-muted",
        className
      )}
      {...props}
    />
  )
}

function StatValue({
  className,
  mono = false,
  ...props
}: React.ComponentProps<"span"> & { mono?: boolean }) {
  return (
    <span
      data-slot="stat-value"
      className={cn(
        "text-[clamp(28px,4vw,40px)] leading-none font-semibold text-balance text-foreground tabular-nums",
        mono ? "font-mono tracking-[-0.02em]" : "tracking-[-0.035em]",
        className
      )}
      {...props}
    />
  )
}

/** Small superscript-style unit appended inside StatValue (e.g. "% p.a."). */
function StatUnit({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stat-unit"
      className={cn(
        "ml-1 text-[0.45em] font-medium tracking-[-0.005em] text-foreground-muted",
        className
      )}
      {...props}
    />
  )
}

const TREND_ICON = { up: ArrowUpIcon, down: ArrowDownIcon, flat: MinusIcon } as const

function StatTrend({
  className,
  direction = "flat",
  children,
  ...props
}: React.ComponentProps<"span"> & { direction?: "up" | "down" | "flat" }) {
  const Icon = TREND_ICON[direction]
  return (
    <span
      data-slot="stat-trend"
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[12.5px]",
        direction === "up" && "text-status-success-700",
        direction === "down" && "text-status-danger-700",
        direction === "flat" && "text-foreground-muted",
        className
      )}
      {...props}
    >
      <span className="inline-flex size-3 shrink-0 items-center justify-center">
        <Icon className="size-full" strokeWidth={3} aria-hidden="true" />
      </span>
      {children}
    </span>
  )
}

/** Short explanatory line under the value/trend — for stats that need context. */
function StatHelp({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stat-help"
      className={cn(
        "mt-1 text-[12.5px] leading-[1.5] text-pretty text-foreground-subtle",
        className
      )}
      {...props}
    />
  )
}

/**
 * Even-width stat row. `divided` collapses the gap into a single card with
 * vertical dividers (stacking with horizontal dividers below 720px).
 */
function StatRow({
  className,
  divided = false,
  ...props
}: React.ComponentProps<"div"> & { divided?: boolean }) {
  return (
    <div
      data-slot="stat-row"
      className={cn(
        "grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]",
        divided && [
          "gap-0 overflow-hidden rounded-xl border border-border bg-card",
          "[&>[data-slot=stat]]:rounded-none [&>[data-slot=stat]]:border-l [&>[data-slot=stat]]:border-border [&>[data-slot=stat]]:p-6",
          "[&>[data-slot=stat]:first-child]:border-l-0",
          "max-[720px]:[&>[data-slot=stat]]:border-l-0 max-[720px]:[&>[data-slot=stat]]:border-t max-[720px]:[&>[data-slot=stat]]:border-border max-[720px]:[&>[data-slot=stat]:first-child]:border-t-0",
        ],
        className
      )}
      {...props}
    />
  )
}

export {
  Stat,
  StatEyebrow,
  StatLabel,
  StatValue,
  StatUnit,
  StatTrend,
  StatHelp,
  StatRow,
  statVariants,
}
