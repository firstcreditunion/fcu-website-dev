import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border font-medium whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus)] [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        // FCU status variants (subtle / tinted by default)
        neutral: "border-border bg-surface-sunken text-foreground-muted",
        primary: "border-primary/20 bg-primary-subtle text-primary",
        success: "border-status-success-500/25 bg-status-success-50 text-status-success-700",
        warning: "border-status-warning-500/30 bg-status-warning-50 text-status-warning-700",
        danger: "border-destructive/25 bg-status-danger-50 text-status-danger-700",
        info: "border-status-info-500/20 bg-status-info-50 text-status-info-700",
        // Legacy aliases — kept so existing internal pages compile unchanged
        default: "border-primary/20 bg-primary-subtle text-primary",
        secondary: "border-border bg-surface-sunken text-foreground-muted",
        destructive: "border-destructive/25 bg-status-danger-50 text-status-danger-700",
        outline: "border-border bg-surface-sunken text-foreground-muted",
        ghost: "border-transparent bg-transparent text-foreground-muted",
        link: "border-transparent bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-[18px] gap-1 px-1.5 text-[10.5px]",
        default: "h-[22px] gap-[5px] px-2 text-[11.5px]",
        lg: "h-[26px] gap-1.5 px-2.5 text-[12.5px]",
      },
      solid: { true: "border-transparent", false: "" },
      counter: {
        true: "h-[18px] min-w-[18px] justify-center gap-0 px-[5px] font-mono text-[10.5px] tabular-nums",
        false: "",
      },
    },
    compoundVariants: [
      { solid: true, variant: "neutral", className: "bg-neutral-700 text-neutral-0" },
      { solid: true, variant: "primary", className: "bg-primary text-primary-foreground" },
      { solid: true, variant: "success", className: "bg-status-success-500 text-neutral-0" },
      { solid: true, variant: "warning", className: "bg-status-warning-700 text-neutral-0" },
      { solid: true, variant: "danger", className: "bg-destructive text-destructive-foreground" },
      { solid: true, variant: "info", className: "bg-status-info-500 text-neutral-0" },
    ],
    defaultVariants: { variant: "neutral", size: "default", solid: false, counter: false },
  }
)

function Badge({
  className,
  variant,
  size,
  solid,
  counter,
  dot,
  children,
  render,
  ...props
}: useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { dot?: boolean }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size, solid, counter }), className),
        children: (
          <>
            {dot ? (
              <span className="size-1.5 shrink-0 rounded-full bg-current opacity-70" />
            ) : null}
            {children}
          </>
        ),
      },
      props
    ),
    render,
    state: { slot: "badge" },
  })
}

export { Badge, badgeVariants }
