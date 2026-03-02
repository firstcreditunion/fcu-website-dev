'use client'

import * as React from 'react'
import { SectionWrapper, Subsection } from './section-wrapper'
import { CopyButton } from './code-block'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { converter, formatHex } from 'culori'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ColourStop {
  shade: string
  oklch: string
  cssVar: string
  tailwind: string
}

const rgbConverter = converter('rgb')

const PRIMARY_PALETTE: ColourStop[] = [
  {
    shade: '50',
    oklch: 'oklch(97.42% 0.016 226.9)',
    cssVar: '--color-fcu-primary-50',
    tailwind: 'fcu-primary-50',
  },
  {
    shade: '100',
    oklch: 'oklch(93.67% 0.039 227.71)',
    cssVar: '--color-fcu-primary-100',
    tailwind: 'fcu-primary-100',
  },
  {
    shade: '200',
    oklch: 'oklch(88.28% 0.077 224.69)',
    cssVar: '--color-fcu-primary-200',
    tailwind: 'fcu-primary-200',
  },
  {
    shade: '300',
    oklch: 'oklch(81.7% 0.132 221.14)',
    cssVar: '--color-fcu-primary-300',
    tailwind: 'fcu-primary-300',
  },
  {
    shade: '400',
    oklch: 'oklch(75.6% 0.138 220.17)',
    cssVar: '--color-fcu-primary-400',
    tailwind: 'fcu-primary-400',
  },
  {
    shade: '500',
    oklch: 'oklch(70.61% 0.128 219.78)',
    cssVar: '--color-fcu-primary-500',
    tailwind: 'fcu-primary-500',
  },
  {
    shade: '600',
    oklch: 'oklch(64.66% 0.117 219.68)',
    cssVar: '--color-fcu-primary-600',
    tailwind: 'fcu-primary-600',
  },
  {
    shade: '700',
    oklch: 'oklch(59.5% 0.108 219.87)',
    cssVar: '--color-fcu-primary-700',
    tailwind: 'fcu-primary-700',
  },
  {
    shade: '800',
    oklch: 'oklch(53.58% 0.097 219.61)',
    cssVar: '--color-fcu-primary-800',
    tailwind: 'fcu-primary-800',
  },
  {
    shade: '900',
    oklch: 'oklch(47.85% 0.087 220.03)',
    cssVar: '--color-fcu-primary-900',
    tailwind: 'fcu-primary-900',
  },
  {
    shade: '950',
    oklch: 'oklch(30.48% 0.056 221.59)',
    cssVar: '--color-fcu-primary-950',
    tailwind: 'fcu-primary-950',
  },
]

const SECONDARY_PALETTE: ColourStop[] = [
  {
    shade: '50',
    oklch: 'oklch(96.56% 0.206 109.7)',
    cssVar: '--color-fcu-secondary-50',
    tailwind: 'fcu-secondary-50',
  },
  {
    shade: '100',
    oklch: 'oklch(95.11% 0.203 109.7)',
    cssVar: '--color-fcu-secondary-100',
    tailwind: 'fcu-secondary-100',
  },
  {
    shade: '200',
    oklch: 'oklch(89.87% 0.192 109.7)',
    cssVar: '--color-fcu-secondary-200',
    tailwind: 'fcu-secondary-200',
  },
  {
    shade: '300',
    oklch: 'oklch(85.44% 0.182 109.7)',
    cssVar: '--color-fcu-secondary-300',
    tailwind: 'fcu-secondary-300',
  },
  {
    shade: '400',
    oklch: 'oklch(81.26% 0.173 109.7)',
    cssVar: '--color-fcu-secondary-400',
    tailwind: 'fcu-secondary-400',
  },
  {
    shade: '500',
    oklch: 'oklch(76.71% 0.164 109.7)',
    cssVar: '--color-fcu-secondary-500',
    tailwind: 'fcu-secondary-500',
  },
  {
    shade: '600',
    oklch: 'oklch(64.23% 0.137 109.7)',
    cssVar: '--color-fcu-secondary-600',
    tailwind: 'fcu-secondary-600',
  },
  {
    shade: '700',
    oklch: 'oklch(51.45% 0.11 109.7)',
    cssVar: '--color-fcu-secondary-700',
    tailwind: 'fcu-secondary-700',
  },
  {
    shade: '800',
    oklch: 'oklch(38.54% 0.082 109.7)',
    cssVar: '--color-fcu-secondary-800',
    tailwind: 'fcu-secondary-800',
  },
  {
    shade: '900',
    oklch: 'oklch(26.41% 0.056 109.7)',
    cssVar: '--color-fcu-secondary-900',
    tailwind: 'fcu-secondary-900',
  },
  {
    shade: '950',
    oklch: 'oklch(19.81% 0.043 109.76)',
    cssVar: '--color-fcu-secondary-950',
    tailwind: 'fcu-secondary-950',
  },
]

