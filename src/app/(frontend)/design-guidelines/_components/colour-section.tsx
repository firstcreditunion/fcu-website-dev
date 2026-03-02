'use client'

import * as React from 'react'
import { SectionWrapper, Subsection } from './section-wrapper'
import { CopyButton } from './code-block'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
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

const PRIMARY_PALETTE: ColourStop[] = [
  { shade: '50', oklch: 'oklch(97.42% 0.016 226.9)', cssVar: '--color-fcu-primary-50', tailwind: 'fcu-primary-50' },
  { shade: '100', oklch: 'oklch(93.67% 0.039 227.71)', cssVar: '--color-fcu-primary-100', tailwind: 'fcu-primary-100' },
  { shade: '200', oklch: 'oklch(88.28% 0.077 224.69)', cssVar: '--color-fcu-primary-200', tailwind: 'fcu-primary-200' },
  { shade: '300', oklch: 'oklch(81.7% 0.132 221.14)', cssVar: '--color-fcu-primary-300', tailwind: 'fcu-primary-300' },
  { shade: '400', oklch: 'oklch(75.6% 0.138 220.17)', cssVar: '--color-fcu-primary-400', tailwind: 'fcu-primary-400' },
  { shade: '500', oklch: 'oklch(70.61% 0.128 219.78)', cssVar: '--color-fcu-primary-500', tailwind: 'fcu-primary-500' },
  { shade: '600', oklch: 'oklch(64.66% 0.117 219.68)', cssVar: '--color-fcu-primary-600', tailwind: 'fcu-primary-600' },
  { shade: '700', oklch: 'oklch(59.5% 0.108 219.87)', cssVar: '--color-fcu-primary-700', tailwind: 'fcu-primary-700' },
  { shade: '800', oklch: 'oklch(53.58% 0.097 219.61)', cssVar: '--color-fcu-primary-800', tailwind: 'fcu-primary-800' },
  { shade: '900', oklch: 'oklch(47.85% 0.087 220.03)', cssVar: '--color-fcu-primary-900', tailwind: 'fcu-primary-900' },
  { shade: '950', oklch: 'oklch(30.48% 0.056 221.59)', cssVar: '--color-fcu-primary-950', tailwind: 'fcu-primary-950' },
]

const SECONDARY_PALETTE: ColourStop[] = [
  { shade: '50', oklch: 'oklch(96.56% 0.206 109.7)', cssVar: '--color-fcu-secondary-50', tailwind: 'fcu-secondary-50' },
  { shade: '100', oklch: 'oklch(95.11% 0.203 109.7)', cssVar: '--color-fcu-secondary-100', tailwind: 'fcu-secondary-100' },
  { shade: '200', oklch: 'oklch(89.87% 0.192 109.7)', cssVar: '--color-fcu-secondary-200', tailwind: 'fcu-secondary-200' },
  { shade: '300', oklch: 'oklch(85.44% 0.182 109.7)', cssVar: '--color-fcu-secondary-300', tailwind: 'fcu-secondary-300' },
  { shade: '400', oklch: 'oklch(81.26% 0.173 109.7)', cssVar: '--color-fcu-secondary-400', tailwind: 'fcu-secondary-400' },
  { shade: '500', oklch: 'oklch(76.71% 0.164 109.7)', cssVar: '--color-fcu-secondary-500', tailwind: 'fcu-secondary-500' },
  { shade: '600', oklch: 'oklch(64.23% 0.137 109.7)', cssVar: '--color-fcu-secondary-600', tailwind: 'fcu-secondary-600' },
  { shade: '700', oklch: 'oklch(51.45% 0.11 109.7)', cssVar: '--color-fcu-secondary-700', tailwind: 'fcu-secondary-700' },
  { shade: '800', oklch: 'oklch(38.54% 0.082 109.7)', cssVar: '--color-fcu-secondary-800', tailwind: 'fcu-secondary-800' },
  { shade: '900', oklch: 'oklch(26.41% 0.056 109.7)', cssVar: '--color-fcu-secondary-900', tailwind: 'fcu-secondary-900' },
  { shade: '950', oklch: 'oklch(19.81% 0.043 109.76)', cssVar: '--color-fcu-secondary-950', tailwind: 'fcu-secondary-950' },
]

const SEMANTIC_COLOURS = [
  { name: 'background', cssVar: '--background', usage: 'Page background', value: 'oklch(1 0 0)' },
  { name: 'foreground', cssVar: '--foreground', usage: 'Default text', value: 'oklch(0.145 0 0)' },
  { name: 'primary', cssVar: '--primary', usage: 'Primary actions', value: 'oklch(0.205 0 0)' },
  { name: 'secondary', cssVar: '--secondary', usage: 'Secondary actions', value: 'oklch(0.97 0 0)' },
  { name: 'muted', cssVar: '--muted', usage: 'Subdued elements', value: 'oklch(0.97 0 0)' },
  { name: 'accent', cssVar: '--accent', usage: 'Highlights', value: 'oklch(0.97 0 0)' },
  { name: 'destructive', cssVar: '--destructive', usage: 'Danger / errors', value: 'oklch(0.577 0.245 27.325)' },
  { name: 'border', cssVar: '--border', usage: 'Borders', value: 'oklch(0.922 0 0)' },
  { name: 'ring', cssVar: '--ring', usage: 'Focus ring', value: 'oklch(0.708 0 0)' },
]

