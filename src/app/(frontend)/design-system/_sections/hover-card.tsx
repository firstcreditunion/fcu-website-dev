import { type ReactNode } from "react"
import { LandmarkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import { Section } from "../_components/section"
import { Demo, Note, SubHead } from "../_components/showcase"

const triggerClass =
  "cursor-pointer font-medium text-primary underline decoration-primary/40 underline-offset-[3px] outline-none transition-[text-decoration-color] hover:decoration-primary focus-visible:rounded-sm focus-visible:shadow-[var(--shadow-focus)]"

function HCAvatar({
  square,
  children,
}: {
  square?: boolean
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center bg-gradient-to-br from-fcu-primary-300 to-fcu-primary-600 text-[14px] font-semibold text-white [&_svg]:size-5",
        square ? "rounded-md from-neutral-400 to-neutral-600" : "rounded-full"
      )}
    >
      {children}
    </span>
  )
}

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div className="flex flex-col gap-px">
      <span className="font-mono text-[14px] font-semibold tracking-[-0.01em] text-foreground">
        {v}
      </span>
      <span className="text-[11px] text-foreground-subtle">{l}</span>
    </div>
  )
}

export function HoverCardSection() {
  return (
    <Section
      id="hover-card"
      num="Component"
      title="Hover card"
      description={
        <>
          A rich preview that appears when you hover (or focus) a link — a member profile, a payee
          summary, a term definition. Bigger than a Tooltip (one line), lighter than a Popover
          (click-triggered, interactive). The demos below open on hover.
        </>
      }
    >
      <SubHead title="Member preview" hint="hover the underlined name" />
      <Demo>
        <p className="m-0 max-w-[60ch] text-sm leading-[1.7] text-foreground">
          The transfer was approved by{" "}
          <HoverCard>
            <HoverCardTrigger className={triggerClass}>Mereana Te Awa</HoverCardTrigger>
            <HoverCardContent>
              <div className="flex items-start gap-3">
                <HCAvatar>MT</HCAvatar>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[14px] font-semibold tracking-[-0.008em] text-foreground">
                    Mereana Te Awa
                  </p>
                  <p className="m-0 mt-px font-mono text-[11.5px] text-foreground-subtle">
                    Member since 2018
                  </p>
                </div>
              </div>
              <p className="m-0 text-[13px] leading-[1.55] text-foreground-muted">
                Primary account holder · 3 accounts · verified identity.
              </p>
              <div className="flex gap-[18px]">
                <Stat v="$48.8k" l="Total balance" />
                <Stat v="8 yrs" l="Tenure" />
              </div>
            </HoverCardContent>
          </HoverCard>{" "}
          on 28 May, and settled within two seconds.
        </p>
      </Demo>

      <SubHead title="Term & payee preview" hint="define jargon · preview a payee" />
      <Demo>
        <div className="flex flex-col gap-5">
          <p className="m-0 max-w-[60ch] text-sm leading-[1.7] text-foreground">
            Your interest is taxed at your{" "}
            <HoverCard>
              <HoverCardTrigger className={triggerClass}>RWT</HoverCardTrigger>
              <HoverCardContent side="top" className="w-[280px]">
                <p className="m-0 text-[14px] font-semibold tracking-[-0.008em] text-foreground">
                  Resident Withholding Tax
                </p>
                <p className="m-0 text-[13px] leading-[1.55] text-foreground-muted">
                  Tax deducted from interest before it reaches you. FCU pays it to IRD automatically
                  at your declared rate (10.5%–39%).
                </p>
                <a
                  href="#"
                  className="text-[12.5px] font-medium text-primary underline-offset-2 hover:underline"
                >
                  Update your RWT rate
                </a>
              </HoverCardContent>
            </HoverCard>{" "}
            rate before it lands in your account.
          </p>

          <p className="m-0 max-w-[60ch] text-sm leading-[1.7] text-foreground">
            Last paid{" "}
            <HoverCard>
              <HoverCardTrigger className={triggerClass}>Auckland Council</HoverCardTrigger>
              <HoverCardContent>
                <div className="flex items-start gap-3">
                  <HCAvatar square>
                    <LandmarkIcon />
                  </HCAvatar>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 text-[14px] font-semibold tracking-[-0.008em] text-foreground">
                      Auckland Council · Rates
                    </p>
                    <p className="m-0 mt-px font-mono text-[11.5px] text-foreground-subtle">
                      02-1100-7842910-00
                    </p>
                  </div>
                </div>
                <p className="m-0 flex flex-wrap items-center gap-1.5 text-[13px] leading-[1.55] text-foreground-muted">
                  <span>
                    Scheduled direct debit ·{" "}
                    <strong className="font-medium text-foreground">$184.00</strong>/month.
                  </span>
                  <Badge variant="danger" dot>
                    Last failed
                  </Badge>
                </p>
              </HoverCardContent>
            </HoverCard>{" "}
            on the 1st — the last attempt failed.
          </p>
        </div>
      </Demo>

      <Note>
        <b>Hover card vs Tooltip vs Popover.</b> Tooltip = one line, no interaction. Hover card =
        rich preview, opens on hover, may contain links. Popover = opens on click, may hold
        forms / menus. Never put anything essential <i>only</i> in a hover card — touch users
        can&rsquo;t hover.
      </Note>
    </Section>
  )
}
