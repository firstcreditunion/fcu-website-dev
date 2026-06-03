"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full min-w-0 border border-input bg-card text-foreground transition-colors outline-none placeholder:text-foreground-subtle hover:border-border-strong focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-foreground-subtle read-only:bg-surface read-only:text-foreground-muted aria-invalid:border-destructive aria-invalid:bg-[color-mix(in_oklch,var(--status-danger-50)_60%,var(--card))] aria-invalid:focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--destructive)_30%,transparent)] data-[success=true]:border-status-success-500 data-[success=true]:focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--status-success-500)_25%,transparent)]",
  {
    variants: {
      size: {
        sm: "h-8 rounded-md px-2.5 text-[13px]",
        default: "h-10 rounded-lg px-3 text-sm",
        lg: "h-12 rounded-lg px-3.5 text-[15px]",
      },
      mono: {
        true: "font-mono tracking-normal tabular-nums",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      mono: false,
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({ className, type, size, mono, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, mono }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
