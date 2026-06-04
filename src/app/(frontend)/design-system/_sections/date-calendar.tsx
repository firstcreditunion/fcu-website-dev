import { type ReactNode } from "react"
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Section } from "../_components/section"
import { Note, SubHead } from "../_components/showcase"

/* ─────────── shared month layout (May 2026, Mon-start) ─────────── */
type Pos = "lead" | "cur" | "trail"
const cells: { d: number; pos: Pos }[] = [
  { d: 28, pos: "lead" },
  { d: 29, pos: "lead" },
  { d: 30, pos: "lead" },
  ...Array.from({ length: 31 }, (_, i) => ({ d: i + 1, pos: "cur" as Pos })),
  { d: 1, pos: "trail" },
]
const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

type DState =
  | "today"
  | "selected"
  | "disabled"
  | "in-range"
  | "range-start"
  | "range-end"
  | undefined

function NavBtn({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-card text-foreground-muted transition-colors hover:border-border-strong hover:bg-surface-muted hover:text-foreground [&_svg]:size-4"
    >
      {children}
    </button>
  )
}

function DpDay({ d, muted, state }: { d: number; muted?: boolean; state?: DState }) {
  const range = state === "in-range" || state === "range-start" || state === "range-end"
  return (
    <button
      type="button"
      disabled={state === "disabled"}
      className={cn(
        "relative flex h-8 items-center justify-center font-mono text-[12.5px] text-foreground",
        !range && "rounded-sm",
        muted && "text-foreground-subtle opacity-50",
        state === "disabled" && "cursor-not-allowed text-foreground-subtle opacity-35",
        !state && !muted && "hover:bg-surface-sunken",
        state === "today" && "font-semibold text-primary",
        state === "selected" && "bg-primary font-medium text-primary-foreground",
        state === "in-range" && "bg-primary-subtle text-primary",
        state === "range-start" && "rounded-l-sm bg-primary font-medium text-primary-foreground",
        state === "range-end" && "rounded-r-sm bg-primary font-medium text-primary-foreground"
      )}
    >
      {d}
      {state === "today" && (
        <span className="absolute bottom-1 size-[3px] rounded-full bg-current" />
      )}
    </button>
  )
}

function DpHeader() {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="text-[13.5px] font-semibold text-foreground">May 2026</span>
      <div className="inline-flex gap-1">
        <NavBtn>
          <ChevronLeftIcon />
        </NavBtn>
        <NavBtn>
          <ChevronRightIcon />
        </NavBtn>
      </div>
    </div>
  )
}

function DpGrid({ state }: { state: (c: { d: number; pos: Pos }) => DState }) {
  return (
    <div className="grid grid-cols-7 gap-0.5">
      {DOW.map((d) => (
        <span
          key={d}
          className="flex h-7 items-center justify-center font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase"
        >
          {d}
        </span>
      ))}
      {cells.map((c, i) => (
        <DpDay key={i} d={c.d} muted={c.pos !== "cur"} state={state(c)} />
      ))}
    </div>
  )
}

function DpFrame({ children, width = 296 }: { children: ReactNode; width?: number }) {
  return (
    <div
      className="rounded-lg border border-border bg-popover p-3.5 shadow-[var(--shadow-lg)]"
      style={{ width }}
    >
      {children}
    </div>
  )
}

