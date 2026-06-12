import { describe, it, expect } from 'vitest'
import { TIMELINE_START, TIMELINE_END, pct, barGeometry, computedDurationLabel, monthTicks, todayPct } from './dates'

describe('timeline math', () => {
  it('bounds: Feb 1 is 0%, end of window is 100%', () => {
    expect(pct(TIMELINE_START)).toBe(0)
    expect(pct(TIMELINE_END)).toBe(100)
    expect(pct('2025-12-25')).toBe(0)      // clamped
    expect(pct('2026-12-25')).toBe(100)    // clamped
  })
  it('bar geometry spans inclusive end date', () => {
    const g = barGeometry('2026-06-08', '2026-06-12')!
    expect(g.leftPct).toBeGreaterThan(52)
    expect(g.leftPct).toBeLessThan(54)
    expect(g.widthPct).toBeGreaterThan(1.5)
  })
  it('returns null when either date missing or dates inverted', () => {
    expect(barGeometry(null, '2026-06-12')).toBeNull()
    expect(barGeometry('2026-06-12', null)).toBeNull()
    expect(barGeometry('2026-06-12', '2026-06-08')).toBeNull()
  })
  it('today line: inside window only', () => {
    expect(todayPct('2026-06-12')).toBeGreaterThan(50)
    expect(todayPct('2026-02-01')).toBeNull() // boundary: invisible at 0%
    expect(todayPct('2025-12-25')).toBeNull()
    expect(todayPct('2026-10-15')).toBeNull()
  })
  it('duration labels match the workbook conventions', () => {
    expect(computedDurationLabel('2026-04-13', '2026-04-17')).toBe('1 week')   // 5 workdays
    expect(computedDurationLabel('2026-04-20', '2026-04-22')).toBe('3 days')
    expect(computedDurationLabel('2026-02-02', '2026-02-20')).toBe('3 weeks')  // 15 workdays
    expect(computedDurationLabel('2026-06-04', '2026-06-04')).toBe('1 day')
    expect(computedDurationLabel(null, '2026-06-04')).toBe('')
  })
  it('month ticks cover Feb..Sep 2026', () => {
    const ticks = monthTicks()
    expect(ticks[0].label).toBe('Feb')
    expect(ticks[ticks.length - 1].label).toBe('Sep')
    expect(ticks).toHaveLength(8)
    expect(ticks[4].leftPct).toBeGreaterThan(48) // Jun starts near midpoint
    expect(ticks[4].leftPct).toBeLessThan(52)
  })
})
