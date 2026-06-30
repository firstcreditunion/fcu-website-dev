'use client'

import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TriangleAlert } from 'lucide-react'
import { HeaderBand, type HeaderModel } from './header-band'
import { TabNav, type TabId, type TabDef } from './tab-nav'
import { useHub, useHubInvalidate } from './use-hub'
import { useHubRealtime } from './use-realtime'
import { OverviewTab } from './overview-tab'
import { RisksTab } from './risks-tab'
import { TechStackTab } from './tech-stack-tab'
import { DeliverablesTab } from './deliverables-tab'
import { TimelineTab } from './timeline-tab'
import { MilestonesTab } from './milestones-tab'
import { ActivityTab } from './activity-tab'
import { TaskPanel } from './task-panel'
import {
  taskCounts, goLiveIso, daysBetween, formatDate, localTodayIso, deriveHealth,
} from '@/lib/project-hub/hub-model'
import { TIMELINE_END } from '@/lib/project-hub/dates'
import type { HubPayload, PtTask } from '@/lib/project-hub/types'

function HubInner({ initial }: { initial: HubPayload }) {
  const { data } = useHub(initial)
  const invalidate = useHubInvalidate()
  const { viewers, live } = useHubRealtime(initial.project.id, invalidate)
  const payload = data ?? initial

  const [activeTab, setActiveTab] = useState<TabId>('timeline')
  const [openTask, setOpenTask] = useState<PtTask | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function navigate(id: TabId) {
    setActiveTab(id)
    window.scrollTo({ top: 0 })
  }

  // React Compiler auto-memoizes; manual useMemo is unnecessary (and lint-flagged) here.
  const today = localTodayIso()
  const overall = taskCounts(payload.tasks)
  const goLive = goLiveIso(payload.milestones) ?? TIMELINE_END
  const health = deriveHealth(payload, today)

  const model: HeaderModel = {
    daysToGoLive: daysBetween(today, goLive),
    goLiveLabel: formatDate(goLive, 'dMMM'),
    overallPct: overall.pct,
    doneCount: overall.complete,
    totalCount: overall.total,
    health,
  }

  const highRisks = payload.risks.filter((r) => r.impact === 'high').length
  const delDone = payload.deliverables.filter((d) => d.done).length
  const tabs: TabDef[] = [
    { id: 'overview', label: 'Overview', badge: null },
    { id: 'timeline', label: 'Timeline', badge: String(payload.tasks.length) },
    { id: 'milestones', label: 'Milestones', badge: String(payload.milestones.length) },
    { id: 'risks', label: 'Risks', badge: highRisks ? `${highRisks} high` : String(payload.risks.length), badgeTone: highRisks ? 'danger' : 'default' },
    { id: 'tech', label: 'Tech stack', badge: String(payload.techStack.length) },
    { id: 'deliverables', label: 'Deliverables', badge: `${delDone}/${payload.deliverables.length}` },
    { id: 'activity', label: 'Activity', badge: null },
  ]

  return (
    <div className="min-h-screen bg-[var(--surface)] text-foreground">
      <HeaderBand payload={payload} viewers={viewers} live={live} scrolled={scrolled} model={model} />
      <TabNav tabs={tabs} active={activeTab} onSelect={navigate} top={scrolled ? 47 : 65} />

      {health.atRisk ? (
        <div
          role="alert"
          className="border-b px-4 py-[9px] sm:px-6 lg:px-8"
          style={{ background: 'var(--status-warning-50)', borderColor: 'color-mix(in oklab, var(--status-warning-500) 35%, var(--border))' }}
        >
          <div className="flex items-center gap-2.5 text-[12.5px] font-medium" style={{ color: 'var(--status-warning-700)' }}>
            <TriangleAlert aria-hidden size={15} className="flex-none" />
            <span className="font-semibold">Attention needed</span>
            <span style={{ color: 'color-mix(in oklab, var(--status-warning-700) 80%, var(--foreground))' }}>
              {health.reasons.join(' · ')}
            </span>
          </div>
        </div>
      ) : null}

      <div aria-live="polite" className="sr-only">
        Project data updates automatically while teammates edit.
      </div>

      <main className="w-full px-4 pb-16 pt-[22px] sm:px-6 lg:px-8">
        {activeTab === 'overview' ? <OverviewTab payload={payload} /> : null}
        {activeTab === 'timeline' ? <TimelineTab payload={payload} onOpenTask={setOpenTask} /> : null}
        {activeTab === 'milestones' ? <MilestonesTab payload={payload} /> : null}
        {activeTab === 'risks' ? <RisksTab payload={payload} /> : null}
        {activeTab === 'tech' ? <TechStackTab payload={payload} /> : null}
        {activeTab === 'deliverables' ? <DeliverablesTab payload={payload} /> : null}
        {activeTab === 'activity' ? <ActivityTab /> : null}
      </main>

      <TaskPanel task={openTask} payload={payload} onClose={() => setOpenTask(null)} />
    </div>
  )
}

export function HubShell({ initial }: { initial: HubPayload }) {
  const [qc] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: 1 } } }))
  return (
    <QueryClientProvider client={qc}>
      <HubInner initial={initial} />
    </QueryClientProvider>
  )
}
