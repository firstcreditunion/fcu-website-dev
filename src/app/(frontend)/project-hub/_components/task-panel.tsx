'use client'

import { useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchRowHistory } from '@/lib/project-hub/actions'
import { computedDurationLabel } from '@/lib/project-hub/dates'
import { STATUS_LABELS, TASK_STATUSES, type HubPayload, type PtTask } from '@/lib/project-hub/types'
import { EditableDate, EditableSelect, EditableText } from './editable'
import { RevisionItem } from './history-list'
import { useDeleteRow, usePatchRow } from './use-hub'

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

  return (
    <Drawer direction="right" open={!!task} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        {live ? (
          <>
            <DrawerHeader>
              <DrawerTitle>
                <EditableText label="task name" value={live.name}
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { name: v } })} />
              </DrawerTitle>
              <DrawerDescription>
                {payload.groups.find((g) => g.id === live.group_id)?.name}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
              <div className="grid grid-cols-[6rem_1fr] items-center gap-x-3 gap-y-3">
                <Label>Status</Label>
                <EditableSelect label="status" value={live.status} options={TASK_STATUSES} labels={STATUS_LABELS}
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { status: v } })} />
                <Label>Start</Label>
                <EditableDate label="start date" value={live.start_date}
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { start_date: v } })} />
                <Label>End</Label>
                <EditableDate label="end date" value={live.end_date}
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { end_date: v } })} />
                <Label>Duration</Label>
                <div className="text-sm text-foreground-muted">
                  <EditableText label="duration override" value={live.duration_label ?? ''} required={false}
                    onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { duration_label: v || null } })} />
                  <span className="ml-1 text-xs text-foreground-subtle">
                    {live.duration_label
                      ? `(auto: ${computedDurationLabel(live.start_date, live.end_date) || '—'})`
                      : `(auto${computedDurationLabel(live.start_date, live.end_date) ? '' : ': add dates'})`}
                  </span>
                </div>
                <Label className="self-start pt-1">Notes</Label>
                <EditableText label="notes" value={live.notes ?? ''} required={false} multiline
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { notes: v || null } })} />
              </div>
              <Button variant="destructive-outline" size="sm"
                onClick={() => { del.mutate({ table: 'pt_tasks', id: live.id }); onClose() }}>
                <Trash2 /> Delete task
              </Button>
              <Separator />
              <div>
                <h3 className="mb-1 text-sm font-medium text-foreground">History</h3>
                {history.isLoading ? <Skeleton className="h-16 w-full" /> : null}
                {history.data?.length === 0 ? (
                  <p className="text-sm text-foreground-subtle">No changes yet.</p>
                ) : null}
                <div className="divide-y divide-border">
                  {history.data?.map((rev) => <RevisionItem key={rev.id} rev={rev} />)}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}