const GREEN_FADED_PALETTE: ColourStop[] = [
  {
    shade: '50',
    oklch: 'oklch(0.99 0.011 100.72)',
    cssVar: '--color-fcu-green-faded-50',
    tailwind: 'fcu-green-faded-50',
  },
  {
    shade: '100',
    oklch: 'oklch(0.982 0.022 101.29)',
    cssVar: '--color-fcu-green-faded-100',
    tailwind: 'fcu-green-faded-100',
  },
  {
    shade: '200',
    oklch: 'oklch(0.964 0.05 102.3)',
    cssVar: '--color-fcu-green-faded-200',
    tailwind: 'fcu-green-faded-200',
  },
  {
    shade: '300',
    oklch: 'oklch(0.956 0.066 102.89)',
    cssVar: '--color-fcu-green-faded-300',
    tailwind: 'fcu-green-faded-300',
  },
  {
    shade: '400',
    oklch: 'oklch(0.937 0.082 102.57)',
    cssVar: '--color-fcu-green-faded-400',
    tailwind: 'fcu-green-faded-400',
  },
  {
    shade: '500',
    oklch: 'oklch(0.921 0.081 103.26)',
    cssVar: '--color-fcu-green-faded-500',
    tailwind: 'fcu-green-faded-500',
  },
  {
    shade: '600',
    oklch: 'oklch(0.765 0.067 103.03)',
    cssVar: '--color-fcu-green-faded-600',
    tailwind: 'fcu-green-faded-600',
  },
  {
    shade: '700',
    oklch: 'oklch(0.61 0.054 102.78)',
    cssVar: '--color-fcu-green-faded-700',
    tailwind: 'fcu-green-faded-700',
  },
  {
    shade: '800',
    oklch: 'oklch(0.448 0.04 104.17)',
    cssVar: '--color-fcu-green-faded-800',
    tailwind: 'fcu-green-faded-800',
  },
  {
    shade: '900',
    oklch: 'oklch(0.293 0.026 104.64)',
    cssVar: '--color-fcu-green-faded-900',
    tailwind: 'fcu-green-faded-900',
  },
  {
    shade: '950',
    oklch: 'oklch(0.216 0.019 103)',
    cssVar: '--color-fcu-green-faded-950',
    tailwind: 'fcu-green-faded-950',
  },
]

