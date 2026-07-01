'use client'

// src/components/header/mobile-menu.tsx — full-screen mobile takeover per
// Figma "Navbar / Mobile Menu" (node 259:327): logo + circled ✕ top row,
// accordion rows (click-toggle) whose expanded content reuses MenuLink
// (icon chips + badges), and pinned bottom CTAs (outline Log in · secondary
// Become a member). Accordions are CLICK-only, same as desktop.
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, X } from 'lucide-react'
import type { HEADER_NAVIGATION_QUERY_RESULT } from '@/sanity/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MenuLink } from './menu-link'

type NavData = NonNullable<HEADER_NAVIGATION_QUERY_RESULT>
type MainNav = NonNullable<NavData['mainNav']>
type UtilityNav = NavData['utilityNav']

export function MobileMenu({
  open,
  mainNav,
  utilityNav,
  onClose,
}: {
  open: boolean
  mainNav: MainNav
  utilityNav: UtilityNav
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState<string | null>(null)

  // Lock body scroll while open (DOM side effect — allowed in effects).
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className='fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background lg:hidden'
          role='dialog'
          aria-modal='true'
          aria-label='Mobile navigation'
          data-slot='mobile-menu'
        >
          {/* Top row: logo + circled close */}
          <div className='flex h-[60px] shrink-0 items-center justify-between border-b border-border px-5'>
            <Link
              href='/'
              onClick={onClose}
              aria-label='First Credit Union — Home'
            >
              <Image
                src='/fcu-logo.png'
                alt='First Credit Union'
                width={120}
                height={48}
                className='h-8 w-auto'
                priority
              />
            </Link>
            <button
              type='button'
              onClick={onClose}
              aria-label='Close menu'
              className='flex size-9 items-center justify-center rounded-full bg-surface-sunken text-foreground outline-none transition-colors hover:bg-surface-muted focus-visible:shadow-[var(--shadow-focus)]'
            >
              <X className='size-4' aria-hidden='true' />
            </button>
          </div>

          {/* Accordion rows */}
          <nav className='flex-1 px-5' aria-label='Mobile navigation'>
            {mainNav.map((item) => {
              const hasPanel = !!item.megaMenu && item.megaMenu.length > 0
              const isExpanded = expanded === item._key

              if (!hasPanel) {
                return (
                  <Link
                    key={item._key}
                    href={item.url ?? '#'}
                    onClick={onClose}
                    className='flex h-[58px] items-center border-b border-border text-lg font-medium text-foreground last:border-0'
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <div key={item._key} className='border-b border-border last:border-0'>
                  <button
                    type='button'
                    className='flex h-[58px] w-full items-center justify-between text-lg font-medium text-foreground outline-none focus-visible:shadow-[var(--shadow-focus)]'
                    onClick={() =>
                      setExpanded((prev) => (prev === item._key ? null : item._key))
                    }
                    aria-expanded={isExpanded}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'size-5 text-foreground-muted transition-transform duration-200',
                        isExpanded && 'rotate-180',
                      )}
                      aria-hidden='true'
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className='overflow-hidden'
                      >
                        <div className='flex flex-col gap-1 pb-4'>
                          {item.megaMenu?.map((group) => (
                            <div key={group._key} className='flex flex-col gap-1'>
                              {group.items?.map((link) => (
                                <MenuLink
                                  key={link._key}
                                  link={link}
                                  onNavigate={onClose}
                                  compact
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>

          {/* Pinned CTAs */}
          <div className='flex shrink-0 flex-col gap-3 border-t border-border p-4'>
            {utilityNav?.secondaryAction?.url && (
              <Button
                variant='outline'
                block
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
                block
                render={<Link href={utilityNav.primaryAction.url} onClick={onClose} />}
                nativeButton={false}
              >
                {utilityNav.primaryAction.label}
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
