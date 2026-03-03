'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu, X } from 'lucide-react'

interface NavSection {
  id: string
  label: string
  group?: string
}

const SECTIONS: NavSection[] = [
  { id: 'foundations', label: 'Foundations', group: 'Components' },
  { id: 'content-messaging', label: 'Content & Messaging', group: 'Components' },
  { id: 'engagement-conversion', label: 'Engagement & Conversion', group: 'Components' },
  { id: 'navigation-discovery', label: 'Navigation & Discovery', group: 'Components' },
  { id: 'media', label: 'Media', group: 'Components' },
  { id: 'financial-services', label: 'Financial Services', group: 'Components' },
  { id: 'architecture-research', label: 'Architecture Research', group: 'Reference' },
]

export function ComponentDesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeSection, setActiveSection] = React.useState(SECTIONS[0].id)
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileNavOpen(false)
    }
  }

  const sectionsWithGroupFlag = React.useMemo(
    () =>
      SECTIONS.map((section, i) => ({
        ...section,
        showGroupHeader:
          !!section.group &&
          (i === 0 || section.group !== SECTIONS[i - 1]?.group),
      })),
    [],
  )

  return (
    <div className='relative min-h-screen bg-background'>
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className='fixed top-20 right-4 z-50 flex size-10 items-center justify-center rounded-full bg-foreground text-background shadow-lg lg:hidden'
        aria-label='Toggle navigation'
      >
        {mobileNavOpen ? <X className='size-5' /> : <Menu className='size-5' />}
      </button>

      {mobileNavOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden'
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <div className='mx-auto flex max-w-[1440px]'>
        <aside
          className={cn(
            'fixed top-0 left-0 z-40 h-screen w-64 border-r border-border bg-card/90 pt-20 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:backdrop-blur-none',
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <ScrollArea className='h-[calc(100vh-80px)]'>
            <div className='px-6 py-8'>
              <p className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                Component Design
              </p>
              <p className='mb-8 text-xs text-muted-foreground/80'>
                First Credit Union
              </p>

              <nav aria-label='Component design sections'>
                <ul className='space-y-0.5'>
                  {sectionsWithGroupFlag.map(({ id, label, group, showGroupHeader }, i) => {
                    const isActive = activeSection === id

                    return (
                      <React.Fragment key={id}>
                        {showGroupHeader && (
                          <li className={cn('pt-4 pb-1.5', i === 0 && 'pt-0')}>
                            <span className='px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60'>
                              {group}
                            </span>
                          </li>
                        )}
                        <li>
                          <button
                            onClick={() => scrollTo(id)}
                            className={cn(
                              'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200',
                              isActive
                                ? 'bg-accent font-semibold text-accent-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                            )}
                          >
                            <span
                              className={cn(
                                'flex size-5 shrink-0 items-center justify-center rounded text-[10px] font-bold transition-colors',
                                isActive
                                  ? 'bg-foreground text-background'
                                  : 'bg-muted text-muted-foreground group-hover:bg-border',
                              )}
                            >
                              {i + 1}
                            </span>
                            {label}
                          </button>
                        </li>
                      </React.Fragment>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </ScrollArea>
        </aside>

        <main className='min-w-0 flex-1 px-6 py-8 lg:px-16 lg:py-12'>
          <div className='mx-auto max-w-4xl'>
            <header className='mb-16'>
              <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground'>
                <span className='size-1.5 rounded-full bg-fcu-primary-900' />
                Internal Reference
              </div>
              <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
                Component Design
              </h1>
              <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
                Reusable, CMS-driven component library for First Credit Union.
                Each block is designed for the page builder — editors compose,
                developers maintain.
              </p>
            </header>

            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
