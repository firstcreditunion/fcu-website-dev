'use client'

import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { barGeometry, computedDurationLabel, monthTicks, todayPct } from '@/lib/project-hub/dates'
import { STATUS_LABELS, TASK_STATUSES, type HubPayload, type PtTask, type PtTaskStatus } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { useCreateRow, usePatchRow } from './use-hub'

const STATUS_PIP: Record<PtTaskStatus, string> = {
  not_started: 'border-2 border-border-strong bg-transparent',
  in_progress: 'bg-primary',
  complete: 'bg-status-success-500',
  blocked: 'bg-status-danger-500',
  na: 'bg-border-strong',
}
const STATUS_BAR: Record<PtTaskStatus, string> = {
  not_started: 'opacity-35',
  in_progress: 'opacity-90',
  complete: 'opacity-70 saturate-50',
  blocked: 'opacity-90 ring-2 ring-status-danger-500',
  na: 'opacity-25',
}

function phaseColor(token: string): string {
  return `var(--color-${token}, var(--${token}))`
}

export function TimelineTab({ payload, onOpenTask }: { payload: HubPayload; onOpenTask: (task: PtTask) => void }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const ticks = useMemo(() => monthTicks(), [])
  const today = todayPct(format(new Date(), 'yyyy-MM-dd'))

  function cycleStatus(t: PtTask) {
    const next = TASK_STATUSES[(TASK_STATUSES.indexOf(t.status) + 1) % TASK_STATUSES.length]
    patch.mutate({ table: 'pt_tasks', id: t.id, patch: { status: next } })
  }
  function togglePhase(id: string) {
    setCollapsed((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  // NAME_COL width classes — must match the overlay left offset below
  const NAME_COL = 'w-[260px] min-w-[260px] sm:w-[300px] sm:min-w-[300px]'

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[860px]">
        {/* month header */}
        <div className="flex border-b border-border text-xs text-foreground-muted">
          <div className={cn(NAME_COL, 'py-2 pr-2 font-medium')}>Phase / task</div>
          {/* Chart header: milestone diamonds + month ticks */}
          <div className="relative h-8 flex-1">
            {ticks.map((t) => (
              <span key={t.label} className="absolute top-2 border-l border-border pl-1" style={{ left: `${t.leftPct}%` }}>
                {t.label}
              </span>
            ))}
            {/* Milestone diamonds overlay — positioned relative to the chart column */}
            {payload.milestones.map((m) => (
              <Tooltip key={m.id}>
                <TooltipTrigger
                  className="absolute top-0.5 -translate-x-1/2 text-[10px]"
                  style={{ left: `${barGeometry(m.date, m.date)?.leftPct ?? 0}%` }}
                  aria-label={`Milestone: ${m.name}, ${m.date}`}
                >
                  <span aria-hidden className={m.achieved ? 'text-status-success-700' : 'text-foreground-subtle'}>◆</span>
                </TooltipTrigger>
                <TooltipContent>{m.name} — {format(new Date(m.date), 'd MMM')}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* rows + today line */}
        <div className="relative">
          {/*
            Today-line overlay: spans only the chart column (right of NAME_COL).
            Uses left-[260px] below sm and left-[300px] at sm+, matching NAME_COL widths.
            The vertical line is positioned at `left: ${today}%` inside this overlay
            so its percentage is relative to the chart column width, not the full row.
          */}
          {today !== null ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 left-[260px] sm:left-[300px]"
            >
              <div
                className="absolute inset-y-0 w-0.5 bg-status-danger-500"
                style={{ left: `${today}%` }}
              />
            </div>
          ) : null}

          {payload.phases.map((ph) => {
            const groups = payload.groups.filter((g) => g.phase_id === ph.id)
            const phaseTasks = payload.tasks.filter((t) => groups.some((g) => g.id === t.group_id))
            const done = phaseTasks.filter((t) => t.status === 'complete').length
            const phaseBar = barGeometry(ph.start_date, ph.end_date)
            const isCollapsed = collapsed.has(ph.id)
            return (
              <div key={ph.id}>
                <div className="flex items-center border-b border-border bg-surface-muted">
                  <div className={cn(NAME_COL, 'flex items-center gap-1 py-1.5 pr-2')}>
                    <Button variant="ghost" size="icon-xs" aria-expanded={!isCollapsed}
                      aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} phase ${ph.phase_number}`}
                      onClick={() => togglePhase(ph.id)}>
                      {isCollapsed ? <ChevronRight /> : <ChevronDown />}
                    </Button>
                    <span className="truncate text-sm font-medium text-foreground">
                      Phase {ph.phase_number} — {ph.name}
                    </span>
                    <span className="ml-auto text-xs tabular-nums text-foreground-muted">{done}/{phaseTasks.length}</span>
                  </div>
                  <div className="relative h-9 flex-1">
                    {phaseBar ? (
                      <div aria-hidden className="absolute top-3 h-2.5 rounded-full opacity-50"
                        style={{ left: `${phaseBar.leftPct}%`, width: `${phaseBar.widthPct}%`, background: phaseColor(ph.color_token) }} />
                    ) : null}
                  </div>
                </div>
                {!isCollapsed && groups.map((g) => {
                  const tasks = payload.tasks.filter((t) => t.group_id === g.id)
                  return (
                    <div key={g.id}>
                      <div className="flex items-center border-b border-border/60">
                        <div className={cn(NAME_COL, 'flex items-baseline gap-2 py-1 pl-8 pr-2')}>
                          <EditableText label="group name" value={g.name} className="text-xs font-medium text-foreground-muted"
                            onCommit={(v) => patch.mutate({ table: 'pt_task_groups', id: g.id, patch: { name: v } })} />
                          <Button variant="ghost" size="icon-xs" aria-label={`Add task to ${g.name}`}
                            disabled={create.isPending}
                            onClick={() => create.mutate({ table: 'pt_tasks', values: { group_id: g.id, name: 'New task', sort_order: tasks.length } })}>
                            <Plus />
                          </Button>
                        </div>
                        <div className="flex-1" />
                      </div>
                      {tasks.map((t) => {
                        const bar = barGeometry(t.start_date, t.end_date)
                        const duration = t.duration_label ?? computedDurationLabel(t.start_date, t.end_date)
                        return (
                          <div key={t.id} className="group flex items-center border-b border-border/40 hover:bg-surface-muted/60">
                            <div className={cn(NAME_COL, 'flex items-center gap-2 py-1 pl-10 pr-2')}>
                              <button
                                type="button"
                                aria-label={`Status: ${STATUS_LABELS[t.status]}. Click to change.`}
                                title={STATUS_LABELS[t.status]}
                                onClick={() => cycleStatus(t)}
                                className={cn('size-2.5 shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-ring', STATUS_PIP[t.status])}
                              />
                              <button
                                type="button"
                                onClick={() => onOpenTask(t)}
                                className="truncate text-left text-sm text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                              >
                                {t.name}
                              </button>
                            </div>
                            <div className="relative h-8 flex-1">
                              {bar ? (
                                <button
                                  type="button"
                                  aria-label={`${t.name}: ${t.start_date} to ${t.end_date}${duration ? `, ${duration}` : ''}`}
                                  onClick={() => onOpenTask(t)}
                                  className={cn('absolute top-2.5 h-3 rounded-full focus-visible:outline-2 focus-visible:outline-ring', STATUS_BAR[t.status])}
                                  style={{ left: `${bar.leftPct}%`, width: `${bar.widthPct}%`, background: phaseColor(ph.color_token) }}
                                />
                              ) : (
                                <span className="absolute left-1 top-1.5 text-xs italic text-foreground-subtle">no dates</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* legend */}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-foreground-muted">
          {(TASK_STATUSES as readonly PtTaskStatus[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span aria-hidden className={cn('size-2.5 rounded-full', STATUS_PIP[s])} />
              {STATUS_LABELS[s]}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-3 w-0.5 bg-status-danger-500" /> today
          </span>
          <span>◆ milestone</span>
        </div>
      </div>
    </div>
  )
}
