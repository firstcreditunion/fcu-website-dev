"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium tracking-[-0.005em] leading-none whitespace-nowrap transition-all outline-none cursor-pointer select-none focus-visible:shadow-[var(--shadow-focus)] active:translate-y-[0.5px] disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary — filled brand blue (the default CTA)
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        // Secondary — the deliberate brand-green exception (reserved-secondary policy)
        secondary:
          "bg-fcu-secondary-500 text-fcu-secondary-950 shadow-[var(--shadow-xs)] hover:bg-fcu-secondary-600 active:bg-fcu-secondary-700 active:text-neutral-0",
        outline:
          "border-border-strong text-foreground hover:bg-surface-muted hover:border-neutral-400 active:bg-surface-sunken",
        ghost:
          "text-foreground-muted hover:bg-surface-sunken hover:text-foreground active:bg-neutral-200",
        destructive:
          "bg-destructive text-neutral-0 hover:bg-status-danger-700 active:bg-status-danger-700",
        "destructive-outline":
          "border-status-danger-500/40 text-status-danger-700 hover:bg-status-danger-50 hover:border-destructive",
        link: "text-primary underline underline-offset-[3px] decoration-1 decoration-primary/40 hover:decoration-primary active:text-primary-active h-auto! p-0! rounded-[4px]",
        // Brand accent — marketing only; never the page's default CTA
        brand: "bg-brand-accent text-neutral-0 hover:bg-fcu-secondary-800",
      },
      size: {
        default:
          "h-10 gap-2 px-4 text-sm rounded-lg [&_svg:not([class*='size-'])]:size-[18px]",
        sm: "h-8 gap-1.5 px-3 text-[13px] rounded-md [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 gap-2.5 px-[22px] text-[15px] rounded-lg [&_svg:not([class*='size-'])]:size-5",
        xs: "h-6 gap-1 px-2 text-xs rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-10 rounded-lg [&_svg:not([class*='size-'])]:size-[18px]",
        "icon-sm": "size-8 rounded-md [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-12 rounded-lg [&_svg:not([class*='size-'])]:size-5",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
      },
      block: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Show a centered spinner, hide the label in place, and disable the button. */
    loading?: boolean
    /** Transient red glow after a failed action (resolves on next interaction). */
    error?: boolean
  }

function Button({
  className,
  variant = "default",
  size = "default",
  block,
  loading = false,
  error = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        buttonVariants({ variant, size, block }),
        loading && "cursor-progress",
        error &&
          "bg-destructive text-neutral-0 shadow-[0_0_0_3px_color-mix(in_oklch,var(--destructive)_25%,transparent)] hover:bg-destructive",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span aria-hidden className="absolute inset-0 grid place-items-center">
            <Loader2Icon className="size-[1.15em] animate-spin" />
          </span>
          {/* Kept in flow (invisible) so the button preserves its width — no reflow. */}
          <span className="inline-flex items-center justify-center gap-2 opacity-0">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
