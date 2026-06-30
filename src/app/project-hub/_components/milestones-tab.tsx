'use client'

import { Check, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate, daysBetween, localTodayIso, goLiveIso, milestoneState } from '@/lib/project-hub/hub-model'
import type { HubPayload } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { useCreateRow, usePatchRow } from './use-hub'

const STATUS_PILL = {
  achieved: 'bg-[var(--status-success-50)] text-[var(--status-success-700)]',
  overdue: 'bg-[var(--status-danger-50)] text-[var(--status-danger-700)]',
  goLive: 'bg-[var(--primary-subtle)] text-[var(--primary)]',
  upcoming: 'bg-[var(--surface-sunken)] text-foreground-subtle',
} as const

const STATUS_LABEL = {
  achieved: 'Achieved',
  overdue: 'Overdue',
  goLive: 'Go-live',
  upcoming: 'Upcoming',
} as const

export function MilestonesTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const today = localTodayIso()
  const goLive = goLiveIso(payload.milestones)
  const sorted = [...payload.milestones].sort((a, b) => a.date.localeCompare(b.date))
  const done = payload.milestones.filter((m) => m.achieved).length

  return (
    <div className="w-full">
      <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="m-0 text-[18px] font-semibold tracking-[-0.01em] text-foreground">Milestones</h1>
          <p className="m-0 mt-[3px] text-[12.5px] text-foreground-muted">
            {done} of {payload.milestones.length} achieved · key checkpoints to go-live
          </p>
        </div>
        <button
          type="button"
          disabled={create.isPending}
          onClick={() => create.mutate({
            table: 'pt_milestones',
            values: { date: '2026-08-31', name: 'New milestone', sort_order: payload.milestones.length },
          })}
          className="inline-flex shrink-0 cursor-pointer items-center gap-[7px] rounded-[9px] border-none bg-[var(--primary)] px-[15px] py-[9px] text-[12.5px] font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus aria-hidden size={13} />
          Add milestone
        </button>
      </div>

      <div className="max-w-[760px]">
        {sorted.map((m, i) => {
          const state = milestoneState(m, today, m.date === goLive)
          const overdue = state === 'overdue'
          const daysAway = daysBetween(today, m.date)
          const isLast = i === sorted.length - 1

          return (
            <div key={m.id} className="flex gap-4">
              <div className="flex flex-none flex-col items-center">
                <span
                  aria-hidden
                  className="grid size-[30px] flex-none place-items-center rounded-full font-mono text-xs leading-none font-bold"
                  style={
                    state === 'achieved'
                      ? { background: 'var(--status-success-500)', color: '#fff' }
                      : state === 'overdue'
                        ? {
                            background: 'var(--status-danger-50)',
                            color: 'var(--status-danger-700)',
                            boxShadow: 'inset 0 0 0 2px var(--status-danger-500)',
                          }
                        : state === 'goLive'
                          ? { background: 'var(--primary)', color: '#fff' }
                          : {
                              background: 'var(--card)',
                              color: 'var(--foreground-subtle)',
                              boxShadow: 'inset 0 0 0 2px var(--border-strong)',
                            }
                  }
                >
                  {state === 'achieved' ? (
                    <Check size={13} strokeWidth={2} aria-hidden />
                  ) : state === 'overdue' ? (
                    '!'
                  ) : state === 'goLive' ? (
                    '★'
                  ) : (
                    i + 1
                  )}
                </span>
                {!isLast ? (
                  <span
                    className="min-h-[22px] w-0.5 flex-1 rounded-sm"
                    style={{
                      background: m.achieved ? 'var(--status-success-500)' : 'var(--border)',
                      opacity: m.achieved ? 0.45 : 1,
                    }}
                  />
                ) : null}
              </div>

              <div
                className="mb-3 min-w-0 flex-1 rounded-xl border bg-[var(--card)] px-4 py-[13px] shadow-[var(--shadow-sm)]"
                style={{
                  borderColor: overdue
                    ? 'color-mix(in oklab, var(--status-danger-500) 30%, var(--border))'
                    : 'var(--border)',
                }}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold tabular-nums text-foreground">
                    {formatDate(m.date, 'full')}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-[9px] py-[3px] text-[10px] font-semibold tracking-[0.05em] whitespace-nowrap uppercase',
                      STATUS_PILL[state],
                    )}
                  >
                    {STATUS_LABEL[state]}
                  </span>
                  <span className="ml-auto text-[11px] text-foreground-subtle">
                    {m.achieved ? 'Done' : overdue ? `${Math.abs(daysAway)}d overdue` : `in ${daysAway}d`}
                  </span>
                </div>

                <EditableText
                  label="milestone name"
                  value={m.name}
                  className="-mx-1.5 block rounded-md px-1.5 py-0.5 text-[14.5px] font-semibold tracking-[-0.01em] text-foreground"
                  onCommit={(v) => patch.mutate({ table: 'pt_milestones', id: m.id, patch: { name: v } })}
                />
                <EditableText
                  label="deliverable"
                  value={m.deliverable ?? ''}
                  required={false}
                  multiline
                  className="-mx-1.5 mt-1.5 block min-h-[18px] rounded-md px-1.5 py-0.5 text-[12.5px] leading-normal text-foreground-muted"
                  onCommit={(v) => patch.mutate({ table: 'pt_milestones', id: m.id, patch: { deliverable: v || null } })}
                />

                <div className="mt-3">
                  <button
                    type="button"
                    aria-label={`${m.achieved ? 'Mark not achieved' : 'Mark achieved'}: ${m.name}`}
                    onClick={() => patch.mutate({ table: 'pt_milestones', id: m.id, patch: { achieved: !m.achieved } })}
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-[11px] py-1.5 text-xs font-semibold',
                      m.achieved
                        ? 'border-transparent bg-[var(--status-success-50)] text-[var(--status-success-700)]'
                        : 'border-[var(--border)] bg-[var(--card)] text-foreground-muted',
                    )}
                  >
                    <Check size={13} strokeWidth={2} aria-hidden />
                    {m.achieved ? 'Achieved' : 'Mark achieved'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
