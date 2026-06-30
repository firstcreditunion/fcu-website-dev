// Pure view-model derivations for the Project Hub UI (redesign).
// Mirrors the computed values from the approved Claude Design prototype, operating
// on the real HubPayload. Kept framework-free + side-effect-free so it is unit-tested.
import { format, parseISO, differenceInCalendarDays } from 'date-fns'
import {
  type HubPayload, type PtTask, type PtPhase, type PtMilestone,
  type PtTaskStatus, type PtRiskImpact, TASK_STATUSES,
} from './types'

// ---- status / impact visual maps (CSS custom-property names from globals.css) ----
export interface SwatchTokens {
  label: string
  color: string // strong fill
  soft: string // tinted background
  on: string // text on soft
}

export const STATUS: Record<PtTaskStatus, SwatchTokens> = {
  not_started: { label: 'Not started', color: 'var(--neutral-400)', soft: 'var(--surface-sunken)', on: 'var(--foreground-muted)' },
  in_progress: { label: 'In progress', color: 'var(--status-info-500)', soft: 'var(--status-info-50)', on: 'var(--status-info-700)' },
  complete: { label: 'Complete', color: 'var(--status-success-500)', soft: 'var(--status-success-50)', on: 'var(--status-success-700)' },
  blocked: { label: 'Blocked', color: 'var(--status-danger-500)', soft: 'var(--status-danger-50)', on: 'var(--status-danger-700)' },
  na: { label: 'N/A', color: 'var(--neutral-300)', soft: 'var(--surface-muted)', on: 'var(--foreground-subtle)' },
}

export const STATUS_ORDER: PtTaskStatus[] = TASK_STATUSES

export const IMPACT: Record<PtRiskImpact, SwatchTokens> = {
  low: { label: 'Low', color: 'var(--status-success-500)', soft: 'var(--status-success-50)', on: 'var(--status-success-700)' },
  medium: { label: 'Medium', color: 'var(--status-warning-500)', soft: 'var(--status-warning-50)', on: 'var(--status-warning-700)' },
  high: { label: 'High', color: 'var(--status-danger-500)', soft: 'var(--status-danger-50)', on: 'var(--status-danger-700)' },
}

export const IMPACT_ORDER: PtRiskImpact[] = ['low', 'medium', 'high']

/** Phase swimlane colour from a DB token (e.g. `color-fcu-primary-700`). */
export function phaseColorVar(colorToken: string): string {
  return `var(--${colorToken})`
}

// The approved design assigns each phase a distinct brand-ramp colour by number.
// Kept in the frontend (not the shared DB) so the palette ships atomically with
// the redesign and doesn't alter the current live tracker.
export const PHASE_COLOR_TOKEN: Record<number, string> = {
  1: 'color-fcu-primary-700',
  2: 'color-fcu-primary-400',
  3: 'color-fcu-secondary-600',
  4: 'color-fcu-mint-600',
  5: 'color-fcu-green-faded-700',
  6: 'color-fcu-primary-900',
}
/** Phase colour by phase_number, with a stable fallback for any extra phases. */
export function phaseColor(phaseNumber: number): string {
  const token = PHASE_COLOR_TOKEN[phaseNumber] ?? 'color-fcu-primary-700'
  return `var(--${token})`
}

