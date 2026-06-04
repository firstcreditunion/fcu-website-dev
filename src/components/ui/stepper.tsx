import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type StepItem = { title: string; description?: string }
type StepState = "complete" | "active" | "disabled"

function Stepper({
  steps,
  current,
  orientation = "horizontal",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  steps: StepItem[]
  current: number
  orientation?: "horizontal" | "vertical"
}) {
  const vertical = orientation === "vertical"
  return (
    <div
      data-slot="stepper"
      className={cn("flex w-full min-w-0", vertical ? "flex-col" : "items-start", className)}
      {...props}
    >
      {steps.map((s, i) => {
        const state: StepState = i < current ? "complete" : i === current ? "active" : "disabled"
        const isLast = i === steps.length - 1
        return (
          <div
            key={s.title}
            className={cn(
              "relative flex min-w-0",
              vertical
                ? "w-full flex-row items-start gap-3 pb-6 last:pb-0"
                : "flex-1 flex-col items-center gap-2 px-1.5 text-center"
            )}
          >
            {!isLast && (
              <div
                className={cn(
                  "absolute z-0",
                  vertical
                    ? "top-8 bottom-1 left-[15px] w-0.5"
                    : "top-[15px] left-1/2 h-0.5 w-full",
                  state === "complete" ? "bg-primary" : "bg-border"
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-semibold [&_svg]:size-4",
                state === "complete"
                  ? "border-primary bg-primary text-primary-foreground"
                  : state === "active"
                    ? "border-primary bg-primary-subtle text-primary"
                    : "border-border-strong bg-card text-foreground-subtle"
              )}
            >
              {state === "complete" ? <CheckIcon /> : i + 1}
            </div>
            <div
              className={cn(
                "flex min-w-0 flex-col gap-0.5",
                vertical ? "items-start pt-1" : "items-center"
              )}
            >
              <span
                className={cn(
                  "text-[13.5px] font-semibold tracking-[-0.005em]",
                  state === "active"
                    ? "text-primary"
                    : state === "disabled"
                      ? "text-foreground-subtle"
                      : "text-foreground"
                )}
              >
                {s.title}
              </span>
              {s.description ? (
                <span
                  className={cn(
                    "text-[12px] leading-[1.45] text-pretty",
                    state === "disabled" ? "text-foreground-subtle" : "text-foreground-muted"
                  )}
                >
                  {s.description}
                </span>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { Stepper }
