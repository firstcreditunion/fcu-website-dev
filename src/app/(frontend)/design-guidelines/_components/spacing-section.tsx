'use client'

import * as React from 'react'
import { SectionWrapper, Subsection } from './section-wrapper'
import { CopyButton } from './code-block'
import { cn } from '@/lib/utils'

const SPACING_SCALE = [
  { name: '0', px: 0, rem: '0', tailwind: '0' },
  { name: '0.5', px: 2, rem: '0.125rem', tailwind: '0.5' },
  { name: '1', px: 4, rem: '0.25rem', tailwind: '1' },
  { name: '1.5', px: 6, rem: '0.375rem', tailwind: '1.5' },
  { name: '2', px: 8, rem: '0.5rem', tailwind: '2' },
  { name: '2.5', px: 10, rem: '0.625rem', tailwind: '2.5' },
  { name: '3', px: 12, rem: '0.75rem', tailwind: '3' },
  { name: '3.5', px: 14, rem: '0.875rem', tailwind: '3.5' },
  { name: '4', px: 16, rem: '1rem', tailwind: '4' },
  { name: '5', px: 20, rem: '1.25rem', tailwind: '5' },
  { name: '6', px: 24, rem: '1.5rem', tailwind: '6' },
  { name: '7', px: 28, rem: '1.75rem', tailwind: '7' },
  { name: '8', px: 32, rem: '2rem', tailwind: '8' },
  { name: '9', px: 36, rem: '2.25rem', tailwind: '9' },
  { name: '10', px: 40, rem: '2.5rem', tailwind: '10' },
  { name: '11', px: 44, rem: '2.75rem', tailwind: '11' },
  { name: '12', px: 48, rem: '3rem', tailwind: '12' },
  { name: '14', px: 56, rem: '3.5rem', tailwind: '14' },
  { name: '16', px: 64, rem: '4rem', tailwind: '16' },
  { name: '20', px: 80, rem: '5rem', tailwind: '20' },
  { name: '24', px: 96, rem: '6rem', tailwind: '24' },
  { name: '28', px: 112, rem: '7rem', tailwind: '28' },
  { name: '32', px: 128, rem: '8rem', tailwind: '32' },
  { name: '36', px: 144, rem: '9rem', tailwind: '36' },
  { name: '40', px: 160, rem: '10rem', tailwind: '40' },
] as const

const BREAKPOINTS = [
  { name: 'sm', px: 640, usage: 'Large phones, landscape' },
  { name: 'md', px: 768, usage: 'Tablets' },
  { name: 'lg', px: 1024, usage: 'Small desktops' },
  { name: 'xl', px: 1280, usage: 'Desktops' },
  { name: '2xl', px: 1536, usage: 'Large screens' },
] as const

const MAX_BAR_WIDTH = 320

export function SpacingSection() {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null)

  return (
    <SectionWrapper
      id="spacing"
      title="Spacing"
      description="A consistent spacing scale built on Tailwind's default 4px base unit. All spacing values are multiples of 4px for rhythmic alignment."
    >
      <Subsection
        title="Spacing Scale"
        description="Hover to highlight. Click the class name to copy. Bar widths are proportional (capped at 320px)."
      >
        <div className="space-y-0 divide-y divide-fcu-primary-50 rounded-2xl border border-fcu-primary-100 bg-white">
          {SPACING_SCALE.map((s, i) => {
            const barWidth = Math.min(s.px, MAX_BAR_WIDTH)
            const isHovered = hoveredIdx === i

            return (
              <div
                key={s.name}
                className={cn(
                  'group flex items-center gap-4 px-5 py-2.5 transition-colors',
                  isHovered && 'bg-fcu-primary-50/70'
                )}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Token info */}
                <div className="flex w-24 shrink-0 items-center gap-2">
                  <CopyButton value={`p-${s.tailwind}`} label={`p-${s.tailwind}`} />
                </div>

                {/* Values */}
                <div className="flex w-28 shrink-0 items-center gap-2 text-[10px] tabular-nums text-fcu-primary-400">
                  <span>{s.px}px</span>
                  <span className="text-fcu-primary-200">/</span>
                  <span>{s.rem}</span>
                </div>

                {/* Visual bar */}
                <div className="flex-1">
                  <div
                    className={cn(
                      'h-4 rounded-sm transition-all duration-200',
                      isHovered
                        ? 'bg-fcu-secondary-500'
                        : 'bg-fcu-primary-200/60'
                    )}
                    style={{ width: barWidth === 0 ? 2 : barWidth }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Subsection>

      <Subsection
        title="Responsive Breakpoints"
        description="Mobile-first approach. Apply styles at these minimum viewport widths."
      >
        <div className="space-y-3">
          {BREAKPOINTS.map((bp) => {
            const barPct = (bp.px / 1536) * 100

            return (
              <div
                key={bp.name}
                className="group rounded-xl border border-fcu-primary-100 bg-white px-5 py-4 transition-colors hover:border-fcu-primary-200"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <code className="rounded bg-fcu-primary-50 px-2 py-0.5 text-xs font-bold text-fcu-primary-800">
                      {bp.name}:
                    </code>
                    <span className="text-xs tabular-nums text-fcu-primary-500">
                      ≥ {bp.px}px
                    </span>
                  </div>
                  <span className="text-[10px] text-fcu-primary-400">
                    {bp.usage}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-fcu-primary-50">
                  <div
                    className="h-full rounded-full bg-fcu-primary-300 transition-all group-hover:bg-fcu-primary-500"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Subsection>

      <Subsection
        title="Container Widths"
        description="Named container sizes for consistent content width across the site."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: 'prose', width: '65ch (~720px)', usage: 'Articles, long-form text', tailwind: 'max-w-prose' },
            { name: 'default', width: '1280px', usage: 'Standard page content', tailwind: 'max-w-7xl' },
            { name: 'wide', width: '1440px', usage: 'Extended layouts', tailwind: 'max-w-[1440px]' },
            { name: 'full', width: '100%', usage: 'Edge-to-edge sections', tailwind: 'max-w-full' },
          ].map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-fcu-primary-100 bg-white p-5"
            >
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-fcu-primary-800">
                  {c.name}
                </p>
                <CopyButton value={c.tailwind} />
              </div>
              <p className="mt-1 text-xs tabular-nums text-fcu-secondary-600">
                {c.width}
              </p>
              <p className="mt-0.5 text-[10px] text-fcu-primary-400">
                {c.usage}
              </p>
            </div>
          ))}
        </div>
      </Subsection>
    </SectionWrapper>
  )
}
