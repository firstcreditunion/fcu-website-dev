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
    <div className='relative min-h-screen bg-white'>
      {/* Mobile nav toggle */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className='fixed top-20 right-4 z-50 flex size-10 items-center justify-center rounded-full bg-fcu-primary-900 text-white shadow-lg lg:hidden'
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

      <div className='mx-auto flex max-w-[1440px]'>
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed top-0 left-0 z-40 h-screen w-64 border-r border-fcu-primary-100 bg-fcu-primary-50/50 pt-20 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:backdrop-blur-none',
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <ScrollArea className='h-[calc(100vh-80px)]'>
            <div className='px-6 py-8'>
              <p className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-fcu-primary-400'>
                Design Guidelines
              </p>
              <p className='mb-8 text-xs text-fcu-primary-500/70'>
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
                              ? 'bg-fcu-primary-900 font-semibold text-white shadow-sm'
                              : 'text-fcu-primary-700 hover:bg-fcu-primary-100/80 hover:text-fcu-primary-900',
                          )}
                        >
                          <span
                            className={cn(
                              'flex size-5 shrink-0 items-center justify-center rounded text-[10px] font-bold transition-colors',
                              isActive
                                ? 'bg-fcu-secondary-500 text-white'
                                : 'bg-fcu-primary-200/60 text-fcu-primary-500 group-hover:bg-fcu-primary-200',
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
        <main className='min-w-0 flex-1 px-6 py-8 lg:px-16 lg:py-12'>
          <div className='mx-auto max-w-4xl'>
            {/* Page header */}
            <header className='mb-16'>
              <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-fcu-secondary-500/10 px-3 py-1 text-xs font-semibold text-fcu-secondary-700'>
                <span className='size-1.5 rounded-full bg-fcu-secondary-500' />
                Internal Reference
              </div>
              <h1 className='text-4xl font-bold tracking-tight text-fcu-primary-950 sm:text-5xl'>
                Design Guidelines
              </h1>
              <p className='mt-4 max-w-2xl text-lg text-fcu-primary-600/80'>
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
