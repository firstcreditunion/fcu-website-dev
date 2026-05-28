import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonLink = {
  label?: string
  linkType?: 'internal' | 'external'
  url?: string
  externalUrl?: string
  openInNewTab?: boolean
}

type KeyValueRow = {
  _key: string
  label?: string
  value?: string
  highlight?: boolean
}

type LoanPageBlock = {
  _key: string
  _type: string
  [key: string]: unknown
}

function resolveHref(link?: ButtonLink): string {
  if (!link) return '#'
  return link.linkType === 'external' ? (link.externalUrl ?? '#') : (link.url ?? '#')
}

function ActionLink({ link, variant = 'primary' }: { link?: ButtonLink; variant?: 'primary' | 'secondary' }) {
  if (!link?.label) return null
  const href = resolveHref(link)
  const isExternal = link.linkType === 'external'

  return (
    <Link
      href={href}
      target={link.openInNewTab ? '_blank' : undefined}
      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors',
        variant === 'primary'
          ? 'bg-fcu-primary-700 text-white hover:bg-fcu-primary-800'
          : 'border border-fcu-primary-700 text-fcu-primary-800 hover:bg-fcu-primary-50',
        isExternal && 'after:ml-2 after:text-xs after:content-["↗"]',
      )}
    >
      {link.label}
    </Link>
  )
}

