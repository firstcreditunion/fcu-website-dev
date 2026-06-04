import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Testimonial — a member's words, given proper space.
 *
 * Faithful port of the FCU hand-off `marketing.css` `.testimonial` family. Keeps
 * the chrome calm so the quote does the talking. Compose from the parts below:
 *
 *   <Testimonial>
 *     <TestimonialMark />
 *     <TestimonialQuote><p>…</p></TestimonialQuote>
 *     <TestimonialAttribution>
 *       <TestimonialAvatar colorway="mint">DM</TestimonialAvatar>
 *       <TestimonialMeta>
 *         <TestimonialName>Dion Mahuika</TestimonialName>
 *         <TestimonialRole>Member since 1998</TestimonialRole>
 *       </TestimonialMeta>
 *     </TestimonialAttribution>
 *   </Testimonial>
 */

const testimonialVariants = cva(
  "relative flex min-w-0 flex-col gap-6 overflow-hidden rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-xs)]",
  {
    variants: {
      variant: {
        default: "",
        // Larger quote, gradient brand-blue background, no card border.
        featured:
          "border-transparent bg-[linear-gradient(160deg,var(--color-fcu-primary-50),var(--card)_60%)] p-[clamp(28px,4vw,48px)] [&_[data-slot=testimonial-quote]]:text-[clamp(18px,2.2vw,24px)] [&_[data-slot=testimonial-quote]]:leading-[1.5] [&_[data-slot=testimonial-mark]]:text-[96px] [&_[data-slot=testimonial-mark]]:text-fcu-primary-200",
        // No card, no border, no shadow — just the quote and attribution.
        ghost: "border-0 bg-transparent p-0 shadow-none",
        // Narrower, less padding, smaller avatar, no watermark.
        compact:
          "gap-3.5 p-5 [&_[data-slot=testimonial-quote]]:text-[14px] [&_[data-slot=testimonial-quote]]:leading-[1.55] [&_[data-slot=testimonial-avatar]]:size-9 [&_[data-slot=testimonial-avatar]]:text-[12px] [&_[data-slot=testimonial-mark]]:hidden",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Testimonial({
  className,
  variant,
  ...props
}: React.ComponentProps<"figure"> & VariantProps<typeof testimonialVariants>) {
  return (
    <figure
      data-slot="testimonial"
      className={cn(testimonialVariants({ variant }), className)}
      {...props}
    />
  )
}

/** Decorative quotation-mark watermark, top-right. */
function TestimonialMark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="testimonial-mark"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-6 right-7 font-serif text-[64px] leading-none font-bold text-primary-subtle select-none",
        className
      )}
      {...props}
    >
      &ldquo;
    </span>
  )
}

/** Star rating row — uses the FCU gold (`--brand-accent`). */
function TestimonialRating({
  className,
  value = 5,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & { value?: number }) {
  return (
    <span
      data-slot="testimonial-rating"
      aria-label={`${value} out of 5 stars`}
      className={cn("mb-2 inline-flex items-center gap-0.5 text-brand-accent", className)}
      {...props}
    >
      {Array.from({ length: value }).map((_, i) => (
        <StarIcon key={i} className="size-3.5 fill-current" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  )
}

function TestimonialQuote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      data-slot="testimonial-quote"
      className={cn(
        "relative z-[1] m-0 text-[clamp(15px,1.7vw,18px)] leading-[1.6] tracking-[-0.008em] text-pretty text-foreground",
        "[&_p]:m-0 [&_p:not(:last-child)]:mb-3",
        "[&_:is(em,strong)]:rounded-[3px] [&_:is(em,strong)]:bg-primary-subtle [&_:is(em,strong)]:px-1 [&_:is(em,strong)]:font-medium [&_:is(em,strong)]:text-foreground [&_em]:not-italic",
        className
      )}
      {...props}
    />
  )
}

function TestimonialAttribution({ className, ...props }: React.ComponentProps<"figcaption">) {
  return (
    <figcaption
      data-slot="testimonial-attribution"
      className={cn("flex min-w-0 items-center gap-3.5", className)}
      {...props}
    />
  )
}

const AVATAR_COLORWAY = {
  primary:
    "[background-image:linear-gradient(150deg,var(--color-fcu-primary-300),var(--color-fcu-primary-700))]",
  sage: "[background-image:linear-gradient(150deg,var(--color-fcu-secondary-400),var(--color-fcu-secondary-700))]",
  slate:
    "[background-image:linear-gradient(150deg,var(--color-neutral-400),var(--color-neutral-700))]",
  mint: "[background-image:linear-gradient(150deg,var(--color-fcu-mint-400),var(--color-fcu-mint-700))]",
} as const

/** Avatar — initials on a brand gradient, or an `<img>` child. */
function TestimonialAvatar({
  className,
  colorway = "primary",
  ...props
}: React.ComponentProps<"span"> & { colorway?: keyof typeof AVATAR_COLORWAY }) {
  return (
    <span
      data-slot="testimonial-avatar"
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-[14px] font-semibold tracking-[-0.01em] text-white [&_img]:size-full [&_img]:object-cover",
        AVATAR_COLORWAY[colorway],
        className
      )}
      {...props}
    />
  )
}

function TestimonialMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-meta"
      className={cn("flex min-w-0 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function TestimonialName({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="testimonial-name"
      className={cn("text-[14px] font-semibold tracking-[-0.005em] text-foreground", className)}
      {...props}
    />
  )
}

function TestimonialRole({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="testimonial-role"
      className={cn("text-[12.5px] tracking-[-0.002em] text-foreground-muted", className)}
      {...props}
    />
  )
}

/** Responsive grid for a "what members say" section (auto-fit, min 300px). */
function TestimonialGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-grid"
      className={cn(
        "grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]",
        className
      )}
      {...props}
    />
  )
}

export {
  Testimonial,
  TestimonialMark,
  TestimonialRating,
  TestimonialQuote,
  TestimonialAttribution,
  TestimonialAvatar,
  TestimonialMeta,
  TestimonialName,
  TestimonialRole,
  TestimonialGrid,
  testimonialVariants,
}
