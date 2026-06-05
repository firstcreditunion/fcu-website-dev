import { type ComponentProps, type ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Centered max-width container (mirrors site.css `.wrap` / `.wrap--narrow`). */
function Wrap({
  className,
  narrow,
  ...props
}: ComponentProps<"div"> & { narrow?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[clamp(20px,5vw,48px)]",
        narrow ? "max-w-[860px]" : "max-w-[1200px]",
        className
      )}
      {...props}
    />
  )
}

const sectionVariants = cva("py-[clamp(48px,7vw,96px)]", {
  variants: {
    variant: { default: "", surface: "bg-surface", sunken: "bg-surface-muted" },
  },
  defaultVariants: { variant: "default" },
})

/** Vertically-padded page section with an inner Wrap (mirrors `.section`). */
function Section({
  className,
  variant,
  narrow,
  children,
  ...props
}: ComponentProps<"section"> & VariantProps<typeof sectionVariants> & { narrow?: boolean }) {
  return (
    <section className={cn(sectionVariants({ variant }), className)} {...props}>
      <Wrap narrow={narrow}>{children}</Wrap>
    </section>
  )
}

/** Eyebrow (with a short primary tick) + title + optional lede. (`.section-head`) */
function SectionHead({
  eyebrow,
  title,
  lede,
  center,
  className,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  center?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-[clamp(28px,4vw,48px)] max-w-[60ch]",
        center && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "m-0 mb-3 flex items-center gap-2 font-mono text-[12px] tracking-[0.05em] uppercase text-foreground-subtle",
          center
            ? "justify-center"
            : "before:h-0.5 before:w-[18px] before:rounded-[2px] before:bg-primary before:content-['']"
        )}
      >
        {eyebrow}
      </p>
      <h2 className="m-0 text-[clamp(26px,3.4vw,40px)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance text-foreground">
        {title}
      </h2>
      {lede ? (
        <p className="m-0 mt-3.5 text-[clamp(15px,1.4vw,17px)] leading-[1.6] text-pretty text-foreground-muted">
          {lede}
        </p>
      ) : null}
    </div>
  )
}

export { Wrap, Section, SectionHead, sectionVariants }
