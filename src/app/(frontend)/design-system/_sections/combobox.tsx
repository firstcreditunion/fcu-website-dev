import { type ReactNode } from "react"
import { SearchIcon, ChevronDownIcon, CheckIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Section } from "../_components/section"
import { Demo, Note, SubHead } from "../_components/showcase"

function DemoCol({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <div className="flex min-w-[280px] max-w-[380px] flex-1 flex-col gap-3">
      <span className="font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase">
        {tag}
      </span>
      {children}
    </div>
  )
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block text-[13px] font-medium text-foreground">{children}</span>
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-popover shadow-[var(--shadow-lg)]">
      {children}
    </div>
  )
}

function ComboSearch({ value, placeholder }: { value?: string; placeholder: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
      <SearchIcon className="size-4 shrink-0 text-foreground-subtle" />
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-subtle"
      />
    </div>
  )
}

function ComboOption({
  flag,
  title,
  sub,
  selected,
  active,
}: {
  flag?: ReactNode
  title: string
  sub?: string
  selected?: boolean
  active?: boolean
}) {
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-[13.5px] text-foreground",
        active && "bg-surface-muted",
        selected && "bg-primary-subtle"
      )}
    >
      {flag ? (
        <span className="inline-flex h-4 w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-border bg-surface-sunken text-[11px]">
          {flag}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col gap-px">
        <span className="truncate">{title}</span>
        {sub ? <span className="truncate font-mono text-[11px] text-foreground-subtle">{sub}</span> : null}
      </span>
      <CheckIcon className={cn("size-4 shrink-0 text-primary", selected ? "visible" : "invisible")} />
    </div>
  )
}

function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-2.5 pt-2 pb-1 font-mono text-[10px] tracking-[0.06em] text-foreground-subtle uppercase">
      {children}
    </div>
  )
}

function List({ children }: { children: ReactNode }) {
  return <div className="flex max-h-[280px] flex-col gap-px overflow-y-auto p-1.5">{children}</div>
}

function ClosedField({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-10 cursor-pointer items-center justify-between gap-2 rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground">
      {children}
      <ChevronDownIcon className="size-4 shrink-0 text-foreground-muted" />
    </div>
  )
}

function Token({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-[22px] items-center gap-1 rounded-md border border-primary/20 bg-primary-subtle pr-1 pl-2 text-[12px] font-medium text-primary">
      {children}
      <button type="button" aria-label="Remove" className="inline-flex size-4 items-center justify-center rounded-[3px] opacity-70 hover:opacity-100 [&_svg]:size-[11px]">
        <XIcon />
      </button>
    </span>
  )
}

export function ComboboxSection() {
  return (
    <Section
      id="combobox"
      num="Component"
      title="Combobox"
      description={
        <>
          A Select you can type into. Reach for it the moment a list grows past what&rsquo;s
          comfortable to scroll — countries, payees, branches. The search filters as you type; the
          keyboard drives selection. Single-select by default, multi-select when a filter needs
          several values.
        </>
      }
    >
      <SubHead title="Single-select" hint="closed looks like a Select · open reveals search" />
      <Demo>
        <div className="flex flex-wrap gap-8">
          <DemoCol tag="Closed">
            <div>
              <FieldLabel>Country</FieldLabel>
              <ClosedField>New Zealand</ClosedField>
            </div>
          </DemoCol>
          <DemoCol tag='Open · filtered by "a"'>
            <Panel>
              <ComboSearch value="a" placeholder="Search countries" />
              <List>
                <ComboOption flag="🇳🇿" title="New Zealand" selected />
                <ComboOption flag="🇦🇺" title="Australia" active />
                <ComboOption flag="🇼🇸" title="Samoa" />
                <ComboOption flag="🇨🇰" title="Cook Islands" />
              </List>
            </Panel>
          </DemoCol>
        </div>
      </Demo>

      <SubHead title="Rich options & groups" hint="two-line rows · grouped" />
      <Demo>
        <div className="flex flex-wrap gap-8">
          <DemoCol tag="Payee picker · grouped">
            <Panel>
              <ComboSearch placeholder="Search payees" />
              <List>
                <GroupLabel>Recent</GroupLabel>
                <ComboOption title="Sarah Chen" sub="06-0145-0987654-00 · ANZ" selected />
                <ComboOption title="Auckland Council · Rates" sub="02-1100-7842910-00" active />
                <GroupLabel>All payees</GroupLabel>
                <ComboOption title="Dion Mahuika" sub="12-3401-1198400-00 · FCU" />
                <ComboOption title="Vector Energy" sub="03-0518-0044721-00" />
              </List>
            </Panel>
          </DemoCol>
          <DemoCol tag="Empty state · no matches">
            <Panel>
              <ComboSearch value="zxcv" placeholder="Search payees" />
              <div className="flex flex-col items-center gap-2 px-4 py-7 text-center text-[13px] text-foreground-subtle">
                No payees match &ldquo;zxcv&rdquo;.
                <Button variant="link" size="sm" className="h-auto px-0">
                  Add a new payee
                </Button>
              </div>
            </Panel>
          </DemoCol>
        </div>
      </Demo>

      <SubHead title="Multi-select" hint="selected values become removable tokens" />
      <Demo>
        <div className="flex flex-wrap gap-8">
          <DemoCol tag="Closed · 2 selected">
            <div>
              <FieldLabel>Filter by account</FieldLabel>
              <ClosedField>
                <span className="flex flex-wrap items-center gap-1">
                  <Token>Everyday</Token>
                  <Token>Saver</Token>
                </span>
              </ClosedField>
            </div>
          </DemoCol>
          <DemoCol tag="Open">
            <Panel>
              <ComboSearch placeholder="Search accounts" />
              <List>
                <ComboOption title="Everyday" sub="ending 567 · $4,182.14" selected />
                <ComboOption title="Saver" sub="ending 244 · $28,450.00" selected />
                <ComboOption title="Holiday fund" sub="ending 170 · $1,205.40" />
                <ComboOption title="Term deposit" sub="ending 234 · $15,000.00" />
              </List>
            </Panel>
          </DemoCol>
        </div>
      </Demo>

      <Note>
        <b>Combobox vs Select.</b> Use a native Select for ≤ 7 short options — it&rsquo;s faster and
        better on mobile. Reach for Combobox when the list is long, searchable, needs rich rows, or
        supports multiple values.
      </Note>
    </Section>
  )
}
