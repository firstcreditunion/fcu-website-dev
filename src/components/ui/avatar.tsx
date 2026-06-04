"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "group/avatar relative inline-flex shrink-0 items-center justify-center bg-gradient-to-tr align-middle font-semibold tracking-[-0.01em] text-white select-none [&_svg]:size-[55%]",
  {
    variants: {
      size: {
        xs: "size-5 text-[9px]",
        sm: "size-7 text-[11px]",
        md: "size-10 text-[14px]",
        default: "size-10 text-[14px]",
        lg: "size-14 text-[18px]",
        xl: "size-20 text-[24px]",
        "2xl": "size-28 text-[32px]",
      },
      shape: { circle: "rounded-full", square: "rounded-md" },
      colorway: {
        primary: "from-fcu-primary-300 to-fcu-primary-700",
        sage: "from-fcu-secondary-400 to-fcu-secondary-700",
        slate: "from-neutral-400 to-neutral-700",
        mint: "from-fcu-mint-400 to-fcu-mint-700",
        faded: "from-fcu-green-faded-300 to-fcu-green-faded-700 text-neutral-0",
        neutral: "border border-border bg-surface-sunken bg-none text-foreground-muted",
      },
    },
    defaultVariants: { size: "default", shape: "circle", colorway: "primary" },
  }
)

type AvatarSize = "xs" | "sm" | "md" | "default" | "lg" | "xl" | "2xl"

function Avatar({
  className,
  size,
  shape,
  colorway,
  ...props
}: AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size ?? "default"}
      className={cn(avatarVariants({ size, shape, colorway }), className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("size-full rounded-[inherit] object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center rounded-[inherit]", className)}
      {...props}
    />
  )
}

function AvatarStatus({
  className,
  status = "offline",
  ...props
}: React.ComponentProps<"span"> & {
  status?: "online" | "busy" | "away" | "offline"
}) {
  return (
    <span
      data-slot="avatar-status"
      className={cn(
        "absolute right-0 bottom-0 size-[28%] max-h-3.5 min-h-2 max-w-3.5 min-w-2 rounded-full border-2 border-card",
        status === "online" && "bg-status-success-500",
        status === "busy" && "bg-destructive",
        status === "away" && "bg-status-warning-500",
        status === "offline" && "bg-neutral-400",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground select-none",
        "group-data-[size=sm]/avatar:size-2.5 group-data-[size=default]/avatar:size-3 group-data-[size=md]/avatar:size-3 group-data-[size=lg]/avatar:size-4 [&>svg]:size-[60%]",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "flex items-center -space-x-2.5 [&_[data-slot=avatar]]:border-2 [&_[data-slot=avatar]]:border-card",
        className
      )}
      {...props}
    />
  )
}

const countSizes: Record<AvatarSize, string> = {
  xs: "h-5 min-w-5 text-[9px]",
  sm: "h-7 min-w-7 text-[11px]",
  md: "h-10 min-w-10 text-[12px]",
  default: "h-10 min-w-10 text-[12px]",
  lg: "h-14 min-w-14 text-[13px]",
  xl: "h-20 min-w-20 text-[15px]",
  "2xl": "h-28 min-w-28 text-[18px]",
}

function AvatarGroupCount({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: AvatarSize }) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full border-2 border-card bg-surface-sunken px-2 font-mono font-medium text-foreground-muted",
        countSizes[size],
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
}
