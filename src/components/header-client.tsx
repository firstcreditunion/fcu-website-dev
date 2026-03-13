'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown, ExternalLink, Search } from 'lucide-react'
import type { HEADER_NAVIGATION_QUERY_RESULT } from '@/sanity/types'
import { SiteSearch } from '@/components/site-search'

type NavData = NonNullable<HEADER_NAVIGATION_QUERY_RESULT>
type MainNavItem = NonNullable<NavData['mainNav']>[number]
type MegaMenuGroup = NonNullable<MainNavItem['megaMenu']>[number]
type NavLinkItem = NonNullable<MegaMenuGroup['items']>[number]

function getHref(link: NavLinkItem): string {
  return link.linkType === 'external'
    ? (link.externalUrl ?? '#')
    : (link.url ?? '#')
}

function isExternalLink(link: NavLinkItem): boolean {
  return link.linkType === 'external' || !!link.openInNewTab
}

const springTransition = {
  type: 'spring' as const,
  mass: 0.5,
  damping: 14,
  stiffness: 120,
  restDelta: 0.001,
}

export function HeaderClient({
  data,
}: {
  data: HEADER_NAVIGATION_QUERY_RESULT
}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenu = useCallback((key: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    setActiveMenu(key)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => setActiveMenu(null), 120)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const mainNav = data?.mainNav ?? []
  const utilityNav = data?.utilityNav

  return (
    <header className='sticky top-0 z-50 w-full'>
      <div className='border-b border-gray-100 bg-white/80 backdrop-blur-xl'>
        <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8'>
          {/* Logo — left */}
          <Link
            href='/'
            className='flex shrink-0 items-center'
            aria-label='First Credit Union — Home'
          >
            <Image
              src='/fcu-logo.png'
              alt='First Credit Union'
              width={120}
              height={48}
              className='h-10 w-auto lg:h-12'
              priority
            />
          </Link>

          {/* Desktop nav items — center */}
          <div className='hidden lg:flex'>
              <motion.nav
                className='relative'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                onMouseLeave={scheduleClose}
                aria-label='Main navigation'
              >
                <div className='px-1.5 py-1.5'>
                  <div className='flex items-center gap-0.5'>
                    {mainNav.map((item) => {
                      const hasMega = item.megaMenu && item.megaMenu.length > 0
                      const isOpen = activeMenu === item._key

                      return (
                        <div key={item._key} className='relative'>
                          <Link
                            href={item.url}
                            className={`relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                              isOpen
                                ? 'bg-fcu-primary-900 text-white shadow-md'
                                : 'text-fcu-primary-900 hover:bg-fcu-primary-100/60 hover:text-fcu-primary-950'
                            }`}
                            onMouseEnter={() => hasMega && openMenu(item._key)}
                            aria-expanded={hasMega ? isOpen : undefined}
                            aria-haspopup={hasMega ? 'true' : undefined}
                          >
                            {item.label}
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Desktop mega menu panels */}
                <AnimatePresence>
                  {activeMenu &&
                    (() => {
                      const item = mainNav.find((i) => i._key === activeMenu)
                      if (!item?.megaMenu || item.megaMenu.length === 0)
                        return null

                      const featuredGroups = item.megaMenu.filter(
                        (g) => g.isFeatured,
                      )
                      const plainGroups = item.megaMenu.filter(
                        (g) => !g.isFeatured,
                      )
                      const featuredOnRight = item.featuredPosition === 'right'

                      const featuredSection = featuredGroups.length > 0 && (
                        <div className='w-[320px] shrink-0'>
                          {featuredGroups.map((group) => (
                            <div key={group._key} className='mb-5 last:mb-0'>
                              <h3 className='mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground'>
                                {group.title}
                              </h3>
                              <div className='space-y-2'>
                                {group.items?.map((navLink, index) => (
                                  <motion.div
                                    key={navLink._key}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      duration: 0.2,
                                      delay: index * 0.04,
                                      ease: 'easeOut',
                                    }}
                                  >
                                    <FeaturedNavLink
                                      navLink={navLink}
                                      onClose={() => setActiveMenu(null)}
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )

                      const divider = featuredGroups.length > 0 &&
                        plainGroups.length > 0 && (
                          <div className='w-px self-stretch bg-gray-100' />
                        )

                      const plainSection = plainGroups.length > 0 && (
                        <div
                          className={`flex-1 grid gap-8 ${
                            plainGroups.length >= 4
                              ? 'grid-cols-4'
                              : plainGroups.length === 3
                                ? 'grid-cols-3'
                                : plainGroups.length === 2
                                  ? 'grid-cols-2'
                                  : 'grid-cols-1'
                          }`}
                                  >
                          {plainGroups.map((group) => (
                            <div key={group._key}>
                              <h3 className='mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground'>
                                {group.title}
                              </h3>
                              <ul className='space-y-1' role='list'>
                                {group.items?.map((navLink, index) => (
                                  <motion.li
                                    key={navLink._key}
                                    initial={{ opacity: 0, x: -4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.15,
                                      delay: index * 0.03,
                                      ease: 'easeOut',
                                    }}
                                  >
                                    <PlainNavLink
                                      navLink={navLink}
                                      onClose={() => setActiveMenu(null)}
                                    />
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )

                      return (
                        <motion.div
                          key={`mega-${item._key}`}
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={springTransition}
                          className='fixed inset-x-0 top-[calc(var(--header-h))] z-50'
                          style={
                            { '--header-h': '72px' } as React.CSSProperties
                          }
                          onMouseEnter={() => openMenu(item._key)}
                          onMouseLeave={scheduleClose}
                        >
                          <div className='overflow-hidden border-b border-gray-200/60 bg-white shadow-xl shadow-fcu-primary-900/8'>
                            <div className='px-4 py-8 sm:px-6 lg:px-8'>
                              <div className='mx-auto flex max-w-screen-xl gap-8'>
                                {featuredOnRight ? (
                                  <>
                                    {plainSection}
                                    {divider}
                                    {featuredSection}
                                  </>
                                ) : (
                                  <>
                                    {featuredSection}
                                    {divider}
                                    {plainSection}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })()}
                </AnimatePresence>
              </motion.nav>
            </div>

          {/* Utility nav — right */}
          <div className='flex items-center gap-1.5 sm:gap-2'>
            {utilityNav?.showSearch && <SiteSearch />}

            {utilityNav?.secondaryAction?.url && (
              <a
                href={utilityNav.secondaryAction.url}
                target='_blank'
                rel='noopener noreferrer'
                className='hidden rounded-xl px-4 py-2 text-sm font-medium text-fcu-primary-900 transition-colors hover:bg-fcu-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fcu-primary-900 md:inline-flex'
              >
                {utilityNav.secondaryAction.label}
              </a>
            )}

            {utilityNav?.primaryAction?.url && (
              <Link
                href={utilityNav.primaryAction.url}
                className='inline-flex items-center rounded-xl bg-fcu-primary-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-fcu-primary-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fcu-primary-900 focus-visible:ring-offset-2'
              >
                {utilityNav.primaryAction.label}
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-xl p-2 text-fcu-primary-900 transition-colors hover:bg-fcu-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fcu-primary-900 lg:hidden'
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className='overflow-hidden border-b border-gray-100 bg-white lg:hidden'
            role='dialog'
            aria-modal='true'
            aria-label='Mobile navigation'
          >
            <nav
              className='mx-auto max-w-7xl px-4 pb-6 pt-2 sm:px-6'
              aria-label='Mobile navigation'
            >
              {mainNav.map((item) => {
                const hasMega = item.megaMenu && item.megaMenu.length > 0
                const isExpanded = mobileExpanded === item._key

                return (
                  <div
                    key={item._key}
                    className='border-b border-gray-100 last:border-0'
                  >
                    <div className='flex items-center'>
                      <Link
                        href={item.url}
                        className='flex-1 py-3.5 text-base font-medium text-fcu-primary-950 transition-colors hover:text-fcu-primary-700'
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {hasMega && (
                        <button
                          type='button'
                          className='flex items-center justify-center rounded-lg p-2 text-fcu-primary-400 transition-colors hover:text-fcu-primary-700'
                          onClick={() =>
                            setMobileExpanded(isExpanded ? null : item._key)
                          }
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            aria-hidden='true'
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {hasMega && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className='overflow-hidden'
                        >
                          <div className='pb-4 pl-2'>
                            {item.megaMenu?.map((group) => (
                              <div key={group._key} className='mb-4 last:mb-0'>
                                <h4 className='mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground'>
                                  {group.title}
                                </h4>

                                {group.isFeatured ? (
                                  <div className='space-y-2'>
                                    {group.items?.map((navLink) => (
                                      <FeaturedNavLink
                                        key={navLink._key}
                                        navLink={navLink}
                                        onClose={() => setMobileOpen(false)}
                                        compact
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <ul className='space-y-1.5' role='list'>
                                    {group.items?.map((navLink) => (
                                      <li key={navLink._key}>
                                        <PlainNavLink
                                          navLink={navLink}
                                          onClose={() => setMobileOpen(false)}
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              {/* Mobile utility actions */}
              <div className='mt-5 space-y-2.5'>
                {utilityNav?.showSearch && (
                  <button
                    type='button'
                    onClick={() => {
                      setMobileOpen(false)
                      setTimeout(() => {
                        document.dispatchEvent(
                          new KeyboardEvent('keydown', {
                            key: 'k',
                            ctrlKey: true,
                          }),
                        )
                      }, 200)
                    }}
                    className='flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-fcu-primary-700 transition-colors hover:bg-fcu-primary-50'
                  >
                    <Search
                      className='h-5 w-5 text-fcu-primary-400'
                      aria-hidden='true'
                    />
                    Search
                  </button>
                )}

                {utilityNav?.secondaryAction?.url && (
                  <a
                    href={utilityNav.secondaryAction.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-fcu-primary-900 transition-colors hover:bg-fcu-primary-50'
                  >
                    {utilityNav.secondaryAction.label}
                  </a>
                )}

                {utilityNav?.primaryAction?.url && (
                  <Link
                    href={utilityNav.primaryAction.url}
                    className='flex w-full items-center justify-center rounded-xl bg-fcu-primary-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-fcu-primary-950'
                    onClick={() => setMobileOpen(false)}
                  >
                    {utilityNav.primaryAction.label}
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function FeaturedNavLink({
  navLink,
  onClose,
  compact = false,
}: {
  navLink: NavLinkItem
  onClose: () => void
  compact?: boolean
}) {
  const href = getHref(navLink)
  const external = isExternalLink(navLink)
  const imageUrl = navLink.image?.asset?.url
  const lqip = navLink.image?.asset?.metadata?.lqip

  const content = (
    <div
      className={`group flex items-start gap-3.5 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-border hover:bg-accent hover:shadow-sm ${compact ? 'p-2.5' : ''}`}
    >
      {imageUrl && (
        <div
          className={`relative shrink-0 overflow-hidden rounded-lg bg-fcu-primary-50 ${compact ? 'h-10 w-10' : 'h-14 w-14'}`}
        >
          <Image
            src={imageUrl}
            alt={navLink.label}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes={compact ? '40px' : '56px'}
            {...(lqip ? { placeholder: 'blur', blurDataURL: lqip } : {})}
          />
        </div>
      )}
      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-1.5'>
          <span
            className={`font-medium text-foreground group-hover:text-foreground/80 ${compact ? 'text-sm' : 'text-sm'}`}
          >
            {navLink.label}
          </span>
          {external && (
            <ExternalLink
              className='h-3 w-3 text-muted-foreground'
              aria-hidden='true'
            />
          )}
        </div>
        {navLink.description && (
          <p
            className={`mt-0.5 leading-snug text-muted-foreground ${compact ? 'text-xs' : 'text-xs'}`}
          >
            {navLink.description}
          </p>
        )}
      </div>
    </div>
  )

  if (external) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        onClick={onClose}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} onClick={onClose}>
      {content}
    </Link>
  )
}

function PlainNavLink({
  navLink,
  onClose,
}: {
  navLink: NavLinkItem
  onClose: () => void
}) {
  const href = getHref(navLink)
  const external = isExternalLink(navLink)

  const className =
    'group inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground'

  if (external) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={className}
        onClick={onClose}
      >
        {navLink.label}
        <ExternalLink
          className='h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100'
          aria-hidden='true'
        />
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={onClose}>
      {navLink.label}
    </Link>
  )
}
