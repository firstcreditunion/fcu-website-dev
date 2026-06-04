"use client"

import { useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { TagInput, Chip, ChipRow } from "@/components/ui/tag-input"
import { Section } from "../_components/section"
import { Demo, SubHead } from "../_components/showcase"

function DemoTag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase">
      {children}
    </span>
  )
}

function ChipAvatar({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      className={`inline-flex size-[18px] shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white ${color ?? "bg-fcu-primary-500"}`}
    >
      {children}
    </span>
  )
}

export function TagInputSection() {
  const [cats, setCats] = useState(["Groceries", "Bills", "Transport"])
  const [tags, setTags] = useState(["Auckland", "Casual"])

  return (
    <Section
      id="tag-input"
      num="Component"
      title="Tag / chip input"
      description={
        <>
          Multi-value entry where each value becomes a removable chip — transaction categories,
          saved-filter terms, payee groups. The live demo accepts Enter to add and Backspace to
          remove the last chip. Distinct from Badge (static) and Combobox tokens (picked from a
          list).
        </>
      }
    >
      <SubHead title="Live demo" hint="Enter to add · ✕ / Backspace to remove" />
      <Demo>
        <div className="flex max-w-[480px] flex-col gap-1.5">
          <span className="text-[13px] font-medium text-foreground">Categories</span>
          <TagInput value={cats} onValueChange={setCats} placeholder="Add category…" />
          <span className="text-[12.5px] text-foreground-muted">
            Press Enter to add. These tag the transaction in your history.
          </span>
        </div>
      </Demo>

      <SubHead title="Variants" hint="neutral · avatar · read-only · error" />
      <Demo>
        <div className="flex max-w-[480px] flex-col gap-2">
          <DemoTag>Neutral chips</DemoTag>
          <TagInput value={tags} onValueChange={setTags} variant="neutral" placeholder="Add a tag…" />
        </div>
      </Demo>
      <Demo>
        <div className="flex max-w-[480px] flex-col gap-2">
          <DemoTag>Avatar chips · shared with</DemoTag>
          <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border border-input bg-card px-2 py-[5px]">
            <Chip variant="primary" className="pl-1" onRemove={() => {}}>
              <ChipAvatar>SC</ChipAvatar>
              Sarah Chen
            </Chip>
            <Chip variant="primary" className="pl-1" onRemove={() => {}}>
              <ChipAvatar color="bg-fcu-secondary-600">PI</ChipAvatar>
              Pip Ihaka
            </Chip>
            <input
              placeholder="Add people…"
              className="h-[26px] min-w-20 flex-1 border-0 bg-transparent text-[14px] text-foreground outline-none placeholder:text-foreground-subtle"
            />
          </div>
        </div>
      </Demo>
      <Demo>
        <div className="flex flex-col gap-2">
          <DemoTag>Read-only · applied filters</DemoTag>
          <ChipRow>
            <Chip onRemove={() => {}}>Last 30 days</Chip>
            <Chip onRemove={() => {}}>Everyday</Chip>
            <Chip onRemove={() => {}}>Outgoing</Chip>
            <Button variant="link" size="sm" className="h-auto px-1">
              Clear all
            </Button>
          </ChipRow>
        </div>
      </Demo>
      <Demo>
        <div className="flex max-w-[480px] flex-col gap-2">
          <DemoTag>Error</DemoTag>
          <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border border-destructive bg-card px-2 py-[5px]">
            <Chip variant="primary" onRemove={() => {}}>
              savings
            </Chip>
            <input
              defaultValue="dup"
              className="h-[26px] min-w-20 flex-1 border-0 bg-transparent text-[14px] text-foreground outline-none"
            />
          </div>
          <span className="text-[12.5px] text-destructive">&ldquo;savings&rdquo; is already added.</span>
        </div>
      </Demo>
    </Section>
  )
}
