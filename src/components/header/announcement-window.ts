// src/components/header/announcement-window.ts
// Pure date-window check for the announcement bar. Lives in a plain module
// (not 'use client') so SERVER components can call it — the server filters
// scheduled/expired announcements before render, so expired bars never ship
// HTML and the client component stays free of impure Date calls
// (react-hooks/purity).

import type { AnnouncementData } from './announcement-bar'

/** True when `now` falls inside the announcement's optional start/end window. */
export function isAnnouncementInWindow(
  announcement: AnnouncementData,
  now: number,
): boolean {
  if (!announcement) return false
  if (announcement.startDate && now < Date.parse(announcement.startDate)) return false
  if (announcement.endDate && now > Date.parse(announcement.endDate)) return false
  return true
}

/**
 * Impure convenience for SERVER callers (plain function, not a component, so
 * Date.now here satisfies react-hooks/purity): returns the announcement when
 * it is inside its window, else null.
 */
export function visibleAnnouncement<T extends AnnouncementData>(
  announcement: T,
): T | null {
  return announcement && isAnnouncementInWindow(announcement, Date.now())
    ? announcement
    : null
}
