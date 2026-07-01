// src/components/header/announcement-window.test.ts
import { describe, it, expect } from 'vitest'
import { isAnnouncementInWindow } from './announcement-window'

const NOW = Date.parse('2026-07-02T12:00:00Z')

describe('isAnnouncementInWindow', () => {
  it('false for null announcement', () => {
    expect(isAnnouncementInWindow(null, NOW)).toBe(false)
  })
  it('true when no window is set', () => {
    expect(isAnnouncementInWindow({ message: 'hi' }, NOW)).toBe(true)
  })
  it('false before startDate', () => {
    expect(
      isAnnouncementInWindow({ startDate: '2026-07-03T00:00:00Z' }, NOW),
    ).toBe(false)
  })
  it('true after startDate', () => {
    expect(
      isAnnouncementInWindow({ startDate: '2026-07-01T00:00:00Z' }, NOW),
    ).toBe(true)
  })
  it('false after endDate', () => {
    expect(isAnnouncementInWindow({ endDate: '2026-07-01T00:00:00Z' }, NOW)).toBe(
      false,
    )
  })
  it('true inside a full window', () => {
    expect(
      isAnnouncementInWindow(
        { startDate: '2026-07-01T00:00:00Z', endDate: '2026-07-03T00:00:00Z' },
        NOW,
      ),
    ).toBe(true)
  })
})
