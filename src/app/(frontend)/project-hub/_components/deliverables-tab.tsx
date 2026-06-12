'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import type { HubPayload } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

export function DeliverablesTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const done = payload.deliverables.filter((d) => d.done).length
  const pctDone = payload.deliverables.length ? Math.round((done / payload.deliverables.length) * 100) : 0
  return (
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center gap-3">
        <Progress value={pctDone} size="sm" className="w-48" />
        <span className="text-sm tabular-nums text-foreground-muted">{done}/{payload.deliverables.length} delivered</span>
      </div>
      <ul className="space-y-1">
        {payload.deliverables.map((d) => (
          <li key={d.id} className="group flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-muted">
            <Checkbox
              checked={d.done}
              aria-label={`Mark "${d.description}" ${d.done ? 'not delivered' : 'delivered'}`}
              onCheckedChange={(checked) =>
                patch.mutate({ table: 'pt_deliverables', id: d.id, patch: { done: checked === true } })}
            />
            <EditableText label="deliverable" value={d.description}
              className={d.done ? 'text-foreground-subtle line-through' : ''}
              onCommit={(v) => patch.mutate({ table: 'pt_deliverables', id: d.id, patch: { description: v } })} />
            <span className="ml-auto"><RowActions table="pt_deliverables" id={d.id} name={d.description} /></span>
          </li>
        ))}
      </ul>
      <Button variant="ghost" size="sm" className="mt-3"
        onClick={() => create.mutate({ table: 'pt_deliverables', values: { description: 'New deliverable', sort_order: payload.deliverables.length } })}>
        <Plus /> Add deliverable
      </Button>
    </div>
  )
}
