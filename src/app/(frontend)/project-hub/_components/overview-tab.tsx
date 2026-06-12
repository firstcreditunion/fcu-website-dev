'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { computedDurationLabel } from '@/lib/project-hub/dates'
import type { HubPayload, PtFactSection } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

function FactList({ payload, section, title }: { payload: HubPayload; section: PtFactSection; title: string }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const facts = payload.facts.filter((f) => f.section === section)
  return (
    <Card variant="outlined">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-1">
          {facts.map((f) => (
            <div key={f.id} className="group grid grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] items-baseline gap-2 text-sm">
              <dt>
                <EditableText label={`${f.label} label`} value={f.label} className="font-medium text-foreground"
                  onCommit={(v) => patch.mutate({ table: 'pt_facts', id: f.id, patch: { label: v } })} />
              </dt>
              <dd>
                <EditableText label={`${f.label} value`} value={f.value} required={false} className="text-foreground-muted"
                  onCommit={(v) => patch.mutate({ table: 'pt_facts', id: f.id, patch: { value: v } })} />
              </dd>
              <RowActions table="pt_facts" id={f.id} name={f.label} />
            </div>
          ))}
        </dl>
        <Button variant="ghost" size="sm" className="mt-3"
          onClick={() => create.mutate({ table: 'pt_facts', values: { section, label: 'New item', value: '', sort_order: facts.length } })}>
          <Plus /> Add item
        </Button>
      </CardContent>
    </Card>
  )
}

export function OverviewTab({ payload }: { payload: HubPayload }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <FactList payload={payload} section="overview" title="Project overview" />
        <FactList payload={payload} section="deployment" title="Vercel deployment strategy" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {payload.phases.map((ph) => {
          const tasks = payload.tasks.filter((t) =>
            payload.groups.some((g) => g.id === t.group_id && g.phase_id === ph.id))
          const done = tasks.filter((t) => t.status === 'complete').length
          const pctDone = tasks.length ? Math.round((done / tasks.length) * 100) : 0
          return (
            <Card key={ph.id} variant="outlined">
              <CardContent className="pt-5">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="size-2.5 rounded-full" style={{ background: `var(--color-${ph.color_token}, var(--${ph.color_token}))` }} />
                  <span className="text-sm font-medium text-foreground">Phase {ph.phase_number} — {ph.name}</span>
                </div>
                <p className="mt-1 text-xs text-foreground-muted">
                  {ph.start_date && ph.end_date ? computedDurationLabel(ph.start_date, ph.end_date) : 'No dates'} · {done}/{tasks.length} tasks
                </p>
                <Progress value={pctDone} size="sm" className="mt-3" />
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
