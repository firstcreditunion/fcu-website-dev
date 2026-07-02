import { Fragment, type ReactNode } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Wrap } from "./section"

type HeroMeta = { value: ReactNode; label: string }

/**
 * Two-column marketing hero (`.hero`). Left: eyebrow pill, h1, lede, actions,
 * optional 3-up meta. Right: illustration over a soft neutral blob.
 */
function Hero({
  eyebrow,
  title,
  lede,
  actions,
  meta,
  image,
  priority,
  compact,
  className,
}: {
  eyebrow: string
  title: ReactNode
  lede: ReactNode
  actions?: ReactNode
  meta?: HeroMeta[]
  image: { src: string; alt: string }
  priority?: boolean
  compact?: boolean
  className?: string
}) {
  return (
    <section className={cn("py-[clamp(40px,6vw,88px)]", compact && "pt-7", className)}>
      <Wrap>
        <div className="grid items-center gap-[clamp(24px,5vw,64px)] [grid-template-columns:1.05fr_0.95fr] max-[880px]:grid-cols-1 max-[880px]:gap-2">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--primary)_16%,transparent)] bg-primary-subtle px-3 py-[5px] font-mono text-[12px] tracking-[0.04em] uppercase text-primary">
              {eyebrow}
            </span>
            <h1 className="mt-[18px] max-w-[16ch] text-[clamp(34px,5.4vw,60px)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-foreground">
              {title}
            </h1>
            <p className="mt-[18px] max-w-[52ch] text-[clamp(16px,1.55vw,19px)] leading-[1.6] text-pretty text-foreground-muted">
              {lede}
            </p>
            {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
            {meta && meta.length > 0 ? (
              <div className="mt-[30px] flex flex-wrap gap-x-7 gap-y-5">
                {meta.map((m, i) => (
                  <div key={i} className="flex flex-col gap-px">
                    <span className="font-mono text-[22px] font-semibold tracking-[-0.02em] text-foreground tabular-nums">
                      {m.value}
                    </span>
                    <span className="text-[12.5px] text-foreground-subtle">{m.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="relative grid place-items-center">
            <span
              aria-hidden="true"
              className="absolute inset-[6%_4%] z-0 rounded-[42%_58%_56%_44%/52%_44%_56%_48%] bg-[radial-gradient(circle_at_50%_40%,var(--surface-muted),transparent_72%)]"
            />
            <Image
              src={image.src}
              alt={image.alt}
              width={3000}
              height={2000}
              priority={priority}
              sizes="(max-width: 880px) 92vw, 560px"
              className="relative z-[1] h-auto w-full max-w-[560px]"
            />
          </div>
        </div>
      </Wrap>
    </section>
  )
}

/* ────────────────────────── Hero / Full Image ──────────────────────────
 * Kit set 100:74 (approved surface, Gate 1 2026-07-02). 560px full-bleed
 * panel, rounded-2xl:
 *  - background="gradient": fcu-primary-800 → 950 panel
 *  - background="photo": cover image under the brand-950 dual scrim; with NO
 *    image the panel shows the DS placeholder treatment (surface-sunken +
 *    muted glyph) per the Isaac placeholder rule — matching the kit's own
 *    Photo-variant placeholder.
 * Optional feature slot floats a product shot right of the copy; passing
 * "placeholder" renders the kit's empty-slot look. Jump-To bar (109:6, Bar
 * style) docks under the panel.
 */

type JumpToLink = { label: string; anchor: string }

/** Anchor strip under heroes (kit "Jump To", Bar style). */
function JumpTo({ links, className }: { links: JumpToLink[]; className?: string }) {
  if (links.length === 0) return null
  return (
    <nav
      aria-label="Jump to section"
      data-slot="jump-to"
      className={cn(
        "flex w-full flex-wrap items-center gap-x-3.5 gap-y-1 rounded-xl border border-primary bg-primary-subtle px-[22px] py-[13px]",
        className,
      )}
    >
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-foreground-subtle">
        Jump to
      </span>
      {links.map((link, i) => (
        <Fragment key={link.anchor}>
          {i > 0 && (
            <span aria-hidden="true" className="text-[13px] font-medium text-foreground-subtle">
              ·
            </span>
          )}
          <a
            href={`#${link.anchor}`}
            className="text-[13px] font-medium tracking-[-0.005em] text-primary transition-colors hover:text-primary-hover"
          >
            {link.label}
          </a>
        </Fragment>
      ))}
    </nav>
  )
}

function HeroFullImage({
  eyebrow,
  title,
  lede,
  actions,
  background = "photo",
  image,
  feature,
  jumpTo,
  priority,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  /** Action buttons — callers style for the dark panel (white primary / white ghost). */
  actions?: ReactNode
  background?: "photo" | "gradient"
  /** Cover photo for background="photo"; omit to show the placeholder treatment. */
  image?: { src: string; alt: string }
  /** Right-hand product-shot slot; "placeholder" renders the kit's empty-slot look. */
  feature?: "placeholder" | { src: string; alt: string }
  jumpTo?: JumpToLink[]
  priority?: boolean
  className?: string
}) {
  const isPhoto = background === "photo"
  return (
    <div className={cn("flex w-full flex-col gap-3", className)} data-slot="hero-full-image">
      <section
        className={cn(
          "relative w-full overflow-hidden rounded-2xl",
          "min-h-[560px] max-[880px]:min-h-0 max-[880px]:py-16",
          !isPhoto &&
            "bg-[linear-gradient(159deg,var(--color-fcu-primary-800)_14.8%,var(--color-fcu-primary-950)_85.2%)]",
          isPhoto && !image && "bg-surface-sunken",
        )}
      >
        {isPhoto && (
          <>
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={priority}
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              // Placeholder treatment (Isaac rule / kit Photo-variant default)
              <span
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center"
              >
                <ImageIcon className="size-[72px] text-foreground-subtle/60" />
              </span>
            )}
            {/* Brand-950 dual scrim (kit 100:20) — keeps copy legible over any photo */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,color-mix(in_oklch,var(--color-fcu-primary-950)_45%,transparent)_100%),linear-gradient(90deg,color-mix(in_oklch,var(--color-fcu-primary-950)_92%,transparent)_0%,color-mix(in_oklch,var(--color-fcu-primary-950)_55%,transparent)_55%,color-mix(in_oklch,var(--color-fcu-primary-950)_8%,transparent)_100%)]"
            />
          </>
        )}

        {/* Content column — kit: left 120, width 620, vertically centered */}
        <div className="relative flex h-full min-h-[inherit] max-w-[740px] flex-col justify-center px-[clamp(24px,8.3vw,120px)] py-10 max-[880px]:py-0">
          {eyebrow ? (
            <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/[0.14] px-3 py-[5px] font-mono text-xs font-medium uppercase tracking-[0.04em] text-white">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-[18px] text-[clamp(34px,3.9vw,56px)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance text-white">
            {title}
          </h1>
          {lede ? (
            <p className="mt-4 max-w-[52ch] text-lg leading-[1.6] text-pretty text-white/[0.82]">
              {lede}
            </p>
          ) : null}
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {/* Feature slot — kit 100:21: right 120, 560 wide, vertically centered */}
        {feature ? (
          <div className="absolute top-1/2 right-[clamp(24px,8.3vw,120px)] hidden w-[clamp(280px,38.9vw,560px)] -translate-y-1/2 xl:block">
            {feature === "placeholder" ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-[14px] bg-white/[0.08] py-16">
                <ImageIcon className="size-14 text-white/50" aria-hidden="true" />
                <p className="font-mono text-[11px] font-medium text-white/50">
                  transparent product shot
                </p>
              </div>
            ) : (
              <Image
                src={feature.src}
                alt={feature.alt}
                width={1120}
                height={840}
                sizes="560px"
                className="h-auto w-full rounded-[14px]"
              />
            )}
          </div>
        ) : null}
      </section>

      {jumpTo && jumpTo.length > 0 ? <JumpTo links={jumpTo} /> : null}
    </div>
  )
}

export { Hero, HeroFullImage, JumpTo }
