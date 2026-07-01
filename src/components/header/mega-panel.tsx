// src/components/header/mega-panel.tsx
// Mega-menu sheet per Figma "Option 3.1 — Detached floating panel"
// (node 266:519, chosen by Isaac 2026-07-02 over the flush 259:44 variant):
// floats 16px below the bar, rounded-3xl (22px) all corners, full border,
// Shadow/xl — audience intro card · link columns with mono eyebrows +
// hairlines · featured card (rate or media) · optional campaign strip.
// All slots are optional; hairlines only separate rendered sections.
// (The 16px gap itself lives on the wrapper in header-client.tsx.)
import { createElement, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { HEADER_NAVIGATION_QUERY_RESULT } from '@/sanity/types'
import { NAV_ICONS, getHref, isExternalLink } from './nav-icons'
import { MenuLink, BadgePill } from './menu-link'

type NavItem = NonNullable<
  NonNullable<HEADER_NAVIGATION_QUERY_RESULT>['mainNav']
>[number]

function Hairline() {
  return <span aria-hidden='true' className='w-px self-stretch bg-border' />
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className='font-mono text-[10.5px] uppercase tracking-[0.63px] leading-normal text-foreground-subtle'>
      {children}
    </p>
  )
}

/** introCard.icon: registry name → 24px lucide icon, anything else → literal glyph. */
function IntroGlyph({ icon }: { icon?: string | null }) {
  if (icon && NAV_ICONS[icon]) {
    return createElement(NAV_ICONS[icon], { className: 'size-6 text-primary' })
  }
  return <span className='text-2xl leading-none text-primary'>{icon ?? '●'}</span>
}

/** Internal/external anchor for the featured-card + campaign-strip links. */
function PanelLink({
  link,
  className,
  onNavigate,
  children,
}: {
  link: { linkType?: string | null; url?: string | null; externalUrl?: string | null; openInNewTab?: boolean | null }
  className: string
  onNavigate?: () => void
  children: React.ReactNode
}) {
  const href = getHref(link)
  if (isExternalLink(link)) {
    return (
      <a href={href} target='_blank' rel='noopener noreferrer' className={className} onClick={onNavigate}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  )
}

export function MegaPanel({
  item,
  panelId,
  onNavigate,
}: {
  item: NavItem
  panelId: string
  onNavigate: () => void
}) {
  const groups = item.megaMenu ?? []
  const { introCard, featuredCard, campaignStrip } = item

  // Assemble the columns row: intro card, link columns, featured card —
  // separated by hairlines between every rendered section.
  const sections: React.ReactNode[] = []

  if (introCard) {
    sections.push(
      <div
        key='intro'
        className='flex w-[250px] shrink-0 flex-col gap-2 self-stretch rounded-lg bg-surface-muted p-5'
        data-slot='intro-card'
      >
        <span
          aria-hidden='true'
          className='flex size-16 items-center justify-center rounded-full bg-primary-subtle'
        >
          <IntroGlyph icon={introCard.icon} />
        </span>
        {introCard.title && (
          <p className='text-[17px] font-semibold text-foreground'>{introCard.title}</p>
        )}
        {introCard.blurb && (
          <p className='text-[13px] leading-[1.5] text-foreground-muted'>{introCard.blurb}</p>
        )}
      </div>,
    )
  }

  for (const group of groups) {
    sections.push(
      <div
        key={group._key}
        className='flex min-w-0 flex-1 flex-col gap-1.5'
        data-slot='panel-column'
      >
        {group.title && <Eyebrow>{group.title}</Eyebrow>}
        {group.items?.map((link) => (
          <MenuLink key={link._key} link={link} onNavigate={onNavigate} />
        ))}
      </div>,
    )
  }

  if (featuredCard) {
    const img = featuredCard.image?.asset
    sections.push(
      <div
        key='featured'
        className='flex w-[250px] shrink-0 flex-col gap-1.5 self-stretch overflow-hidden rounded-lg bg-primary-subtle p-5'
        data-slot='featured-card'
      >
        {img?.url && (
          <div className='relative -mx-5 -mt-5 mb-2 h-[110px]'>
            <Image
              src={img.url}
              alt={featuredCard.image?.alt ?? ''}
              fill
              className='object-cover'
              sizes='250px'
              {...(img.metadata?.lqip
                ? { placeholder: 'blur' as const, blurDataURL: img.metadata.lqip }
                : {})}
            />
          </div>
        )}
        {featuredCard.eyebrow && <Eyebrow>{featuredCard.eyebrow}</Eyebrow>}
        {featuredCard.headline && (
          <p className='font-mono text-[28px] font-semibold tracking-[-0.56px] leading-normal text-primary'>
            {featuredCard.headline}
          </p>
        )}
        {featuredCard.subtext && (
          <p className='text-sm font-medium text-foreground'>{featuredCard.subtext}</p>
        )}
        {featuredCard.link?.label && (
          <>
            <span aria-hidden='true' className='h-1' />
            <PanelLink
              link={featuredCard.link}
              className='text-[13px] text-primary transition-colors hover:text-primary-hover'
              onNavigate={onNavigate}
            >
              {featuredCard.link.label} →
            </PanelLink>
          </>
        )}
      </div>,
    )
  }

  return (
    <div
      id={panelId}
      className='mx-auto flex w-full max-w-[1200px] flex-col gap-5 rounded-3xl border border-border bg-popover px-7 pt-7 pb-6 shadow-[var(--shadow-xl)]'
      data-slot='mega-panel'
    >
      {sections.length > 0 && (
        <div className='flex w-full items-stretch gap-6'>
          {sections.map((section, i) => (
            <Fragment key={i}>
              {i > 0 && <Hairline />}
              {section}
            </Fragment>
          ))}
        </div>
      )}

      {campaignStrip && (campaignStrip.text || campaignStrip.badge) && (
        <div
          className='flex w-full items-center gap-2.5 rounded-md bg-surface-muted px-4 py-3'
          data-slot='campaign-strip'
        >
          {campaignStrip.badge && <BadgePill>{campaignStrip.badge}</BadgePill>}
          {campaignStrip.text && (
            <p className='min-w-0 flex-1 text-[13px] text-foreground-muted'>
              {campaignStrip.text}
            </p>
          )}
          {campaignStrip.link?.label && (
            <PanelLink
              link={campaignStrip.link}
              className='shrink-0 text-[13px] font-semibold text-primary transition-colors hover:text-primary-hover'
              onNavigate={onNavigate}
            >
              {campaignStrip.link.label}
            </PanelLink>
          )}
        </div>
      )}
    </div>
  )
}
