'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function EditableText({
  value, onCommit, required = true, multiline = false, className, label,
}: {
  value: string
  onCommit: (next: string) => void
  required?: boolean
  multiline?: boolean
  className?: string
  label: string
}) {
  const [editing, setEditing] = useState(false)
  // The draft deliberately does NOT re-sync if `value` changes mid-edit (e.g. a
  // realtime refetch): clobbering in-progress typing is worse than last-write-wins,
  // which the spec accepts and the revision history preserves.
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const prevEditing = useRef(false)

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => ref.current?.focus())
    } else if (prevEditing.current) {
      // keyboard users: return focus to the display button after commit/cancel
      requestAnimationFrame(() => buttonRef.current?.focus())
    }
    prevEditing.current = editing
  }, [editing])

  function startEditing() {
    setDraft(value)
    setEditing(true)
  }

  function commit() {
    const next = draft.trim()
    setEditing(false)
    if (next === value) return
    if (!next && required) return
    onCommit(next)
  }

  if (!editing) {
    return (
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Edit ${label}`}
        onClick={startEditing}
        className={cn(
          // design inline-edit affordance: sunken bg + inset border ring on hover
          'rounded-md px-1.5 py-0.5 text-left transition-colors hover:bg-[var(--surface-sunken)] hover:shadow-[inset_0_0_0_1px_var(--border)] focus-visible:outline-2 focus-visible:outline-ring',
          !value && 'italic text-foreground-subtle',
          className,
        )}
      >
        {value || `Add ${label}…`}
      </button>
    )
  }
  const shared = {
    value: draft,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(e.target.value),
    onBlur: commit,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !multiline) { e.preventDefault(); commit() }
      if (e.key === 'Escape') { setDraft(value); setEditing(false) }
    },
    'aria-label': label,
  }
  return multiline
    ? <Textarea {...shared} ref={ref as React.Ref<HTMLTextAreaElement>} className={className} />
    : <Input {...shared} ref={ref as React.Ref<HTMLInputElement>} size="sm" className={className} />
}
