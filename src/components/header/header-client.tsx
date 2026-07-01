'use client'

// src/components/header/header-client.tssx — client shell for the rebuilt
// marketing header (Figma "Navbar", node 258:96 / composite 259:166).
//
// HARD RULE: mega-panels open/close on CLICK ONLY — click toggles, click-away /
// Esc / clicking another item closes. Hover NEVER opens or closes a panel
// (NavTopItem hover is a purely visual pill). Do not add mouseenter/mouseleave
// panel logic here.
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import type {
  HEADER_NAVIGATION_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from '@/sanity/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { SiteSearch } from '@/components/site-search'
import { AnnouncementBar } from './announcement-bar'
import { NavTopItem } from './nav-top-item'
import { MegaPanel } from './mega-panel'
import { MobileMenu } from './mobile-menu'

const springTransition = {
  type: 'spring' as const,
  mass: 0.5,
  damping: 14,
  stiffness: 120,
  restDelta: 0.001,
}

// Scroll position as an external store (react-compiler-clean; no effects).
function subscribeScroll(cb: () => void) {
  window.addEventListener('scroll', cb, { passive: true })
  return () => window.removeEventListener('scroll', cb)
}
const getScrolled = () => window.scrollY > 8
const getScrolledServer = () => false

function isActivePath(pathname: string, url: string | null | undefined): boolean {
  if (!url || url === '#') return false
  if (url === '/') return pathname === '/'
  return pathname === url || pathname.startsWith(`${url}/`)
}

export function HeaderClient({
  data,
  siteSettings,
}: {
  data: HEADER_NAVIGATION_QUERY_RESULT
  siteSettings: SITE_SETTINGS_QUERY_RESULT
}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getScrolledServer)

  const toggleMenu = useCallback((key: string) => {
    setActiveMenu((prev) => (prev === key ? null : key))
  }, [])

  const closeAll = useCallback(() => {
    setActiveMenu(null)
    setMobileOpen(false)
  }, [])

  // Esc closes panel + mobile menu.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeAll])

  // Click-away closes the open panel (CLICK-only model — no hover logic).
  useEffect(() => {
    if (!activeMenu) return
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current?.contains(e.target as Node)) return
      setActiveMenu(null)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [activeMenu])

  const mainNav = data?.mainNav ?? []
  const utilityNav = data?.utilityNav ?? null
  const glass = siteSettings?.headerStyle === 'transparent'
  const activeItem = activeMenu
    ? mainNav.find((i) => i._key === activeMenu)
    : undefined
  const buttonSize = scrolled ? 'sm' : 'default'

  return (
    <header
      ref={headerRef}
      className='sticky top-0 z-50 w-full'
      data-slot='site-header'
    >
      {/* Announcement collapses in the scrolled state */}
      <div
        className={cn(
          'overflow-hidden transition-[max-height] duration-300',
          scrolled ? 'max-h-0' : 'max-h-16',
        )}
      >
        <AnnouncementBar announcement={siteSettings?.announcementBar ?? null} />
      </div>

      <div
        className={cn(
          'relative border-b border-border',
          glass ? 'bg-card/60 backdrop-blur-[8px]' : 'bg-card',
          scrolled && 'shadow-[var(--shadow-sm)]',
        )}
      >
        <nav
          aria-label='Main navigation'
          className={cn(
            'flex items-center gap-1 px-4 transition-[height] duration-200 sm:px-6 lg:px-8',
            scrolled ? 'h-[52px]' : 'h-[64px]',
          )}
        >
          {/* Logo */}
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
              className={cn(
                'w-auto transition-all duration-200',
                scrolled ? 'h-8' : 'h-10',
              )}
              priority
            />
          </Link>
          <span aria-hidden='true' className='w-7 shrink-0' />

          {/* Top-level items (desktop) */}
          <div className='hidden items-center gap-1 lg:flex'>
            {mainNav.map((item) => {
              const hasPanel = !!item.megaMenu && item.megaMenu.length > 0
              return (
                <NavTopItem
                  key={item._key}
                  label={item.label}
                  href={item.url}
                  hasPanel={hasPanel}
                  isOpen={activeMenu === item._key}
                  isActive={isActivePath(pathname, item.url)}
                  panelId={`nav-panel-${item._key}`}
                  onToggle={() => toggleMenu(item._key)}
                />
              )
            })}
          </div>

          <span aria-hidden='true' className='min-w-1 flex-1' />

          {/* Utility side */}
          {utilityNav?.showSearch && (
            <div className='hidden md:block'>
              <SiteSearch />
            </div>
          )}
          {utilityNav?.secondaryAction?.url && (
            <Button
              variant='ghost'
              size={buttonSize}
              className='hidden tracking-[-0.07px] md:inline-flex'
              render={
                // eslint-disable-next-line jsx-a11y/anchor-has-content -- Base UI injects children
                <a
                  href={utilityNav.secondaryAction.url}
                  target='_blank'
                  rel='noopener noreferrer'
                />
              }
              nativeButton={false}
            >
              {utilityNav.secondaryAction.label}
            </Button>
          )}
          {utilityNav?.primaryAction?.url && (
            <Button
              variant='secondary'
              size={buttonSize}
              className='tracking-[-0.07px]'
              render={<Link href={utilityNav.primaryAction.url} />}
              nativeButton={false}
            >
              {utilityNav.primaryAction.label}
            </Button>
          )}

          {/* Mobile hamburger */}
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-lg p-2 text-foreground outline-none transition-colors hover:bg-surface-sunken focus-visible:shadow-[var(--shadow-focus)] lg:hidden'
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className='size-6' /> : <Menu className='size-6' />}
          </button>
        </nav>

        {/* Mega panel — flush under the bar; opened/closed by CLICK only */}
        <AnimatePresence>
          {activeItem && activeItem.megaMenu && activeItem.megaMenu.length > 0 && (
            <motion.div
              key={`panel-${activeItem._key}`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={springTransition}
              // Detached floating panel (Figma option 3.1): 16px gap below the
              // bar. The gap is outside the wrapper so clicking it counts as
              // click-away and closes the panel.
              className='absolute inset-x-0 top-[calc(100%+16px)] z-50 hidden px-4 sm:px-6 lg:block lg:px-8'
            >
              <MegaPanel
                item={activeItem}
                panelId={`nav-panel-${activeItem._key}`}
                onNavigate={closeAll}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile full-screen menu */}
      <MobileMenu
        open={mobileOpen}
        mainNav={mainNav}
        utilityNav={utilityNav}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  )
}
