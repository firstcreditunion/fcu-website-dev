import { type ReactNode } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * Two-column illustration + content (`.split`). `reverse` puts the art on the
 * right (desktop) while keeping it on top when stacked below 880px.
 */
function Split({
  image,
  reverse,
  blob,
  children,
  className,
}: {
  image: { src: string; alt: string }
  reverse?: boolean
  /** Render the illustration over a soft neutral radial "blob" (hero-art treatment). */
  blob?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 items-center gap-[clamp(24px,5vw,64px)] max-[880px]:grid-cols-1",
        className
      )}
    >
      <div
        className={cn(
          "relative grid place-items-center",
          reverse && "order-2 max-[880px]:order-none"
        )}
      >
        {blob ? (
          <span
            aria-hidden="true"
            className="absolute inset-[6%_4%] z-0 rounded-[42%_58%_56%_44%/52%_44%_56%_48%] bg-[radial-gradient(circle_at_50%_40%,var(--surface-muted),transparent_72%)]"
          />
        ) : null}
        <Image
          src={image.src}
          alt={image.alt}
          width={3000}
          height={2000}
          loading="lazy"
          sizes="(max-width: 880px) 90vw, 480px"
          className={cn("h-auto w-full max-w-[480px]", blob && "relative z-[1]")}
        />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export { Split }
