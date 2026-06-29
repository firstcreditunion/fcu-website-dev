'use client'

import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchActivity } from '@/lib/project-hub/actions'
import type { PtRevision } from '@/lib/project-hub/types'
import { ACTIVITY_KEY } from './use-hub'
import { RevisionItem } from './history-list'

export function ActivityTab() {
  const { data, isLoading, error } = useQuery({
    queryKey: ACTIVITY_KEY,
    queryFn: async () => {
      const res = await fetchActivity(150)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
  })
  if (isLoading) return <Skeleton className="h-40 w-full max-w-3xl" />
  if (error) return <p className="text-sm text-status-danger-700">Couldn&apos;t load activity: {error.message}</p>
  const byDay = new Map<string, PtRevision[]>()
  for (const rev of data ?? []) {
    const day = format(parseISO(rev.created_at), 'EEEE d MMMM yyyy')
    byDay.set(day, [...(byDay.get(day) ?? []), rev])
  }
  return (
    <div className="max-w-3xl">
      {[...byDay.entries()].map(([day, revs]) => (
        <section key={day} className="mb-6">
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground-subtle">{day}</h3>
          <div className="divide-y divide-border rounded-lg border border-border px-4">
            {revs.map((rev) => <RevisionItem key={rev.id} rev={rev} showTable />)}
          </div>
        </section>
      ))}
      {(data ?? []).length === 0 ? <p className="text-sm text-foreground-subtle">No activity yet.</p> : null}
    </div>
  )
}
