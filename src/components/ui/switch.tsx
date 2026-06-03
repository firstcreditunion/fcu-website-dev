"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-[3px] outline-none transition-colors focus-visible:shadow-[var(--shadow-focus)] data-checked:bg-primary data-unchecked:bg-neutral-300 hover:data-checked:bg-primary-hover hover:data-unchecked:bg-neutral-400 data-disabled:cursor-not-allowed data-disabled:bg-neutral-200 hover:data-disabled:bg-neutral-200",
  {
    variants: {
      size: {
        sm: "h-[18px] w-[30px]",
        default: "h-5 w-9",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: { size: "default" },
  }
)

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-neutral-0 shadow-[0_1px_2px_0_oklch(20%_0.02_220/0.18)] transition-transform data-disabled:bg-neutral-100 data-disabled:shadow-none",
  {
    variants: {
      size: {
        sm: "size-3 data-checked:translate-x-[12px]",
        default: "size-3.5 data-checked:translate-x-[16px]",
        lg: "size-[18px] data-checked:translate-x-[20px]",
      },
    },
    defaultVariants: { size: "default" },
  }
)

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={thumbVariants({ size })} />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
