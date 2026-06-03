"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer group/checkbox relative flex shrink-0 items-center justify-center rounded-[var(--radius-xs)] border-[1.5px] border-border-strong bg-card text-primary-foreground transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:border-neutral-500 focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted data-checked:border-primary data-checked:bg-primary data-indeterminate:border-primary data-indeterminate:bg-primary aria-invalid:border-destructive aria-invalid:data-checked:border-destructive aria-invalid:data-checked:bg-destructive",
  {
    variants: {
      size: {
        sm: "size-4 [&_svg]:size-3",
        default: "size-[18px] [&_svg]:size-3",
        lg: "size-5 [&_svg]:size-3.5",
      },
    },
    defaultVariants: { size: "default" },
  }
)

function Checkbox({
  className,
  size,
  ...props
}: CheckboxPrimitive.Root.Props & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        keepMounted
        className="flex items-center justify-center text-current opacity-0 transition-opacity data-checked:opacity-100 data-indeterminate:opacity-100"
      >
        <MinusIcon className="hidden group-data-indeterminate/checkbox:block" />
        <CheckIcon className="group-data-indeterminate/checkbox:hidden" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
