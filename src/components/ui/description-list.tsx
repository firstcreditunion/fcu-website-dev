import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Description list — structured key–value pairs for read-only records.
 *
 * Faithful port of the FCU hand-off `extras2.css` `.desc-list` family. The
 * read-only counterpart to a form: where Input captures, this reports. Use
 * `mono` on any value the eye scans (numbers, dates, codes). The term column
 * stays a fixed 200px so values left-align into a clean scannable edge; below
 * 600px it stacks to label-over-value.
 *
 *   <DescriptionList>
 *     <DescriptionRow>
 *       <DescriptionTerm>Account number</DescriptionTerm>
 *       <DescriptionDetail mono>12-3401-0234567-00</DescriptionDetail>
 *     </DescriptionRow>
 *   </DescriptionList>
 *
 * Modifiers: `striped` (zebra rows for long lists), `compact` (tighter rows),
 * `inline` (no card chrome — for use inside another surface).
 */
function DescriptionList({
  className,
  striped,
  compact,
  inline,
  ...props
}: React.ComponentProps<"dl"> & {
  striped?: boolean
  compact?: boolean
  inline?: boolean
}) {
  return (
    <dl
      data-slot="description-list"
      className={cn(
        "m-0 min-w-0 overflow-hidden",
        inline ? "border-0 bg-transparent" : "rounded-xl border border-border bg-card",
        striped && "[&_[data-slot=description-row]:nth-child(even)]:bg-surface-muted",
        compact && "[&_[data-slot=description-row]]:px-4 [&_[data-slot=description-row]]:py-2.5",
        inline && "[&_[data-slot=description-row]]:px-0 [&_[data-slot=description-row]]:py-2.5",
        className
      )}
      {...props}
    />
  )
}

function DescriptionRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="description-row"
      className={cn(
        "grid grid-cols-[200px_1fr] items-baseline gap-4 border-t border-border px-5 py-3.5 first:border-t-0 max-[600px]:grid-cols-1 max-[600px]:gap-1",
        className
      )}
      {...props}
    />
  )
}

function DescriptionTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn(
        "m-0 text-[13px] font-medium tracking-[-0.005em] text-foreground-muted",
        className
      )}
      {...props}
    />
  )
}

function DescriptionDetail({
  className,
  mono,
  ...props
}: React.ComponentProps<"dd"> & { mono?: boolean }) {
  return (
    <dd
      data-slot="description-detail"
      className={cn(
        "m-0 flex min-w-0 flex-wrap items-center gap-2 text-[13.5px] break-words text-foreground",
        mono && "font-mono text-[13px]",
        className
      )}
      {...props}
    />
  )
}

export { DescriptionList, DescriptionRow, DescriptionTerm, DescriptionDetail }
