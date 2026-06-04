import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Timeline / activity feed — a vertical sequence of events on a connecting rail.
 *
 * Faithful port of the FCU hand-off `extras2.css` `.timeline` / `.tl-*` family.
 * Each item carries a `state` so the member sees where things stand:
 *   - process variant — a known sequence (complete · active · pending · danger)
 *   - feed variant    — an open-ended log (larger icon nodes, tighter rows)
 *
 *   <Timeline>
 *     <TimelineItem state="complete" icon={<CheckIcon />}>
 *       <TimelineHead>
 *         <TimelineTitle>Application submitted</TimelineTitle>
 *         <TimelineTime>28 May · 09:14</TimelineTime>
 *       </TimelineHead>
 *       <TimelineDesc>Personal details received.</TimelineDesc>
 *     </TimelineItem>
 *   </Timeline>
 */

const timelineVariants = cva("flex min-w-0 flex-col", {
  variants: {
    variant: {
      process: "",
      // Compact activity-feed: larger icon nodes, tighter rows.
      feed: "[&_[data-slot=timeline-item]]:pb-4 [&_[data-slot=timeline-item]:last-child]:pb-0 [&_[data-slot=timeline-node]]:size-8 [&_[data-slot=timeline-node]_svg]:size-[15px]",
    },
  },
  defaultVariants: { variant: "process" },
})

const nodeVariants = cva(
  "z-[1] inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-border-strong bg-card text-foreground-muted [&_svg]:size-3.5",
  {
    variants: {
      state: {
        default: "",
        complete: "border-status-success-500 bg-status-success-500 text-neutral-0",
        active: "border-primary bg-primary text-primary-foreground",
        pending: "border-dashed bg-card",
        danger: "border-destructive bg-destructive text-neutral-0",
      },
    },
    defaultVariants: { state: "default" },
  }
)

type TimelineState = NonNullable<VariantProps<typeof nodeVariants>["state"]>

function Timeline({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof timelineVariants>) {
  return (
    <div data-slot="timeline" className={cn(timelineVariants({ variant }), className)} {...props} />
  )
}

function TimelineItem({
  className,
  state = "default",
  icon,
  nodeClassName,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  state?: TimelineState
  icon?: React.ReactNode
  /** Override the node's icon colour (e.g. `text-primary` for a feed event). */
  nodeClassName?: string
}) {
  return (
    <div
      data-slot="timeline-item"
      className={cn(
        "relative flex min-w-0 gap-4 pb-6 last:pb-0 [&:last-child_[data-slot=timeline-line]]:hidden",
        state === "pending" && "[&_[data-slot=timeline-title]]:text-foreground-muted",
        className
      )}
      {...props}
    >
      <div data-slot="timeline-rail" className="flex shrink-0 flex-col items-center">
        <span data-slot="timeline-node" className={cn(nodeVariants({ state }), nodeClassName)}>
          {icon}
        </span>
        <span
          data-slot="timeline-line"
          className={cn(
            "mt-0.5 min-h-3 w-0.5 flex-1",
            state === "complete" ? "bg-status-success-500" : "bg-border"
          )}
        />
      </div>
      <div
        data-slot="timeline-body"
        className="flex min-w-0 flex-1 flex-col gap-[3px] pt-[3px]"
      >
        {children}
      </div>
    </div>
  )
}

function TimelineHead({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-head"
      className={cn("flex flex-wrap items-baseline justify-between gap-2", className)}
      {...props}
    />
  )
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="timeline-title"
      className={cn("text-[13.5px] font-semibold tracking-[-0.005em] text-foreground", className)}
      {...props}
    />
  )
}

function TimelineTime({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="timeline-time"
      className={cn("font-mono text-[11px] whitespace-nowrap text-foreground-subtle", className)}
      {...props}
    />
  )
}

function TimelineDesc({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="timeline-desc"
      className={cn(
        "text-[13px] leading-[1.5] text-pretty text-foreground-muted [&_strong]:font-medium [&_strong]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineHead,
  TimelineTitle,
  TimelineTime,
  TimelineDesc,
  timelineVariants,
}
