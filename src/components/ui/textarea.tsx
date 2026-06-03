import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // `field-sizing-content` gives native auto-grow — no JS height sync needed.
        "field-sizing-content flex min-h-24 w-full resize-none rounded-lg border border-input bg-card px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-foreground-subtle hover:border-border-strong focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus)] read-only:bg-surface read-only:text-foreground-muted disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-foreground-subtle aria-invalid:border-destructive aria-invalid:bg-[color-mix(in_oklch,var(--status-danger-50)_60%,var(--card))] aria-invalid:focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--destructive)_30%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
