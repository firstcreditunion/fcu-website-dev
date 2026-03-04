'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu, X } from 'lucide-react'

interface NavSection {
  id: string
  label: string
  icon?: React.ReactNode
}

const SECTIONS: NavSection[] = [
  { id: 'logo', label: 'Logo' },
  { id: 'typography', label: 'Typography' },
  { id: 'colours', label: 'Colours' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'elevation', label: 'Elevation & Shadows' },
  { id: 'radius', label: 'Borders & Radius' },
  { id: 'iconography', label: 'Iconography' },
]

export function DesignGuidelinesLayout({
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

  return (
    <div className='relative min-h-screen bg-background'>
      {/* Mobile nav toggle */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className='fixed top-20 right-4 z-50 flex size-10 items-center justify-center rounded-full bg-foreground text-background shadow-lg lg:hidden'
        aria-label='Toggle navigation'
      >
        {mobileNavOpen ? <X className='size-5' /> : <Menu className='size-5' />}
      </button>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden'
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <div className='flex w-full'>
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed top-0 left-0 z-40 h-screen w-64 border-r border-border bg-card/90 pt-20 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:backdrop-blur-none',
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <ScrollArea className='h-[calc(100vh-80px)]'>
            <div className='px-6 py-8'>
              <p className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                Design Guidelines
              </p>
              <p className='mb-8 text-xs text-muted-foreground/80'>
                First Credit Union
              </p>

              <nav aria-label='Design guidelines sections'>
                <ul className='space-y-0.5'>
                  {SECTIONS.map(({ id, label }, i) => {
                    const isActive = activeSection === id
                    return (
                      <li key={id}>
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
                    )
                  })}
                </ul>
              </nav>
            </div>
          </ScrollArea>
        </aside>

        {/* Main content */}
        <main className='min-w-0 flex-1 px-6 py-8 lg:px-12 lg:py-12'>
          <div className='mx-auto'>
            {/* Page header */}
            <header className='mb-16'>
              <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
                Design Guidelines
              </h1>
              <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
                The definitive guide to First Credit Union&apos;s visual
                language. Tokens, type scales, colour palettes, and interactive
                component references for the development team.
              </p>
            </header>

            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
