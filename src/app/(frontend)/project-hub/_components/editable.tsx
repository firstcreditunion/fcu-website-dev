'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

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
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => ref.current?.focus())
    }
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
        type="button"
        aria-label={`Edit ${label}`}
        onClick={startEditing}
        className={cn(
          'rounded-md px-1.5 py-0.5 text-left hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-ring',
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
    ? <Textarea {...shared} ref={ref as React.Ref<HTMLTextAreaElement>} rows={3} className={className} />
    : <Input {...shared} ref={ref as React.Ref<HTMLInputElement>} size="sm" className={className} />
}

export function EditableDate({
  value, onCommit, label, className,
}: {
  value: string | null
  onCommit: (next: string | null) => void
  label: string
  className?: string
}) {
  // native date input: keyboard-complete, locale-aware, zero extra deps
  return (
    <Input
      type="date"
      size="sm"
      aria-label={label}
      value={value ?? ''}
      min="2026-01-01"
      max="2026-12-31"
      onChange={(e) => onCommit(e.target.value || null)}
      className={cn('w-36 tabular-nums', className)}
    />
  )
}

export function EditableSelect<T extends string>({
  value, options, labels, onCommit, label, className,
}: {
  value: T
  options: readonly T[]
  labels: Record<T, string>
  onCommit: (next: T) => void
  label: string
  className?: string
}) {
  return (
    <Select value={value} onValueChange={(v) => v && v !== value && onCommit(v as T)}>
      <SelectTrigger size="sm" aria-label={label} className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>{labels[o]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
