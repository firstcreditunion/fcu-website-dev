'use client'

import { Check } from 'lucide-react'
import type { HubPayload } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { usePatchRow } from './use-hub'

export function DeliverablesTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const done = payload.deliverables.filter((d) => d.done).length
  const total = payload.deliverables.length
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="m-0 text-[18px] font-semibold tracking-[-0.01em] text-foreground">Deliverables</h1>
          <p className="m-0 mt-[3px] text-[12.5px] text-foreground-muted">
            {done} of {total} complete · scope checklist
          </p>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow-sm)] sm:px-[18px] sm:py-4">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground-muted">Completion</span>
          <span className="font-mono text-[13px] font-semibold text-status-success-700">{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
          <div
            className="h-full rounded-full bg-[var(--status-success-500)] transition-[width] duration-[.35s] ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
        {payload.deliverables.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-[13px] border-t border-[var(--border)] px-[18px] py-[13px]"
          >
            <button
              type="button"
              aria-label={`${d.done ? 'Mark incomplete' : 'Mark complete'}: ${d.description}`}
              aria-pressed={d.done}
              onClick={() => patch.mutate({ table: 'pt_deliverables', id: d.id, patch: { done: !d.done } })}
              className="grid size-5 flex-none cursor-pointer place-items-center rounded-[6px] border-0 p-0 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              style={
                d.done
                  ? { background: 'var(--status-success-500)' }
                  : { background: 'var(--card)', boxShadow: 'inset 0 0 0 2px var(--border-strong)' }
              }
            >
              {d.done ? <Check size={13} strokeWidth={2} aria-hidden /> : null}
            </button>
            <EditableText
              label="deliverable"
              value={d.description}
              className={`-mx-1.5 flex-1 rounded-[5px] px-1.5 py-0.5 text-left text-[13.5px] ${d.done ? 'text-foreground-subtle line-through' : 'text-foreground'}`}
              onCommit={(v) => patch.mutate({ table: 'pt_deliverables', id: d.id, patch: { description: v } })}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
