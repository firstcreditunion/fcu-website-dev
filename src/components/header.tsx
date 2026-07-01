import { sanityFetch } from '@/sanity/lib/live'
import {
  HEADER_NAVIGATION_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/lib/queries'
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity/types'
import { HeaderClient } from '@/components/header/header-client'
import { visibleAnnouncement } from '@/components/header/announcement-window'

export default async function Header() {
  const [{ data }, { data: settings }] = await Promise.all([
    sanityFetch({ query: HEADER_NAVIGATION_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
  ])

  // Server-side date-window filter: expired/scheduled-out announcements never
  // ship HTML (the client only handles enabled/dismiss/page gating).
  // Cast: SITE_SETTINGS_QUERY_RESULT is a union whose fallback branch types
  // announcementBar as literal null; replacing the field with the same-or-null
  // value is shape-preserving at runtime.
  const siteSettings = settings
    ? ({
        ...settings,
        announcementBar: visibleAnnouncement(settings.announcementBar),
      } as SITE_SETTINGS_QUERY_RESULT)
    : null

  return <HeaderClient data={data} siteSettings={siteSettings} />
}
