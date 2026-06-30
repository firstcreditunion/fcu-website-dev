'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { barGeometry, computedDurationLabel, monthTicks, todayPct, pct as pctOf } from '@/lib/project-hub/dates'
import {
  STATUS, STATUS_ORDER, phaseColor, taskCounts, tasksForPhase, formatDate, localTodayIso, phaseState,
} from '@/lib/project-hub/hub-model'
import type { HubPayload, PtTask, PtTaskStatus } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { useCreateRow, usePatchRow } from './use-hub'

const NAME_W = 300
const CHART_W = 1240

/** Status pip (left of the task name): cycles status on click. */
function pipStyle(status: PtTaskStatus): React.CSSProperties {
  const base: React.CSSProperties = { width: 11, height: 11, borderRadius: 999, flex: 'none', border: 'none', cursor: 'pointer', padding: 0 }
  if (status === 'not_started') return { ...base, background: 'transparent', boxShadow: 'inset 0 0 0 2px var(--border-strong)' }
  if (status === 'na') return { ...base, background: 'var(--neutral-300)' }
  return { ...base, background: STATUS[status].color }
}

/** Task bar fill treatment per status (over the phase colour). */
function barStyle(status: PtTaskStatus, color: string, geo: { leftPct: number; widthPct: number }, selected: boolean): React.CSSProperties {
  const s: React.CSSProperties = {
    position: 'absolute', left: `${geo.leftPct}%`, width: `${geo.widthPct}%`, top: '50%', transform: 'translateY(-50%)',
    height: 13, borderRadius: 7, border: 'none', cursor: 'pointer', padding: 0, boxSizing: 'border-box',
  }
  if (status === 'complete') s.background = color
  else if (status === 'in_progress') {
    s.background = color
    s.backgroundImage = 'repeating-linear-gradient(45deg, oklch(100% 0 0 / .30) 0 5px, transparent 5px 10px)'
  } else if (status === 'not_started') {
    s.background = `color-mix(in oklab, ${color} 15%, transparent)`
    s.boxShadow = `inset 0 0 0 1.5px ${color}`
  } else if (status === 'blocked') {
    s.background = color
    s.boxShadow = '0 0 0 1.5px var(--card), 0 0 0 3px var(--status-danger-500)'
  } else if (status === 'na') {
    s.background = 'transparent'
    s.boxShadow = 'inset 0 0 0 1.5px var(--neutral-300)'
    s.opacity = 0.6
  }
  if (selected) { s.outline = '2px solid var(--ring)'; s.outlineOffset = '2px' }
  return s
}

function legendDot(status: PtTaskStatus): React.CSSProperties {
  const base: React.CSSProperties = { width: 11, height: 11, borderRadius: 999, display: 'inline-block' }
  if (status === 'not_started') return { ...base, background: 'transparent', boxShadow: 'inset 0 0 0 2px var(--border-strong)' }
  if (status === 'na') return { ...base, background: 'var(--neutral-300)' }
  return { ...base, background: STATUS[status].color }
}

const ghostBtn =
  'rounded-lg border border-[var(--border)] bg-[var(--card)] px-[11px] py-1.5 text-[12px] font-medium text-foreground-muted hover:bg-[var(--surface-sunken)]'

