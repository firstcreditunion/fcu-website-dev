'use client'

import { useRef } from 'react'
import { LayoutGrid, GanttChartSquare, Flag, TriangleAlert, Layers, ListChecks, History } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TabId = 'overview' | 'timeline' | 'milestones' | 'risks' | 'tech' | 'deliverables' | 'activity'

export interface TabDef {
  id: TabId
  label: string
  badge: string | null
  badgeTone?: 'default' | 'danger'
}

const ICON: Record<TabId, typeof LayoutGrid> = {
  overview: LayoutGrid,
  timeline: GanttChartSquare,
  milestones: Flag,
  risks: TriangleAlert,
  tech: Layers,
  deliverables: ListChecks,
  activity: History,
}

export const TAB_ORDER: TabId[] = ['overview', 'timeline', 'milestones', 'risks', 'tech', 'deliverables', 'activity']

export function TabNav({
  tabs, active, onSelect, top,
}: {
  tabs: TabDef[]
  active: TabId
  onSelect: (id: TabId) => void
  top: number
}) {
  const listRef = useRef<HTMLDivElement | null>(null)

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const i = TAB_ORDER.indexOf(active)
    const ni = e.key === 'ArrowRight' ? (i + 1) % TAB_ORDER.length : (i - 1 + TAB_ORDER.length) % TAB_ORDER.length
    onSelect(TAB_ORDER[ni])
    requestAnimationFrame(() => {
      listRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${TAB_ORDER[ni]}"]`)?.focus()
    })
  }

  return (
    <nav
      className="sticky z-[39] border-b border-[var(--border)] bg-[var(--background)] transition-[top] duration-200"
      style={{ top }}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-label="Project Hub views"
        onKeyDown={onKeyDown}
        className="flex items-stretch gap-0.5 overflow-x-auto px-4 sm:px-6 lg:px-8 [scrollbar-width:thin]"
      >
        {tabs.map((t) => {
          const Icon = ICON[t.id]
          const isActive = t.id === active
          const danger = t.badgeTone === 'danger'
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              data-tab={t.id}
              onClick={() => onSelect(t.id)}
              className={cn(
                'inline-flex cursor-pointer items-center gap-[7px] whitespace-nowrap border-b-2 px-3.5 py-3 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-ring',
                isActive
                  ? 'border-[var(--primary)] font-semibold text-[var(--primary)]'
                  : 'border-transparent font-medium text-foreground-muted hover:text-foreground',
              )}
              style={{ marginBottom: -1 }}
            >
              <Icon aria-hidden size={15} className="inline-flex" />
              <span>{t.label}</span>
              {t.badge ? (
                <span
                  className="rounded-full px-1.5 py-0.5 font-mono text-[10px] font-semibold leading-none tabular-nums"
                  style={{
                    background: danger ? 'var(--status-danger-50)' : isActive ? 'var(--primary-subtle)' : 'var(--surface-sunken)',
                    color: danger ? 'var(--status-danger-700)' : isActive ? 'var(--primary)' : 'var(--foreground-subtle)',
                  }}
                >
                  {t.badge}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