// ---- dates ----
/** Local-time today as YYYY-MM-DD (never toISOString — that drifts to UTC). */
export function localTodayIso(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function daysBetween(aIso: string, bIso: string): number {
  return differenceInCalendarDays(parseISO(bIso), parseISO(aIso))
}

export type DateKind = 'full' | 'dMMMy' | 'dMMM' | 'wk'
export function formatDate(iso: string | null, kind: DateKind = 'dMMM'): string {
  if (!iso) return '—'
  const d = parseISO(iso)
  switch (kind) {
    case 'full': return format(d, 'd MMMM yyyy')
    case 'dMMMy': return format(d, 'd MMM yyyy')
    case 'wk': return format(d, 'EEE d MMM')
    default: return format(d, 'd MMM')
  }
}

export function taskDurationLabel(task: Pick<PtTask, 'duration_label' | 'start_date' | 'end_date'>, computed: string): string {
  return task.duration_label ?? computed
}

// ---- counts ----
export interface Counts {
  total: number
  not_started: number
  in_progress: number
  complete: number
  blocked: number
  na: number
  /** % complete of tasks that count (excludes N/A). */
  pct: number
}

export function taskCounts(tasks: Pick<PtTask, 'status'>[]): Counts {
  const c: Counts = { total: tasks.length, not_started: 0, in_progress: 0, complete: 0, blocked: 0, na: 0, pct: 0 }
  for (const t of tasks) c[t.status]++
  const denom = c.total - c.na
  c.pct = denom > 0 ? Math.round((c.complete / denom) * 100) : 0
  return c
}

export function tasksForPhase(payload: HubPayload, phaseId: string): PtTask[] {
  const groupIds = new Set(payload.groups.filter((g) => g.phase_id === phaseId).map((g) => g.id))
  return payload.tasks.filter((t) => groupIds.has(t.group_id))
}

// ---- phase state ----
export type PhaseStateKey = 'done' | 'active' | 'behind' | 'upcoming'
export const PHASE_STATE_LABEL: Record<PhaseStateKey, string> = {
  done: 'Done', active: 'Active', behind: 'Behind', upcoming: 'Upcoming',
}

export function phaseState(phase: Pick<PtPhase, 'start_date' | 'end_date'>, counts: Counts, todayIso: string): PhaseStateKey {
  if (counts.pct === 100) return 'done'
  const today = parseISO(todayIso)
  const past = phase.end_date ? parseISO(phase.end_date) < today : false
  const started = phase.start_date ? parseISO(phase.start_date) <= today : false
  if (started && !past) return 'active'
  if (past) return 'behind'
  return 'upcoming'
}

// ---- milestones ----
export function goLiveIso(milestones: Pick<PtMilestone, 'date' | 'name'>[]): string | null {
  const m = milestones.find((x) => /go\s*-?\s*live/i.test(x.name))
  return m ? m.date : null
}

export function overdueMilestones(milestones: PtMilestone[], todayIso: string): PtMilestone[] {
  const today = parseISO(todayIso)
  return milestones.filter((m) => !m.achieved && parseISO(m.date) < today)
}

export function nextMilestone(milestones: PtMilestone[], todayIso: string): PtMilestone | null {
  const today = parseISO(todayIso)
  return (
    milestones
      .filter((m) => !m.achieved && parseISO(m.date) >= today)
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())[0] ?? null
  )
}

/** Milestone presentation state for the vertical timeline nodes. */
export type MilestoneState = 'achieved' | 'overdue' | 'goLive' | 'upcoming'
export function milestoneState(m: PtMilestone, todayIso: string, isGoLive: boolean): MilestoneState {
  if (m.achieved) return 'achieved'
  if (parseISO(m.date) < parseISO(todayIso)) return 'overdue'
  if (isGoLive) return 'goLive'
  return 'upcoming'
}

// ---- status breakdown segments (Overview) ----
export interface StatusSeg {
  status: PtTaskStatus
  label: string
  count: number
  /** width % of total task count */
  pct: number
}
export function statusSegments(tasks: Pick<PtTask, 'status'>[]): StatusSeg[] {
  const c = taskCounts(tasks)
  const total = c.total || 1
  return STATUS_ORDER.map((s) => ({ status: s, label: STATUS[s].label, count: c[s], pct: (c[s] / total) * 100 })).filter(
    (x) => x.count > 0,
  )
}

// ---- health ----
export interface Health {
  atRisk: boolean
  reasons: string[]
}
export function deriveHealth(payload: HubPayload, todayIso: string): Health {
  const blocked = payload.tasks.filter((t) => t.status === 'blocked').length
  const overdue = overdueMilestones(payload.milestones, todayIso).length
  const reasons: string[] = []
  if (blocked) reasons.push(`${blocked} blocked ${blocked === 1 ? 'task' : 'tasks'}`)
  if (overdue) reasons.push(`${overdue} overdue milestone${overdue === 1 ? '' : 's'}`)
  reasons.push('compressed 7-month timeline')
  return { atRisk: blocked > 0 || overdue > 0, reasons }
}