export function TimelineTab({ payload, onOpenTask }: { payload: HubPayload; onOpenTask: (task: PtTask) => void }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const today = localTodayIso()
  const ticks = monthTicks().filter((t) => t.leftPct > 0) // the origin month sits at 0% under the name-column border
  const tPct = todayPct(today)

  const phases = [...payload.phases].sort((a, b) => a.phase_number - b.phase_number)

  // default: expand in-flight phases (active/behind), collapse done + upcoming
  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    const init = new Set<string>()
    for (const ph of phases) {
      const st = phaseState(ph, taskCounts(tasksForPhase(payload, ph.id)), today)
      if (st === 'done' || st === 'upcoming') init.add(ph.id)
    }
    return init
  })

  function toggle(id: string) {
    setCollapsed((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }
  function cycle(t: PtTask) {
    const next = STATUS_ORDER[(STATUS_ORDER.indexOf(t.status) + 1) % STATUS_ORDER.length]
    patch.mutate({ table: 'pt_tasks', id: t.id, patch: { status: next } })
  }

  return (
    <div data-hub-anim style={{ animation: 'hubFadeIn .25s ease' }}>
      {/* heading + controls */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="m-0 text-[18px] font-semibold tracking-[-0.01em]">Timeline</h1>
          <p className="mt-[3px] text-[12.5px] text-foreground-muted">
            {payload.tasks.length} tasks across {phases.length} phases · Feb – Sep 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className={ghostBtn} onClick={() => setCollapsed(new Set())}>Expand all</button>
          <button className={ghostBtn} onClick={() => setCollapsed(new Set(phases.map((p) => p.id)))}>Collapse all</button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
        <div className="relative overflow-auto" style={{ height: 'clamp(440px, calc(100vh - 268px), 920px)' }}>
          <div className="relative text-[13px]" style={{ width: NAME_W + CHART_W, minWidth: NAME_W + CHART_W }}>

            {/* month header */}
            <div className="sticky top-0 z-20 flex border-b border-[var(--border)] bg-[var(--card)]">
              <div
                className="sticky left-0 z-[21] flex items-center border-r border-[var(--border)] bg-[var(--card)] px-3.5 py-[9px] text-[11px] font-semibold uppercase tracking-[0.05em] text-foreground-subtle"
                style={{ width: NAME_W, minWidth: NAME_W }}
              >
                Phase / Task
              </div>
              <div className="relative h-9" style={{ width: CHART_W }}>
                {ticks.map((t) => (
                  <div
                    key={t.label}
                    className="absolute bottom-0 top-0 flex items-center border-l border-[var(--border)] pl-1.5 text-[11px] font-medium text-foreground-subtle"
                    style={{ left: `${t.leftPct}%` }}
                  >
                    {t.label}
                  </div>
                ))}
                {payload.milestones.map((m) => {
                  const overdue = !m.achieved && new Date(m.date) < new Date(today)
                  const color = m.achieved ? 'var(--status-success-500)' : overdue ? 'var(--status-danger-500)' : 'var(--foreground-subtle)'
                  return (
                    <Tooltip key={m.id}>
                      <TooltipTrigger
                        aria-label={`Milestone: ${m.name}, ${formatDate(m.date, 'dMMM')}`}
                        className="absolute top-[9px] -translate-x-1/2 cursor-pointer border-none bg-transparent p-0.5 text-[12px] leading-none focus-visible:outline-2 focus-visible:outline-ring"
                        style={{ left: `${pctOf(m.date)}%`, color }}
                      >
                        ◆
                      </TooltipTrigger>
                      <TooltipContent>{m.name} — {formatDate(m.date, 'dMMM')}</TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </div>

            {/* phases */}
            {phases.map((ph) => {
              const groups = payload.groups.filter((g) => g.phase_id === ph.id)
              const phaseTasks = tasksForPhase(payload, ph.id)
              const c = taskCounts(phaseTasks)
              const expanded = !collapsed.has(ph.id)
              const color = phaseColor(ph.phase_number)
              const pg = barGeometry(ph.start_date, ph.end_date)
              return (
                <div key={ph.id}>
                  {/* phase header */}
                  <div
                    className="flex border-t border-[var(--border)] bg-[var(--surface-muted)]"
                    style={{ borderBottom: expanded ? 'none' : '1px solid var(--border)' }}
                  >
                    <div
                      className="sticky left-0 z-[11] flex items-center gap-2 border-r border-[var(--border)] bg-inherit px-3.5 py-2"
                      style={{ width: NAME_W, minWidth: NAME_W }}
                    >
                      <button
                        onClick={() => toggle(ph.id)}
                        aria-expanded={expanded}
                        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${ph.name}`}
                        className="grid size-[22px] flex-none place-items-center rounded-md border-none bg-transparent text-foreground-muted hover:bg-[var(--surface-sunken)]"
                      >
                        {expanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                      </button>
                      <span aria-hidden className="size-[9px] flex-none rounded-[3px]" style={{ background: color }} />
                      <span className="truncate text-[13px] font-semibold text-foreground">Phase {ph.phase_number} · {ph.name}</span>
                      <span className="ml-auto flex-none font-mono text-[11px] font-medium tabular-nums text-foreground-subtle">{c.complete}/{c.total}</span>
                    </div>
                    <div className="relative flex items-center" style={{ width: CHART_W }}>
                      {pg ? (
                        <div
                          className="absolute h-[5px] rounded-[3px]"
                          style={{ left: `${pg.leftPct}%`, width: `${pg.widthPct}%`, top: '50%', transform: 'translateY(-50%)', background: color, opacity: 0.4 }}
                        />
                      ) : null}
                      <div className="absolute right-3.5 top-1/2 h-[6px] w-[120px] -translate-y-1/2 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                        <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: color }} />
                      </div>
                    </div>
                  </div>

                  {/* groups + tasks */}
                  {expanded
                    ? groups.map((g) => {
                        const groupTasks = payload.tasks.filter((t) => t.group_id === g.id)
                        return (
                          <div key={g.id}>
                            <div className="flex bg-[var(--surface)]">
                              <div
                                className="sticky left-0 z-10 flex items-center gap-1.5 border-r border-t border-[var(--border)] bg-[var(--surface)] py-1.5 pl-9 pr-3.5"
                                style={{ width: NAME_W, minWidth: NAME_W }}
                              >
                                <EditableText
                                  label="group name"
                                  value={g.name}
                                  className="text-[11.5px] font-semibold uppercase tracking-[0.02em] text-foreground-muted"
                                  onCommit={(v) => patch.mutate({ table: 'pt_task_groups', id: g.id, patch: { name: v } })}
                                />
                                <button
                                  onClick={() => create.mutate({ table: 'pt_tasks', values: { group_id: g.id, name: 'New task', sort_order: groupTasks.length } })}
                                  disabled={create.isPending}
                                  aria-label={`Add task to ${g.name}`}
                                  title="Add task"
                                  className="grid size-[18px] flex-none place-items-center rounded-[5px] border-none bg-transparent text-foreground-subtle hover:bg-[var(--surface-sunken)] hover:text-[var(--primary)]"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <div className="border-t border-[var(--border)]" style={{ width: CHART_W }} />
                            </div>
                            {groupTasks.map((t) => {
                              const geo = barGeometry(t.start_date, t.end_date)
                              const duration = t.duration_label ?? computedDurationLabel(t.start_date, t.end_date)
                              return (
                                <div
                                  key={t.id}
                                  className="flex items-center bg-[var(--card)]"
                                  style={{ minHeight: 34, borderTop: '1px solid color-mix(in oklab, var(--border) 55%, transparent)' }}
                                >
                                  <div
                                    className="sticky left-0 z-[9] flex items-center gap-[9px] border-r border-[var(--border)] bg-inherit py-[5px] pl-12 pr-3.5"
                                    style={{ width: NAME_W, minWidth: NAME_W }}
                                  >
                                    <button
                                      onClick={() => cycle(t)}
                                      aria-label={`Status: ${STATUS[t.status].label}. Activate to cycle.`}
                                      title={STATUS[t.status].label}
                                      className="relative focus-visible:outline-2 focus-visible:outline-ring"
                                      style={pipStyle(t.status)}
                                    />
                                    <button
                                      onClick={() => onOpenTask(t)}
                                      className="min-w-0 flex-1 cursor-pointer truncate border-none bg-transparent p-0 text-left text-[13px] text-foreground hover:text-[var(--primary)] hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                                    >
                                      {t.name}
                                    </button>
                                  </div>
                                  <div className="relative" style={{ width: CHART_W }}>
                                    {geo ? (
                                      <button
                                        onClick={() => onOpenTask(t)}
                                        aria-label={`${t.name}: ${formatDate(t.start_date, 'dMMM')} to ${formatDate(t.end_date, 'dMMM')}${duration ? `, ${duration}` : ''}`}
                                        className="hover:brightness-95 focus-visible:outline-2 focus-visible:outline-ring"
                                        style={barStyle(t.status, color, geo, false)}
                                      />
                                    ) : (
                                      <button
                                        onClick={() => onOpenTask(t)}
                                        className="absolute left-1.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-md border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-2 py-px text-[10.5px] italic text-foreground-subtle"
                                      >
                                        no dates — add
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )
                      })
                    : null}
                </div>
              )
            })}

            {/* today line overlay */}
            {tPct !== null ? (
              <div aria-hidden className="pointer-events-none absolute bottom-0 z-[8]" style={{ top: 36, left: NAME_W, width: CHART_W }}>
                <div className="absolute bottom-0 top-0 w-0.5 bg-[var(--status-danger-500)]" style={{ left: `${tPct}%`, transform: 'translateX(-1px)' }}>
                  <span className="absolute left-1/2 top-[-1px] -translate-x-1/2 whitespace-nowrap rounded-b-[5px] bg-[var(--status-danger-500)] px-[5px] py-px font-mono text-[9px] font-semibold text-[var(--primary-foreground)]">
                    TODAY
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center gap-4 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[11.5px] text-foreground-muted">
          {STATUS_ORDER.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span aria-hidden style={legendDot(s)} />
              {STATUS[s].label}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-[13px] w-0.5 rounded-[2px] bg-[var(--status-danger-500)]" />
            Today
          </span>
          <span className="inline-flex items-center gap-1.5 text-foreground-subtle">◆ Milestone</span>
        </div>
      </div>
    </div>
  )
}
