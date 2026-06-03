"use client"

import { type ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * FCU field composition (mirrors `inputs.css` .field): a wrapper that carries
 * the validation state, a label (with required/optional markers), a control row
 * that owns the border + focus-within ring and holds affixes/icons/input, and
 * a helper line. State (error/success/loading) is set once on <Field> and
 * cascades to the control + helper.
 */

type FieldState = "default" | "error" | "success" | "loading"

function Field({
  className,
  state = "default",
  ...props
}: ComponentProps<"div"> & { state?: FieldState }) {
  return (
    <div
      data-slot="field"
      data-state={state}
      className={cn("group/field flex min-w-0 flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  required,
  optional,
  children,
  ...props
}: ComponentProps<"label"> & { required?: boolean; optional?: boolean }) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        "flex items-center gap-1.5 text-[13px] leading-tight font-medium text-foreground",
        className
      )}
      {...props}
    >
      {children}
      {required ? <span className="text-destructive">*</span> : null}
      {optional ? (
        <span className="ml-auto font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase">
          Optional
        </span>
      ) : null}
    </label>
  )
}

const fieldControlVariants = cva(
  "flex items-stretch overflow-hidden border border-input bg-card transition-colors hover:border-border-strong focus-within:border-ring focus-within:shadow-[var(--shadow-focus)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:bg-surface-muted group-data-[state=error]/field:border-destructive group-data-[state=error]/field:bg-[color-mix(in_oklch,var(--status-danger-50)_60%,var(--card))] group-data-[state=error]/field:focus-within:shadow-[0_0_0_3px_color-mix(in_oklch,var(--destructive)_30%,transparent)] group-data-[state=success]/field:border-status-success-500 group-data-[state=success]/field:focus-within:shadow-[0_0_0_3px_color-mix(in_oklch,var(--status-success-500)_25%,transparent)]",
  {
    variants: {
      size: {
        sm: "h-8 rounded-md",
        default: "h-10 rounded-lg",
        lg: "h-12 rounded-lg",
      },
    },
    defaultVariants: { size: "default" },
  }
)

function FieldControl({
  className,
  size,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof fieldControlVariants>) {
  return (
    <div data-slot="field-control" className={cn(fieldControlVariants({ size }), className)} {...props} />
  )
}

/** Borderless input that lives inside a FieldControl. */
function FieldInput({
  className,
  mono,
  ...props
}: Omit<ComponentProps<"input">, "size"> & { mono?: boolean }) {
  return (
    <input
      data-slot="field-input"
      className={cn(
        "h-full w-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-foreground-subtle read-only:text-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-subtle",
        mono && "font-mono tracking-normal tabular-nums",
        className
      )}
      {...props}
    />
  )
}

/** Prefix / suffix block (e.g. NZ$, % p.a.) — non-tabbable, mono, surface-muted. */
function FieldAffix({
  className,
  side = "leading",
  ...props
}: ComponentProps<"span"> & { side?: "leading" | "trailing" }) {
  return (
    <span
      data-slot="field-affix"
      className={cn(
        "inline-flex shrink-0 items-center bg-surface-muted px-3 font-mono text-[13px] whitespace-nowrap text-foreground-subtle",
        side === "leading" ? "border-r border-border" : "border-l border-border",
        className
      )}
      {...props}
    />
  )
}

/** Leading/trailing icon inside the control. Pass `as="button"` for an action. */
function FieldIcon({
  className,
  side = "leading",
  as = "span",
  ...props
}: ComponentProps<"button"> & { side?: "leading" | "trailing"; as?: "span" | "button" }) {
  const Tag = as
  return (
    <Tag
      data-slot="field-icon"
      type={as === "button" ? "button" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center text-foreground-subtle [&>svg]:size-[18px]",
        side === "leading" ? "pl-3" : "pr-3",
        as === "button" &&
          "cursor-pointer text-foreground-muted transition-colors hover:text-foreground",
        className
      )}
      {...(props as ComponentProps<"button">)}
    />
  )
}

/** Helper / error / success text below the control. */
function FieldHelper({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-helper"
      className={cn(
        "flex items-start gap-1.5 text-[12.5px] leading-snug text-foreground-muted group-data-[state=error]/field:text-status-danger-700 group-data-[state=success]/field:text-status-success-700 [&>svg]:mt-px [&>svg]:size-3.5 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

export { Field, FieldLabel, FieldControl, FieldInput, FieldAffix, FieldIcon, FieldHelper }
