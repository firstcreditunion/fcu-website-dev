import { type ReactNode } from 'react'
import { Section } from '../_components/section'

/* ── Color ramps ─────────────────────────────────────────────── */

const RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
const NEUTRAL_STEPS = [0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

const BRAND_RAMPS = [
  { label: 'FCU Primary — Blue (brand anchor 900)', varBase: '--color-fcu-primary' },
  { label: 'FCU Secondary — Green (reserved; anchor 500)', varBase: '--color-fcu-secondary' },
  { label: 'FCU Mint (tertiary)', varBase: '--color-fcu-mint' },
  { label: 'FCU Green Faded (subdued backgrounds)', varBase: '--color-fcu-green-faded' },
] as const

const STATUS_RAMPS = [
  { label: 'Success', varBase: '--status-success' },
  { label: 'Warning', varBase: '--status-warning' },
  { label: 'Danger', varBase: '--status-danger' },
  { label: 'Info', varBase: '--status-info' },
] as const

const STATUS_STEPS = [50, 500, 700] as const

function Ramp({
  label,
  varBase,
  steps,
}: {
  label: string
  varBase: string
  steps: readonly number[]
}) {
  return (
    <div className='mb-5'>
      <p className='mb-2 text-sm font-medium text-foreground'>{label}</p>
      <div className='flex flex-wrap gap-1.5'>
        {steps.map((step) => (
          <div key={step} className='w-14'>
            <div
              className='h-12 rounded-md border border-border/60'
              style={{ backgroundColor: `var(${varBase}-${step})` }}
            />
            <p className='mt-1 text-center font-mono text-[10px] tabular-nums text-foreground-subtle'>
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Semantic tokens ─────────────────────────────────────────── */

const SEMANTIC_TOKENS = [
  { name: 'background', v: '--background' },
  { name: 'foreground', v: '--foreground' },
  { name: 'card', v: '--card' },
  { name: 'popover', v: '--popover' },
  { name: 'primary', v: '--primary' },
  { name: 'primary-hover', v: '--primary-hover' },
  { name: 'primary-subtle', v: '--primary-subtle' },
  { name: 'secondary', v: '--secondary' },
  { name: 'muted', v: '--muted' },
  { name: 'muted-foreground', v: '--muted-foreground' },
  { name: 'accent', v: '--accent' },
  { name: 'surface', v: '--surface' },
  { name: 'surface-sunken', v: '--surface-sunken' },
  { name: 'border', v: '--border' },
  { name: 'border-strong', v: '--border-strong' },
  { name: 'ring', v: '--ring' },
  { name: 'destructive', v: '--destructive' },
  { name: 'brand-accent', v: '--brand-accent' },
] as const

function SemanticSwatch({ name, v }: { name: string; v: string }) {
  return (
    <div className='overflow-hidden rounded-lg border border-border'>
      <div className='h-14' style={{ backgroundColor: `var(${v})` }} />
      <div className='bg-card px-2.5 py-1.5'>
        <p className='font-mono text-[11px] text-foreground'>{name}</p>
        <p className='font-mono text-[10px] text-foreground-subtle'>{v}</p>
      </div>
    </div>
  )
}

/* ── Type scale ──────────────────────────────────────────────── */

type TypeRow = {
  label: string
  size: number
  lh: number
  tracking: string
  weight: number
  mono?: boolean
  upper?: boolean
}

const TYPE_SCALE: TypeRow[] = [
  { label: 'Display 2XL', size: 72, lh: 1.05, tracking: '-0.035em', weight: 600 },
  { label: 'Display XL', size: 60, lh: 1.05, tracking: '-0.03em', weight: 600 },
  { label: 'Display L', size: 48, lh: 1.1, tracking: '-0.025em', weight: 600 },
  { label: 'Display M', size: 36, lh: 1.15, tracking: '-0.02em', weight: 600 },
  { label: 'H1', size: 30, lh: 1.2, tracking: '-0.018em', weight: 600 },
  { label: 'H2', size: 24, lh: 1.25, tracking: '-0.012em', weight: 600 },
  { label: 'H3', size: 20, lh: 1.3, tracking: '-0.008em', weight: 600 },
  { label: 'H4', size: 18, lh: 1.35, tracking: '-0.004em', weight: 600 },
  { label: 'Body L', size: 17, lh: 1.6, tracking: '0', weight: 400 },
  { label: 'Body M (base)', size: 15, lh: 1.6, tracking: '0', weight: 400 },
  { label: 'Body S', size: 13, lh: 1.55, tracking: '0', weight: 400 },
  { label: 'Label', size: 13, lh: 1.3, tracking: '-0.002em', weight: 500 },
  { label: 'Caption', size: 11.5, lh: 1.45, tracking: '0.04em', weight: 500, upper: true },
  { label: 'Mono', size: 13, lh: 1.5, tracking: '0', weight: 400, mono: true },
]

function TypeSpecimen({ row }: { row: TypeRow }) {
  return (
    <div className='flex flex-col gap-1 border-b border-border py-4 last:border-b-0 md:flex-row md:items-baseline md:gap-6'>
      <div className='w-40 shrink-0'>
        <p className='text-xs font-medium text-foreground'>{row.label}</p>
        <p className='font-mono text-[10px] text-foreground-subtle'>
          {row.size}px · {row.lh} · {row.weight}
        </p>
      </div>
      <p
        className='min-w-0 truncate text-foreground'
        style={{
          fontSize: `${row.size}px`,
          lineHeight: row.lh,
          letterSpacing: row.tracking,
          fontWeight: row.weight,
          fontFamily: row.mono ? 'var(--font-mono)' : 'var(--font-sans)',
          textTransform: row.upper ? 'uppercase' : 'none',
          fontVariantNumeric: row.mono ? 'tabular-nums' : 'normal',
        }}
      >
        {row.mono ? '0123456789 · NZ$1,250.00' : 'First Credit Union'}
      </p>
    </div>
  )
}

/* ── Radius & shadows ────────────────────────────────────────── */

const RADII = [
  { name: 'sm', v: '--radius-sm' },
  { name: 'md', v: '--radius-md' },
  { name: 'lg (base)', v: '--radius-lg' },
  { name: 'xl', v: '--radius-xl' },
  { name: '2xl', v: '--radius-2xl' },
] as const

const SHADOWS = [
  { name: 'xs', v: '--shadow-xs' },
  { name: 'sm', v: '--shadow-sm' },
  { name: 'md', v: '--shadow-md' },
  { name: 'lg', v: '--shadow-lg' },
  { name: 'xl', v: '--shadow-xl' },
  { name: '2xl', v: '--shadow-2xl' },
] as const

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className='mt-8 mb-4 text-xs font-semibold uppercase tracking-widest text-foreground-subtle first:mt-0'>
      {children}
    </h3>
  )
}

export function Foundations() {
  return (
    <Section
      id='foundations'
      title='Foundations'
      description='Brand ramps, the cool-slate neutral spine, status colors, semantic tokens, the type scale, radii, and the cool-tinted shadow scale. Everything downstream references these.'
    >
      <SubHeading>Brand ramps</SubHeading>
      {BRAND_RAMPS.map((r) => (
        <Ramp key={r.varBase} label={r.label} varBase={r.varBase} steps={RAMP_STEPS} />
      ))}

      <SubHeading>Neutrals — cool slate (220°)</SubHeading>
      <Ramp label='neutral' varBase='--neutral' steps={NEUTRAL_STEPS} />

      <SubHeading>Status</SubHeading>
      {STATUS_RAMPS.map((r) => (
        <Ramp key={r.varBase} label={r.label} varBase={r.varBase} steps={STATUS_STEPS} />
      ))}

      <SubHeading>Semantic tokens</SubHeading>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {SEMANTIC_TOKENS.map((t) => (
          <SemanticSwatch key={t.v} name={t.name} v={t.v} />
        ))}
      </div>

      <SubHeading>Typography — Poppins (sans) · Geist Mono (numbers)</SubHeading>
      <div>
        {TYPE_SCALE.map((row) => (
          <TypeSpecimen key={row.label} row={row} />
        ))}
      </div>

      <SubHeading>Radius</SubHeading>
      <div className='flex flex-wrap gap-5'>
        {RADII.map((r) => (
          <div key={r.v} className='text-center'>
            <div
              className='h-16 w-16 border border-border-strong bg-primary-subtle'
              style={{ borderRadius: `var(${r.v})` }}
            />
            <p className='mt-1.5 font-mono text-[10px] text-foreground-subtle'>{r.name}</p>
          </div>
        ))}
      </div>

      <SubHeading>Shadows — cool-tinted</SubHeading>
      <div className='flex flex-wrap gap-6'>
        {SHADOWS.map((s) => (
          <div key={s.v} className='text-center'>
            <div
              className='h-16 w-16 rounded-lg bg-card'
              style={{ boxShadow: `var(${s.v})` }}
            />
            <p className='mt-2 font-mono text-[10px] text-foreground-subtle'>{s.name}</p>
          </div>
        ))}
        <div className='text-center'>
          <div
            className='h-16 w-16 rounded-lg bg-card'
            style={{ boxShadow: 'var(--shadow-focus)' }}
          />
          <p className='mt-2 font-mono text-[10px] text-foreground-subtle'>focus</p>
        </div>
      </div>
    </Section>
  )
}
