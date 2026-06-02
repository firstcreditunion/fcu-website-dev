import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design System',
  // Dev/internal reference — public but kept out of search engines.
  robots: { index: false, follow: false },
}

export default function DesignSystemPage() {
  return (
    <>
      <header className='border-b border-border pb-8'>
        <p className='text-[11px] font-semibold uppercase tracking-widest text-brand-accent'>
          First Credit Union
        </p>
        <h1 className='mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl'>
          Design System
        </h1>
        <p className='mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
          The living reference for First Credit Union components, tokens, and patterns — built on
          shadcn / Base UI and Tailwind v4.
        </p>
      </header>

      <p className='py-12 text-sm text-muted-foreground'>Foundations section coming next…</p>
    </>
  )
}
