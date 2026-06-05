import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Anchor product card (`.tile`): art panel + kicker/title/desc + "Learn more". */
function ProductTile({
  href,
  kicker,
  title,
  description,
  image,
  className,
}: {
  href: string
  kicker: string
  title: string
  description: string
  image: { src: string; alt: string }
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/tile flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card text-inherit no-underline shadow-[var(--shadow-xs)] transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-md)] focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none",
        className
      )}
    >
      <span className="grid aspect-[3/2] place-items-center bg-surface p-3.5">
        <Image
          src={image.src}
          alt={image.alt}
          width={3000}
          height={2000}
          loading="lazy"
          sizes="(max-width: 560px) 90vw, (max-width: 920px) 45vw, 360px"
          className="h-full w-full object-contain"
        />
      </span>
      <span className="flex flex-1 flex-col gap-1.5 px-5 pt-[18px] pb-5">
        <span className="font-mono text-[10.5px] tracking-[0.05em] uppercase text-foreground-subtle">
          {kicker}
        </span>
        <span className="text-[17px] font-semibold tracking-[-0.01em] text-foreground">{title}</span>
        <span className="text-[13.5px] leading-[1.5] text-pretty text-foreground-muted">
          {description}
        </span>
        <span className="mt-auto flex items-center gap-1.5 pt-3 text-[13px] font-medium text-primary transition-[gap] group-hover/tile:gap-[9px]">
          Learn more <ArrowRightIcon className="size-[15px]" aria-hidden="true" />
        </span>
      </span>
    </Link>
  )
}

export { ProductTile }
