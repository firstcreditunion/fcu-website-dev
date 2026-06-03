import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        outlined: "border-border shadow-[var(--shadow-xs)]",
        elevated: "border-transparent shadow-[var(--shadow-md)]",
        ghost: "border-border bg-transparent shadow-none",
        interactive:
          "cursor-pointer border-border shadow-[var(--shadow-xs)] outline-none transition-all hover:-translate-y-px hover:border-border-strong hover:shadow-[var(--shadow-md)] focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus)] active:translate-y-0",
      },
      accent: {
        none: "",
        primary: "border-t-[3px] border-t-primary",
        destructive: "border-t-[3px] border-t-destructive",
        success: "border-t-[3px] border-t-status-success-500",
        warning: "border-t-[3px] border-t-status-warning-500",
      },
    },
    defaultVariants: { variant: "outlined", accent: "none" },
  }
)

function Card({
  className,
  variant,
  accent,
  size = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & { size?: "sm" | "default" | "lg" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(cardVariants({ variant, accent }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex items-start justify-between gap-4 px-6 pt-6 group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pt-8 group-data-[size=sm]/card:px-5 group-data-[size=sm]/card:pt-5 [&:last-child]:pb-6 group-data-[size=lg]/card:[&:last-child]:pb-8 group-data-[size=sm]/card:[&:last-child]:pb-5",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-[17px] leading-tight font-semibold tracking-[-0.012em] text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("mt-1 text-[13px] leading-normal text-foreground-muted", className)}
      {...props}
    />
  )
}

function CardEyebrow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-eyebrow"
      className={cn(
        "mb-2 font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("flex shrink-0 items-center gap-1.5", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-6 py-6 text-sm leading-relaxed text-foreground-muted group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:py-7 group-data-[size=sm]/card:px-5 group-data-[size=sm]/card:py-5 [[data-slot=card-header]+&]:pt-3.5",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-border px-6 py-4 group-data-[size=lg]/card:px-8 group-data-[size=sm]/card:px-5",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardEyebrow,
  CardAction,
  CardDescription,
  CardContent,
}