const MINT_PALETTE: ColourStop[] = [
  {
    shade: '50',
    oklch: 'oklch(0.981 0.014 169.11)',
    cssVar: '--color-fcu-mint-50',
    tailwind: 'fcu-mint-50',
  },
  {
    shade: '100',
    oklch: 'oklch(0.962 0.028 171.15)',
    cssVar: '--color-fcu-mint-100',
    tailwind: 'fcu-mint-100',
  },
  {
    shade: '200',
    oklch: 'oklch(0.934 0.052 170.18)',
    cssVar: '--color-fcu-mint-200',
    tailwind: 'fcu-mint-200',
  },
  {
    shade: '300',
    oklch: 'oklch(0.895 0.079 170.52)',
    cssVar: '--color-fcu-mint-300',
    tailwind: 'fcu-mint-300',
  },
  {
    shade: '400',
    oklch: 'oklch(0.87 0.076 170.49)',
    cssVar: '--color-fcu-mint-400',
    tailwind: 'fcu-mint-400',
  },
  {
    shade: '500',
    oklch: 'oklch(0.835 0.074 170.42)',
    cssVar: '--color-fcu-mint-500',
    tailwind: 'fcu-mint-500',
  },
  {
    shade: '600',
    oklch: 'oklch(0.699 0.061 170.9)',
    cssVar: '--color-fcu-mint-600',
    tailwind: 'fcu-mint-600',
  },
  {
    shade: '700',
    oklch: 'oklch(0.553 0.048 171.68)',
    cssVar: '--color-fcu-mint-700',
    tailwind: 'fcu-mint-700',
  },
  {
    shade: '800',
    oklch: 'oklch(0.418 0.036 171.73)',
    cssVar: '--color-fcu-mint-800',
    tailwind: 'fcu-mint-800',
  },
  {
    shade: '900',
    oklch: 'oklch(0.273 0.024 169.15)',
    cssVar: '--color-fcu-mint-900',
    tailwind: 'fcu-mint-900',
  },
  {
    shade: '950',
    oklch: 'oklch(0.206 0.018 169.9)',
    cssVar: '--color-fcu-mint-950',
    tailwind: 'fcu-mint-950',
  },
]

const NEUTRAL_PALETTE: ColourStop[] = [
  {
    shade: 'white',
    oklch: '#ffffff',
    cssVar: '--color-white',
    tailwind: 'white',
  },
  {
    shade: '50',
    oklch: '#fafafa',
    cssVar: '--color-neutral-50',
    tailwind: 'neutral-50',
  },
  {
    shade: '100',
    oklch: '#f5f5f5',
    cssVar: '--color-neutral-100',
    tailwind: 'neutral-100',
  },
  {
    shade: '200',
    oklch: '#e5e5e5',
    cssVar: '--color-neutral-200',
    tailwind: 'neutral-200',
  },
  {
    shade: '300',
    oklch: '#d4d4d4',
    cssVar: '--color-neutral-300',
    tailwind: 'neutral-300',
  },
  {
    shade: '400',
    oklch: '#a3a3a3',
    cssVar: '--color-neutral-400',
    tailwind: 'neutral-400',
  },
  {
    shade: '500',
    oklch: '#737373',
    cssVar: '--color-neutral-500',
    tailwind: 'neutral-500',
  },
  {
    shade: '600',
    oklch: '#525252',
    cssVar: '--color-neutral-600',
    tailwind: 'neutral-600',
  },
  {
    shade: '700',
    oklch: '#404040',
    cssVar: '--color-neutral-700',
    tailwind: 'neutral-700',
  },
  {
    shade: '800',
    oklch: '#262626',
    cssVar: '--color-neutral-800',
    tailwind: 'neutral-800',
  },
  {
    shade: '900',
    oklch: '#171717',
    cssVar: '--color-neutral-900',
    tailwind: 'neutral-900',
  },
  {
    shade: '950',
    oklch: '#0a0a0a',
    cssVar: '--color-neutral-950',
    tailwind: 'neutral-950',
  },
]

