'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  formatDate, daysBetween, goLiveIso, localTodayIso, nextMilestone, overdueMilestones,
  phaseColor, phaseState, statusSegments, taskCounts, tasksForPhase,
  PHASE_STATE_LABEL, STATUS,
} from '@/lib/project-hub/hub-model'
import type { HubPayload, PtFactSection } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { useCreateRow, usePatchRow } from './use-hub'

const PHASE_STATE_TONE: Record<string, { bg: string; on: string }> = {
  done: { bg: 'var(--status-success-50)', on: 'var(--status-success-700)' },
  active: { bg: 'var(--primary-subtle)', on: 'var(--primary)' },
  behind: { bg: 'var(--status-warning-50)', on: 'var(--status-warning-700)' },
  upcoming: { bg: 'var(--surface-sunken)', on: 'var(--foreground-subtle)' },
}

function FactCard({ payload, section, title }: { payload: HubPayload; section: PtFactSection; title: string }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const facts = payload.facts.filter((f) => f.section === section)
  return (
    <div
      className="rounded-[14px] border border-[var(--border)] p-[18px_20px] shadow-[var(--shadow-sm)]"
      style={{ background: 'var(--card)' }}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <div className="text-[13px] font-semibold">{title}</div>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Add ${title.toLowerCase()} fact`}
          title="Add fact"
          disabled={create.isPending}
          onClick={() => create.mutate({
            table: 'pt_facts',
            values: { section, label: 'New fact', value: '', sort_order: facts.length },
          })}
        >
          <Plus />
        </Button>
      </div>
      {facts.map((f) => (
        <div key={f.id} className="flex items-baseline gap-3.5 border-t border-[var(--border)] py-2.5">
          <span className="w-32 flex-none text-xs text-foreground-muted">{f.label}</span>
          <EditableText
            label={`${f.label} value`}
            value={f.value}
            required={false}
            className="flex-1 text-[13px] font-medium text-foreground"
            onCommit={(v) => patch.mutate({ table: 'pt_facts', id: f.id, patch: { value: v } })}
          />
        </div>
      ))}
    </div>
  )
}

export function OverviewTab({ payload }: { payload: HubPayload }) {
  const today = localTodayIso()
  const overall = taskCounts(payload.tasks)
  const goLive = goLiveIso(payload.milestones)
  const days = goLive ? daysBetween(today, goLive) : 0
  const blocked = payload.tasks.filter((t) => t.status === 'blocked').length
  const overdue = overdueMilestones(payload.milestones, today).length
  const attention = blocked + overdue
  const next = nextMilestone(payload.milestones, today)
  const phases = [...payload.phases].sort((a, b) => a.phase_number - b.phase_number)
  const segments = statusSegments(payload.tasks)

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="m-0 text-[18px] font-semibold tracking-[-0.01em]">Overview</h1>
          <p className="mt-[3px] mb-0 text-[12.5px] text-foreground-muted">
            {payload.project.title} · go-live in {days} days
          </p>
        </div>
      </div>

      {/* KPI grid */}
      <div className="mb-4 grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
        <div
          className="rounded-[14px] border border-[var(--border)] p-[15px_17px] shadow-[var(--shadow-sm)]"
          style={{ background: 'var(--card)' }}
        >
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-foreground-subtle">Overall complete</div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span
              className="font-mono text-[30px] leading-none font-semibold tracking-[-0.01em] tabular-nums"
              style={{ color: 'var(--brand-accent)' }}
            >
              {overall.pct}%
            </span>
          </div>
          <div className="mt-1.5 text-[11.5px] text-foreground-muted">{overall.complete} of {overall.total} tasks done</div>
        </div>

        <div
          className="rounded-[14px] border border-[var(--border)] p-[15px_17px] shadow-[var(--shadow-sm)]"
          style={{ background: 'var(--card)' }}
        >
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-foreground-subtle">Days to go-live</div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span
              className="font-mono text-[30px] leading-none font-semibold tracking-[-0.01em] tabular-nums"
              style={{ color: 'var(--primary)' }}
            >
              {days}
            </span>
            <span className="text-xs font-medium text-foreground-muted">days</span>
          </div>
          <div className="mt-1.5 text-[11.5px] text-foreground-muted">{goLive ? formatDate(goLive, 'full') : '—'}</div>
        </div>

        <div
          className="rounded-[14px] border border-[var(--border)] p-[15px_17px] shadow-[var(--shadow-sm)]"
          style={{ background: 'var(--card)' }}
        >
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-foreground-subtle">In progress</div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="font-mono text-[30px] leading-none font-semibold tracking-[-0.01em] tabular-nums text-foreground">
              {overall.in_progress}
            </span>
            <span className="text-xs font-medium text-foreground-muted">tasks</span>
          </div>
          <div className="mt-1.5 text-[11.5px] text-foreground-muted">{overall.not_started} not started</div>
        </div>

        <div
          className="rounded-[14px] border p-[15px_17px] shadow-[var(--shadow-sm)]"
          style={{
            background: attention > 0 ? 'var(--status-warning-50)' : 'var(--card)',
            borderColor: attention > 0 ? 'color-mix(in oklab, var(--status-warning-500) 30%, var(--border))' : 'var(--border)',
          }}
        >
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-foreground-subtle">Needs attention</div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span
              className="font-mono text-[30px] leading-none font-semibold tracking-[-0.01em] tabular-nums"
              style={{ color: attention > 0 ? 'var(--status-warning-700)' : 'var(--status-success-700)' }}
            >
              {attention}
            </span>
            <span className="text-xs font-medium text-foreground-muted">{attention === 1 ? 'item' : 'items'}</span>
          </div>
          <div className="mt-1.5 text-[11.5px] text-foreground-muted">{blocked} blocked · {overdue} overdue</div>
        </div>
      </div>

      {/* Next milestone banner */}
      {next ? (
        <div
          className="mb-4 flex flex-wrap items-center gap-4 rounded-[14px] border p-[14px_18px] shadow-[var(--shadow-sm)]"
          style={{
            background: 'linear-gradient(135deg, var(--primary-subtle), var(--card))',
            borderColor: 'color-mix(in oklab, var(--primary) 22%, var(--border))',
          }}
        >
          <span aria-hidden className="flex-none text-xl leading-none" style={{ color: 'var(--primary)' }}>◇</span>
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-foreground-subtle">Next milestone</div>
            <div className="mt-[3px] text-[15px] font-semibold">{next.name}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[13px] font-semibold" style={{ color: 'var(--primary)' }}>
              {formatDate(next.date, 'full')}
            </div>
            <div className="mt-0.5 text-[11.5px] text-foreground-muted">
              in {daysBetween(today, next.date)} days · {next.deliverable}
            </div>
          </div>
        </div>
      ) : null}

      {/* Progress by phase + Status breakdown */}
      <div className="mb-4 grid items-start gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <div
          className="rounded-[14px] border border-[var(--border)] p-[18px_20px] shadow-[var(--shadow-sm)]"
          style={{ background: 'var(--card)' }}
        >
          <div className="mb-4 text-[13px] font-semibold">Progress by phase</div>
          <div className="flex flex-col gap-[15px]">
            {phases.map((ph) => {
              const counts = taskCounts(tasksForPhase(payload, ph.id))
              const stateKey = phaseState(ph, counts, today)
              const tone = PHASE_STATE_TONE[stateKey]
              const color = phaseColor(ph.phase_number)
              return (
                <div key={ph.id}>
                  <div className="mb-[7px] flex items-center gap-[9px]">
                    <span aria-hidden className="size-2.5 flex-none rounded-[3px]" style={{ background: color }} />
                    <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
                      Phase {ph.phase_number} · {ph.name}
                    </span>
                    <span
                      className="flex-none rounded-full px-[7px] py-0.5 text-[9.5px] font-semibold tracking-[0.04em] uppercase whitespace-nowrap"
                      style={{ background: tone.bg, color: tone.on }}
                    >
                      {PHASE_STATE_LABEL[stateKey]}
                    </span>
                    <span className="min-w-[42px] flex-none text-right font-mono text-[11.5px] text-foreground-muted tabular-nums">
                      {counts.complete}/{counts.total}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 pl-[19px]">
                    <div
                      className="relative h-[7px] flex-1 overflow-hidden rounded-full"
                      style={{ background: 'var(--surface-sunken)' }}
                    >
                      <div className="h-full rounded-full" style={{ width: `${counts.pct}%`, background: color }} />
                    </div>
                    <span className="min-w-8 flex-none text-right font-mono text-[11px] text-foreground-subtle">
                      {counts.pct}%
                    </span>
                  </div>
                  <div className="mt-[5px] pl-[19px] text-[11px] text-foreground-subtle">
                    {ph.start_date ? formatDate(ph.start_date, 'dMMM') : '—'} – {ph.end_date ? formatDate(ph.end_date, 'dMMM') : '—'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className="rounded-[14px] border border-[var(--border)] p-[18px_20px] shadow-[var(--shadow-sm)]"
          style={{ background: 'var(--card)' }}
        >
          <div className="mb-4 text-[13px] font-semibold">Status breakdown</div>
          <div className="flex h-3.5 overflow-hidden rounded-full" style={{ background: 'var(--surface-sunken)' }}>
            {segments.map((s) => (
              <div
                key={s.status}
                title={`${s.label}: ${s.count}`}
                style={{
                  width: `${s.pct}%`,
                  height: '100%',
                  background: s.status === 'not_started'
                    ? 'var(--surface-sunken)'
                    : s.status === 'na'
                      ? 'var(--neutral-300)'
                      : STATUS[s.status].color,
                  boxShadow: s.status === 'not_started' ? 'inset 0 0 0 1px var(--border)' : undefined,
                }}
              />
            ))}
          </div>
          <div className="mt-[18px] flex flex-col gap-[11px]">
            {segments.map((s) => (
              <div key={s.status} className="flex items-center gap-[9px]">
                <span
                  aria-hidden
                  className="size-2 flex-none rounded-full"
                  style={{ background: STATUS[s.status].color }}
                />
                <span className="flex-1 text-[12.5px] text-foreground">{s.label}</span>
                <span className="font-mono text-xs font-semibold text-foreground tabular-nums">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project facts + Deployment & infrastructure */}
      <div className="grid items-start gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <FactCard payload={payload} section="overview" title="Project facts" />
        <FactCard payload={payload} section="deployment" title="Deployment & infrastructure" />
      </div>
    </div>
  )
}
