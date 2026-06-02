import { type ReactNode } from 'react'
import { ShowcaseNav } from './_components/showcase-nav'

/**
 * Showcase shell: sticky sidebar nav + scrollable content area.
 * Renders inside the (frontend) layout, so the site Header/Footer wrap it.
 * Public — no Clerk gate.
 */
export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 md:px-6 lg:py-14'>
      <aside className='hidden w-52 shrink-0 lg:block'>
        <ShowcaseNav />
      </aside>
      <main className='min-w-0 flex-1'>{children}</main>
    </div>
  )
}
