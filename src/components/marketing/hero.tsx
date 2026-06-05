import { type ReactNode } from "react"
import Image from "next/image"

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

export { Hero }
