'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HeaderBand } from './header-band'
import { useHub, useHubInvalidate } from './use-hub'
import { useHubRealtime } from './use-realtime'
import { OverviewTab } from './overview-tab'
import { RisksTab } from './risks-tab'
import { TechStackTab } from './tech-stack-tab'
import { DeliverablesTab } from './deliverables-tab'
import type { HubPayload } from '@/lib/project-hub/types'

function HubInner({ initial }: { initial: HubPayload }) {
  const { data } = useHub(initial)
  const invalidate = useHubInvalidate()
  const { viewers, live } = useHubRealtime(initial.project.id, invalidate)
  const payload = data ?? initial
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <HeaderBand payload={payload} viewers={viewers} live={live} />
      <div aria-live="polite" className="sr-only">
        Project data updates automatically while others edit.
      </div>
      <Tabs defaultValue="timeline" className="mt-6">
        <TabsList variant="underline" className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="tech-stack">Tech stack</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6"><OverviewTab payload={payload} /></TabsContent>
        <TabsContent value="timeline" className="mt-6">
          <p className="text-sm text-foreground-muted">(timeline — coming in a later task)</p>
        </TabsContent>
        <TabsContent value="milestones" className="mt-6">
          <p className="text-sm text-foreground-muted">(milestones — coming in a later task)</p>
        </TabsContent>
        <TabsContent value="risks" className="mt-6"><RisksTab payload={payload} /></TabsContent>
        <TabsContent value="tech-stack" className="mt-6"><TechStackTab payload={payload} /></TabsContent>
        <TabsContent value="deliverables" className="mt-6"><DeliverablesTab payload={payload} /></TabsContent>
        <TabsContent value="activity" className="mt-6">
          <p className="text-sm text-foreground-muted">(activity — coming in a later task)</p>
        </TabsContent>
      </Tabs>
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
