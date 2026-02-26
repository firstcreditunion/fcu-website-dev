'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown, ExternalLink } from 'lucide-react'
import type { HEADER_NAVIGATION_QUERY_RESULT } from '@/sanity/types'

type NavLinkItem = {
  _key: string
  label: string
  linkType: 'internal' | 'external'
  url: string | null
  externalUrl: string | null
  openInNewTab: boolean | null
}

function getHref(link: NavLinkItem): string {
  return link.linkType === 'external' ? (link.externalUrl ?? '#') : (link.url ?? '#')
}

function isExternalLink(link: NavLinkItem): boolean {
  return link.linkType === 'external' || !!link.openInNewTab
}

export function HeaderClient({ data }: { data: HEADER_NAVIGATION_QUERY_RESULT }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
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
    closeTimeout.current = setTimeout(() => setActiveMenu(null), 150)
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
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Main bar */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="First Credit Union — Home"
          >
            <span className="text-xl font-bold tracking-tight text-gray-900">
              <span className="text-blue-600">First</span> Credit Union
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex lg:items-center lg:gap-0.5" aria-label="Main navigation">
            {mainNav.map((item) => {
              const hasMega = item.megaMenu && item.megaMenu.length > 0
              const isOpen = activeMenu === item._key

              return (
                <div
                  key={item._key}
                  className="relative"
                  onMouseEnter={() => hasMega && openMenu(item._key)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={item.url}
                    className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isOpen
                        ? 'bg-gray-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    aria-expanded={hasMega ? isOpen : undefined}
                    aria-haspopup={hasMega ? 'true' : undefined}
                  >
                    {item.label}
                    {hasMega && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Utility nav */}
          <div className="flex items-center gap-1 sm:gap-2">
            {utilityNav?.showSearch && (
              <button
                type="button"
                className="hidden rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:inline-flex"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}

            {utilityNav?.secondaryAction?.url && (
              <a
                href={utilityNav.secondaryAction.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:inline-flex"
              >
                {utilityNav.secondaryAction.label}
              </a>
            )}

            {utilityNav?.primaryAction?.url && (
              <Link
                href={utilityNav.primaryAction.url}
                className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                {utilityNav.primaryAction.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Desktop mega menu panels */}
      {mainNav.map((item) => {
        if (!item.megaMenu || item.megaMenu.length === 0) return null
        const isOpen = activeMenu === item._key
        const columnCount = Math.min(item.megaMenu.length, 4)

        return (
          <div
            key={`mega-${item._key}`}
            className={`absolute inset-x-0 top-full z-40 hidden border-t border-gray-100 bg-white shadow-xl transition-all duration-200 ease-out lg:block ${
              isOpen
                ? 'pointer-events-auto translate-y-0 opacity-100'
                : 'pointer-events-none -translate-y-1 opacity-0'
            }`}
            onMouseEnter={() => openMenu(item._key)}
            onMouseLeave={scheduleClose}
            role="region"
            aria-label={`${item.label} submenu`}
          >
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div
                className="grid gap-x-8 gap-y-6"
                style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
              >
                {item.megaMenu.map((group) => (
                  <div key={group._key}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {group.title}
                    </h3>
                    <ul className="mt-3 space-y-2.5" role="list">
                      {group.items?.map((navLink) => (
                        <li key={navLink._key}>
                          {isExternalLink(navLink) ? (
                            <a
                              href={getHref(navLink)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-blue-600"
                              onClick={() => setActiveMenu(null)}
                            >
                              {navLink.label}
                              <ExternalLink
                                className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                                aria-hidden="true"
                              />
                            </a>
                          ) : (
                            <Link
                              href={getHref(navLink)}
                              className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                              onClick={() => setActiveMenu(null)}
                            >
                              {navLink.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-white transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="h-full overflow-y-auto px-4 pb-24 pt-2" aria-label="Mobile navigation">
          {mainNav.map((item) => {
            const hasMega = item.megaMenu && item.megaMenu.length > 0
            const isExpanded = mobileExpanded === item._key

            return (
              <div key={item._key} className="border-b border-gray-100">
                <div className="flex items-center">
                  <Link
                    href={item.url}
                    className="flex-1 py-3.5 text-base font-medium text-gray-900 transition-colors hover:text-blue-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {hasMega && (
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors hover:text-gray-700"
                      onClick={() => setMobileExpanded(isExpanded ? null : item._key)}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>

                {/* Accordion content */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    hasMega && isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-4 pl-3">
                    {item.megaMenu?.map((group) => (
                      <div key={group._key} className="mb-4 last:mb-0">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                          {group.title}
                        </h4>
                        <ul className="space-y-2" role="list">
                          {group.items?.map((navLink) => (
                            <li key={navLink._key}>
                              {isExternalLink(navLink) ? (
                                <a
                                  href={getHref(navLink)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-blue-600"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {navLink.label}
                                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                </a>
                              ) : (
                                <Link
                                  href={getHref(navLink)}
                                  className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {navLink.label}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Mobile utility actions */}
          <div className="mt-6 space-y-3">
            {utilityNav?.showSearch && (
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                Search
              </button>
            )}

            {utilityNav?.secondaryAction?.url && (
              <a
                href={utilityNav.secondaryAction.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                {utilityNav.secondaryAction.label}
              </a>
            )}

            {utilityNav?.primaryAction?.url && (
              <Link
                href={utilityNav.primaryAction.url}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                onClick={() => setMobileOpen(false)}
              >
                {utilityNav.primaryAction.label}
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
