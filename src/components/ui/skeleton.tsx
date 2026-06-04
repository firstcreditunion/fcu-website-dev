import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-skeleton-shimmer rounded-sm bg-[linear-gradient(90deg,var(--surface-sunken)_0%,var(--neutral-200)_50%,var(--surface-sunken)_100%)] bg-[length:200%_100%] align-middle motion-reduce:animate-none motion-reduce:bg-surface-sunken motion-reduce:bg-none",
        className
      )}
      {...props}
    />
  )
}

function SkeletonText({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("block h-[0.9em] w-full rounded-[4px]", className)} {...props} />
}

function SkeletonTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("block h-[1.2em] w-3/5 rounded-[5px]", className)} {...props} />
}

function SkeletonAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("size-10 shrink-0 rounded-full", className)} {...props} />
}

function SkeletonImage({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("block aspect-video w-full rounded-md", className)} {...props} />
}

function SkeletonButton({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("inline-block h-10 w-24 rounded-lg", className)} {...props} />
}

function SkeletonBadge({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("inline-block h-[22px] w-14 rounded-full", className)} {...props} />
}

export {
  Skeleton,
  SkeletonText,
  SkeletonTitle,
  SkeletonAvatar,
  SkeletonImage,
  SkeletonButton,
  SkeletonBadge,
}