export function DatePickerSection() {
  return (
    <Section
      id="date-picker"
      num="Component"
      title="Date picker"
      description={
        <>
          A calendar in a popover for choosing a single date, a range, or a preset period — scheduled
          transfers, statement ranges, date-of-birth. Always paired with a typed input so power users
          can skip the calendar entirely.
        </>
      }
    >
      <SubHead title="Trigger" hint="a normal input · type or click" />
      <div className="flex flex-wrap gap-6 rounded-xl border border-border bg-card p-6 md:p-8">
        <div className="flex w-[240px] flex-col gap-1.5">
          <span className="text-[13px] font-medium text-foreground">Date of birth</span>
          <div className="relative">
            <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground-subtle" />
            <Input className="pl-9 font-mono" defaultValue="14 / 03 / 1989" />
          </div>
        </div>
        <div className="flex w-[280px] flex-col gap-1.5">
          <span className="text-[13px] font-medium text-foreground">Transfer date</span>
          <div className="relative">
            <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground-subtle" />
            <Input className="cursor-pointer pl-9" defaultValue="Fri 30 May 2026" readOnly />
          </div>
          <span className="text-[12.5px] text-foreground-muted">Click to pick from the calendar.</span>
        </div>
      </div>

      <SubHead title="Single date" hint="today dotted · selected filled · forward-only" />
      <div className="flex flex-wrap gap-6 rounded-xl border border-border bg-surface p-6 md:p-8">
        <DpFrame>
          <DpHeader />
          <DpGrid
            state={(c) =>
              c.pos !== "cur" ? undefined : c.d === 22 ? "selected" : c.d === 28 ? "today" : undefined
            }
          />
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <Button variant="ghost" size="sm">
              Today
            </Button>
            <Button size="sm">Apply</Button>
          </div>
        </DpFrame>
        <DpFrame>
          <div className="mb-3 font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase">
            Forward-only · past disabled
          </div>
          <DpHeader />
          <DpGrid
            state={(c) =>
              c.pos === "lead"
                ? "disabled"
                : c.pos === "trail"
                  ? undefined
                  : c.d < 28
                    ? "disabled"
                    : c.d === 28
                      ? "today"
                      : c.d === 30
                        ? "selected"
                        : undefined
            }
          />
        </DpFrame>
      </div>

      <SubHead title="Range & presets" hint="statement periods · a presets rail" />
      <div className="flex rounded-xl border border-border bg-surface p-6 md:p-8">
        <div className="flex rounded-lg border border-border bg-popover p-3.5 shadow-[var(--shadow-lg)]">
          <div className="mr-3 flex min-w-[120px] flex-col gap-0.5 border-r border-border pr-3">
            {["Today", "Yesterday", "Last 30 days", "Last 90 days", "This FY", "Custom"].map((p) => (
              <button
                key={p}
                type="button"
                className={cn(
                  "rounded-sm px-2.5 py-[7px] text-left text-[12.5px] whitespace-nowrap transition-colors",
                  p === "Last 30 days"
                    ? "bg-primary-subtle font-medium text-primary"
                    : "text-foreground-muted hover:bg-surface-sunken hover:text-foreground"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="w-[268px]">
            <DpHeader />
            <DpGrid
              state={(c) =>
                c.pos !== "cur"
                  ? undefined
                  : c.d === 1
                    ? "range-start"
                    : c.d < 28
                      ? "in-range"
                      : c.d === 28
                        ? "range-end"
                        : undefined
              }
            />
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="font-mono text-[11.5px] text-foreground-muted">
                1 – 28 May · 28 days
              </span>
              <Button size="sm">Apply</Button>
            </div>
          </div>
        </div>
      </div>

      <Note>
        <b>Always typeable.</b> A calendar is slow for a known date (a birthday twenty years ago).
        Pair every date picker with a typed <code className="font-mono text-[12px]">DD/MM/YYYY</code>{" "}
        input — the calendar is for browsing, the keyboard is for knowing.
      </Note>
    </Section>
  )
}

/* ════════════════════ CALENDAR (month view) ════════════════════ */

type CalEvent = { label: string; dir?: "in" | "out" | "muted" }
type CalCell = { d: number; muted?: boolean; today?: boolean; events?: CalEvent[]; more?: string }

const calCells: CalCell[] = [
  { d: 28, muted: true },
  { d: 29, muted: true },
  { d: 30, muted: true },
  { d: 1, events: [{ label: "Rates · $184", dir: "out" }] },
  { d: 2 },
  { d: 3 },
  { d: 4 },
  { d: 5, events: [{ label: "Salary · $3,842", dir: "in" }] },
  { d: 6 },
  { d: 7, events: [{ label: "Spark · $65", dir: "out" }] },
  { d: 8 },
  { d: 9, events: [{ label: "Saver auto · $200" }] },
  { d: 10 },
  { d: 11 },
  { d: 12 },
  { d: 13, events: [{ label: "Vector · $142", dir: "out" }] },
  { d: 14 },
  { d: 15, events: [{ label: "Salary · $3,842", dir: "in" }, { label: "Rent · $620", dir: "out" }] },
  { d: 16 },
  { d: 17 },
  { d: 18 },
  { d: 19 },
  { d: 20, events: [{ label: "Statement", dir: "muted" }] },
  { d: 21 },
  { d: 22, events: [{ label: "Sarah · $1,250", dir: "out" }] },
  { d: 23 },
  { d: 24 },
  { d: 25 },
  { d: 26 },
  { d: 27, events: [{ label: "Rates · $184", dir: "out" }] },
  {
    d: 28,
    today: true,
    events: [{ label: "Sarah · $1,250", dir: "out" }, { label: "Refund · $40", dir: "in" }],
    more: "+1 more",
  },
  { d: 29 },
  { d: 30, events: [{ label: "Saver · $500", dir: "out" }] },
  { d: 31 },
  { d: 1, muted: true },
]

function CalEventPill({ ev }: { ev: CalEvent }) {
  return (
    <span
      className={cn(
        "block truncate rounded-[4px] border-l-2 px-1.5 py-0.5 text-[11px] leading-tight",
        ev.dir === "out"
          ? "border-l-destructive bg-status-danger-50 text-status-danger-700"
          : ev.dir === "in"
            ? "border-l-status-success-500 bg-status-success-50 text-status-success-700"
            : ev.dir === "muted"
              ? "border-l-border-strong bg-surface-sunken text-foreground-muted"
              : "border-l-primary bg-primary-subtle text-primary"
      )}
    >
      {ev.label}
    </span>
  )
}

export function CalendarSection() {
  return (
    <Section
      id="calendar"
      num="Component"
      title="Calendar (month view)"
      description={
        <>
          A full month grid for visualising dated events — scheduled payments, direct-debit dates,
          statement cycles. This is the at-a-glance overview; for <i>picking</i> a date in a form,
          use the compact Date picker instead.
        </>
      }
    >
      <SubHead title="Scheduled payments" hint="green in · red out · neutral info" />
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">May 2026</span>
          <div className="inline-flex items-center gap-1">
            <NavBtn>
              <ChevronLeftIcon />
            </NavBtn>
            <Button variant="ghost" size="sm">
              Today
            </Button>
            <NavBtn>
              <ChevronRightIcon />
            </NavBtn>
          </div>
        </div>
        <div className="grid grid-cols-7">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div
              key={d}
              className="px-2 py-2.5 text-center font-mono text-[10.5px] font-medium tracking-[0.04em] text-foreground-subtle uppercase"
            >
              {d}
            </div>
          ))}
          {calCells.map((c, i) => (
            <div
              key={i}
              className={cn(
                "flex min-h-[104px] flex-col gap-1 border-r border-b border-border p-1.5 [&:nth-child(7n)]:border-r-0",
                c.muted && "bg-surface"
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full font-mono text-[12.5px] font-medium text-foreground",
                  c.muted && "text-foreground-subtle opacity-60",
                  c.today && "bg-primary text-primary-foreground"
                )}
              >
                {c.d}
              </span>
              {c.events?.map((ev, j) => (
                <CalEventPill key={j} ev={ev} />
              ))}
              {c.more ? (
                <span className="px-1.5 font-mono text-[10.5px] text-foreground-subtle">{c.more}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <SubHead title="Legend" hint="three meanings · cap at ~3 per cell" />
      <div className="flex flex-wrap items-center gap-4">
        <CalEventPill ev={{ label: "Money in", dir: "in" }} />
        <CalEventPill ev={{ label: "Money out", dir: "out" }} />
        <CalEventPill ev={{ label: "Informational", dir: "muted" }} />
      </div>

      <Note>
        <b>Calendar vs Date picker.</b> The calendar <i>shows</i> what&rsquo;s happening across a
        month — it&rsquo;s a view. The date picker <i>captures</i> a single date in a form — it&rsquo;s
        an input. Don&rsquo;t make members pick dates from this big grid; that&rsquo;s the
        picker&rsquo;s job.
      </Note>
    </Section>
  )
}
