import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

/** Icon chip + title + paragraph (`.feature`). Icon stays FCU-blue on a subtle chip. */
function FeatureItem({
  icon,
  title,
  children,
  className,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <span className="mb-1 grid size-[42px] place-items-center rounded-lg bg-primary-subtle text-primary [&_svg]:size-[21px]">
        {icon}
      </span>
      <h3 className="m-0 text-[16px] font-semibold tracking-[-0.008em] text-foreground">{title}</h3>
      <p className="m-0 text-[14px] leading-[1.55] text-pretty text-foreground-muted">{children}</p>
    </div>
  )
}

export { FeatureItem }
