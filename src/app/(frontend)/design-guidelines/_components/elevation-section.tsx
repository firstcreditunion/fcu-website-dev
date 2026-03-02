'use client'

import * as React from 'react'
import { SectionWrapper, Subsection } from './section-wrapper'
import { CopyButton } from './code-block'
import { cn } from '@/lib/utils'

const ELEVATION_LEVELS = [
  {
    level: 0,
    name: 'Flat',
    shadow: 'none',
    tailwind: 'shadow-none',
    css: 'box-shadow: none',
    usage: 'Inline elements, flat backgrounds',
    components: 'Inline text, flat dividers',
  },
  {
    level: 1,
    name: 'Raised',
    shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    tailwind: 'shadow-sm',
    css: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)',
    usage: 'Subtle lift for cards and surfaces',
    components: 'Cards, raised surfaces',
  },
  {
    level: 2,
    name: 'Medium',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    tailwind: 'shadow',
    css: 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    usage: 'Interactive cards, hover states',
    components: 'Hovered cards, buttons',
  },
  {
    level: 3,
    name: 'High',
    shadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    tailwind: 'shadow-md',
    css: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    usage: 'Floating elements, dropdowns',
    components: 'Dropdowns, popovers, tooltips',
  },
  {
    level: 4,
    name: 'Overlay',
    shadow:
      '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    tailwind: 'shadow-lg',
    css: 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    usage: 'Modals, dialogs, overlays',
    components: 'Modals, dialogs, sheets',
  },
  {
    level: 5,
    name: 'Top Layer',
    shadow:
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    tailwind: 'shadow-xl',
    css: 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    usage: 'Toasts, notifications, navigation drawers',
    components: 'Toast, notification banners',
  },
] as const

export function ElevationSection() {
  const [hoveredLevel, setHoveredLevel] = React.useState<number | null>(null)

  return (
    <SectionWrapper
      id="elevation"
      title="Elevation & Shadows"
      description="Elevation creates visual hierarchy through shadows. Six levels from flat (0) to top-layer (5), using Tailwind's shadow utilities."
    >
      <Subsection
        title="Shadow Levels"
        description="Hover each card to see the next elevation level. Shadows use multi-layered composites for a natural appearance."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ELEVATION_LEVELS.map((el) => {
            const isHovered = hoveredLevel === el.level
            const displayShadow =
              isHovered && el.level < 5
                ? ELEVATION_LEVELS[el.level + 1].shadow
                : el.shadow

            return (
              <div
                key={el.level}
                className="group relative cursor-default rounded-2xl border border-border bg-card p-6 transition-all duration-200"
                style={{ boxShadow: displayShadow }}
                onMouseEnter={() => setHoveredLevel(el.level)}
                onMouseLeave={() => setHoveredLevel(null)}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'flex size-7 items-center justify-center rounded-lg text-xs font-bold transition-colors',
                        isHovered
                          ? 'bg-fcu-secondary-500 text-white'
                          : 'bg-muted text-foreground/80'
                      )}
                    >
                      {el.level}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {el.name}
                    </span>
                  </div>
                  <CopyButton value={el.tailwind} />
                </div>

                <p className="mb-3 text-xs text-muted-foreground">{el.usage}</p>

                <div className="flex flex-wrap gap-1.5">
                  {el.components.split(', ').map((comp) => (
                    <span
                      key={comp}
                      className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground/80"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Subsection>

      <Subsection
        title="Interaction Guidelines"
        description="How shadows should transition between states."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              state: 'Rest → Hover',
              desc: 'Cards elevate from level 1 to 2',
              timing: '150–200ms ease',
            },
            {
              state: 'Hover → Active',
              desc: 'Elements press down to level 0–1',
              timing: '50–100ms ease',
            },
            {
              state: 'Enter → Exit',
              desc: 'Modals fade from level 0 to 4',
              timing: '200–300ms ease-out',
            },
          ].map((g) => (
            <div
              key={g.state}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-sm font-semibold text-foreground">
                {g.state}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{g.desc}</p>
              <p className="mt-2 text-[10px] font-medium text-fcu-secondary-500">
                {g.timing}
              </p>
            </div>
          ))}
        </div>
      </Subsection>
    </SectionWrapper>
  )
}
