'use client'

// src/components/header/announcement-bar.tsx
// Announcement bar per Figma (node 258:9): brand-900 strip, 13px white message,
// optional underlined CTA link, optional dismiss ✕.
// Fully CMS-driven from siteSettings.announcementBar: honors enabled, message,
// linkText/linkUrl, dismissible, showOnPages. The startDate/endDate window is
// enforced by the SERVER caller via isAnnouncementInWindow (announcement-window.ts)
// so expired announcements never ship HTML. The `style` field is intentionally
// ignored — the Figma design has a single brand-900 treatment.
//
// Dismissal: sessionStorage keyed by message, so editing the announcement in
// Studio re-surfaces it for everyone. SSR renders the bar; users who already
// dismissed it this session see it removed on mount.
import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

export type AnnouncementData = {
  enabled?: boolean | null
  message?: string | null
  linkText?: string | null
  linkUrl?: string | null
  dismissible?: boolean | null
  showOnPages?: string | null
  startDate?: string | null
  endDate?: string | null
} | null

function dismissKey(message: string) {
  return `fcu-announcement-dismissed:${message}`
}

// sessionStorage as an external store (react-hooks/set-state-in-effect wants
// useSyncExternalStore, which also hydrates SSR→client safely).
const dismissListeners = new Set<() => void>()
function subscribeDismissals(cb: () => void) {
  dismissListeners.add(cb)
  return () => {
    dismissListeners.delete(cb)
  }
}
function readDismissed(message: string): boolean {
  try {
    return sessionStorage.getItem(dismissKey(message)) === '1'
  } catch {
    return false // sessionStorage unavailable (privacy mode) — keep the bar visible
  }
}

export function AnnouncementBar({
  announcement,
}: {
  announcement: AnnouncementData
}) {
  const pathname = usePathname()
  const message = announcement?.message

  const dismissed = useSyncExternalStore(
    subscribeDismissals,
    () => (message ? readDismissed(message) : false),
    () => false, // server snapshot: always render; client corrects after hydration
  )

  if (!announcement?.enabled || !message || dismissed) return null
  if (announcement.showOnPages === 'homepage-only' && pathname !== '/') return null

  const isExternal = !!announcement.linkUrl && !announcement.linkUrl.startsWith('/')
  const linkClasses =
    'shrink-0 text-[13px] font-medium text-neutral-0 underline underline-offset-2'

  const onDismiss = () => {
    try {
      sessionStorage.setItem(dismissKey(message), '1')
    } catch {
      // non-fatal
    }
    dismissListeners.forEach((cb) => cb())
  }

  return (
    <div
      className='flex w-full items-center gap-2 bg-fcu-primary-900 px-6 py-2.5'
      data-slot='announcement-bar'
    >
      <p className='min-w-0 truncate text-[13px] leading-normal text-neutral-0'>
        {message}
      </p>
      {announcement.linkText &&
        announcement.linkUrl &&
        (isExternal ? (
          <a
            href={announcement.linkUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={linkClasses}
          >
            {announcement.linkText}
          </a>
        ) : (
          <Link href={announcement.linkUrl} className={linkClasses}>
            {announcement.linkText}
          </Link>
        ))}
      <span className='flex-1' aria-hidden='true' />
      {announcement.dismissible && (
        <button
          type='button'
          onClick={onDismiss}
          aria-label='Dismiss announcement'
          className='shrink-0 rounded-sm p-0.5 text-neutral-0/90 transition-colors hover:text-neutral-0'
        >
          <X className='size-3.5' aria-hidden='true' />
        </button>
      )}
    </div>
  )
}
