'use client'

import * as React from 'react'
import { SectionWrapper, Subsection } from './section-wrapper'
import { CopyButton } from './code-block'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const WEIGHTS = [
  { value: 100, name: 'Thin', className: 'font-thin' },
  { value: 200, name: 'Extra Light', className: 'font-extralight' },
  { value: 300, name: 'Light', className: 'font-light' },
  { value: 400, name: 'Regular', className: 'font-normal' },
  { value: 500, name: 'Medium', className: 'font-medium' },
  { value: 600, name: 'Semi Bold', className: 'font-semibold' },
  { value: 700, name: 'Bold', className: 'font-bold' },
  { value: 800, name: 'Extra Bold', className: 'font-extrabold' },
  { value: 900, name: 'Black', className: 'font-black' },
] as const

const TYPE_SCALE = [
  {
    name: 'Display',
    tag: 'h1',
    size: '3.75rem',
    sizePx: '60px',
    weight: 800,
    lineHeight: '1',
    letterSpacing: '-0.025em',
    tailwind: 'text-6xl font-extrabold tracking-tight',
    usage: 'Hero headlines, landing page titles',
  },
  {
    name: 'H1',
    tag: 'h1',
    size: '3rem',
    sizePx: '48px',
    weight: 700,
    lineHeight: '1.1',
    letterSpacing: '-0.025em',
    tailwind: 'text-5xl font-bold tracking-tight',
    usage: 'Page titles',
  },
  {
    name: 'H2',
    tag: 'h2',
    size: '2.25rem',
    sizePx: '36px',
    weight: 700,
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    tailwind: 'text-4xl font-bold tracking-tight',
    usage: 'Section headings',
  },
  {
    name: 'H3',
    tag: 'h3',
    size: '1.875rem',
    sizePx: '30px',
    weight: 600,
    lineHeight: '1.3',
    letterSpacing: '-0.015em',
    tailwind: 'text-3xl font-semibold',
    usage: 'Subsection headings',
  },
  {
    name: 'H4',
    tag: 'h4',
    size: '1.5rem',
    sizePx: '24px',
    weight: 600,
    lineHeight: '1.35',
    letterSpacing: '-0.01em',
    tailwind: 'text-2xl font-semibold',
    usage: 'Card titles, feature headings',
  },
  {
    name: 'H5',
    tag: 'h5',
    size: '1.25rem',
    sizePx: '20px',
    weight: 600,
    lineHeight: '1.4',
    letterSpacing: '0',
    tailwind: 'text-xl font-semibold',
    usage: 'Small headings',
  },
  {
    name: 'H6 / Overline',
    tag: 'h6',
    size: '0.75rem',
    sizePx: '12px',
    weight: 700,
    lineHeight: '1.5',
    letterSpacing: '0.1em',
    tailwind: 'text-xs font-bold uppercase tracking-widest',
    usage: 'Category labels, eyebrow text',
  },
  {
    name: 'Body Large',
    tag: 'p',
    size: '1.125rem',
    sizePx: '18px',
    weight: 400,
    lineHeight: '1.75',
    letterSpacing: '0',
    tailwind: 'text-lg',
    usage: 'Lead paragraphs, introductions',
  },
  {
    name: 'Body',
    tag: 'p',
    size: '1rem',
    sizePx: '16px',
    weight: 400,
    lineHeight: '1.75',
    letterSpacing: '0',
    tailwind: 'text-base',
    usage: 'Default paragraph text',
  },
  {
    name: 'Body Small',
    tag: 'p',
    size: '0.875rem',
    sizePx: '14px',
    weight: 400,
    lineHeight: '1.7',
    letterSpacing: '0',
    tailwind: 'text-sm',
    usage: 'Secondary text, descriptions',
  },
  {
    name: 'Caption',
    tag: 'span',
    size: '0.75rem',
    sizePx: '12px',
    weight: 500,
    lineHeight: '1.5',
    letterSpacing: '0',
    tailwind: 'text-xs font-medium',
    usage: 'Image captions, metadata',
  },
  {
    name: 'Label',
    tag: 'label',
    size: '0.875rem',
    sizePx: '14px',
    weight: 500,
    lineHeight: '1.4',
    letterSpacing: '0',
    tailwind: 'text-sm font-medium',
    usage: 'Form labels, button text',
  },
  {
    name: 'Helper',
    tag: 'span',
    size: '0.75rem',
    sizePx: '12px',
    weight: 400,
    lineHeight: '1.5',
    letterSpacing: '0',
    tailwind: 'text-xs',
    usage: 'Form helper text, footnotes',
  },
] as const

const DEFAULT_PREVIEW = 'The quick brown fox jumps over the lazy dog'

