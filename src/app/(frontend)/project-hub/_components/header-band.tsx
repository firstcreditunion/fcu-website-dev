'use client'

import { User } from 'lucide-react'
import { usePatchRow } from './use-hub'
import { EditableText } from './editable'
import type { HubPayload } from '@/lib/project-hub/types'
import type { Health } from '@/lib/project-hub/hub-model'

export interface HeaderModel {
  daysToGoLive: number
  goLiveLabel: string
  overallPct: number
  doneCount: number
  totalCount: number
  health: Health
}

/** Conic progress ring (matches the prototype: brand-accent sweep on a sunken track). */
function ProgressRing({ pct }: { pct: number }) {
  return (
    <div
      role="img"
      aria-label={`Overall progress ${pct} percent`}
      className="grid size-10 place-items-center rounded-full"
      style={{ background: `conic-gradient(var(--brand-accent) ${pct * 3.6}deg, var(--surface-sunken) 0)` }}
    >
      <span className="grid size-[30px] place-items-center rounded-full bg-[var(--card)] font-mono text-[12px] font-semibold tabular-nums text-foreground">
        {pct}
      </span>
    </div>
  )
}

export function HeaderBand({
  payload, viewers, live, scrolled, model,
}: {
  payload: HubPayload
  viewers: number
  live: boolean
  scrolled: boolean
  model: HeaderModel
}) {
  const patch = usePatchRow()
  const { project } = payload
  const atRisk = model.health.atRisk
  // up to 4 generic (anonymous) presence avatars driven by the real viewer count
  const avatars = Math.min(Math.max(viewers, 1), 4)

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--border)]"
      style={{ background: 'color-mix(in oklab, var(--background) 88%, transparent)', backdropFilter: 'blur(10px)' }}
    >
      <div
        className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-[max(16px,calc((100vw-1440px)/2))] transition-[padding] duration-200"
        style={{ paddingTop: scrolled ? 8 : 14, paddingBottom: scrolled ? 8 : 14 }}
      >
        {/* identity */}
        <div className="flex min-w-0 items-center gap-3.5">
          <div
            aria-hidden
            className="grid flex-none place-items-center rounded-[9px] font-bold tracking-[-0.02em] text-white shadow-[var(--shadow-sm)] transition-all duration-200"
            style={{
              width: scrolled ? 30 : 36, height: scrolled ? 30 : 36, fontSize: scrolled ? 11 : 13,
              background: 'linear-gradient(145deg, var(--color-fcu-primary-700), var(--color-fcu-primary-900))',
            }}
          >
            FCU
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <EditableText
                label="project title"
                value={project.title}
                className="font-semibold tracking-[-0.01em] text-foreground"
                onCommit={(v) => patch.mutate({ table: 'pt_projects', id: project.id, patch: { title: v } })}
              />
              <span className="whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--surface-sunken)] px-[7px] py-0.5 font-mono text-[10px] font-medium text-foreground-subtle">
                PRIVATE
              </span>
            </div>
            {!scrolled && project.subtitle ? (
              <div className="mt-px max-w-[560px] truncate">
                <EditableText
                  label="project subtitle"
                  value={project.subtitle}
                  required={false}
                  className="text-[12.5px] text-foreground-muted"
                  onCommit={(v) => patch.mutate({ table: 'pt_projects', id: project.id, patch: { subtitle: v || null } })}
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* health summary */}
        <div className="flex flex-wrap items-center justify-end gap-2.5">
          {/* countdown */}
          <div className="flex flex-col items-end border-r border-[var(--border)] px-3.5 py-1">
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-mono font-semibold leading-none tabular-nums text-[var(--primary)]"
                style={{ fontSize: scrolled ? 24 : 34 }}
              >
                {model.daysToGoLive}
              </span>
              <span className="font-mono text-[13px] font-medium text-foreground-muted">days</span>
            </div>
            <div className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-foreground-subtle">
              to go-live · {model.goLiveLabel}
            </div>
          </div>

          {/* overall progress */}
          <div className="flex items-center gap-[11px] rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 py-[9px] shadow-[var(--shadow-sm)]">
            <ProgressRing pct={model.overallPct} />
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-foreground-subtle">Complete</div>
              <div className="mt-0.5 font-mono text-[12px] tabular-nums text-foreground-muted">
                {model.doneCount}/{model.totalCount} tasks
              </div>
            </div>
          </div>

          {/* health pill */}
          <div
            className="inline-flex items-center gap-[7px] rounded-full px-3.5 py-2 text-[12px] font-semibold"
            style={{
              background: atRisk ? 'var(--status-warning-50)' : 'var(--status-success-50)',
              color: atRisk ? 'var(--status-warning-700)' : 'var(--status-success-700)',
              border: `1px solid ${atRisk ? 'color-mix(in oklab, var(--status-warning-500) 30%, transparent)' : 'color-mix(in oklab, var(--status-success-500) 30%, transparent)'}`,
            }}
          >
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{
                background: atRisk ? 'var(--status-warning-500)' : 'var(--status-success-500)',
                animation: atRisk ? undefined : 'hubPulse 2.4s ease-out infinite',
              }}
            />
            {atRisk ? 'At risk' : 'On track'}
          </div>

          {/* presence (anonymous: count-driven generic avatars) */}
          <div
            className="flex items-center gap-[9px] rounded-full border border-[var(--border)] bg-[var(--card)] py-[5px] pl-1.5 pr-3 shadow-[var(--shadow-sm)]"
            title={live ? 'Live' : 'Reconnecting…'}
          >
            <div className="flex">
              {Array.from({ length: avatars }, (_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="grid size-[26px] place-items-center rounded-full border-2 border-[var(--card)] text-white shadow-[var(--shadow-sm)]"
                  style={{ background: 'var(--color-fcu-primary-400)', marginLeft: i ? -8 : 0 }}
                >
                  <User size={13} />
                </span>
              ))}
            </div>
            <span className="whitespace-nowrap text-[12px] font-medium text-foreground-muted">
              <span className="font-mono font-semibold text-foreground">{viewers}</span> viewing
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
