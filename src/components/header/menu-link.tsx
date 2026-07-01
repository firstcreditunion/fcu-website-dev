// src/components/header/menu-link.tsx
// Mega-panel link row per Figma "Navbar / Menu Link" (node 256:67):
// 36px icon chip (primary-subtle) · 14px semibold label · optional badge pill ·
// 12.5px one-line benefit description. Hover = surface-muted (visual only).
import { createElement } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getHref, isExternalLink, resolveNavIcon } from './nav-icons'

export type MenuLinkData = {
  _key?: string
  label?: string | null
  description?: string | null
  icon?: string | null
  badge?: string | null
  linkType?: string | null
  url?: string | null
  externalUrl?: string | null
  openInNewTab?: boolean | null
}

/** Small mono badge pill ("NEW") — shared by MenuLink, MegaPanel campaign strip. */
export function BadgePill({ children }: { children: React.ReactNode }) {
  return (
    <span className='rounded-full bg-primary px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.54px] leading-normal text-primary-foreground'>
      {children}
    </span>
  )
}

export function MenuLink({
  link,
  onNavigate,
  className,
}: {
  link: MenuLinkData
  onNavigate?: () => void
  className?: string
}) {
  const href = getHref(link)
  const external = isExternalLink(link)

  const content = (
    <>
      <span
        aria-hidden='true'
        className='flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-subtle'
        data-slot='icon-chip'
      >
        {/* createElement of a stable registry component — not created during
            render; keeps react-hooks/static-components satisfied. */}
        {createElement(resolveNavIcon(link.icon), {
          className: 'size-[18px] text-primary',
        })}
      </span>
      <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <span className='flex items-center gap-1.5'>
          <span className='text-sm font-semibold text-foreground'>
            {link.label}
          </span>
          {link.badge && <BadgePill>{link.badge}</BadgePill>}
        </span>
        {link.description && (
          <span className='text-[12.5px] leading-[1.45] text-foreground-muted'>
            {link.description}
          </span>
        )}
      </span>
    </>
  )

  const classes = cn(
    'flex w-full items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-surface-muted',
    className,
  )

  if (external) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={classes}
        onClick={onNavigate}
        data-slot='menu-link'
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} onClick={onNavigate} data-slot='menu-link'>
      {content}
    </Link>
  )
}