export function TypographySection() {
  const [previewText, setPreviewText] = React.useState(DEFAULT_PREVIEW)
  const displayText = previewText.trim() || DEFAULT_PREVIEW

  return (
    <SectionWrapper
      id="typography"
      title="Typography"
      description="Poppins is our sole typeface — a geometric sans-serif with rounded terminals that conveys approachability and modern professionalism. Loaded via next/font for optimal performance."
    >
      <Subsection title="Typeface">
        <div className="rounded-2xl border border-fcu-primary-100 bg-white p-8">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="text-7xl font-bold tracking-tight text-fcu-primary-950">
              Aa
            </span>
            <div>
              <p className="text-lg font-semibold text-fcu-primary-800">
                Poppins
              </p>
              <p className="text-xs text-fcu-primary-400">
                Geometric Sans-Serif &middot; Google Fonts &middot;{' '}
                <code className="rounded bg-fcu-primary-50 px-1 py-0.5 text-[10px]">
                  next/font/google
                </code>
              </p>
            </div>
          </div>

          <div className="mt-6 text-sm leading-loose text-fcu-primary-600">
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p>0123456789 !@#$%^&*()_+-=</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-[10px]">
              latin subset
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              display: swap
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              self-hosted via Vercel
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              9 weights loaded
            </Badge>
          </div>
        </div>
      </Subsection>

      <Subsection
        title="Font Weights"
        description="All 9 weights are available. Type custom text below to preview."
      >
        <div className="mb-6">
          <Input
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            placeholder={DEFAULT_PREVIEW}
            className="max-w-md border-fcu-primary-200 text-sm"
          />
        </div>

        <div className="space-y-0 divide-y divide-fcu-primary-50 rounded-2xl border border-fcu-primary-100 bg-white">
          {WEIGHTS.map((w) => (
            <div
              key={w.value}
              className="group flex flex-col gap-1 px-6 py-4 transition-colors hover:bg-fcu-primary-50/50 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex w-28 shrink-0 items-center gap-2">
                <span className="text-[10px] tabular-nums text-fcu-primary-400">
                  {w.value}
                </span>
                <span className="text-xs font-medium text-fcu-primary-600">
                  {w.name}
                </span>
              </div>
              <p
                className={`min-w-0 flex-1 truncate text-xl text-fcu-primary-900 ${w.className}`}
              >
                {displayText}
              </p>
              <CopyButton
                value={w.className.replace('font-', 'font-weight: ').concat(` (${w.value})`)}
                label={w.className}
                className="shrink-0 opacity-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection
        title="Type Scale"
        description="The complete type hierarchy from Display through Helper. Each level specifies size, weight, line-height, and letter-spacing."
      >
        <div className="space-y-0 divide-y divide-fcu-primary-50 rounded-2xl border border-fcu-primary-100 bg-white">
          {TYPE_SCALE.map((t) => (
            <div
              key={t.name}
              className="group px-6 py-5 transition-colors hover:bg-fcu-primary-50/50"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-fcu-primary-800">
                  {t.name}
                </span>
                <span className="text-[10px] text-fcu-primary-400">
                  {t.sizePx} / {t.size}
                </span>
                <span className="text-[10px] text-fcu-primary-300">
                  &middot; w{t.weight} &middot; lh {t.lineHeight} &middot; ls{' '}
                  {t.letterSpacing}
                </span>
              </div>

              <p
                className="text-fcu-primary-900"
                style={{
                  fontSize: t.size,
                  fontWeight: t.weight,
                  lineHeight: t.lineHeight,
                  letterSpacing: t.letterSpacing,
                }}
              >
                {displayText}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <CopyButton value={t.tailwind} label="Tailwind classes" />
                <span className="text-[10px] text-fcu-primary-300">
                  {t.usage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Text Rules">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'Line Length',
              value: '60–80 characters',
              detail: 'Use max-w-prose (65ch) for body text',
            },
            {
              title: 'Alignment',
              value: 'Left-aligned by default',
              detail: 'Centre only for short hero text',
            },
            {
              title: 'Paragraph Spacing',
              value: 'mt-4 between paragraphs',
              detail: 'Use Tailwind prose for articles',
            },
            {
              title: 'Truncation',
              value: 'Single-line ellipsis or line-clamp',
              detail: 'truncate or line-clamp-{n}',
            },
          ].map((rule) => (
            <div
              key={rule.title}
              className="rounded-xl border border-fcu-primary-100 bg-white p-5"
            >
              <p className="text-sm font-semibold text-fcu-primary-800">
                {rule.title}
              </p>
              <p className="mt-1 text-xs font-medium text-fcu-secondary-700">
                {rule.value}
              </p>
              <p className="mt-1 text-[10px] text-fcu-primary-400">
                {rule.detail}
              </p>
            </div>
          ))}
        </div>
      </Subsection>
    </SectionWrapper>
  )
}
