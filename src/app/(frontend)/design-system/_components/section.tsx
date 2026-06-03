import { type ReactNode } from 'react'

/**
 * Top-level showcase section — a numbered editorial head (mirrors the hand-off
 * `shell.css` .sec-head) + content. One <Section> per component/topic.
 */
export function Section({
  id,
  num,
  title,
  description,
  children,
}: {
  id: string
  num?: string
  title: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className='scroll-mt-24 border-b border-border py-14 last:border-b-0'>
      <div className='mb-8 max-w-[72ch]'>
        {num ? (
          <span className='font-mono text-[11.5px] uppercase tracking-[0.05em] text-foreground-subtle'>
            {num}
          </span>
        ) : null}
        <h2 className='mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-[30px] md:leading-tight'>
          {title}
        </h2>
        {description ? (
          <p className='mt-3 text-[15px] leading-relaxed text-foreground-muted'>{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}
