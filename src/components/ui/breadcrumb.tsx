import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"ol"> & { size?: "default" | "sm" }) {
  return (
    <ol
      data-slot="breadcrumb-list"
      data-size={size}
      className={cn(
        "group/breadcrumb m-0 flex min-w-0 list-none flex-wrap items-center gap-x-1.5 gap-y-1 p-0 text-[13px] tracking-[-0.002em] text-foreground-muted data-[size=sm]:gap-x-1 data-[size=sm]:text-[12px]",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "block max-w-[240px] truncate rounded-sm px-1.5 py-1 text-foreground-muted no-underline transition-colors outline-none hover:bg-surface-sunken hover:text-foreground focus-visible:shadow-[var(--shadow-focus)] group-data-[size=sm]/breadcrumb:px-1 group-data-[size=sm]/breadcrumb:py-0.5",
          className
        ),
      },
      props
    ),
    render,
    state: { slot: "breadcrumb-link" },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "block max-w-[240px] truncate px-1.5 py-1 font-medium text-foreground group-data-[size=sm]/breadcrumb:px-1 group-data-[size=sm]/breadcrumb:py-0.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center text-foreground-subtle opacity-70 [&>svg]:size-3",
        className
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-6 cursor-pointer items-center justify-center rounded-sm text-foreground-subtle transition-colors hover:bg-surface-sunken hover:text-foreground [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
