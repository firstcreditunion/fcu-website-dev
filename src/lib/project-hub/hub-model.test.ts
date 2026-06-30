import { describe, it, expect } from 'vitest'
import {
  taskCounts, phaseState, goLiveIso, overdueMilestones, nextMilestone,
  statusSegments, deriveHealth, daysBetween, formatDate, localTodayIso,
  phaseColorVar, milestoneState, STATUS_ORDER, IMPACT_ORDER,
} from './hub-model'
import type { HubPayload, PtTask, PtMilestone } from './types'

const mk = (status: PtTask['status'], n = 1): PtTask[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${status}-${i}`, project_id: 'p', group_id: 'g', name: 'x',
    start_date: null, end_date: null, duration_label: null, status, notes: null, sort_order: i,
    created_at: '', updated_at: '', updated_by_id: null, updated_by_name: null,
    deleted_at: null, deleted_by_id: null, deleted_by_name: null,
  }))

describe('taskCounts', () => {
  it('counts by status and computes pct excluding N/A', () => {
    const tasks = [...mk('complete', 3), ...mk('in_progress', 1), ...mk('na', 2), ...mk('not_started', 4)]
    const c = taskCounts(tasks)
    expect(c.total).toBe(10)
    expect(c.complete).toBe(3)
    expect(c.na).toBe(2)
    // pct = complete / (total - na) = 3 / 8 = 37.5 → 38
    expect(c.pct).toBe(38)
  })
  it('pct is 0 when only N/A tasks', () => {
    expect(taskCounts(mk('na', 3)).pct).toBe(0)
  })
  it('pct is 100 when all non-na complete', () => {
    expect(taskCounts([...mk('complete', 4), ...mk('na', 1)]).pct).toBe(100)
  })
})

describe('phaseState', () => {
  const today = '2026-06-30'
  it('done when pct is 100 regardless of dates', () => {
    expect(phaseState({ start_date: '2026-08-01', end_date: '2026-08-31' }, taskCounts(mk('complete', 2)), today)).toBe('done')
  })
  it('active when started and not past', () => {
    expect(phaseState({ start_date: '2026-06-01', end_date: '2026-07-31' }, taskCounts(mk('in_progress', 2)), today)).toBe('active')
  })
  it('behind when ended in the past and not done', () => {
    expect(phaseState({ start_date: '2026-02-01', end_date: '2026-03-01' }, taskCounts(mk('not_started', 2)), today)).toBe('behind')
  })
  it('upcoming when not yet started', () => {
    expect(phaseState({ start_date: '2026-08-01', end_date: '2026-08-31' }, taskCounts(mk('not_started', 2)), today)).toBe('upcoming')
  })
})

const milestones: PtMilestone[] = [
  { date: '2026-02-20', name: 'Technical Architecture Complete', achieved: true },
  { date: '2026-04-10', name: 'Design Approval', achieved: false },
  { date: '2026-08-12', name: 'Go-Live', achieved: false },
].map((m, i) => ({
  id: `m${i}`, project_id: 'p', deliverable: null, sort_order: i,
  created_at: '', updated_at: '', updated_by_id: null, updated_by_name: null,
  deleted_at: null, deleted_by_id: null, deleted_by_name: null, ...m,
}))

describe('milestones', () => {
  it('goLiveIso finds the Go-Live milestone date', () => {
    expect(goLiveIso(milestones)).toBe('2026-08-12')
    expect(goLiveIso([{ date: '2026-01-01', name: 'Kickoff' }])).toBeNull()
  })
  it('overdueMilestones = unachieved before today', () => {
    const od = overdueMilestones(milestones, '2026-06-30')
    expect(od.map((m) => m.name)).toEqual(['Design Approval'])
  })
  it('nextMilestone = soonest unachieved on/after today', () => {
    expect(nextMilestone(milestones, '2026-06-30')?.name).toBe('Go-Live')
    expect(nextMilestone(milestones, '2026-01-01')?.name).toBe('Design Approval')
  })
  it('milestoneState classifies nodes', () => {
    expect(milestoneState(milestones[0], '2026-06-30', false)).toBe('achieved')
    expect(milestoneState(milestones[1], '2026-06-30', false)).toBe('overdue')
    expect(milestoneState(milestones[2], '2026-06-30', true)).toBe('goLive')
    expect(milestoneState(milestones[2], '2026-06-30', false)).toBe('upcoming')
  })
})

describe('statusSegments', () => {
  it('returns only non-zero statuses with width pct of total', () => {
    const segs = statusSegments([...mk('complete', 2), ...mk('blocked', 2)])
    expect(segs.map((s) => s.status)).toEqual(['complete', 'blocked'])
    expect(segs.every((s) => s.pct === 50)).toBe(true)
  })
})

describe('deriveHealth', () => {
  const base: HubPayload = {
    project: { id: 'p', slug: 's', title: 't', subtitle: null, created_at: '', updated_at: '', updated_by_id: null, updated_by_name: null, deleted_at: null, deleted_by_id: null, deleted_by_name: null },
    facts: [], phases: [], groups: [], tasks: [], milestones, risks: [], techStack: [], deliverables: [],
  }
  it('at risk when blocked tasks present', () => {
    const h = deriveHealth({ ...base, tasks: mk('blocked', 1) }, '2026-06-30')
    expect(h.atRisk).toBe(true)
    expect(h.reasons[0]).toBe('1 blocked task')
  })
  it('at risk when overdue milestones present', () => {
    const h = deriveHealth(base, '2026-06-30') // Design Approval overdue
    expect(h.atRisk).toBe(true)
    expect(h.reasons.some((r) => r.includes('overdue milestone'))).toBe(true)
  })
  it('on track when nothing blocked or overdue', () => {
    const allAchieved = milestones.map((m) => ({ ...m, achieved: true }))
    const h = deriveHealth({ ...base, milestones: allAchieved, tasks: mk('complete', 2) }, '2026-06-30')
    expect(h.atRisk).toBe(false)
  })
})

describe('misc helpers', () => {
  it('daysBetween counts calendar days', () => {
    expect(daysBetween('2026-06-30', '2026-08-12')).toBe(43)
  })
  it('formatDate kinds', () => {
    expect(formatDate('2026-08-12', 'full')).toBe('12 August 2026')
    expect(formatDate('2026-08-12', 'dMMMy')).toBe('12 Aug 2026')
    expect(formatDate('2026-08-12', 'dMMM')).toBe('12 Aug')
    expect(formatDate(null)).toBe('—')
  })
  it('localTodayIso formats local date parts', () => {
    expect(localTodayIso(new Date(2026, 7, 2))).toBe('2026-08-02')
  })
  it('phaseColorVar wraps the token', () => {
    expect(phaseColorVar('color-fcu-primary-700')).toBe('var(--color-fcu-primary-700)')
  })
  it('orders are stable', () => {
    expect(STATUS_ORDER).toEqual(['not_started', 'in_progress', 'complete', 'blocked', 'na'])
    expect(IMPACT_ORDER).toEqual(['low', 'medium', 'high'])
  })
})
