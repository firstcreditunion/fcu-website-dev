'use client'

import { useQuery } from '@tanstack/react-query'
import { Trash2, X, Undo2 } from 'lucide-react'
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from '@/components/ui/drawer'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchRowHistory } from '@/lib/project-hub/actions'
import { computedDurationLabel } from '@/lib/project-hub/dates'
import { humanizeRevision } from '@/lib/project-hub/diff'
import { STATUS, STATUS_ORDER, phaseColor, formatDate } from '@/lib/project-hub/hub-model'
import { type HubPayload, type PtTask, type PtRevision } from '@/lib/project-hub/types'
import { useDeleteRow, usePatchRow, useRevert } from './use-hub'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-[7px] text-[11px] font-semibold uppercase tracking-[0.05em] text-foreground-subtle">{children}</div>
}

function initialsOf(name: string | null): string {
  if (!name) return '··'
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') || '··'
}

function HistoryRow({ rev }: { rev: PtRevision }) {
  const revert = useRevert()
  const diffs = humanizeRevision(rev)
  if (diffs.length === 0) return null
  const d = diffs[0]
  const actor = rev.actor_name ?? 'System'
  const firstName = actor.split(/\s+/)[0]
  const verb = rev.action === 'insert' ? 'created this task' : d.label ? `changed ${d.label.toLowerCase()}` : 'edited'
  return (
    <div className="flex items-start gap-2.5 border-t border-[var(--border)] py-[9px] first:border-t-0">
      <span
        aria-hidden
        className="mt-px grid size-6 flex-none place-items-center rounded-full text-[9px] font-bold text-white"
        style={{ background: 'var(--color-fcu-primary-400)' }}
      >
        {initialsOf(rev.actor_name)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] text-foreground">
          <strong className="font-semibold">{firstName}</strong> {verb}
        </div>
        {d.from !== null || d.to !== null ? (
          <div className="mt-0.5 font-mono text-[11.5px] text-foreground-muted">
            <span className="line-through opacity-70">{d.from ?? '—'}</span> → <span className="text-foreground">{d.to ?? '—'}</span>
          </div>
        ) : null}
        <div className="mt-[3px] text-[10.5px] text-foreground-subtle">{formatDate(rev.created_at.slice(0, 10), 'dMMM')} · {rev.created_at.slice(11, 16)}</div>
      </div>
      {rev.action !== 'delete' ? (
        <button
          onClick={() => revert.mutate(rev.id)}
          className="inline-flex flex-none items-center gap-1 rounded-[7px] border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-[11px] font-semibold text-foreground-muted hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <Undo2 size={12} /> Revert
        </button>
      ) : null}
    </div>
  )
}

