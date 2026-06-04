import { type ReactNode } from "react"
import {
  SearchIcon,
  SendHorizontalIcon,
  PlusIcon,
  WalletIcon,
  FileTextIcon,
  SettingsIcon,
  CornerDownLeftIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Section } from "../_components/section"
import { SubHead } from "../_components/showcase"

function Kbd({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[4px] border border-border bg-surface-sunken px-1 font-mono text-[10.5px] text-foreground-muted">
      {children}
    </span>
  )
}

function Palette({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full max-w-[560px] flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-[var(--shadow-xl)]",
        className
      )}
    >
      {children}
    </div>
  )
}

function InputRow({ value }: { value?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-[18px] py-4">
      <SearchIcon className="size-[18px] shrink-0 text-foreground-subtle" />
      <input
        type="text"
        defaultValue={value}
        placeholder="Search or jump to…"
        className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-foreground outline-none placeholder:text-foreground-subtle"
      />
      <span className="rounded-sm border border-border bg-surface px-1.5 py-0.5 font-mono text-[10.5px] text-foreground-subtle">
        ESC
      </span>
    </div>
  )
}

function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 pt-2.5 pb-1.5 font-mono text-[10px] tracking-[0.06em] text-foreground-subtle uppercase">
      {children}
    </div>
  )
}

function Item({
  icon,
  title,
  sub,
  kbd,
  active,
}: {
  icon: ReactNode
  title: string
  sub?: string
  kbd?: string[]
  active?: boolean
}) {
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-[14px] text-foreground",
        active && "bg-surface-muted shadow-[inset_0_0_0_1px_var(--border)]"
      )}
    >
      <span
        className={cn(
          "inline-flex size-5 shrink-0 items-center justify-center [&_svg]:size-5",
          active ? "text-primary" : "text-foreground-muted"
        )}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate">{title}</span>
        {sub ? <span className="truncate text-[12px] text-foreground-subtle">{sub}</span> : null}
      </span>
      {kbd?.length ? (
        <span className="ml-auto inline-flex gap-0.5">
          {kbd.map((k, i) => (
            <Kbd key={i}>{k}</Kbd>
          ))}
        </span>
      ) : null}
    </div>
  )
}

function Footer() {
  return (
    <div className="flex items-center gap-4 border-t border-border bg-surface px-4 py-2.5 text-[11.5px] text-foreground-subtle">
      <span className="inline-flex items-center gap-1.5">
        <Kbd>↑</Kbd>
        <Kbd>↓</Kbd> navigate
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Kbd>
          <CornerDownLeftIcon className="size-[11px]" />
        </Kbd>{" "}
        select
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Kbd>esc</Kbd> close
      </span>
    </div>
  )
}

export function CommandSection() {
  return (
    <Section
      id="command"
      num="Component"
      title="Command (⌘K)"
      description={
        <>
          A keyboard-first launcher that puts every action and destination one shortcut away. Power
          members hit <Kbd>⌘K</Kbd> to jump anywhere — send money, find a payee, open settings —
          without touching the mouse.
        </>
      }
    >
      <SubHead title="Trigger" hint="invites discovery in the app header" />
      <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
        <button
          type="button"
          className="inline-flex h-10 min-w-[260px] items-center gap-2.5 rounded-lg border border-border bg-surface px-3 text-[14px] text-foreground-subtle transition-colors hover:border-border-strong hover:bg-card"
        >
          <SearchIcon className="size-4 shrink-0" />
          <span className="flex-1 text-left">Search or jump to…</span>
          <span className="rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-[11px] text-foreground-muted">
            ⌘K
          </span>
        </button>
      </div>

      <SubHead title="Anatomy" hint="input · grouped results · hint footer" />
      <div
        className="grid place-items-center overflow-hidden rounded-xl border border-border px-6 py-10"
        style={{
          backgroundColor: "var(--surface)",
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--neutral-200) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      >
        <Palette>
          <InputRow />
          <div className="flex max-h-[380px] flex-col gap-0.5 overflow-y-auto p-2">
            <GroupLabel>Actions</GroupLabel>
            <Item icon={<SendHorizontalIcon />} title="Send money" kbd={["S"]} active />
            <Item icon={<PlusIcon />} title="Add a payee" kbd={["P"]} />
            <GroupLabel>Go to</GroupLabel>
            <Item icon={<WalletIcon />} title="Accounts" sub="3 accounts · $48,837.54" />
            <Item icon={<FileTextIcon />} title="Statements" />
            <Item icon={<SettingsIcon />} title="Settings" kbd={["⌘", ","]} />
          </div>
          <Footer />
        </Palette>
      </div>

      <SubHead title="Empty state" hint="offer the next best thing" />
      <div className="flex justify-center rounded-xl border border-border bg-surface p-6 md:p-8">
        <Palette className="shadow-[var(--shadow-lg)]">
          <InputRow value="xyzzy" />
          <div className="flex flex-col items-center px-4 py-10 text-center">
            <div className="mb-3 grid size-10 place-items-center rounded-full bg-surface-sunken text-foreground-subtle">
              <SearchIcon className="size-5" />
            </div>
            <h4 className="m-0 text-[14px] font-semibold text-foreground">
              No results for &ldquo;xyzzy&rdquo;
            </h4>
            <p className="m-0 mt-1 text-[12.5px] text-foreground-subtle">
              Try &ldquo;send&rdquo;, &ldquo;payee&rdquo;, or &ldquo;statement&rdquo;.
            </p>
          </div>
        </Palette>
      </div>
    </Section>
  )
}
