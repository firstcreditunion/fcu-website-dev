import { type ReactNode } from 'react'

/**
 * Anchored section wrapper for the design-system showcase.
 * One <Section> per component/topic, mirroring the hand-off reference pages.
 */
export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section id={id} className='scroll-mt-24 border-b border-border py-12 last:border-b-0'>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold tracking-tight text-foreground'>{title}</h2>
        {description ? (
          <p className='mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}
