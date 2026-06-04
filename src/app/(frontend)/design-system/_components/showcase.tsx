import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Sub-section heading within a Section (mirrors `shell.css` .subhead). */
export function SubHead({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className='mt-10 mb-4 flex flex-wrap items-baseline justify-between gap-4 first:mt-0'>
      <h3 className='text-[13.5px] font-semibold tracking-[-0.005em] text-foreground'>{title}</h3>
      {hint ? <span className='font-mono text-[11.5px] text-foreground-subtle'>{hint}</span> : null}
    </div>
  )
}

/**
 * The per-variant guidance card: live example · name + token annotation · usage prose.
 * Mirrors the hand-off `.variant-card` 3-column grid.
 */
export function VariantCard({
  example,
  name,
  token,
  badge,
  children,
}: {
  example: ReactNode
  name: string
  token: ReactNode
  badge?: ReactNode
  children: ReactNode
}) {
  return (
    <div className='mt-3 grid items-center gap-7 rounded-xl border border-border bg-card p-6 first:mt-0 md:grid-cols-[220px_1fr_1.1fr]'>
      <div className='flex flex-wrap items-center gap-3'>{example}</div>
      <div className='min-w-0'>
        <h4 className='mb-1 flex items-center gap-2 text-base font-semibold tracking-[-0.01em] text-foreground'>
          {name}
          {badge}
        </h4>
        <code className='font-mono text-[11px] break-words text-foreground-subtle'>{token}</code>
      </div>
      <p className='m-0 text-[13.5px] leading-relaxed text-foreground-muted [&_b]:font-medium [&_b]:text-foreground'>
        {children}
      </p>
    </div>
  )
}

/** A bordered demo plate. */
export function Demo({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8', className)}
    >
      {children}
    </div>
  )
}

/** A labelled demo row (mono label + sub on the left, example stage on the right). */
export function DemoRow({
  name,
  sub,
  children,
}: {
  name: string
  sub?: ReactNode
  children: ReactNode
}) {
  return (
    <div className='grid items-center gap-6 border-t border-dashed border-border py-4 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[170px_1fr]'>
      <div className='flex min-w-0 flex-col gap-0.5'>
        <span className='font-mono text-xs text-foreground'>{name}</span>
        {sub ? <span className='font-mono text-[10.5px] text-foreground-subtle'>{sub}</span> : null}
      </div>
      <div className='flex flex-wrap items-center gap-3'>{children}</div>
    </div>
  )
}

/** Inline flex stage for grouping a few examples. */
export function Stage({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-wrap items-center gap-3', className)}>{children}</div>
}

/** Small mono pill (e.g. "reserved"). */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className='inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-sunken px-2 py-0.5 font-mono text-[10.5px] font-normal text-foreground-muted'>
      {children}
    </span>
  )
}

/** Guidance note (info / warning). */
export function Note({
  children,
  variant = 'info',
}: {
  children: ReactNode
  variant?: 'info' | 'warning'
}) {
  return (
    <div
      className={cn(
        'mt-5 max-w-[70ch] rounded-md border px-4 py-3 text-[13px] leading-relaxed [&_b]:font-semibold',
        variant === 'warning'
          ? 'border-status-warning-500/30 bg-status-warning-50 text-status-warning-700'
          : 'border-primary/20 bg-primary-subtle text-primary'
      )}
    >
      {children}
    </div>
  )
}

/** Token spec table — token name + one value column per size. Mirrors `.spec-table`. */
export function SpecTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: { token: string; values: string[] }[]
}) {
  return (
    <div className='overflow-x-auto rounded-xl border border-border bg-card'>
      <div className='grid min-w-[480px] grid-cols-[120px_1fr_1fr_1fr] items-center gap-2 bg-surface px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.04em] text-foreground-subtle'>
        {columns.map((c) => (
          <div key={c}>{c}</div>
        ))}
      </div>
      {rows.map((r) => (
        <div
          key={r.token}
          className='grid min-w-[480px] grid-cols-[120px_1fr_1fr_1fr] items-center gap-2 border-t border-border px-4 py-3 text-[13px]'
        >
          <div className='font-mono text-xs text-foreground'>{r.token}</div>
          {r.values.map((v, i) => (
            <div key={i} className='font-mono text-xs text-foreground-muted'>
              {v}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Do / Don't grid + card (mirrors `.dodont`). */
export function DoDont({ children }: { children: ReactNode }) {
  return <div className='grid gap-4 md:grid-cols-2'>{children}</div>
}

export function DoDontCard({
  kind,
  visual,
  visualClassName,
  children,
}: {
  kind: 'do' | 'dont'
  visual: ReactNode
  visualClassName?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3.5 rounded-xl border bg-card p-5',
        kind === 'do' ? 'border-status-success-500/25' : 'border-status-danger-500/25'
      )}
    >
      <span
        className={cn(
          'inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.04em]',
          kind === 'do'
            ? 'bg-status-success-50 text-status-success-700'
            : 'bg-status-danger-50 text-status-danger-700'
        )}
      >
        {kind === 'do' ? 'Do' : "Don't"}
      </span>
      <div
        className={cn(
          'flex min-h-20 flex-wrap items-center justify-center gap-2 rounded-lg bg-surface p-6',
          visualClassName
        )}
      >
        {visual}
      </div>
      <p className='m-0 text-[13px] leading-relaxed text-foreground-muted [&_b]:font-medium [&_b]:text-foreground'>
        {children}
      </p>
    </div>
  )
}
