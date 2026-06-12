import { differenceInCalendarDays, addDays, format, parseISO, isWeekend, startOfMonth, addMonths } from 'date-fns'

export const TIMELINE_START = '2026-02-01'
export const TIMELINE_END = '2026-09-30'
const START = parseISO(TIMELINE_START)
const TOTAL_DAYS = differenceInCalendarDays(parseISO(TIMELINE_END), START)

export function pct(iso: string): number {
  const d = differenceInCalendarDays(parseISO(iso), START)
  return Math.min(100, Math.max(0, (d / TOTAL_DAYS) * 100))
}

export function barGeometry(start: string | null, end: string | null): { leftPct: number; widthPct: number } | null {
  if (!start || !end) return null
  const left = pct(start)
  const right = pct(format(addDays(parseISO(end), 1), 'yyyy-MM-dd')) // inclusive end date
  return { leftPct: left, widthPct: Math.max(right - left, 0.6) }
}

function workdays(start: string, end: string): number {
  let d = parseISO(start)
  const e = parseISO(end)
  let n = 0
  while (d <= e) {
    if (!isWeekend(d)) n++
    d = addDays(d, 1)
  }
  return n
}

export function computedDurationLabel(start: string | null, end: string | null): string {
  if (!start || !end || parseISO(end) < parseISO(start)) return ''
  const wd = workdays(start, end)
  if (wd >= 5 && wd % 5 === 0) {
    const w = wd / 5
    return `${w} ${w === 1 ? 'week' : 'weeks'}`
  }
  return `${wd} ${wd === 1 ? 'day' : 'days'}`
}

export function monthTicks(): { label: string; leftPct: number }[] {
  const ticks: { label: string; leftPct: number }[] = []
  let m = startOfMonth(START)
  while (m <= parseISO(TIMELINE_END)) {
    ticks.push({ label: format(m, 'MMM'), leftPct: pct(format(m, 'yyyy-MM-dd')) })
    m = addMonths(m, 1)
  }
  return ticks
}

export function todayPct(todayIso: string): number | null {
  const p = pct(todayIso)
  return p <= 0 || p >= 100 ? null : p
}
