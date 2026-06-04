import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * CTA banner — the full-width "do something next" block.
 *
 * Faithful port of the FCU hand-off `marketing.css` `.cta` family. One title,
 * one supporting line, one primary action — never a menu of competing choices.
 *
 * Two composable axes, mirroring the hand-off's class composition
 * (`.cta--primary.cta--centered`, `.cta--slim.cta--subtle`):
 *   - `tone`   — surface treatment: default · primary · subtle
 *   - `layout` — structure: default · split · slim · centered
 *
 *   <Cta tone="primary">
 *     <CtaContent>
 *       <CtaEyebrow>Members earn more</CtaEyebrow>
 *       <CtaTitle>Earn 4.85% p.a. on your first $10,000.</CtaTitle>
 *       <CtaMessage>No teaser rates, no fees.</CtaMessage>
 *     </CtaContent>
 *     <CtaActions>
 *       <Button variant="ghost">Read the disclosure</Button>
 *       <Button>Open a Saver <ArrowRightIcon /></Button>
 *     </CtaActions>
 *   </Cta>
 */

const ctaVariants = cva(
  "relative flex flex-wrap items-center justify-between gap-[clamp(20px,4vw,40px)] overflow-hidden rounded-xl border border-border bg-card p-[clamp(28px,4vw,48px)] shadow-[var(--shadow-sm)]",
  {
    variants: {
      tone: {
        default: "",
        // Filled brand gradient — white text, white-pill primary button, gold glow.
        primary: [
          "border-transparent text-white shadow-[var(--shadow-lg)]",
          "bg-[linear-gradient(135deg,var(--color-fcu-primary-800),var(--color-fcu-primary-950))]",
          // Decorative secondary-gold glow, top-right.
          "after:pointer-events-none after:absolute after:-top-20 after:-right-20 after:size-80 after:rounded-full after:bg-[radial-gradient(circle,var(--color-fcu-secondary-500),transparent_65%)] after:opacity-20 after:content-['']",
          // Invert content typography.
          "[&_[data-slot=cta-eyebrow]]:text-[oklch(95%_0.04_220_/_0.7)] [&_[data-slot=cta-title]]:text-white [&_[data-slot=cta-message]]:text-[oklch(95%_0.04_220_/_0.78)]",
          // Invert the filled action to a white pill…
          "[&_[data-slot=button][data-variant=default]]:border-transparent [&_[data-slot=button][data-variant=default]]:bg-white [&_[data-slot=button][data-variant=default]]:text-fcu-primary-900 [&_[data-slot=button][data-variant=default]]:hover:bg-[oklch(96%_0.02_220)]",
          // …and the ghost action to white text.
          "[&_[data-slot=button][data-variant=ghost]]:text-white [&_[data-slot=button][data-variant=ghost]]:hover:bg-[oklch(100%_0_0_/_0.12)] [&_[data-slot=button][data-variant=ghost]]:hover:text-white",
        ],
        // Tinted primary-subtle background — secondary CTAs further down the page.
        subtle:
          "border-[color-mix(in_oklch,var(--primary)_15%,transparent)] bg-primary-subtle",
      },
      layout: {
        default: "",
        // Two-column with imagery (message left, hero image right).
        split: [
          "grid grid-cols-[1.1fr_0.9fr] items-stretch gap-0 p-0",
          "[&_[data-slot=cta-content]]:self-center [&_[data-slot=cta-content]]:p-[clamp(28px,4vw,48px)]",
          "[&_[data-slot=cta-actions]]:px-[clamp(28px,4vw,48px)] [&_[data-slot=cta-actions]]:pb-[clamp(28px,4vw,48px)]",
          "max-[760px]:grid-cols-1",
        ],
        // Inline / in-card — footer CTAs, sidebar invitations.
        slim: "gap-4 px-5 py-4 shadow-[var(--shadow-xs)] [&_[data-slot=cta-title]]:text-[15px] [&_[data-slot=cta-title]]:font-medium [&_[data-slot=cta-message]]:text-[13px]",
        // End-of-page hero close — vertical stack, centred type.
        centered:
          "flex-col px-[clamp(24px,4vw,48px)] py-[clamp(40px,6vw,72px)] text-center [&_[data-slot=cta-content]]:max-w-[60ch] [&_[data-slot=cta-content]]:items-center [&_[data-slot=cta-message]]:mx-auto",
      },
    },
    defaultVariants: { tone: "default", layout: "default" },
  }
)

function Cta({
  className,
  tone,
  layout,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof ctaVariants>) {
  return (
    <section
      data-slot="cta"
      className={cn(ctaVariants({ tone, layout }), className)}
      {...props}
    />
  )
}

function CtaContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="cta-content"
      className={cn("flex min-w-0 flex-[1_1_320px] flex-col gap-2", className)}
      {...props}
    />
  )
}

function CtaEyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="cta-eyebrow"
      className={cn(
        "m-0 font-mono text-[11px] tracking-[0.06em] uppercase text-foreground-subtle",
        className
      )}
      {...props}
    />
  )
}

function CtaTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="cta-title"
      className={cn(
        "m-0 text-[clamp(20px,2.4vw,30px)] leading-[1.15] font-semibold tracking-[-0.022em] text-balance text-foreground",
        className
      )}
      {...props}
    />
  )
}

function CtaMessage({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="cta-message"
      className={cn(
        "m-0 max-w-[56ch] text-[clamp(14px,1.3vw,16px)] leading-[1.55] text-pretty text-foreground-muted",
        className
      )}
      {...props}
    />
  )
}

function CtaActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="cta-actions"
      className={cn("inline-flex shrink-0 flex-wrap items-center gap-2.5", className)}
      {...props}
    />
  )
}

/** The image column for the `split` layout (stacks above the text below 760px). */
function CtaImage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="cta-image"
      className={cn(
        "relative grid min-h-60 place-items-center overflow-hidden bg-surface-sunken max-[760px]:order-first max-[760px]:aspect-[16/9] max-[760px]:min-h-[180px]",
        className
      )}
      {...props}
    />
  )
}

/** Gradient placeholder for a hero image inside CtaImage. */
function CtaImagePlaceholder({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid size-full place-items-center bg-[linear-gradient(135deg,var(--color-fcu-primary-100),var(--color-fcu-primary-300))] font-mono text-[11px] tracking-[0.04em] text-fcu-primary-900",
        className
      )}
      {...props}
    />
  )
}

export {
  Cta,
  CtaContent,
  CtaEyebrow,
  CtaTitle,
  CtaMessage,
  CtaActions,
  CtaImage,
  CtaImagePlaceholder,
  ctaVariants,
}
