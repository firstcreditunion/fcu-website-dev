'use client'

import * as React from 'react'
import { SectionWrapper, Subsection } from './section-wrapper'
import { CopyButton } from './code-block'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const BASE_RADIUS = 10 // 0.625rem

const RADIUS_TOKENS = [
  { name: 'none', value: '0px', computed: 0, tailwind: 'rounded-none' },
  {
    name: 'sm',
    value: 'calc(var(--radius) - 4px)',
    computed: BASE_RADIUS - 4,
    tailwind: 'rounded-sm',
  },
  {
    name: 'md',
    value: 'calc(var(--radius) - 2px)',
    computed: BASE_RADIUS - 2,
    tailwind: 'rounded-md',
  },
  {
    name: 'lg',
    value: 'var(--radius)',
    computed: BASE_RADIUS,
    tailwind: 'rounded-lg',
  },
  {
    name: 'xl',
    value: 'calc(var(--radius) + 4px)',
    computed: BASE_RADIUS + 4,
    tailwind: 'rounded-xl',
  },
  {
    name: '2xl',
    value: 'calc(var(--radius) + 8px)',
    computed: BASE_RADIUS + 8,
    tailwind: 'rounded-2xl',
  },
  {
    name: '3xl',
    value: 'calc(var(--radius) + 12px)',
    computed: BASE_RADIUS + 12,
    tailwind: 'rounded-3xl',
  },
  {
    name: '4xl',
    value: 'calc(var(--radius) + 16px)',
    computed: BASE_RADIUS + 16,
    tailwind: 'rounded-[var(--radius-4xl)]',
  },
  {
    name: 'full',
    value: '9999px',
    computed: 9999,
    tailwind: 'rounded-full',
  },
] as const

const BORDER_WIDTHS = [
  { name: 'none', value: '0px', tailwind: 'border-0' },
  { name: 'default', value: '1px', tailwind: 'border' },
  { name: 'thick', value: '2px', tailwind: 'border-2' },
  { name: 'heavy', value: '4px', tailwind: 'border-4' },
] as const

export function RadiusSection() {
  const [customRadius, setCustomRadius] = React.useState([BASE_RADIUS])

  return (
    <SectionWrapper
      id='radius'
      title='Borders & Radius'
      description='A consistent border radius scale derived from --radius (0.625rem / 10px). All components reference this base value so the entire system can be tuned from a single token.'
    >
      <Subsection
        title='Radius Scale'
        description='Each token is computed from the base --radius variable. The boxes below show the actual corner rounding.'
      >
        <div className='grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9'>
          {RADIUS_TOKENS.map((r) => {
            const displayRadius =
              r.computed === 9999 ? '50%' : `${r.computed}px`

            return (
              <div key={r.name} className='text-center'>
                <div
                  className='mx-auto mb-3 flex size-20 items-center justify-center border-2 border-border bg-muted/70 transition-colors hover:border-muted-foreground/40 hover:bg-muted'
                  style={{
                    borderRadius: displayRadius,
                  }}
                >
                  <span className='text-[10px] font-bold tabular-nums text-foreground/80'>
                    {r.computed === 9999 ? '∞' : `${r.computed}px`}
                  </span>
                </div>
                <CopyButton value={r.tailwind} />
                <p className='mt-0.5 text-[9px] text-muted-foreground'>
                  {r.name}
                </p>
              </div>
            )
          })}
        </div>
      </Subsection>

      <Subsection
        title='Interactive Preview'
        description='Drag the slider to preview custom radius values on different shapes.'
      >
        <div className='rounded-2xl border border-border bg-card p-6'>
          <div className='mb-6 flex items-center gap-4'>
            <label className='text-xs font-medium text-foreground/80'>
              Radius:
            </label>
            <Slider
              value={customRadius}
              onValueChange={(v) =>
                setCustomRadius(Array.isArray(v) ? [...v] : [v])
              }
              max={48}
              min={0}
              step={1}
              className='max-w-xs'
            />
            <span className='min-w-[48px] text-right text-sm font-bold tabular-nums text-foreground'>
              {customRadius[0]}px
            </span>
          </div>

          <div className='flex flex-wrap items-end gap-6'>
            {/* Small box */}
            <div className='text-center'>
              <div
                className='size-16 bg-fcu-primary-900 transition-all duration-200'
                style={{ borderRadius: `${customRadius[0]}px` }}
              />
              <p className='mt-2 text-[10px] text-muted-foreground'>64×64</p>
            </div>
            {/* Medium box */}
            <div className='text-center'>
              <div
                className='h-24 w-40 bg-fcu-secondary-500 transition-all duration-200'
                style={{ borderRadius: `${customRadius[0]}px` }}
              />
              <p className='mt-2 text-[10px] text-muted-foreground'>160×96</p>
            </div>
            {/* Card-like */}
            <div className='text-center'>
              <div
                className='h-32 w-56 border-2 border-border bg-card transition-all duration-200'
                style={{ borderRadius: `${customRadius[0]}px` }}
              >
                <div
                  className='h-16 w-full bg-muted transition-all duration-200'
                  style={{
                    borderRadius: `${customRadius[0]}px ${customRadius[0]}px 0 0`,
                  }}
                />
              </div>
              <p className='mt-2 text-[10px] text-muted-foreground'>Card</p>
            </div>
            {/* Button */}
            <div className='text-center'>
              <div
                className='flex h-10 items-center justify-center bg-fcu-primary-900 px-6 text-xs font-medium text-white transition-all duration-200'
                style={{ borderRadius: `${customRadius[0]}px` }}
              >
                Button
              </div>
              <p className='mt-2 text-[10px] text-muted-foreground'>Button</p>
            </div>
          </div>
        </div>
      </Subsection>

      <Subsection
        title='Border Widths'
        description='Available border width tokens.'
      >
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {BORDER_WIDTHS.map((b) => (
            <div key={b.name} className='text-center'>
              <div
                className={cn(
                  'mx-auto mb-3 flex size-20 items-center justify-center rounded-xl bg-white',
                  b.name === 'none'
                    ? 'border-0'
                    : b.name === 'default'
                      ? 'border border-border'
                      : b.name === 'thick'
                        ? 'border-2 border-border'
                        : 'border-4 border-border',
                )}
              >
                <span className='text-xs font-bold tabular-nums text-foreground/80'>
                  {b.value}
                </span>
              </div>
              <CopyButton value={b.tailwind} />
              <p className='mt-0.5 text-[9px] text-muted-foreground'>
                {b.name}
              </p>
            </div>
          ))}
        </div>
      </Subsection>
    </SectionWrapper>
  )
}