function oklchToRelativeLightness(oklch: string): number {
  const match = oklch.match(/oklch\(([\d.]+)%?\s/)
  if (!match) return 0.5
  const val = parseFloat(match[1])
  return val > 1 ? val / 100 : val
}

function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
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

  function handleClick() {
    navigator.clipboard.writeText(stop.tailwind)
    toast.success(`Copied: ${stop.tailwind}`)
  }

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden rounded-xl transition-all hover:scale-105 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-fcu-primary-500 focus-visible:ring-offset-2"
    >
      <div
        className={cn(
          'flex h-20 w-full items-end p-2.5',
          prefix === 'primary'
            ? `bg-fcu-primary-${stop.shade}`
            : `bg-fcu-secondary-${stop.shade}`
        )}
        style={{ backgroundColor: stop.oklch }}
      >
        <span
          className={cn(
            'text-[10px] font-bold',
            isLight ? 'text-black/60' : 'text-white/80'
          )}
        >
          {stop.shade}
        </span>
      </div>
      <div className="border-x border-b border-fcu-primary-100 bg-white px-2.5 py-2">
        <p className="text-left text-[10px] font-medium text-fcu-primary-700">
          {stop.tailwind}
        </p>
        <p className="text-left text-[9px] text-fcu-primary-400">
          {stop.oklch.replace('oklch(', '').replace(')', '')}
        </p>
      </div>
    </button>
  )
}

export function ColourSection() {
  const [contrastFg, setContrastFg] = React.useState('fcu-primary-950')
  const [contrastBg, setContrastBg] = React.useState('fcu-primary-50')

  const allColours = [
    ...PRIMARY_PALETTE.map((s) => ({ ...s, id: s.tailwind })),
    ...SECONDARY_PALETTE.map((s) => ({ ...s, id: s.tailwind })),
  ]

  const fgColour = allColours.find((c) => c.id === contrastFg)
  const bgColour = allColours.find((c) => c.id === contrastBg)

  const fgLightness = fgColour
    ? oklchToRelativeLightness(fgColour.oklch)
    : 0.1
  const bgLightness = bgColour
    ? oklchToRelativeLightness(bgColour.oklch)
    : 0.95

  const ratio = getContrastRatio(fgLightness, bgLightness)
  const passAA = ratio >= 4.5
  const passAALarge = ratio >= 3
  const passAAA = ratio >= 7

  return (
    <SectionWrapper
      id="colours"
      title="Colours"
      description="Our colour system uses OKLCH for perceptually uniform lightness. Two brand palettes (Primary Blue, Secondary Green) plus semantic tokens for UI consistency."
    >
      <Subsection
        title="FCU Primary — Blue"
        description="11 shades from lightest tint to deepest near-black. Hue range: 220–227. Click any swatch to copy its Tailwind class."
      >
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
          {PRIMARY_PALETTE.map((stop) => (
            <ColourSwatch key={stop.shade} stop={stop} prefix="primary" />
          ))}
        </div>
      </Subsection>

      <Subsection
        title="FCU Secondary — Green/Yellow"
        description="11 shades with consistent hue at 109.7. High chroma values create a vivid, energetic accent. Click to copy."
      >
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
          {SECONDARY_PALETTE.map((stop) => (
            <ColourSwatch key={stop.shade} stop={stop} prefix="secondary" />
          ))}
        </div>
      </Subsection>

      <Subsection
        title="Semantic / UI Colours"
        description="Purpose-based tokens from shadcn/ui mapped in :root. These are separate from the FCU brand palettes."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SEMANTIC_COLOURS.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 rounded-xl border border-fcu-primary-100 bg-white px-4 py-3"
            >
              <div
                className="size-8 rounded-lg border border-fcu-primary-100"
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-fcu-primary-800">
                    {c.name}
                  </p>
                  <CopyButton value={`var(${c.cssVar})`} />
                </div>
                <p className="text-[10px] text-fcu-primary-400">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection
        title="Contrast Checker"
        description="Pick any two FCU colours to check their WCAG contrast ratio."
      >
        <div className="rounded-2xl border border-fcu-primary-100 bg-white p-6">
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="min-w-[180px]">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-fcu-primary-400">
                Foreground (Text)
              </label>
              <Select value={contrastFg} onValueChange={setContrastFg}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allColours.map((c) => (
                    <SelectItem key={c.id} value={c.id} className="text-xs">
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block size-3 rounded border"
                          style={{ backgroundColor: c.oklch }}
                        />
                        {c.id}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[180px]">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-fcu-primary-400">
                Background
              </label>
              <Select value={contrastBg} onValueChange={setContrastBg}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allColours.map((c) => (
                    <SelectItem key={c.id} value={c.id} className="text-xs">
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block size-3 rounded border"
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

          {/* Preview */}
          <div
            className="mb-6 flex items-center justify-center rounded-xl p-10"
            style={{
              backgroundColor: bgColour?.oklch ?? '#ffffff',
              color: fgColour?.oklch ?? '#000000',
            }}
          >
            <p className="text-2xl font-bold">
              Sample Text — Aa Bb 123
            </p>
          </div>

          {/* Results */}
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="outline"
              className={cn(
                'text-xs',
                passAA
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              )}
            >
              AA Normal: {passAA ? 'Pass' : 'Fail'}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                'text-xs',
                passAALarge
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              )}
            >
              AA Large: {passAALarge ? 'Pass' : 'Fail'}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                'text-xs',
                passAAA
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              )}
            >
              AAA: {passAAA ? 'Pass' : 'Fail'}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Ratio: {ratio.toFixed(2)}:1
            </Badge>
          </div>

          <p className="mt-3 text-[10px] text-fcu-primary-400">
            Note: This uses OKLCH lightness as an approximation. For precise
            results use a dedicated tool like Stark or the Chrome DevTools
            contrast checker.
          </p>
        </div>
      </Subsection>
    </SectionWrapper>
  )
}
