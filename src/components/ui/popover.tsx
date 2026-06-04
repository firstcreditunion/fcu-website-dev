"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

const popoverVariants = cva(
  "z-50 origin-(--transform-origin) rounded-lg border border-border bg-popover text-[13.5px] leading-normal text-popover-foreground shadow-[var(--shadow-lg)] outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
  {
    variants: {
      size: {
        default: "min-w-[240px] max-w-[360px] p-4",
        menu: "min-w-[200px] max-w-[280px] p-1.5",
        lg: "min-w-[280px] max-w-[480px] p-5",
      },
    },
    defaultVariants: { size: "default" },
  }
)

function PopoverContent({
  className,
  size,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  ...props
}: PopoverPrimitive.Popup.Props &
  VariantProps<typeof popoverVariants> &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(popoverVariants({ size }), className)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("mb-2.5 flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        "text-[14px] font-semibold tracking-[-0.008em] text-foreground",
        className
      )}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-[12.5px] text-pretty text-foreground-muted", className)}
      {...props}
    />
  )
}

function PopoverFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-footer"
      className={cn(
        "mt-3.5 flex items-center justify-end gap-2 border-t border-border pt-3",
        className
      )}
      {...props}
    />
  )
}

function PopoverItem({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"button"> & { variant?: "default" | "danger" }) {
  return (
    <button
      type="button"
      data-slot="popover-item"
      data-variant={variant}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13.5px] tracking-[-0.005em] text-foreground transition-colors outline-none hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:shadow-[var(--shadow-focus)] data-[variant=danger]:text-status-danger-700 data-[variant=danger]:hover:bg-status-danger-50 [&>svg]:size-3.5 [&>svg]:shrink-0 [&>svg]:text-foreground-muted data-[variant=danger]:[&>svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function PopoverShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="popover-shortcut"
      className={cn(
        "ml-auto font-mono text-[11px] tracking-wide text-foreground-subtle",
        className
      )}
      {...props}
    />
  )
}

function PopoverSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-separator"
      role="separator"
      className={cn("-mx-1.5 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
  PopoverItem,
  PopoverShortcut,
  PopoverSeparator,
}
