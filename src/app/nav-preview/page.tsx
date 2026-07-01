// TEMPORARY fidelity-gate preview for the rebuilt header (plan Task 7).
// Lives at app root — OUTSIDE the (frontend) group — so the old live Header
// (rendered by (frontend)/layout.tsx) does not appear alongside the new one.
// `?demo=1` swaps in hardcoded content mirroring the Figma composite
// (node 259:166) so pixel comparison needs no CMS writes.
// DELETED in Task 8 after the swap is approved.
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import {
  HEADER_NAVIGATION_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/lib/queries'
import type { HEADER_NAVIGATION_QUERY_RESULT } from '@/sanity/types'
import { HeaderClient } from '@/components/header/header-client'
import { isAnnouncementInWindow } from '@/components/header/announcement-window'

export const metadata: Metadata = {
  title: 'Nav preview (temporary)',
  robots: { index: false, follow: false },
}

type DemoIconName =
  | 'credit-card'
  | 'wallet'
  | 'file-text'
  | 'send'
  | 'globe'
  | 'calculator'
  | 'help-circle'
  | 'home'
  | 'map-pin'
  | 'percent'
  | 'phone'
  | 'shield'
  | 'trending-up'

const demoLink = (
  key: string,
  label: string,
  description: string,
  icon: DemoIconName,
  badge: string | null = null,
) => ({
  _key: key,
  label,
  description,
  image: null,
  linkType: 'internal' as const,
  url: '/',
  externalUrl: null,
  openInNewTab: null,
  icon,
  badge,
})

// Plain helper (not a component) so the impure Date.now stays out of render
// per react-hooks/purity; runs per-request in this dynamic route.
function visibleAnnouncement(
  announcement: Parameters<typeof isAnnouncementInWindow>[0],
) {
  return announcement && isAnnouncementInWindow(announcement, Date.now())
    ? announcement
    : null
}

/** Content of the Figma composite (node 259:166) — the "Everyday" panel. */
const DEMO_NAV: HEADER_NAVIGATION_QUERY_RESULT = {
  mainNav: [
    {
      _key: 'everyday',
      label: 'Everyday',
      url: '/everyday',
      featuredPosition: null,
      megaMenu: [
        {
          _key: 'accounts',
          title: 'Accounts & Cards',
          isFeatured: null,
          items: [
            demoLink('l1', 'Everyday Account', 'No-fee spending with a contactless debit card.', 'credit-card'),
            demoLink('l2', 'Debit & Credit Cards', 'Cards that work everywhere you do.', 'wallet'),
            demoLink('l3', 'Statements & Documents', 'Every record, ready when you need it.', 'file-text'),
          ],
        },
        {
          _key: 'payments',
          title: 'Payments',
          isFeatured: null,
          items: [
            demoLink('l4', 'Transfers & Payments', 'Instant between members, fast everywhere else.', 'send'),
            demoLink('l5', 'International Transfers', 'Send money overseas at fair member rates.', 'globe', 'NEW'),
            demoLink('l6', 'Bill Payments', 'Set and forget your regular bills.', 'file-text'),
          ],
        },
      ],
      introCard: {
        icon: '☂',
        title: 'For everyday banking',
        blurb:
          'Accounts and cards for day-to-day life — no monthly fees, profits back to members.',
      },
      featuredCard: {
        eyebrow: 'FEATURED RATE',
        headline: '4.85% p.a.',
        subtext: 'Everyday Saver',
        image: null,
        link: {
          label: 'See all rates',
          linkType: 'internal',
          url: '/rates',
          externalUrl: null,
          openInNewTab: null,
          icon: null,
          badge: null,
        },
      },
      campaignStrip: {
        badge: 'NEW',
        text: 'International transfers are here — send money overseas without the run-around.',
        link: {
          label: 'Learn more',
          linkType: 'internal',
          url: '/',
          externalUrl: null,
          openInNewTab: null,
        },
      },
    },
    {
      _key: 'borrow',
      label: 'Borrow',
      url: '/loans',
      featuredPosition: null,
      megaMenu: [
        {
          _key: 'lending',
          title: 'Lending',
          isFeatured: null,
          items: [
            demoLink('b1', 'Home Loans', 'Fair rates and a local lender on the other end.', 'home'),
            demoLink('b2', 'Personal Loans', 'For the moments that matter.', 'calculator'),
          ],
        },
      ],
      introCard: {
        icon: '⌂',
        title: 'For borrowing',
        blurb:
          'Fair rates, honest answers, and a local lender on the other end — not a call centre.',
      },
      featuredCard: null,
      campaignStrip: null,
    },
    {
      _key: 'save',
      label: 'Save & Invest',
      url: '/save',
      featuredPosition: null,
      megaMenu: [],
      introCard: null,
      featuredCard: null,
      campaignStrip: null,
    },
    {
      _key: 'help',
      label: 'Help',
      url: '/help',
      featuredPosition: null,
      megaMenu: [],
      introCard: null,
      featuredCard: null,
      campaignStrip: null,
    },
    {
      _key: 'about',
      label: 'About',
      url: '/about',
      featuredPosition: null,
      megaMenu: [],
      introCard: null,
      featuredCard: null,
      campaignStrip: null,
    },
  ],
  utilityNav: {
    primaryAction: { label: 'Become a member', url: '/join' },
    secondaryAction: { label: 'Log in', url: 'https://banking.firstcu.co.nz' },
    showSearch: true,
  },
}

const DEMO_ANNOUNCEMENT = {
  enabled: true,
  message: 'New — international transfers at fair member rates.',
  linkText: 'Learn more',
  linkUrl: '/',
  style: 'info',
  dismissible: true,
  showOnPages: 'all',
  startDate: null,
  endDate: null,
}

export default async function NavPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>
}) {
  const { demo } = await searchParams
  const [{ data: nav }, { data: settings }] = await Promise.all([
    sanityFetch({ query: HEADER_NAVIGATION_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
  ])

  const isDemo = demo === '1'
  const navData = isDemo ? DEMO_NAV : nav

  // Server-side date-window filter (expired announcements never ship HTML).
  const announcement = isDemo
    ? DEMO_ANNOUNCEMENT
    : visibleAnnouncement(settings?.announcementBar ?? null)

  // Cast: demo announcement is structurally compatible with the projected
  // announcementBar shape; this temp route dies in Task 8.
  const effectiveSettings = (
    settings ? { ...settings, announcementBar: announcement } : null
  ) as Parameters<typeof HeaderClient>[0]['siteSettings']

  return (
    <div className='min-h-[200vh] bg-surface'>
      <HeaderClient data={navData} siteSettings={effectiveSettings} />
      {/* page-behind filler so panel overlay + scrolled state are realistic */}
      <main className='mx-auto flex max-w-screen-xl flex-col gap-6 px-8 py-16'>
        <div className='h-40 rounded-lg bg-surface-sunken' />
        <div className='h-40 rounded-lg bg-surface-sunken' />
        <div className='h-40 rounded-lg bg-surface-sunken' />
      </main>
    </div>
  )
}
