'use client'

import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { Undo2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchActivity } from '@/lib/project-hub/actions'
import { humanizeRevision } from '@/lib/project-hub/diff'
import type { PtRevision, PtRevisionAction } from '@/lib/project-hub/types'
import { ACTIVITY_KEY, useRevert } from './use-hub'

const VERB: Record<PtRevisionAction, string> = {
  insert: 'created',
  delete: 'deleted',
  update: 'updated',
}

function tableLabel(tableName: string): string {
  return tableName.replace(/^pt_/, '').replaceAll('_', ' ')
}

function itemName(rev: PtRevision): string {
  const data = rev.new_data ?? rev.old_data
  const name = data && (data.name ?? data.title ?? data.description ?? data.label ?? data.risk ?? data.technology)
  return name != null ? String(name) : tableLabel(rev.table_name)
}

function initialsFor(name: string | null): string {
  const words = (name ?? 'System').trim().split(/\s+/).filter(Boolean)
  return (words.slice(0, 2).map((w) => w[0]).join('') || 'S').toUpperCase()
}

function timeFor(iso: string): string {
  return format(parseISO(iso), 'HH:mm')
}

function ActivityRow({ rev }: { rev: PtRevision }) {
  const revert = useRevert()
  const diffs = humanizeRevision(rev)
  const diff = rev.action === 'update' ? diffs[0] : undefined
  const hasDiff = Boolean(diff && (diff.from !== null || diff.to !== null))
  const actorName = rev.actor_name ?? 'System'
  const firstName = actorName.split(' ')[0]
  const canRevert = rev.action !== 'delete'

  return (
    <div className="flex gap-3 border-t border-[var(--border)] px-4 py-[13px] first:border-t-0">
      <span
        aria-hidden
        className="grid size-[30px] flex-none place-items-center rounded-full bg-[var(--color-fcu-primary-400)] text-[10.5px] font-bold text-white"
      >
        {initialsFor(rev.actor_name)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[12.5px] text-foreground-muted">
          <strong className="font-semibold text-foreground">{firstName}</strong> {VERB[rev.action]} {tableLabel(rev.table_name)}
        </div>
        <div className="mt-0.5 text-[13px] font-medium text-foreground">{itemName(rev)}</div>
        {hasDiff && diff ? (
          <div className="mt-[5px] flex flex-wrap items-center gap-2">
            <span className="text-[9.5px] font-semibold uppercase tracking-[.04em] text-foreground-subtle">{diff.label}</span>
            <span className="font-mono text-[11.5px] text-foreground-muted">
              <span className="line-through opacity-70">{diff.from}</span>
              <span className="mx-[5px]">→</span>
              <span className="text-foreground">{diff.to}</span>
            </span>
          </div>
        ) : null}
        <div className="mt-[5px] text-[10.5px] text-foreground-subtle">{timeFor(rev.created_at)}</div>
      </div>
      {canRevert ? (
        <button
          type="button"
          onClick={() => revert.mutate(rev.id)}
          className="inline-flex flex-none cursor-pointer items-center gap-[5px] self-start rounded-[7px] border border-[var(--border)] bg-[var(--card)] px-[9px] py-[5px] text-[11px] font-semibold text-foreground-muted transition-colors hover:border-primary hover:text-primary"
        >
          <Undo2 size={13} strokeWidth={2} aria-hidden /> Revert
        </button>
      ) : null}
    </div>
  )
}

export function ActivityTab() {
  const { data, isLoading, error } = useQuery({
    queryKey: ACTIVITY_KEY,
    queryFn: async () => {
      const res = await fetchActivity(150)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
  })

  if (isLoading) return <Skeleton className="h-40 w-full" />
  if (error) return <p className="text-sm text-status-danger-700">Couldn&apos;t load activity: {error.message}</p>

  // Drop revisions that humanize to nothing (e.g. meta-only changes) so a day
  // never renders as an empty bordered box.
  const visible = (data ?? []).filter((rev) => humanizeRevision(rev).length > 0)
  const byDay = new Map<string, PtRevision[]>()
  for (const rev of visible) {
    const day = format(parseISO(rev.created_at), 'EEEE d MMMM yyyy')
    byDay.set(day, [...(byDay.get(day) ?? []), rev])
  }

  return (
    <div className="w-full">
      <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="m-0 text-[18px] font-semibold tracking-[-0.01em] text-foreground">Activity</h1>
          <p className="m-0 mt-[3px] text-[12.5px] text-foreground-muted">
            Every change, in order · {visible.length} events
          </p>
        </div>
      </div>

      <div className="max-w-[760px]">
        {[...byDay.entries()].map(([day, revs]) => (
          <div key={day} className="mb-[18px]">
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[.05em] text-foreground-subtle">{day}</span>
              <span className="h-px flex-1 bg-[var(--border)]" />
              <span className="font-mono text-[11px] text-foreground-subtle">{revs.length}</span>
            </div>
            <div className="overflow-hidden rounded-[13px] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
              {revs.map((rev) => (
                <ActivityRow key={rev.id} rev={rev} />
              ))}
            </div>
          </div>
        ))}
        {visible.length === 0 ? <p className="text-sm text-foreground-subtle">No activity yet.</p> : null}
      </div>
    </div>
  )
}
