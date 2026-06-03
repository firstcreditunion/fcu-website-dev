import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Pagination({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"nav"> & { variant?: "default" | "outlined" }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      data-variant={variant}
      className={cn("group/pagination w-fit", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-wrap items-center gap-0.5", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

const paginationItemVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-1 rounded-md border border-transparent font-mono text-foreground-muted transition-colors outline-none select-none hover:bg-surface-muted hover:text-foreground focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus)] aria-disabled:pointer-events-none aria-disabled:opacity-55 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary-hover group-data-[variant=outlined]/pagination:border-border group-data-[variant=outlined]/pagination:bg-card group-data-[variant=outlined]/pagination:hover:border-border-strong group-data-[variant=outlined]/pagination:data-[active=true]:border-primary [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "h-8 min-w-8 px-2.5 text-[13px]",
        sm: "h-7 min-w-7 px-2 text-[12px]",
      },
    },
    defaultVariants: { size: "default" },
  }
)

type PaginationLinkProps = {
  isActive?: boolean
} & VariantProps<typeof paginationItemVariants> &
  React.ComponentProps<"a">

function PaginationLink({ className, isActive, size, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(paginationItemVariants({ size }), className)}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to previous page" className={cn(className)} {...props}>
      <ChevronLeftIcon />
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" className={cn(className)} {...props}>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex h-8 min-w-8 items-center justify-center font-mono text-[13px] tracking-[0.04em] text-foreground-subtle",
        className
      )}
      {...props}
    >
      …<span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
