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
  children,
  className,
}: {
  image: { src: string; alt: string }
  reverse?: boolean
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
      <div className={cn("grid place-items-center", reverse && "order-2 max-[880px]:order-none")}>
        <Image
          src={image.src}
          alt={image.alt}
          width={3000}
          height={2000}
          loading="lazy"
          sizes="(max-width: 880px) 90vw, 480px"
          className="h-auto w-full max-w-[480px]"
        />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export { Split }
