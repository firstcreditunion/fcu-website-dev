import { type ComponentProps, type ReactNode } from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Vertical list with a green success-circle check per row (`.checklist`). */
function Checklist({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("m-0 flex list-none flex-col gap-3 p-0", className)} {...props} />
}

function ChecklistItem({
  title,
  children,
  className,
}: {
  title: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <li
      className={cn(
        "flex items-start gap-3 text-[15px] leading-[1.5] text-foreground",
        className
      )}
    >
      <span className="mt-px grid size-[22px] shrink-0 place-items-center rounded-full bg-status-success-50 text-status-success-700 [&_svg]:size-[13px]">
        <CheckIcon strokeWidth={3} aria-hidden="true" />
      </span>
      <span>
        <b className="font-medium">{title}</b>
        {children ? (
          <small className="block text-[13px] font-normal text-foreground-muted">{children}</small>
        ) : null}
      </span>
    </li>
  )
}

export { Checklist, ChecklistItem }
