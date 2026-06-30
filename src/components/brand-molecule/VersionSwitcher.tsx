// src/components/brand-molecule/VersionSwitcher.tsx
'use client'

import { useRouter } from 'next/navigation'
import type { MoleculeVariant } from './lib/types'

const OPTIONS: { v: string; variant: MoleculeVariant; label: string }[] = [
  { v: '1', variant: 'focus', label: 'V1 · Focus' },
  { v: '2', variant: 'expand', label: 'V2 · Expand' },
  { v: '3', variant: 'tour', label: 'V3 · Auto-tour' },
]

export function VersionSwitcher({ current }: { current: MoleculeVariant }) {
  const router = useRouter()
  return (
    <div role="group" aria-label="Molecule version" className="inline-flex gap-1 rounded-lg border border-border bg-surface-muted p-1">
      {OPTIONS.map((o) => {
        const isActive = o.variant === current
        return (
          <button key={o.v} type="button" aria-pressed={isActive}
            onClick={() => router.push(`?v=${o.v}`, { scroll: false })}
            className={isActive
              ? 'rounded-md bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-[var(--shadow-xs)]'
              : 'rounded-md px-3 py-1.5 text-sm text-foreground-muted hover:text-foreground'}>
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
