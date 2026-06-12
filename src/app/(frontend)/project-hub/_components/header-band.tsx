'use client'

import { differenceInCalendarDays, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { HubPayload } from '@/lib/project-hub/types'

export function HeaderBand({ payload, viewers, live }: { payload: HubPayload; viewers: number; live: boolean }) {
  const goLive = payload.milestones.find((m) => m.name.toUpperCase().includes('GO-LIVE'))
  const days = goLive ? differenceInCalendarDays(parseISO(goLive.date), new Date()) : null
  const active = payload.tasks
  const pctDone = active.length === 0 ? 0 : Math.round((active.filter((t) => t.status === 'complete').length / active.length) * 100)
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{payload.project.title}</h1>
        {payload.project.subtitle ? (
          <p className="mt-1 text-sm text-foreground-muted">{payload.project.subtitle}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        {days !== null ? (
          <div className="rounded-lg bg-surface-muted px-4 py-2 text-center">
            <div className="text-xs text-foreground-muted">to go-live</div>
            <div className="text-xl font-semibold tabular-nums text-foreground">{days} days</div>
          </div>
        ) : null}
        <div className="w-40 rounded-lg bg-surface-muted px-4 py-2">
          <div className="flex justify-between text-xs text-foreground-muted">
            <span>complete</span>
            <span className="tabular-nums">{pctDone}%</span>
          </div>
          <Progress value={pctDone} size="sm" className="mt-1.5" />
        </div>
        <Badge variant={live ? 'success' : 'neutral'} dot>
          {viewers} viewing
        </Badge>
      </div>
    </div>
  )
}
