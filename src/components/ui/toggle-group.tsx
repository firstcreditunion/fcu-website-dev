"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"

import { cn } from "@/lib/utils"

function ToggleGroup({
  className,
  size = "default",
  block,
  ...props
}: ToggleGroupPrimitive.Props & {
  size?: "sm" | "default" | "lg"
  block?: boolean
}) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-size={size}
      data-block={block ? "true" : undefined}
      className={cn(
        "group/toggle-group inline-flex w-fit items-center rounded-lg bg-surface-sunken p-[3px] data-[block=true]:flex data-[block=true]:w-full",
        className
      )}
      {...props}
    />
  )
}

function ToggleGroupItem({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex h-[34px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--radius-lg)-3px)] border-0 bg-transparent px-4 text-[13.5px] font-medium whitespace-nowrap text-foreground-muted transition-[color,background-color,box-shadow] outline-none hover:text-foreground focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50 data-pressed:bg-card data-pressed:text-foreground data-pressed:shadow-[var(--shadow-xs)] group-data-[block=true]/toggle-group:flex-1 group-data-[size=sm]/toggle-group:h-7 group-data-[size=sm]/toggle-group:px-3 group-data-[size=sm]/toggle-group:text-[12.5px] group-data-[size=lg]/toggle-group:h-[42px] group-data-[size=lg]/toggle-group:px-[22px] group-data-[size=lg]/toggle-group:text-[14.5px] [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
