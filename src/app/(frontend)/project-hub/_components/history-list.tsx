'use client'

import { format, parseISO } from 'date-fns'
import { Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { humanizeRevision } from '@/lib/project-hub/diff'
import type { PtRevision } from '@/lib/project-hub/types'
import { useRevert } from './use-hub'

export function RevisionItem({ rev, showTable = false }: { rev: PtRevision; showTable?: boolean }) {
  const revert = useRevert()
  const diffs = humanizeRevision(rev)
  if (diffs.length === 0) return null
  const canRevert = rev.action !== 'delete'
  return (
    <div className="flex items-start justify-between gap-2 py-2">
      <div className="min-w-0 text-sm">
        {diffs.map((d) => (
          <p key={d.field} className="truncate">
            <span className="font-medium text-foreground">{d.label}</span>
            {d.from !== null || d.to !== null ? (
              <>
                {d.from !== null ? <span className="text-foreground-subtle"> {d.from} →</span> : null}
                {d.to !== null ? <span className="text-foreground-muted"> {d.to}</span> : null}
              </>
            ) : null}
          </p>
        ))}
        <p className="mt-0.5 text-xs text-foreground-subtle">
          {rev.actor_name ?? 'System'} · {format(parseISO(rev.created_at), 'd MMM, HH:mm')}
          {showTable ? ` · ${rev.table_name.replace('pt_', '').replace('_', ' ')}` : ''}
        </p>
      </div>
      {canRevert ? (
        <Button variant="outline" size="xs" onClick={() => revert.mutate(rev.id)} aria-label="Revert this change">
          <Undo2 /> Revert
        </Button>
      ) : null}
    </div>
  )
}
