"use client"

import * as React from "react"
import { StarIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ratingVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      sm: "gap-0.5 [&_svg]:size-4",
      default: "gap-[3px] [&_svg]:size-[22px]",
      lg: "gap-1 [&_svg]:size-[30px]",
    },
  },
  defaultVariants: { size: "default" },
})

function Rating({
  value = 0,
  max = 5,
  size,
  readOnly = false,
  onValueChange,
  className,
  ...props
}: {
  value?: number
  max?: number
  readOnly?: boolean
  onValueChange?: (value: number) => void
} & VariantProps<typeof ratingVariants> &
  Omit<React.ComponentProps<"div">, "onChange">) {
  const [hover, setHover] = React.useState<number | null>(null)
  const display = hover ?? value
  const stars = Array.from({ length: max }, (_, i) => i + 1)

  return (
    <div
      role={readOnly ? "img" : "radiogroup"}
      aria-label={`Rating: ${value} of ${max} stars`}
      className={cn(ratingVariants({ size }), className)}
      onMouseLeave={() => setHover(null)}
      {...props}
    >
      {stars.map((s) => {
        const filled = s <= display
        const icon = (
          <StarIcon
            className={cn("fill-current", filled ? "text-brand-accent" : "text-border-strong")}
          />
        )
        if (readOnly) {
          return (
            <span key={s} className="inline-flex">
              {icon}
            </span>
          )
        }
        return (
          <button
            key={s}
            type="button"
            aria-label={`${s} star${s > 1 ? "s" : ""}`}
            className="inline-flex cursor-pointer p-0 outline-none transition-transform hover:scale-[1.15] focus-visible:scale-[1.15]"
            onMouseEnter={() => setHover(s)}
            onClick={() => onValueChange?.(s)}
          >
            {icon}
          </button>
        )
      })}
    </div>
  )
}

function RatingValue({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-2 font-mono text-[13px] text-foreground-muted [&_b]:font-semibold [&_b]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Rating, RatingValue }