const SEMANTIC_COLOURS = [
  {
    name: 'background',
    cssVar: '--background',
    usage: 'Page background',
    value: 'oklch(1 0 0)',
  },
  {
    name: 'foreground',
    cssVar: '--foreground',
    usage: 'Default text',
    value: 'oklch(0.145 0 0)',
  },
  {
    name: 'primary',
    cssVar: '--primary',
    usage: 'Primary actions',
    value: 'oklch(0.205 0 0)',
  },
  {
    name: 'secondary',
    cssVar: '--secondary',
    usage: 'Secondary actions',
    value: 'oklch(0.97 0 0)',
  },
  {
    name: 'muted',
    cssVar: '--muted',
    usage: 'Subdued elements',
    value: 'oklch(0.97 0 0)',
  },
  {
    name: 'accent',
    cssVar: '--accent',
    usage: 'Highlights',
    value: 'oklch(0.97 0 0)',
  },
  {
    name: 'destructive',
    cssVar: '--destructive',
    usage: 'Danger / errors',
    value: 'oklch(0.577 0.245 27.325)',
  },
  {
    name: 'border',
    cssVar: '--border',
    usage: 'Borders',
    value: 'oklch(0.922 0 0)',
  },
  {
    name: 'ring',
    cssVar: '--ring',
    usage: 'Focus ring',
    value: 'oklch(0.708 0 0)',
  },
]

