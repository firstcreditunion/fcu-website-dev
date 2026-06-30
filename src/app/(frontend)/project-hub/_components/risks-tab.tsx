'use client'

import { Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IMPACT, IMPACT_ORDER } from '@/lib/project-hub/hub-model'
import type { HubPayload, PtRiskImpact } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { useCreateRow, useDeleteRow, usePatchRow } from './use-hub'

const IMPACT_RANK: Record<PtRiskImpact, number> = { high: 0, medium: 1, low: 2 }

export function RisksTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const del = useDeleteRow()

  const sorted = [...payload.risks].sort((a, b) => IMPACT_RANK[a.impact] - IMPACT_RANK[b.impact])
  const counts = { high: 0, medium: 0, low: 0 }
  for (const r of payload.risks) counts[r.impact]++

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="m-0 text-[18px] font-semibold tracking-[-0.01em] text-foreground">Risk register</h1>
          <p className="mt-[3px] text-[12.5px] text-foreground-muted">
            Set impact inline · {payload.risks.length} tracked risks with mitigations
          </p>
        </div>
        <button
          type="button"
          disabled={create.isPending}
          onClick={() =>
            create.mutate({ table: 'pt_risks', values: { risk: 'New risk', sort_order: payload.risks.length } })}
          className="inline-flex shrink-0 cursor-pointer items-center gap-[7px] rounded-[9px] border-none bg-[var(--primary)] px-[15px] py-[9px] text-[12.5px] font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus aria-hidden size={13} />
          Add risk
        </button>
      </div>

      <div className="mb-4 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
        {(['high', 'medium', 'low'] as const).map((lv) => (
          <div
            key={lv}
            className="flex flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-[13px] shadow-[var(--shadow-sm)]"
            style={{ borderTop: `3px solid ${IMPACT[lv].color}` }}
          >
            <span className="font-mono text-[26px] font-semibold leading-none tabular-nums text-foreground">
              {counts[lv]}
            </span>
            <span className="text-[11.5px] font-medium text-foreground-muted">
              {lv === 'high' ? 'High impact' : lv === 'medium' ? 'Medium' : 'Low'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {sorted.map((r) => (
          <div
            key={r.id}
            className="rounded-[13px] border border-[var(--border)] bg-[var(--card)] px-[17px] py-[15px] shadow-[var(--shadow-sm)]"
          >
            <div className="mb-[11px] flex flex-wrap items-center gap-3">
              <div
                role="group"
                aria-label="Impact level"
                className="inline-flex flex-none overflow-hidden rounded-lg border border-[var(--border)]"
              >
                {IMPACT_ORDER.map((lv) => {
                  const on = r.impact === lv
                  const im = IMPACT[lv]
                  return (
                    <button
                      key={lv}
                      type="button"
                      aria-pressed={on}
                      onClick={() => patch.mutate({ table: 'pt_risks', id: r.id, patch: { impact: lv } })}
                      className={cn(
                        'cursor-pointer border-none px-3 py-[5px] text-[11.5px]',
                        lv !== 'high' && 'border-r border-[var(--border)]',
                      )}
                      style={{
                        fontWeight: on ? 600 : 500,
                        background: on ? im.soft : 'var(--card)',
                        color: on ? im.on : 'var(--foreground-subtle)',
                      }}
                    >
                      {im.label}
                    </button>
                  )
                })}
              </div>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.05em] text-foreground-subtle">
                Impact
              </span>
              <button
                type="button"
                aria-label="Remove risk"
                title="Remove risk"
                onClick={() => del.mutate({ table: 'pt_risks', id: r.id })}
                className="ml-auto grid size-7 flex-none cursor-pointer place-items-center rounded-[7px] border border-[var(--border)] bg-[var(--card)] text-foreground-subtle transition-colors hover:border-[color-mix(in_oklab,var(--status-danger-500)_40%,var(--border))] hover:text-[var(--status-danger-700)]"
              >
                <Trash2 aria-hidden size={15} />
              </button>
            </div>
            <EditableText
              label="risk"
              value={r.risk}
              multiline
              className="text-[14px] font-semibold leading-[1.4] text-foreground"
              onCommit={(v) => patch.mutate({ table: 'pt_risks', id: r.id, patch: { risk: v } })}
            />
            <div className="mb-[5px] mt-3 text-[10.5px] font-semibold uppercase tracking-[0.05em] text-foreground-subtle">
              Mitigation
            </div>
            <EditableText
              label="mitigation"
              value={r.mitigation}
              required={false}
              multiline
              className="text-[12.5px] leading-[1.55] text-foreground-muted"
              onCommit={(v) => patch.mutate({ table: 'pt_risks', id: r.id, patch: { mitigation: v } })}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
