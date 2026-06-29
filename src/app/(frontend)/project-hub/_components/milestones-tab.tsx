'use client'

import { isBefore, parseISO, startOfToday } from 'date-fns'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { HubPayload } from '@/lib/project-hub/types'
import { EditableDate, EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

export function MilestonesTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const today = startOfToday()
  const sorted = [...payload.milestones].sort((a, b) => a.date.localeCompare(b.date))
  return (
    <div className="max-w-3xl">
      <ol className="relative ml-3 border-l-2 border-border">
        {sorted.map((m) => {
          const overdue = !m.achieved && isBefore(parseISO(m.date), today)
          return (
            <li key={m.id} className="group relative mb-6 ml-6">
              <span
                aria-hidden
                className={cn(
                  'absolute -left-[31px] top-1 size-3.5 rounded-full border-2',
                  m.achieved ? 'border-status-success-500 bg-status-success-500'
                    : overdue ? 'border-status-danger-500 bg-surface'
                    : 'border-border-strong bg-surface',
                )}
              />
              <div className="flex flex-wrap items-center gap-2">
                <EditableDate label="milestone date" value={m.date}
                  onCommit={(v) => v && patch.mutate({ table: 'pt_milestones', id: m.id, patch: { date: v } })} />
                <EditableText label="milestone name" value={m.name} className="font-medium"
                  onCommit={(v) => patch.mutate({ table: 'pt_milestones', id: m.id, patch: { name: v } })} />
                {m.achieved ? <Badge variant="success">Achieved</Badge> : null}
                {overdue ? <Badge variant="danger">Overdue</Badge> : null}
                <label className="ml-auto flex items-center gap-1.5 text-xs text-foreground-muted">
                  <Checkbox checked={m.achieved} aria-label={`Mark ${m.name} achieved`}
                    onCheckedChange={(c) => patch.mutate({ table: 'pt_milestones', id: m.id, patch: { achieved: c === true } })} />
                  achieved
                </label>
                <RowActions table="pt_milestones" id={m.id} name={m.name} />
              </div>
              <EditableText label="deliverable" value={m.deliverable ?? ''} required={false}
                className="mt-1 block text-sm text-foreground-muted"
                onCommit={(v) => patch.mutate({ table: 'pt_milestones', id: m.id, patch: { deliverable: v || null } })} />
            </li>
          )
        })}
      </ol>
      <Button variant="ghost" size="sm" disabled={create.isPending}
        onClick={() => create.mutate({ table: 'pt_milestones', values: { date: '2026-08-31', name: 'New milestone', sort_order: payload.milestones.length } })}>
        <Plus /> Add milestone
      </Button>
    </div>
  )
}