function oklchToRelativeLightness(oklch: string): number {
  const match = oklch.match(/oklch\(([\d.]+)%?\s/)
  if (!match) return 0.5
  const val = parseFloat(match[1])
  return val > 1 ? val / 100 : val
}

function toRelativeLuminance(color: string): number {
  const rgb = rgbConverter(color)
  if (!rgb) return 0

  // Clamp to valid sRGB range before luminance math.
  const clamp = (v: number) => Math.min(1, Math.max(0, v))
  const r = clamp(rgb.r ?? 0)
  const g = clamp(rgb.g ?? 0)
  const b = clamp(rgb.b ?? 0)

  const toLinear = (channel: number) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4

  const rLin = toLinear(r)
  const gLin = toLinear(g)
  const bLin = toLinear(b)

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin
}

function getContrastRatio(foreground: string, background: string): number {
  const l1 = toRelativeLuminance(foreground)
  const l2 = toRelativeLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function toHex(oklch: string): string {
  return formatHex(oklch) ?? '#000000'
}

function toRgbString(oklch: string): string {
  const rgb = rgbConverter(oklch)
  if (!rgb) return 'rgb(0, 0, 0)'

  const r = Math.round((rgb.r ?? 0) * 255)
  const g = Math.round((rgb.g ?? 0) * 255)
  const b = Math.round((rgb.b ?? 0) * 255)

  return `rgb(${r}, ${g}, ${b})`
}

function ColourSwatch({
  stop,
  prefix,
}: {
  stop: ColourStop
  prefix: 'primary' | 'secondary'
}) {
  const lightness = oklchToRelativeLightness(stop.oklch)
  const isLight = lightness > 0.65
  const hex = toHex(stop.oklch)
  const rgb = toRgbString(stop.oklch)

  return (
    <div className='group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10'>
      <div className='pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div className='h-full w-full bg-linear-to-tr from-transparent via-white/25 to-transparent' />
      </div>
      <div
        className={cn(
          'relative flex h-24 w-full items-end p-3',
          prefix === 'primary'
            ? `bg-fcu-primary-${stop.shade}`
            : `bg-fcu-secondary-${stop.shade}`,
        )}
        style={{ backgroundColor: stop.oklch }}
      >
        <span
          className={cn(
            'absolute top-2 right-2 rounded-full px-1.5 py-0.5 text-[9px] font-semibold tracking-wide',
            isLight ? 'bg-black/10 text-black/65' : 'bg-white/15 text-white/85',
          )}
        >
          {prefix === 'primary' ? 'Primary' : 'Secondary'}
        </span>
        <span
          className={cn(
            'text-xs font-bold',
            isLight ? 'text-black/60' : 'text-white/80',
          )}
        >
          {stop.shade}
        </span>
      </div>
      <div className='px-3 py-2.5'>
        <p className='text-[11px] font-semibold text-foreground'>
          {stop.tailwind}
        </p>
        <p className='mt-0.5 text-[10px] text-muted-foreground'>{hex}</p>
        <p className='mt-0.5 text-[10px] text-muted-foreground'>{rgb}</p>
        <p className='mt-0.5 text-[9px] text-muted-foreground'>{stop.cssVar}</p>
      </div>
      <div className='flex items-center justify-between gap-2 border-t border-border/50 px-3 py-1.5'>
        <span className='text-[9px] font-medium uppercase tracking-wider text-muted-foreground'>
          From OKLCH
        </span>
        <CopyButton value={hex} label={`${stop.tailwind} hex`} />
      </div>
    </div>
  )
}

export function ColourSection() {
  const [contrastFg, setContrastFg] = React.useState('fcu-primary-900')
  const [contrastBg, setContrastBg] = React.useState('fcu-primary-50')

  const allColours = [
    ...NEUTRAL_PALETTE.map((s) => ({ ...s, id: s.tailwind })),
    ...PRIMARY_PALETTE.map((s) => ({ ...s, id: s.tailwind })),
    ...SECONDARY_PALETTE.map((s) => ({ ...s, id: s.tailwind })),
    ...GREEN_FADED_PALETTE.map((s) => ({ ...s, id: s.tailwind })),
    ...MINT_PALETTE.map((s) => ({ ...s, id: s.tailwind })),
  ]

  const fgColour = allColours.find((c) => c.id === contrastFg)
  const bgColour = allColours.find((c) => c.id === contrastBg)

  const ratio = getContrastRatio(
    fgColour?.oklch ?? 'oklch(0.145 0 0)',
    bgColour?.oklch ?? 'oklch(1 0 0)',
  )
  const passAA = ratio >= 4.5
  const passAALarge = ratio >= 3
  const passAAA = ratio >= 7

  return (
    <SectionWrapper
      id='colours'
      title='Colours'
      description='Our colour system uses OKLCH for perceptually uniform lightness. Two brand palettes (Primary Blue, Secondary Green) plus semantic tokens for UI consistency.'
    >
      <Subsection
        title='Brand Hex Anchors'
        description='Canonical brand hex values for quick reference and handoff.'
      >
        <div className='grid gap-3 sm:grid-cols-2'>
          <div className='flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3'>
            <div className='flex items-center gap-3'>
              <span
                className='size-8 rounded-lg border border-border'
                style={{ backgroundColor: '#00687f' }}
                aria-hidden='true'
              />
              <div>
                <p className='text-xs font-semibold text-foreground'>
                  Primary Hex
                </p>
                <p className='text-[10px] text-muted-foreground'>#00687f</p>
              </div>
            </div>
            <CopyButton value='#00687f' label='Primary hex' />
          </div>

          <div className='flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3'>
            <div className='flex items-center gap-3'>
              <span
                className='size-8 rounded-lg border border-border'
                style={{ backgroundColor: '#bbbb14' }}
                aria-hidden='true'
              />
              <div>
                <p className='text-xs font-semibold text-foreground'>
                  Secondary Hex
                </p>
                <p className='text-[10px] text-muted-foreground'>#bbbb14</p>
              </div>
            </div>
            <CopyButton value='#bbbb14' label='Secondary hex' />
          </div>

          <div className='flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3'>
            <div className='flex items-center gap-3'>
              <span
                className='size-8 rounded-lg border border-border'
                style={{ backgroundColor: '#eee8a9' }}
                aria-hidden='true'
              />
              <div>
                <p className='text-xs font-semibold text-foreground'>
                  Green Faded 500
                </p>
                <p className='text-[10px] text-muted-foreground'>#eee8a9</p>
              </div>
            </div>
            <CopyButton value='#eee8a9' label='Green faded 500 hex' />
          </div>

          <div className='flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3'>
            <div className='flex items-center gap-3'>
              <span
                className='size-8 rounded-lg border border-border'
                style={{ backgroundColor: '#98d9c2' }}
                aria-hidden='true'
              />
              <div>
                <p className='text-xs font-semibold text-foreground'>
                  Mint 500
                </p>
                <p className='text-[10px] text-muted-foreground'>#98d9c2</p>
              </div>
            </div>
            <CopyButton value='#98d9c2' label='Mint 500 hex' />
          </div>
        </div>
      </Subsection>

      <Subsection
        title='FCU Primary — Blue'
        description='11 shades from lightest tint to deepest near-black. Hue range: 220–227. HEX and RGB are converted from OKLCH, with copyable HEX.'
      >
        <div className='rounded-3xl border border-fcu-primary-900/10 bg-linear-to-br from-fcu-primary-50/40 to-background p-4 sm:p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <p className='text-xs font-semibold text-fcu-primary-900'>
              Primary Scale
            </p>
            <Badge variant='outline' className='text-[10px]'>
              5 per row
            </Badge>
          </div>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
            {PRIMARY_PALETTE.map((stop) => (
              <ColourSwatch key={stop.shade} stop={stop} prefix='primary' />
            ))}
          </div>
        </div>
      </Subsection>

      <Subsection
        title='FCU Secondary — Green/Yellow'
        description='11 shades with consistent hue at 109.7. HEX and RGB are converted from OKLCH, with copyable HEX.'
      >
        <div className='rounded-3xl border border-fcu-secondary-500/20 p-4 sm:p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <p className='text-xs font-semibold text-fcu-secondary-500'>
              Secondary Scale
            </p>
            <Badge variant='outline' className='text-[10px]'>
              5 per row
            </Badge>
          </div>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
            {SECONDARY_PALETTE.map((stop) => (
              <ColourSwatch key={stop.shade} stop={stop} prefix='secondary' />
            ))}
          </div>
        </div>
      </Subsection>

      <Subsection
        title='FCU Green Faded'
        description='Soft green palette for subtle highlights and low-contrast support surfaces. HEX and RGB are converted from OKLCH.'
      >
        <div className='rounded-3xl border border-border bg-muted/20 p-4 sm:p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <p className='text-xs font-semibold text-foreground'>
              Green Faded Scale
            </p>
            <Badge variant='outline' className='text-[10px]'>
              5 per row
            </Badge>
          </div>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
            {GREEN_FADED_PALETTE.map((stop) => (
              <ColourSwatch key={stop.shade} stop={stop} prefix='secondary' />
            ))}
          </div>
        </div>
      </Subsection>

      <Subsection
        title='FCU Mint'
        description='Fresh mint palette for supportive UI accents and soft visual contrast. HEX and RGB are converted from OKLCH.'
      >
        <div className='rounded-3xl border border-border bg-muted/20 p-4 sm:p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <p className='text-xs font-semibold text-foreground'>Mint Scale</p>
            <Badge variant='outline' className='text-[10px]'>
              5 per row
            </Badge>
          </div>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
            {MINT_PALETTE.map((stop) => (
              <ColourSwatch key={stop.shade} stop={stop} prefix='secondary' />
            ))}
          </div>
        </div>
      </Subsection>

      <Subsection
        title='Semantic / UI Colours'
        description='Purpose-based tokens from shadcn/ui mapped in :root. These are separate from the FCU brand palettes.'
      >
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {SEMANTIC_COLOURS.map((c) => (
            <div
              key={c.name}
              className='rounded-xl border border-border bg-card p-4'
            >
              <div className='flex items-start gap-3'>
                <div
                  className='mt-0.5 size-8 shrink-0 rounded-lg border border-border'
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
                <div className='min-w-0 flex-1'>
                  <div className='mb-1 flex items-center justify-between gap-2'>
                    <p className='text-sm font-semibold text-foreground'>
                      {c.name}
                    </p>
                    <CopyButton
                      value={toHex(c.value)}
                      label={`${c.name} hex`}
                    />
                  </div>
                  <p className='text-xs text-muted-foreground'>{c.usage}</p>
                </div>
              </div>

              <div className='mt-3 grid gap-1.5 text-[10px]'>
                <div className='flex items-center justify-between rounded-md bg-muted px-2 py-1'>
                  <span className='font-medium text-muted-foreground'>HEX</span>
                  <code className='font-mono text-foreground'>
                    {toHex(c.value)}
                  </code>
                </div>
                <div className='flex items-center justify-between rounded-md bg-muted px-2 py-1'>
                  <span className='font-medium text-muted-foreground'>RGB</span>
                  <code className='font-mono text-foreground'>
                    {toRgbString(c.value)}
                  </code>
                </div>
                <div className='flex items-center justify-between rounded-md bg-muted px-2 py-1'>
                  <span className='font-medium text-muted-foreground'>
                    Token
                  </span>
                  <span className='flex items-center gap-1'>
                    <code className='font-mono text-foreground'>
                      {c.cssVar}
                    </code>
                    <CopyButton
                      value={`var(${c.cssVar})`}
                      label={`${c.name} token`}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection
        title='Contrast Checker'
        description='Pick any two FCU colours to check their WCAG contrast ratio.'
      >
        <div className='rounded-2xl border border-border bg-card p-6'>
          <div className='mb-6 flex flex-wrap gap-4'>
            <div className='min-w-[180px]'>
              <label className='mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                Foreground (Text)
              </label>
              <Select value={contrastFg} onValueChange={setContrastFg}>
                <SelectTrigger className='h-9 text-xs'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allColours.map((c) => (
                    <SelectItem key={c.id} value={c.id} className='text-xs'>
                      <span className='flex items-center gap-2'>
                        <span
                          className='inline-block size-3 rounded border'
                          style={{ backgroundColor: c.oklch }}
                        />
                        {c.id}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='min-w-[180px]'>
              <label className='mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                Background
              </label>
              <Select value={contrastBg} onValueChange={setContrastBg}>
                <SelectTrigger className='h-9 text-xs'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allColours.map((c) => (
                    <SelectItem key={c.id} value={c.id} className='text-xs'>
                      <span className='flex items-center gap-2'>
                        <span
                          className='inline-block size-3 rounded border'
                          style={{ backgroundColor: c.oklch }}
                        />
                        {c.id}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Selected hex values */}
          <div className='mb-4 flex flex-wrap gap-3'>
            <div className='flex items-center gap-2 rounded-lg bg-muted px-3 py-2'>
              <span
                className='size-4 shrink-0 rounded border border-border'
                style={{ backgroundColor: fgColour?.oklch ?? '#000000' }}
              />
              <span className='text-[10px] font-medium text-muted-foreground'>
                FG:
              </span>
              <code className='text-xs font-semibold text-foreground'>
                {toHex(fgColour?.oklch ?? '#000000')}
              </code>
              <CopyButton
                value={toHex(fgColour?.oklch ?? '#000000')}
                label='Foreground hex'
              />
            </div>
            <div className='flex items-center gap-2 rounded-lg bg-muted px-3 py-2'>
              <span
                className='size-4 shrink-0 rounded border border-border'
                style={{ backgroundColor: bgColour?.oklch ?? '#ffffff' }}
              />
              <span className='text-[10px] font-medium text-muted-foreground'>
                BG:
              </span>
              <code className='text-xs font-semibold text-foreground'>
                {toHex(bgColour?.oklch ?? '#ffffff')}
              </code>
              <CopyButton
                value={toHex(bgColour?.oklch ?? '#ffffff')}
                label='Background hex'
              />
            </div>
          </div>

          {/* Preview */}
          <div
            className='mb-6 flex items-center justify-center rounded-xl p-10'
            style={{
              backgroundColor: bgColour?.oklch ?? '#ffffff',
              color: fgColour?.oklch ?? '#000000',
            }}
          >
            <p className='text-2xl font-bold'>Sample Text — Aa Bb 123</p>
          </div>

          {/* Results */}
          <div className='flex flex-wrap gap-3'>
            <Badge
              variant='outline'
              className={cn(
                'text-xs',
                passAA
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700',
              )}
            >
              AA Normal: {passAA ? 'Pass' : 'Fail'}
            </Badge>
            <Badge
              variant='outline'
              className={cn(
                'text-xs',
                passAALarge
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700',
              )}
            >
              AA Large: {passAALarge ? 'Pass' : 'Fail'}
            </Badge>
            <Badge
              variant='outline'
              className={cn(
                'text-xs',
                passAAA
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700',
              )}
            >
              AAA: {passAAA ? 'Pass' : 'Fail'}
            </Badge>
            <Badge variant='secondary' className='text-xs'>
              Ratio: {ratio.toFixed(2)}:1
            </Badge>
          </div>

          {/* WCAG reference table */}
          <div className='mt-6 rounded-xl border border-border bg-muted/40 p-4'>
            <p className='mb-3 text-xs font-semibold text-foreground'>
              WCAG Contrast Ratio Guide
            </p>
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-[11px]'>
                <thead>
                  <tr className='border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                    <th className='pb-2 pr-4'>Level</th>
                    <th className='pb-2 pr-4'>Min Ratio</th>
                    <th className='pb-2 pr-4'>Applies To</th>
                    <th className='pb-2'>Rating</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border/50'>
                  <tr>
                    <td className='py-2 pr-4 font-medium text-foreground'>
                      AA Large
                    </td>
                    <td className='py-2 pr-4 font-mono'>3:1</td>
                    <td className='py-2 pr-4 text-muted-foreground'>
                      Text &ge;18pt (or &ge;14pt bold), UI components &
                      graphical objects
                    </td>
                    <td className='py-2'>
                      <span className='rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700'>
                        Minimum
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className='py-2 pr-4 font-medium text-foreground'>
                      AA Normal
                    </td>
                    <td className='py-2 pr-4 font-mono'>4.5:1</td>
                    <td className='py-2 pr-4 text-muted-foreground'>
                      Body text, labels, and all text &lt;18pt &mdash; the
                      standard FCU must meet
                    </td>
                    <td className='py-2'>
                      <span className='rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700'>
                        Required
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className='py-2 pr-4 font-medium text-foreground'>
                      AAA Normal
                    </td>
                    <td className='py-2 pr-4 font-mono'>7:1</td>
                    <td className='py-2 pr-4 text-muted-foreground'>
                      Enhanced readability &mdash; ideal for long-form content
                      and critical financial information
                    </td>
                    <td className='py-2'>
                      <span className='rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700'>
                        Excellent
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='mt-3 space-y-1 text-[10px] text-muted-foreground'>
              <p>
                <strong className='text-foreground'>Below 3:1</strong> &mdash;
                Fails all WCAG levels. Do not use for any text or meaningful UI
                element.
              </p>
              <p>
                <strong className='text-foreground'>3:1 &ndash; 4.49:1</strong>{' '}
                &mdash; Acceptable only for large text (&ge;18pt / 24px) and
                non-text UI components like icons and borders.
              </p>
              <p>
                <strong className='text-foreground'>
                  4.5:1 &ndash; 6.99:1
                </strong>{' '}
                &mdash; Meets AA for all text sizes. This is the baseline FCU
                targets for WCAG 2.1 AA compliance.
              </p>
              <p>
                <strong className='text-foreground'>7:1+</strong> &mdash; Meets
                AAA. Best for body copy, financial disclosures, and any content
                where maximum legibility matters.
              </p>
            </div>
          </div>

          <p className='mt-3 text-[10px] text-muted-foreground'>
            Contrast is calculated from Culori RGB conversion using WCAG 2.1
            relative luminance formula. Ratio = (L1 + 0.05) / (L2 + 0.05) where
            L1 is the lighter colour.
          </p>
        </div>
      </Subsection>
    </SectionWrapper>
  )
}