function KeyValueTable({ rows }: { rows?: KeyValueRow[] }) {
  if (!rows?.length) return null

  return (
    <dl className='space-y-3'>
      {rows.map((row) => (
        <div key={row._key} className='flex items-center justify-between gap-4 border-b border-border pb-2 text-sm'>
          <dt className='text-muted-foreground'>{row.label}</dt>
          <dd className={cn('font-medium text-foreground', row.highlight && 'text-fcu-primary-700')}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function LoanHero({ block }: { block: LoanPageBlock }) {
  const primaryAction = block.primaryAction as ButtonLink | undefined
  const secondaryAction = block.secondaryAction as ButtonLink | undefined
  const layout = block.layout === 'full' ? 'full' : 'split'

  return (
    <section className='rounded-2xl border border-fcu-primary-200 bg-fcu-primary-50 p-6 md:p-10'>
      <div className={cn('grid gap-8', layout === 'split' && 'md:grid-cols-2')}>
        <div>
          {typeof block.badge === 'string' && block.badge.length > 0 && (
            <p className='mb-3 inline-flex rounded-md bg-fcu-primary-100 px-2.5 py-1 text-xs font-semibold text-fcu-primary-900'>
              {block.badge}
            </p>
          )}
          <h1 className='text-3xl font-semibold text-fcu-primary-950 md:text-4xl'>{String(block.headline ?? '')}</h1>
          <p className='mt-4 max-w-2xl text-sm leading-7 text-fcu-primary-900/90'>{String(block.summary ?? '')}</p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <ActionLink link={primaryAction} />
            <ActionLink link={secondaryAction} variant='secondary' />
          </div>
        </div>
      </div>
    </section>
  )
}

function LoanAtAGlance({ block }: { block: LoanPageBlock }) {
  const rows = (block.rows as KeyValueRow[] | undefined) ?? []
  return (
    <section className='rounded-xl border border-border bg-card p-6'>
      <h2 className='text-lg font-semibold'>{String(block.title ?? 'At a glance')}</h2>
      <div className='mt-4'>
        <KeyValueTable rows={rows} />
      </div>
    </section>
  )
}

function TrustStats({ block }: { block: LoanPageBlock }) {
  const items = ((block.items as Array<{ _key: string; value?: string; label?: string }> | undefined) ?? []).filter(
    (item) => item.value || item.label,
  )
  if (!items.length) return null

  return (
    <section>
      {typeof block.heading === 'string' && <h2 className='mb-4 text-lg font-semibold'>{block.heading}</h2>}
      <div className='grid gap-4 md:grid-cols-3'>
        {items.map((item) => (
          <article key={item._key} className='rounded-xl border border-border bg-card p-5 text-center'>
            <p className='text-2xl font-semibold text-fcu-primary-800'>{item.value}</p>
            <p className='mt-2 text-sm text-muted-foreground'>{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function FeatureGrid({ block }: { block: LoanPageBlock }) {
  const columns = Number.parseInt(String(block.columns ?? '4'), 10)
  const items =
    ((block.items as Array<{ _key: string; title?: string; description?: string }> | undefined) ?? []).filter(
      (item) => item.title || item.description,
    )
  if (!items.length) return null

  const gridClass =
    columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 xl:grid-cols-4'

  return (
    <section>
      <h2 className='mb-4 text-lg font-semibold'>{String(block.heading ?? '')}</h2>
      <div className={cn('grid gap-4', gridClass)}>
        {items.map((item) => (
          <article key={item._key} className='rounded-xl border border-border bg-card p-5'>
            <h3 className='text-sm font-semibold'>{item.title}</h3>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function LoanExample({ block }: { block: LoanPageBlock }) {
  const rows = (block.rows as KeyValueRow[] | undefined) ?? []
  return (
    <section className='rounded-xl border border-border bg-card p-6'>
      <h2 className='text-lg font-semibold'>{String(block.heading ?? '')}</h2>
      <div className='mt-4'>
        <KeyValueTable rows={rows} />
      </div>
      {typeof block.note === 'string' && block.note.length > 0 && (
        <p className='mt-4 text-xs leading-5 text-muted-foreground'>{block.note}</p>
      )}
    </section>
  )
}

function RatesFees({ block }: { block: LoanPageBlock }) {
  const rates = (block.rates as KeyValueRow[] | undefined) ?? []
  const fees = (block.fees as KeyValueRow[] | undefined) ?? []
  return (
    <section>
      <h2 className='mb-4 text-lg font-semibold'>{String(block.heading ?? '')}</h2>
      <div className='grid gap-4 md:grid-cols-2'>
        <article className='rounded-xl border border-border bg-card p-6'>
          <h3 className='text-sm font-semibold'>{String(block.ratesHeading ?? 'Rates')}</h3>
          <div className='mt-4'>
            <KeyValueTable rows={rates} />
          </div>
        </article>
        <article className='rounded-xl border border-border bg-card p-6'>
          <h3 className='text-sm font-semibold'>{String(block.feesHeading ?? 'Fees')}</h3>
          <div className='mt-4'>
            <KeyValueTable rows={fees} />
          </div>
        </article>
      </div>
    </section>
  )
}

function Notice({ block }: { block: LoanPageBlock }) {
  const sharedDisclaimer = block.sharedDisclaimer as { content?: string } | undefined
  const content = typeof block.content === 'string' && block.content.length > 0 ? block.content : sharedDisclaimer?.content
  if (!content) return null

  const tone = block.tone === 'warning' ? 'warning' : block.tone === 'legal' ? 'legal' : 'info'
  const toneClass =
    tone === 'warning'
      ? 'border-amber-300 bg-amber-50 text-amber-900'
      : tone === 'legal'
        ? 'border-fcu-primary-300 bg-fcu-primary-50 text-fcu-primary-950'
        : 'border-blue-300 bg-blue-50 text-blue-900'

  return (
    <section className={cn('rounded-xl border px-4 py-3', toneClass)}>
      {typeof block.title === 'string' && block.title.length > 0 && <h3 className='text-sm font-semibold'>{block.title}</h3>}
      <p className='mt-1 text-sm leading-6'>{content}</p>
    </section>
  )
}

function FAQ({ block }: { block: LoanPageBlock }) {
  const items =
    ((block.items as Array<{ _key: string; question?: string; answer?: string }> | undefined) ?? []).filter(
      (item) => item.question && item.answer,
    )
  if (!items.length) return null

  return (
    <section>
      {typeof block.heading === 'string' && <h2 className='mb-4 text-lg font-semibold'>{block.heading}</h2>}
      <div className='rounded-xl border border-border bg-card'>
        {items.map((item) => (
          <article key={item._key} className='border-b border-border px-5 py-4 last:border-0'>
            <h3 className='text-sm font-semibold'>{item.question}</h3>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function RelatedLinks({ block }: { block: LoanPageBlock }) {
  const items =
    ((block.items as Array<{ _key: string; title?: string; description?: string; link?: ButtonLink }> | undefined) ?? []).filter(
      (item) => item.title && item.link?.label,
    )
  if (!items.length) return null

  return (
    <section>
      {typeof block.heading === 'string' && <h2 className='mb-4 text-lg font-semibold'>{block.heading}</h2>}
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {items.map((item) => (
          <article key={item._key} className='rounded-xl border border-border bg-card p-5'>
            <h3 className='text-sm font-semibold'>{item.title}</h3>
            {item.description && <p className='mt-2 text-sm leading-6 text-muted-foreground'>{item.description}</p>}
            <div className='mt-3'>
              <ActionLink link={item.link} variant='secondary' />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CtaBar({ block }: { block: LoanPageBlock }) {
  const primaryAction = block.primaryAction as ButtonLink | undefined
  const secondaryAction = block.secondaryAction as ButtonLink | undefined

  return (
    <section className='rounded-2xl border border-fcu-primary-200 bg-fcu-primary-50 p-6 md:flex md:items-center md:justify-between md:gap-6'>
      <div>
        <h2 className='text-xl font-semibold text-fcu-primary-950'>{String(block.heading ?? '')}</h2>
        <p className='mt-2 max-w-2xl text-sm leading-6 text-fcu-primary-900'>{String(block.description ?? '')}</p>
      </div>
      <div className='mt-4 flex flex-wrap gap-3 md:mt-0'>
        <ActionLink link={primaryAction} />
        <ActionLink link={secondaryAction} variant='secondary' />
      </div>
    </section>
  )
}

function LegalFinePrint({ block }: { block: LoanPageBlock }) {
  if (typeof block.content !== 'string' || !block.content.length) return null
  return (
    <section className='rounded-xl border border-border bg-card p-4'>
      <p className='text-xs leading-6 text-muted-foreground'>{block.content}</p>
    </section>
  )
}

function renderBlock(block: LoanPageBlock) {
  switch (block._type) {
    case 'loanHeroBlock':
      return <LoanHero block={block} />
    case 'loanAtAGlanceBlock':
      return <LoanAtAGlance block={block} />
    case 'trustStatsBlock':
      return <TrustStats block={block} />
    case 'featureGridBlock':
      return <FeatureGrid block={block} />
    case 'loanExampleBlock':
      return <LoanExample block={block} />
    case 'ratesFeesBlock':
      return <RatesFees block={block} />
    case 'noticeBlock':
      return <Notice block={block} />
    case 'faqBlock':
      return <FAQ block={block} />
    case 'relatedLinksBlock':
      return <RelatedLinks block={block} />
    case 'ctaBarBlock':
      return <CtaBar block={block} />
    case 'legalFinePrintBlock':
      return <LegalFinePrint block={block} />
    default:
      return null
  }
}

export function LoanPageBuilder({ blocks }: { blocks: LoanPageBlock[] | null | undefined }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <main className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:py-12'>
      {blocks.map((block) => (
        <div key={block._key}>{renderBlock(block)}</div>
      ))}
    </main>
  )
}
