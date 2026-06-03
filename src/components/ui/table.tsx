"use client"

import * as React from "react"
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** The bordered, rounded chrome around a table (mirrors `.table-wrap`). */
function TableContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-xs)]",
        className
      )}
      {...props}
    />
  )
}

function Table({
  className,
  striped,
  bordered,
  compact,
  ...props
}: React.ComponentProps<"table"> & {
  striped?: boolean
  bordered?: boolean
  compact?: boolean
}) {
  return (
    <div data-slot="table-scroll" className="w-full overflow-x-auto">
      <table
        data-slot="table"
        data-compact={compact ? "" : undefined}
        className={cn(
          "group/table w-full min-w-[720px] border-collapse text-left text-[13.5px] text-foreground data-compact:text-[13px]",
          striped && "[&_tbody_tr:nth-child(even)]:bg-surface-muted",
          bordered &&
            "[&_td]:border-r [&_td]:border-border [&_th]:border-r [&_th]:border-border [&_td:last-child]:border-r-0 [&_th:last-child]:border-r-0",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn(className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child>td]:border-b-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-border bg-surface font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "transition-colors hover:bg-surface-muted aria-selected:bg-primary-subtle data-[state=selected]:bg-primary-subtle",
        className
      )}
      {...props}
    />
  )
}

function TableHead({
  className,
  sortable,
  sortDirection,
  children,
  ...props
}: React.ComponentProps<"th"> & {
  sortable?: boolean
  sortDirection?: "asc" | "desc" | false
}) {
  return (
    <th
      data-slot="table-head"
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
            ? "descending"
            : sortable
              ? "none"
              : undefined
      }
      className={cn(
        "sticky top-0 z-[1] h-10 border-b border-border bg-surface px-[18px] text-left align-middle text-[11.5px] font-medium tracking-[0.02em] whitespace-nowrap text-foreground-subtle uppercase group-data-compact/table:px-[14px] [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          data-active={sortDirection ? "true" : undefined}
          className="-mx-1 inline-flex items-center gap-1.5 rounded px-1 text-inherit uppercase outline-none transition-colors hover:text-foreground focus-visible:text-foreground data-[active=true]:text-primary"
        >
          {children}
          {sortDirection === "asc" ? (
            <ChevronUpIcon className="size-3.5" />
          ) : sortDirection === "desc" ? (
            <ChevronDownIcon className="size-3.5" />
          ) : (
            <ChevronsUpDownIcon className="size-3.5 opacity-40" />
          )}
        </button>
      ) : (
        children
      )}
    </th>
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "h-14 border-b border-border px-[18px] align-middle whitespace-nowrap group-data-compact/table:h-11 group-data-compact/table:px-[14px] [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-[13px] text-foreground-muted", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableContainer,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
