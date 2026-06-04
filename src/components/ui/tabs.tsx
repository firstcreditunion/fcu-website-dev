"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex min-w-0 gap-6 data-horizontal:flex-col", className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list flex min-w-0 items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  {
    variants: {
      variant: {
        underline: "gap-1 border-b border-border",
        pill: "w-fit max-w-full gap-1 rounded-lg border border-border bg-surface p-1 shadow-[var(--shadow-xs)]",
        enclosed: "gap-0.5 border-b border-border",
      },
    },
    defaultVariants: { variant: "underline" },
  }
)

type TabsVariant = "underline" | "pill" | "enclosed"
type TabsVariantProp = TabsVariant | "default" | "line"

function resolveVariant(v: TabsVariantProp): TabsVariant {
  if (v === "default") return "pill"
  if (v === "line") return "underline"
  return v
}

function TabsList({
  className,
  variant = "underline",
  ...props
}: TabsPrimitive.List.Props & { variant?: TabsVariantProp }) {
  const resolved = resolveVariant(variant)
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={resolved}
      className={cn(tabsListVariants({ variant: resolved }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        // base
        "relative inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 border-0 bg-transparent px-4 text-[13.5px] font-medium tracking-[-0.005em] whitespace-nowrap text-foreground-muted transition-colors outline-none hover:text-foreground focus-visible:rounded-md focus-visible:shadow-[var(--shadow-focus)] data-disabled:cursor-not-allowed data-disabled:text-foreground-subtle data-disabled:opacity-55 [&_svg]:size-4 [&_svg]:shrink-0",
        // underline
        "group-data-[variant=underline]/tabs-list:-mb-px group-data-[variant=underline]/tabs-list:rounded-t-sm group-data-[variant=underline]/tabs-list:border-b-2 group-data-[variant=underline]/tabs-list:border-transparent group-data-[variant=underline]/tabs-list:data-active:border-primary group-data-[variant=underline]/tabs-list:data-active:text-primary group-data-[variant=underline]/tabs-list:not-data-active:hover:bg-surface-muted",
        // pill
        "group-data-[variant=pill]/tabs-list:h-8 group-data-[variant=pill]/tabs-list:rounded-md group-data-[variant=pill]/tabs-list:data-active:bg-card group-data-[variant=pill]/tabs-list:data-active:text-foreground group-data-[variant=pill]/tabs-list:data-active:shadow-[var(--shadow-xs)]",
        // enclosed
        "group-data-[variant=enclosed]/tabs-list:-mb-px group-data-[variant=enclosed]/tabs-list:rounded-t-md group-data-[variant=enclosed]/tabs-list:border group-data-[variant=enclosed]/tabs-list:border-b-0 group-data-[variant=enclosed]/tabs-list:border-transparent group-data-[variant=enclosed]/tabs-list:data-active:border-border group-data-[variant=enclosed]/tabs-list:data-active:bg-card group-data-[variant=enclosed]/tabs-list:data-active:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("min-w-0 flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