export function TaskPanel({ task, payload, onClose }: { task: PtTask | null; payload: HubPayload; onClose: () => void }) {
  const patch = usePatchRow()
  const del = useDeleteRow()
  // live row from cache so optimistic edits show immediately
  const live = task ? payload.tasks.find((t) => t.id === task.id) ?? task : null
  const history = useQuery({
    queryKey: ['project-hub', 'history', task?.id],
    queryFn: async () => {
      const res = await fetchRowHistory('pt_tasks', task!.id)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    enabled: !!task,
  })

  function commit(field: 'name' | 'start_date' | 'end_date' | 'duration_label' | 'notes', raw: string, current: string | null) {
    if (!live) return
    const value = raw.trim() === '' ? null : raw
    if (field === 'name' && !value) return // name is required
    if (value === (current ?? null)) return
    patch.mutate({ table: 'pt_tasks', id: live.id, patch: { [field]: value } })
  }

  const group = live ? payload.groups.find((g) => g.id === live.group_id) : null
  const phase = group ? payload.phases.find((p) => p.id === group.phase_id) : null
  const auto = live ? !live.duration_label : false
  const computed = live ? computedDurationLabel(live.start_date, live.end_date) : ''

  const inputCls =
    'w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 py-2 font-mono text-[13px] text-foreground focus-visible:outline-2 focus-visible:outline-ring'

  return (
    <Drawer direction="right" open={!!task} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent
        data-hub-anim
        className="flex h-full flex-col gap-0 border-l border-[var(--border)] bg-[var(--background)] p-0 shadow-[var(--shadow-xl)]"
        style={{ width: 'min(460px, 100vw)' }}
      >
        {live ? (
          <>
            {/* header */}
            <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] px-5 py-[18px]">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-foreground-subtle">
                  <span aria-hidden className="size-2 rounded-[3px]" style={{ background: phase ? phaseColor(phase.phase_number) : 'var(--neutral-400)' }} />
                  <span className="uppercase tracking-[0.04em]">{phase ? `Phase ${phase.phase_number}` : ''} · {group?.name ?? ''}</span>
                </div>
                <DrawerTitle asChild>
                  <input
                    aria-label="Task name"
                    defaultValue={live.name}
                    key={`${live.id}-name`}
                    onBlur={(e) => commit('name', e.currentTarget.value, live.name)}
                    className="-mx-1.5 w-full rounded-md border-none bg-transparent px-1.5 py-0.5 text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                  />
                </DrawerTitle>
                <DrawerDescription className="sr-only">Edit task fields and view its change history.</DrawerDescription>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid size-8 flex-none place-items-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-foreground-muted hover:bg-[var(--surface-sunken)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* status */}
              <div className="mb-5">
                <FieldLabel>Status</FieldLabel>
                <div className="flex flex-wrap gap-1.5">
                  {STATUS_ORDER.map((s) => {
                    const on = live.status === s
                    const st = STATUS[s]
                    return (
                      <button
                        key={s}
                        onClick={() => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { status: s } })}
                        aria-pressed={on}
                        className="inline-flex items-center gap-1.5 rounded-lg px-[11px] py-[7px] text-[12px]"
                        style={{
                          fontWeight: on ? 600 : 500,
                          border: `1px solid ${on ? 'transparent' : 'var(--border)'}`,
                          background: on ? st.soft : 'var(--card)',
                          color: on ? st.on : 'var(--foreground-muted)',
                          boxShadow: on ? `inset 0 0 0 1px ${st.color}` : 'none',
                        }}
                      >
                        <span
                          className="size-2 rounded-full"
                          style={s === 'not_started' ? { background: 'transparent', boxShadow: 'inset 0 0 0 2px var(--border-strong)' } : { background: st.color }}
                        />
                        {st.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* dates */}
              <div className="mb-5 flex gap-2.5">
                <div className="flex-1">
                  <FieldLabel>Start</FieldLabel>
                  <input type="date" key={`${live.id}-start`} defaultValue={live.start_date ?? ''} min="2026-01-01" max="2026-12-31"
                    onBlur={(e) => commit('start_date', e.currentTarget.value, live.start_date)} className={inputCls} />
                </div>
                <div className="flex-1">
                  <FieldLabel>End</FieldLabel>
                  <input type="date" key={`${live.id}-end`} defaultValue={live.end_date ?? ''} min="2026-01-01" max="2026-12-31"
                    onBlur={(e) => commit('end_date', e.currentTarget.value, live.end_date)} className={inputCls} />
                </div>
              </div>

              {/* duration */}
              <div className="mb-5">
                <FieldLabel>Duration</FieldLabel>
                <div className="flex items-center gap-2.5">
                  <input type="text" key={`${live.id}-dur`} defaultValue={live.duration_label ?? computed}
                    onBlur={(e) => commit('duration_label', e.currentTarget.value, live.duration_label)} className={`${inputCls} flex-1`} />
                  <span
                    className="whitespace-nowrap rounded-full border border-[var(--border)] px-[9px] py-1 text-[11px] font-medium"
                    style={{
                      color: auto ? 'var(--status-info-700)' : 'var(--foreground-subtle)',
                      background: auto ? 'var(--status-info-50)' : 'var(--surface-sunken)',
                    }}
                  >
                    {auto ? `Auto · ${computed || '—'}` : 'Override'}
                  </span>
                </div>
              </div>

              {/* notes */}
              <div className="mb-5">
                <FieldLabel>Notes</FieldLabel>
                <textarea key={`${live.id}-notes`} defaultValue={live.notes ?? ''} rows={4} placeholder="Add context, blockers, links…"
                  onBlur={(e) => commit('notes', e.currentTarget.value, live.notes)}
                  className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--card)] px-[11px] py-[9px] text-[13px] leading-[1.5] text-foreground focus-visible:outline-2 focus-visible:outline-ring" />
              </div>

              <button
                onClick={() => { del.mutate({ table: 'pt_tasks', id: live.id }); onClose() }}
                className="inline-flex items-center gap-[7px] rounded-lg border bg-[var(--card)] px-[13px] py-2 text-[12.5px] font-semibold"
                style={{ color: 'var(--status-danger-700)', borderColor: 'color-mix(in oklab, var(--status-danger-500) 35%, var(--border))' }}
              >
                <Trash2 size={15} /> Delete task
              </button>

              {/* history */}
              <div className="mt-5">
                <FieldLabel>Change history</FieldLabel>
                {history.isLoading ? <Skeleton className="h-16 w-full" /> : null}
                {history.data && history.data.length === 0 ? (
                  <p className="py-2.5 text-[12px] text-foreground-subtle">No changes recorded yet.</p>
                ) : null}
                <div>
                  {history.data?.map((rev) => <HistoryRow key={rev.id} rev={rev} />)}
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="flex items-center justify-between gap-2.5 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-3.5">
              <span className="font-mono text-[11px] text-foreground-subtle">
                {STATUS[live.status].label}
              </span>
              <button
                onClick={onClose}
                className="rounded-lg border-none bg-[var(--primary)] px-[18px] py-2 text-[12.5px] font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow-sm)] hover:bg-[var(--primary-hover)]"
              >
                Done
              </button>
            </div>
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}
