// src/components/marketing/widget-placeholder.tsx
// Kit "Widget Placeholder" (node 86:5) — recipes-only stand-in for interactive
// widgets. In the page builder the widget registry renders the REAL component
// (v1: RepaymentCalculator); this placeholder appears in Studio previews,
// showcase docs, and anywhere a widget name has no registered renderer.
// Figma doc-note: "Do not design inside."
import { SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Dashed stand-in panel naming the widget that renders here in the real app.
 * Kit glyph is a placeholder-set icon; lucide `SlidersHorizontal` stands in
 * (icon set is provisional — marketing deciding).
 */
function WidgetPlaceholder({
  widget,
  className,
}: {
  /** Widget registry name, e.g. "repaymentCalculator" */
  widget: string
  className?: string
}) {
  return (
    <div
      role="status"
      data-slot="widget-placeholder"
      className={cn(
        "flex h-[380px] w-full flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-border-strong bg-surface",
        className,
      )}
    >
      <SlidersHorizontal className="size-10 text-foreground-subtle" aria-hidden="true" />
      <p className="text-base font-semibold text-foreground-muted">
        Interactive widget — rendered by the app
      </p>
      <p className="font-mono text-xs font-medium text-foreground-subtle">{widget}</p>
    </div>
  )
}

export { WidgetPlaceholder }
