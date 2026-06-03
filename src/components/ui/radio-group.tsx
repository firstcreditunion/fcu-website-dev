"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive data-slot="radio-group" className={cn("grid w-full gap-2", className)} {...props} />
  )
}

const radioVariants = cva(
  "group/radio relative flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-border-strong bg-card transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:border-neutral-500 focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted data-checked:border-primary data-checked:bg-primary aria-invalid:border-destructive aria-invalid:data-checked:border-destructive aria-invalid:data-checked:bg-destructive",
  {
    variants: {
      size: {
        sm: "size-4",
        default: "size-[18px]",
        lg: "size-5",
      },
    },
    defaultVariants: { size: "default" },
  }
)

function RadioGroupItem({
  className,
  size,
  ...props
}: RadioPrimitive.Root.Props & VariantProps<typeof radioVariants>) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(radioVariants({ size }), className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        keepMounted
        className="flex items-center justify-center opacity-0 transition-opacity data-checked:opacity-100"
      >
        <span className="size-[45%] rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
