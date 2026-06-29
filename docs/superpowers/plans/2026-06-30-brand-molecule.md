# Brand Molecule Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an animated, interactive "Brand Molecule" radial diagram at `/brand-molecule` — three selectable interaction versions (focus / focus+expand / focus+auto-tour) driven by one Sanity singleton, with all colours sourced as design-system token references.

**Architecture:** A server component fetches the `brandMolecule` singleton and renders page chrome plus a client `<BrandMolecule>`. Geometry (SVG arc paths) and colour resolution are pure, unit-tested modules. `<MoleculeWheel>` is presentational SVG; `<BrandMolecule>` owns interaction state and switches behaviour by a `variant` prop. Versions differ only by two flags (`expandable`, `autoTour`).

**Tech Stack:** Next.js 16 (App Router) · React 19 · `next-sanity` + Sanity v5 · `d3-shape` (arc geometry) · `motion` (Framer) · `vaul` (mobile sheet) · Tailwind v4 + DS tokens · `vitest` (unit) · `@axe-core/playwright` (a11y).

**Testing philosophy:** TDD the pure logic (geometry, colours, data adapter) with `vitest` — these have deterministic outputs and clear assertions. Components and Sanity wiring are verified by typecheck/build, the dev server, and the axe a11y test, because unit-testing SVG visuals or Studio schema yields little signal. Commit after every task.

**Conventions discovered in this codebase:**
- Sanity schema files: `src/sanity/schemaTypes/`, registered in `index.ts` `schema.types`.
- Singletons: listed in `src/sanity/structure.ts` `SINGLETONS` + `HIDDEN_TYPES`, with an `S.document().documentId(<name>)` list item.
- Queries: `defineQuery` in `src/sanity/lib/queries.ts`; client in `src/sanity/lib/client.ts`.
- TypeGen: `npm run typegen` regenerates `sanity.types.ts` (query result types named `<CONST_NAME>Result`).
- Routes: folders under `src/app/(frontend)/`.
- `vitest` picks up `**/*.test.ts(x)`; co-locate unit tests beside source.

---

## File Structure

**Create:**
- `src/components/brand-molecule/lib/types.ts` — shared TS types (view model + geometry + variant)
- `src/components/brand-molecule/lib/molecule-geometry.ts` — pure arc/label/leader math
- `src/components/brand-molecule/lib/molecule-geometry.test.ts`
- `src/components/brand-molecule/lib/molecule-colors.ts` — token-name → CSS-var allowlist
- `src/components/brand-molecule/lib/molecule-colors.test.ts`
- `src/components/brand-molecule/lib/adapt-molecule.ts` — Sanity doc → view model
- `src/components/brand-molecule/lib/adapt-molecule.test.ts`
- `src/components/brand-molecule/MoleculeWheel.tsx` — presentational SVG
- `src/components/brand-molecule/MoleculeDetail.tsx` — expand content (V2)
- `src/components/brand-molecule/MoleculeA11yList.tsx` — visually-hidden SR list
- `src/components/brand-molecule/VersionSwitcher.tsx` — segmented control + `?v=`
- `src/components/brand-molecule/BrandMolecule.tsx` — client orchestrator
- `src/sanity/schemaTypes/brandMolecule.ts` — singleton document + inline objects
- `src/app/(frontend)/brand-molecule/page.tsx` — server route
- `scripts/seed-brand-molecule.mjs` — one-off seed of the singleton document
- `tests/a11y/brand-molecule.spec.ts` — axe + keyboard test

**Modify:**
- `package.json` — add `d3-shape`, `@types/d3-shape`
- `src/sanity/schemaTypes/index.ts` — register `brandMolecule`
- `src/sanity/structure.ts` — add `brandMolecule` singleton
- `src/sanity/lib/queries.ts` — add `BRAND_MOLECULE_QUERY`

---

## Task 0: Dependency + branch baseline

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Confirm you are on the feature branch**

Run: `git branch --show-current`
Expected: `feature/brand-molecule`

- [ ] **Step 2: Add d3-shape**

Run: `npm install d3-shape@^3.2.0 && npm install -D @types/d3-shape@^3.1.7`

- [ ] **Step 3: Verify typecheck still passes**

Run: `npx tsc --noEmit`
Expected: no errors (same as before the install).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m 'build(brand-molecule): add d3-shape for arc geometry'
```

---

## Task 1: Geometry library (pure, TDD)

**Files:**
- Create: `src/components/brand-molecule/lib/types.ts`
- Create: `src/components/brand-molecule/lib/molecule-geometry.ts`
- Test: `src/components/brand-molecule/lib/molecule-geometry.test.ts`

- [ ] **Step 1: Create the shared types file**

```ts
// src/components/brand-molecule/lib/types.ts
import type { PortableTextBlock } from '@portabletext/types'

export type MoleculeVariant = 'focus' | 'expand' | 'tour'

export interface MoleculeGroup {
  key: string
  label: string
  colorVar: string // resolved CSS var, e.g. "var(--color-fcu-secondary-500)"
}

export interface MoleculeSegment {
  key: string
  label: string
  groupKey: string
  annotationTitle: string
  attributes: string
  detail: PortableTextBlock[] | null
  colorVar: string
  icon: string | null
}

export interface MoleculeData {
  title: string
  intro: string
  centerKicker: string
  centerLabel: string
  defaultVariant: MoleculeVariant
  groups: MoleculeGroup[]
  segments: MoleculeSegment[]
}

export interface Span {
  a0: number // degrees, clockwise from 12 o'clock
  a1: number
  center: number
}

export interface SegmentGeometry {
  key: string
  /** annular-sector path 'd', centered on the wheel center */
  path: string
  /** invisible arc path 'd' for the curved <textPath> label */
  labelPath: string
  centerAngle: number
  leader: { x1: number; y1: number; x2: number; y2: number }
  annotation: { x: number; y: number; anchor: 'start' | 'middle' | 'end' }
}

export interface BandGeometry {
  groupKey: string
  path: string
  labelPath: string
}
```

- [ ] **Step 2: Write the failing test**

```ts
// src/components/brand-molecule/lib/molecule-geometry.test.ts
import { describe, it, expect } from 'vitest'
import {
  pointOnCircle,
  segmentSpans,
  annotationAnchor,
  arcPath,
  labelArcPath,
} from './molecule-geometry'

describe('pointOnCircle', () => {
  it('places angle 0 directly above the center', () => {
    const p = pointOnCircle(100, 100, 50, 0)
    expect(p.x).toBeCloseTo(100, 5)
    expect(p.y).toBeCloseTo(50, 5)
  })
  it('places angle 90 to the right of the center', () => {
    const p = pointOnCircle(100, 100, 50, 90)
    expect(p.x).toBeCloseTo(150, 5)
    expect(p.y).toBeCloseTo(100, 5)
  })
})

describe('segmentSpans', () => {
  it('returns N equal spans summing to 360 minus gaps', () => {
    const spans = segmentSpans(9, 0, -20)
    expect(spans).toHaveLength(9)
    expect(spans[0].a0).toBe(-20)
    expect(spans[0].a1).toBe(20)
    expect(spans[0].center).toBe(0)
    expect(spans[8].center).toBe(320)
  })
})

describe('annotationAnchor', () => {
  it('anchors right-side segments to start, left-side to end, poles to middle', () => {
    expect(annotationAnchor(40)).toBe('start')
    expect(annotationAnchor(320)).toBe('end')
    expect(annotationAnchor(0)).toBe('middle')
    expect(annotationAnchor(180)).toBe('middle')
  })
})

describe('arcPath', () => {
  it('returns a non-empty path string starting with M', () => {
    const d = arcPath({ innerRadius: 60, outerRadius: 100, startDeg: 0, endDeg: 40, padDeg: 1, cornerRadius: 4 })
    expect(d.startsWith('M')).toBe(true)
    expect(d.length).toBeGreaterThan(10)
  })
})

describe('labelArcPath', () => {
  it('reverses endpoints when flipped', () => {
    const normal = labelArcPath(100, 100, 80, 0, 40, false, 2)
    const flipped = labelArcPath(100, 100, 80, 0, 40, true, 2)
    expect(normal).not.toEqual(flipped)
    expect(flipped.startsWith('M')).toBe(true)
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run src/components/brand-molecule/lib/molecule-geometry.test.ts`
Expected: FAIL — module/exports not found.

- [ ] **Step 4: Implement the geometry module**

```ts
// src/components/brand-molecule/lib/molecule-geometry.ts
import { arc as d3arc } from 'd3-shape'
import type { Span, SegmentGeometry, BandGeometry, MoleculeSegment, MoleculeGroup } from './types'

const TAU = Math.PI / 180

/** Point on a circle; angle in degrees measured clockwise from 12 o'clock. */
export function pointOnCircle(cx: number, cy: number, r: number, angleDeg: number) {
  const a = angleDeg * TAU
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) }
}

/** N equal angular spans, with `startDeg` as the first span's a0. */
export function segmentSpans(count: number, _gapDeg: number, startDeg: number): Span[] {
  const step = 360 / count
  return Array.from({ length: count }, (_, i) => {
    const a0 = startDeg + i * step
    const a1 = a0 + step
    return { a0, a1, center: a0 + step / 2 }
  })
}

export function annotationAnchor(centerDeg: number): 'start' | 'middle' | 'end' {
  const s = Math.sin(centerDeg * TAU)
  if (s > 0.22) return 'start'
  if (s < -0.22) return 'end'
  return 'middle'
}

/** Annular-sector path centered at (0,0); the consumer translates the group to the wheel center. */
export function arcPath(opts: {
  innerRadius: number
  outerRadius: number
  startDeg: number
  endDeg: number
  padDeg: number
  cornerRadius: number
}): string {
  const generator = d3arc()
    .innerRadius(opts.innerRadius)
    .outerRadius(opts.outerRadius)
    .cornerRadius(opts.cornerRadius)
  // d3 angles: 0 at 12 o'clock, clockwise positive, radians — matches our convention.
  return generator({
    startAngle: (opts.startDeg + opts.padDeg) * TAU,
    endAngle: (opts.endDeg - opts.padDeg) * TAU,
    innerRadius: opts.innerRadius,
    outerRadius: opts.outerRadius,
  } as never) ?? ''
}

/** Invisible arc for a curved textPath; reversed direction when `flip` so text isn't upside-down. */
export function labelArcPath(
  cx: number,
  cy: number,
  r: number,
  a0Deg: number,
  a1Deg: number,
  flip: boolean,
  insetDeg: number,
): string {
  const a0 = a0Deg + insetDeg
  const a1 = a1Deg - insetDeg
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0
  const round = (n: number) => Math.round(n * 100) / 100
  if (flip) {
    const p0 = pointOnCircle(cx, cy, r, a1)
    const p1 = pointOnCircle(cx, cy, r, a0)
    return `M${round(p0.x)} ${round(p0.y)}A${r} ${r} 0 ${large} 0 ${round(p1.x)} ${round(p1.y)}`
  }
  const q0 = pointOnCircle(cx, cy, r, a0)
  const q1 = pointOnCircle(cx, cy, r, a1)
  return `M${round(q0.x)} ${round(q0.y)}A${r} ${r} 0 ${large} 1 ${round(q1.x)} ${round(q1.y)}`
}

/** True when a segment's curved label would render upside-down (bottom half). */
export function shouldFlip(centerDeg: number): boolean {
  const c = ((centerDeg % 360) + 360) % 360
  return c > 90 && c < 270
}

export interface WheelDims {
  cx: number
  cy: number
  hubR: number
  bandR0: number
  bandR1: number
  segR0: number
  segR1: number
  bandLabelR: number
  segLabelR: number
  leadIn: number
  leadOut: number
  textR: number
  startDeg: number
}

export const DEFAULT_DIMS: WheelDims = {
  cx: 590, cy: 350, hubR: 66,
  bandR0: 72, bandR1: 130, segR0: 134, segR1: 212,
  bandLabelR: 100, segLabelR: 174, leadIn: 214, leadOut: 236, textR: 246,
  startDeg: -20,
}

/** Geometry for each outer segment, in segment order. */
export function buildSegmentGeometry(segments: MoleculeSegment[], dims: WheelDims = DEFAULT_DIMS): SegmentGeometry[] {
  const spans = segmentSpans(segments.length, 0, dims.startDeg)
  return segments.map((seg, i) => {
    const { a0, a1, center } = spans[i]
    const flip = shouldFlip(center)
    const li = pointOnCircle(dims.cx, dims.cy, dims.leadIn, center)
    const lo = pointOnCircle(dims.cx, dims.cy, dims.leadOut, center)
    const tp = pointOnCircle(dims.cx, dims.cy, dims.textR, center)
    const anchor = annotationAnchor(center)
    const dx = anchor === 'start' ? 6 : anchor === 'end' ? -6 : 0
    return {
      key: seg.key,
      path: arcPath({ innerRadius: dims.segR0, outerRadius: dims.segR1, startDeg: a0, endDeg: a1, padDeg: 1.4, cornerRadius: 3 }),
      labelPath: labelArcPath(dims.cx, dims.cy, dims.segLabelR, a0, a1, flip, 4),
      centerAngle: center,
      leader: { x1: li.x, y1: li.y, x2: lo.x, y2: lo.y },
      annotation: { x: tp.x + dx, y: tp.y, anchor },
    }
  })
}

/** Group bands derived by grouping consecutive segments sharing a groupKey. */
export function buildBandGeometry(
  segments: MoleculeSegment[],
  groups: MoleculeGroup[],
  dims: WheelDims = DEFAULT_DIMS,
): BandGeometry[] {
  const spans = segmentSpans(segments.length, 0, dims.startDeg)
  return groups.map((g) => {
    const idxs = segments.map((s, i) => (s.groupKey === g.key ? i : -1)).filter((i) => i >= 0)
    const a0 = spans[idxs[0]].a0
    const a1 = spans[idxs[idxs.length - 1]].a1
    const center = (a0 + a1) / 2
    return {
      groupKey: g.key,
      path: arcPath({ innerRadius: dims.bandR0, outerRadius: dims.bandR1, startDeg: a0, endDeg: a1, padDeg: 0.8, cornerRadius: 3 }),
      labelPath: labelArcPath(dims.cx, dims.cy, dims.bandLabelR, a0, a1, shouldFlip(center), 8),
    }
  })
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run src/components/brand-molecule/lib/molecule-geometry.test.ts`
Expected: PASS (all cases).

- [ ] **Step 6: Commit**

```bash
git add src/components/brand-molecule/lib/types.ts src/components/brand-molecule/lib/molecule-geometry.ts src/components/brand-molecule/lib/molecule-geometry.test.ts
git commit -m 'feat(brand-molecule): pure geometry library with tests'
```

---

## Task 2: Colour token allowlist (pure, TDD)

**Files:**
- Create: `src/components/brand-molecule/lib/molecule-colors.ts`
- Test: `src/components/brand-molecule/lib/molecule-colors.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/brand-molecule/lib/molecule-colors.test.ts
import { describe, it, expect } from 'vitest'
import { COLOR_TOKENS, resolveColorToken } from './molecule-colors'

describe('resolveColorToken', () => {
  it('maps a known token to its CSS var', () => {
    expect(resolveColorToken('fcu-secondary-500')).toBe('var(--color-fcu-secondary-500)')
  })
  it('falls back to foreground-muted for an unknown token', () => {
    expect(resolveColorToken('not-a-token')).toBe('var(--color-foreground-muted)')
  })
  it('exposes a non-empty allowlist of tokens for the Studio dropdown', () => {
    expect(COLOR_TOKENS.length).toBeGreaterThan(8)
    expect(COLOR_TOKENS).toContain('fcu-primary-700')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/brand-molecule/lib/molecule-colors.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the colour module**

```ts
// src/components/brand-molecule/lib/molecule-colors.ts
// Allowlist of FCU design-system colour tokens usable in the molecule.
// Keep in sync with the Studio dropdown in schemaTypes/brandMolecule.ts.
export const COLOR_TOKENS = [
  'fcu-primary-400', 'fcu-primary-600', 'fcu-primary-700', 'fcu-primary-800', 'fcu-primary-900',
  'fcu-secondary-400', 'fcu-secondary-500', 'fcu-secondary-600',
  'fcu-mint-400', 'fcu-mint-500', 'fcu-mint-600',
  'fcu-green-faded-500',
  'status-warning-500', 'status-warning-700',
  'neutral-700',
] as const

export type ColorTokenName = (typeof COLOR_TOKENS)[number]

const ALLOWED = new Set<string>(COLOR_TOKENS)

export function resolveColorToken(token: string | null | undefined): string {
  if (token && ALLOWED.has(token)) return `var(--color-${token})`
  return 'var(--color-foreground-muted)'
}
```

> Note: verify each token in `COLOR_TOKENS` exists in `src/app/globals.css` as `--color-<token>`. If a name differs, fix it here — the test only checks the mapping shape, not that the CSS var exists, so this is a manual cross-check against `globals.css`.

- [ ] **Step 4: Cross-check token names against globals.css**

Run: `grep -oE -- '--color-fcu-(primary|secondary|mint|green-faded)-[0-9]+' src/app/globals.css | sort -u`
Expected: every token used in `COLOR_TOKENS` appears. Remove/rename any that don't.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run src/components/brand-molecule/lib/molecule-colors.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/brand-molecule/lib/molecule-colors.ts src/components/brand-molecule/lib/molecule-colors.test.ts
git commit -m 'feat(brand-molecule): colour token allowlist with tests'
```

---

## Task 3: Sanity schema — `brandMolecule` singleton

**Files:**
- Create: `src/sanity/schemaTypes/brandMolecule.ts`
- Modify: `src/sanity/schemaTypes/index.ts`
- Modify: `src/sanity/structure.ts`

- [ ] **Step 1: Create the schema**

```ts
// src/sanity/schemaTypes/brandMolecule.ts
import { defineType, defineField, defineArrayMember } from 'sanity'
import { ColorWheelIcon } from '@sanity/icons'
import { COLOR_TOKENS } from '@/components/brand-molecule/lib/molecule-colors'

const colorTokenOptions = COLOR_TOKENS.map((t) => ({ title: t, value: t }))

export const brandMolecule = defineType({
  name: 'brandMolecule',
  title: 'Brand Molecule',
  type: 'document',
  icon: ColorWheelIcon,
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
    defineField({
      name: 'defaultVariant',
      title: 'Live Version',
      type: 'string',
      description: 'Which interaction version visitors see by default. The ?v= query param overrides this for previews.',
      initialValue: 'focus',
      options: {
        list: [
          { title: 'V1 — Focus only', value: 'focus' },
          { title: 'V2 — Focus + click to expand', value: 'expand' },
          { title: 'V3 — Focus + auto-tour', value: 'tour' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'centerKicker', title: 'Center Kicker', type: 'string', initialValue: 'CORE OF BRAND' }),
    defineField({ name: 'centerLabel', title: 'Center Label', type: 'string', initialValue: 'You first', validation: (r) => r.required() }),
    defineField({
      name: 'groups',
      title: 'Groups (exactly 3)',
      type: 'array',
      validation: (r) => r.length(3).error('The molecule needs exactly 3 groups'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'group',
          fields: [
            defineField({ name: 'key', title: 'Key', type: 'slug', validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'colorToken', title: 'Colour', type: 'string', options: { list: colorTokenOptions }, validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'colorToken' } },
        }),
      ],
    }),
    defineField({
      name: 'segments',
      title: 'Segments (exactly 9)',
      type: 'array',
      validation: (r) => r.length(9).error('The molecule needs exactly 9 segments'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'segment',
          fields: [
            defineField({ name: 'key', title: 'Key', type: 'slug', validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Segment Label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'groupKey', title: 'Group', type: 'string', description: 'Must match a group key above.', validation: (r) => r.required() }),
            defineField({ name: 'annotationTitle', title: 'Annotation Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'attributes', title: 'Attributes (focus line)', type: 'string', description: 'Short line shown when the segment is focused, e.g. "Honesty · Transparency · Fairness".' }),
            defineField({ name: 'detail', title: 'Detail (expand body)', type: 'array', of: [defineArrayMember({ type: 'block' })], description: 'Richer copy shown in V2 when the segment is clicked.' }),
            defineField({ name: 'colorToken', title: 'Colour', type: 'string', options: { list: colorTokenOptions }, validation: (r) => r.required() }),
            defineField({ name: 'icon', title: 'Icon name', type: 'string', description: 'Optional lucide/tabler icon name shown in the expand card.' }),
          ],
          preview: { select: { title: 'annotationTitle', subtitle: 'groupKey' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Brand Molecule' }) },
})
```

- [ ] **Step 2: Register the schema** in `src/sanity/schemaTypes/index.ts`

Add the import near the other document imports (after line 11):
```ts
import { brandMolecule } from './brandMolecule'
```
Add `brandMolecule,` to the `// Documents` group inside `schema.types` (after `siteSettings,`).

- [ ] **Step 3: Register the singleton** in `src/sanity/structure.ts`

Add `'brandMolecule'` to the `SINGLETONS` array (line 11). Then add this list item just before the final `S.divider()` + Site Settings block (after line 103's divider):
```ts
      S.listItem()
        .title('Brand Molecule')
        .icon(ColorWheelIcon)
        .child(
          S.document()
            .schemaType('brandMolecule')
            .documentId('brandMolecule')
            .title('Brand Molecule'),
        ),
```
(`ColorWheelIcon` is already imported in this file.)

- [ ] **Step 4: Regenerate types + typecheck**

Run: `npm run typegen && npx tsc --noEmit`
Expected: schema extracts cleanly; no type errors.

- [ ] **Step 5: Commit**

```bash
git add src/sanity/schemaTypes/brandMolecule.ts src/sanity/schemaTypes/index.ts src/sanity/structure.ts sanity.types.ts schema.json
git commit -m 'feat(brand-molecule): Sanity singleton schema + Studio registration'
```

---

## Task 4: GROQ query

**Files:**
- Modify: `src/sanity/lib/queries.ts`

- [ ] **Step 1: Append the query**

```ts
export const BRAND_MOLECULE_QUERY = defineQuery(/* groq */ `
  *[_id == "brandMolecule"][0] {
    title,
    intro,
    defaultVariant,
    centerKicker,
    centerLabel,
    groups[] { "key": key.current, label, colorToken },
    segments[] {
      "key": key.current,
      label,
      groupKey,
      annotationTitle,
      attributes,
      detail,
      colorToken,
      icon
    }
  }
`)
```

- [ ] **Step 2: Regenerate types**

Run: `npm run typegen && npx tsc --noEmit`
Expected: `BRAND_MOLECULE_QUERYResult` is added to `sanity.types.ts`; no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sanity/lib/queries.ts sanity.types.ts
git commit -m 'feat(brand-molecule): GROQ query for the singleton'
```

---

## Task 5: Seed the document

**Files:**
- Create: `scripts/seed-brand-molecule.mjs`

> Reads the write token from the environment — never hard-code or print it. The dataset is otherwise empty of this document, so this is a create-or-replace.

- [ ] **Step 1: Write the seed script**

```js
// scripts/seed-brand-molecule.mjs
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

// Load env from .env.local without printing anything.
const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
const get = (k) => (env.match(new RegExp('^' + k + '=(.*)$', 'm')) || [])[1]?.trim()

const client = createClient({
  projectId: get('NEXT_PUBLIC_SANITY_PROJECT_ID') || 'c8w93txa',
  dataset: get('NEXT_PUBLIC_SANITY_DATASET') || 'production',
  apiVersion: '2025-01-01',
  token: get('SANITY_API_WRITE_TOKEN'),
  useCdn: false,
})

const groups = [
  { _key: 'hh', _type: 'group', key: { _type: 'slug', current: 'hh' }, label: 'Head & Hearts', colorToken: 'fcu-primary-700' },
  { _key: 'wt', _type: 'group', key: { _type: 'slug', current: 'wt' }, label: 'Walk & Talk', colorToken: 'fcu-primary-600' },
  { _key: 'pp', _type: 'group', key: { _type: 'slug', current: 'pp' }, label: 'Proof & Pudding', colorToken: 'fcu-mint-600' },
]
const seg = (key, label, groupKey, title, attrs, colorToken) => ({
  _key: key, _type: 'segment', key: { _type: 'slug', current: key },
  label, groupKey, annotationTitle: title, attributes: attrs, colorToken, detail: null, icon: null,
})
const segments = [
  seg('vision', 'Our Vision', 'hh', 'Our Vision', 'To help everyday Kiwis succeed.', 'fcu-secondary-500'),
  seg('values', 'Our Values', 'hh', 'Our Values', 'Honesty · Transparency · Fairness · Supportive', 'fcu-secondary-600'),
  seg('belief', 'Belief', 'hh', 'Our Belief', 'Help Kiwis achieve their goals within their means.', 'fcu-secondary-400'),
  seg('behave', 'How we Behave', 'wt', 'How we Behave', 'Professional · Proactive · Open · Community-minded · Thrifty', 'fcu-primary-400'),
  seg('talk', 'How we Talk', 'wt', 'How we Talk', 'Welcoming · Considerate · Straight-forward · Knowledgeable', 'fcu-primary-600'),
  seg('look', 'How we Look', 'wt', 'How we Look', 'Modern · Fresh · Welcoming · Clear · Human · Kiwi', 'fcu-primary-700'),
  seg('proof', 'Proof', 'pp', 'Proof', 'World-class CU · 65+ years people helping people.', 'fcu-mint-500'),
  seg('products', 'Products', 'pp', 'Products & Services', 'Value for money, inclusive, easy to understand.', 'fcu-mint-400'),
  seg('position', 'Position', 'pp', 'Position', 'You come first — not profits. A real alternative for life.', 'fcu-mint-600'),
]

await client.createOrReplace({
  _id: 'brandMolecule',
  _type: 'brandMolecule',
  title: 'Our Brand Molecule',
  intro: 'Everything we stand for, in one picture — built around you.',
  defaultVariant: 'focus',
  centerKicker: 'CORE OF BRAND',
  centerLabel: 'You first',
  groups,
  segments,
})
console.log('Seeded brandMolecule')
```

- [ ] **Step 2: Run the seed**

Run: `node scripts/seed-brand-molecule.mjs`
Expected: prints `Seeded brandMolecule` with no token echoed.

- [ ] **Step 3: Verify via query**

Run: `npx sanity documents get brandMolecule --dataset production 2>/dev/null | head -20` (or open `/studio` → Brand Molecule).
Expected: the document exists with 3 groups + 9 segments.

- [ ] **Step 4: Commit**

```bash
git add scripts/seed-brand-molecule.mjs
git commit -m 'feat(brand-molecule): seed script for the singleton document'
```

---

## Task 6: Data adapter (Sanity doc → view model, TDD)

**Files:**
- Create: `src/components/brand-molecule/lib/adapt-molecule.ts`
- Test: `src/components/brand-molecule/lib/adapt-molecule.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/brand-molecule/lib/adapt-molecule.test.ts
import { describe, it, expect } from 'vitest'
import { adaptMolecule } from './adapt-molecule'

const raw = {
  title: 'T', intro: 'I', defaultVariant: 'expand', centerKicker: 'CORE', centerLabel: 'You first',
  groups: [{ key: 'hh', label: 'Head & Hearts', colorToken: 'fcu-primary-700' }],
  segments: [{ key: 'vision', label: 'Our Vision', groupKey: 'hh', annotationTitle: 'Our Vision', attributes: 'x', detail: null, colorToken: 'fcu-secondary-500', icon: null }],
}

describe('adaptMolecule', () => {
  it('resolves colour tokens to CSS vars', () => {
    const m = adaptMolecule(raw as never)
    expect(m.groups[0].colorVar).toBe('var(--color-fcu-primary-700)')
    expect(m.segments[0].colorVar).toBe('var(--color-fcu-secondary-500)')
  })
  it('passes the default variant through, falling back to focus', () => {
    expect(adaptMolecule(raw as never).defaultVariant).toBe('expand')
    expect(adaptMolecule({ ...raw, defaultVariant: 'bogus' } as never).defaultVariant).toBe('focus')
  })
  it('returns null when given null', () => {
    expect(adaptMolecule(null)).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/brand-molecule/lib/adapt-molecule.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the adapter**

```ts
// src/components/brand-molecule/lib/adapt-molecule.ts
import { resolveColorToken } from './molecule-colors'
import type { MoleculeData, MoleculeVariant } from './types'

const VARIANTS: MoleculeVariant[] = ['focus', 'expand', 'tour']

type RawMolecule = {
  title?: string | null
  intro?: string | null
  defaultVariant?: string | null
  centerKicker?: string | null
  centerLabel?: string | null
  groups?: Array<{ key?: string | null; label?: string | null; colorToken?: string | null }> | null
  segments?: Array<{
    key?: string | null; label?: string | null; groupKey?: string | null
    annotationTitle?: string | null; attributes?: string | null
    detail?: unknown; colorToken?: string | null; icon?: string | null
  }> | null
} | null

export function adaptMolecule(raw: RawMolecule): MoleculeData | null {
  if (!raw) return null
  const defaultVariant = VARIANTS.includes(raw.defaultVariant as MoleculeVariant)
    ? (raw.defaultVariant as MoleculeVariant)
    : 'focus'
  return {
    title: raw.title ?? '',
    intro: raw.intro ?? '',
    centerKicker: raw.centerKicker ?? '',
    centerLabel: raw.centerLabel ?? '',
    defaultVariant,
    groups: (raw.groups ?? []).map((g) => ({
      key: g.key ?? '',
      label: g.label ?? '',
      colorVar: resolveColorToken(g.colorToken),
    })),
    segments: (raw.segments ?? []).map((s) => ({
      key: s.key ?? '',
      label: s.label ?? '',
      groupKey: s.groupKey ?? '',
      annotationTitle: s.annotationTitle ?? '',
      attributes: s.attributes ?? '',
      detail: Array.isArray(s.detail) ? (s.detail as MoleculeData['segments'][number]['detail']) : null,
      colorVar: resolveColorToken(s.colorToken),
      icon: s.icon ?? null,
    })),
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/brand-molecule/lib/adapt-molecule.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/brand-molecule/lib/adapt-molecule.ts src/components/brand-molecule/lib/adapt-molecule.test.ts
git commit -m 'feat(brand-molecule): data adapter with tests'
```

---

## Task 7: MoleculeWheel (presentational SVG)

**Files:**
- Create: `src/components/brand-molecule/MoleculeWheel.tsx`

> This is the proven structure from the approved inline prototype, ported to React + the view model. It renders bands, segments, curved labels, leaders, annotations, hub. It is presentational: focus state and handlers are passed in.

- [ ] **Step 1: Implement the component**

```tsx
// src/components/brand-molecule/MoleculeWheel.tsx
'use client'

import { DEFAULT_DIMS, buildSegmentGeometry, buildBandGeometry } from './lib/molecule-geometry'
import type { MoleculeData } from './lib/types'

interface Props {
  data: MoleculeData
  activeKey: string | null
  compact?: boolean
  onFocus: (key: string | null) => void
  onSelect: (key: string) => void
}

export function MoleculeWheel({ data, activeKey, compact = false, onFocus, onSelect }: Props) {
  const d = DEFAULT_DIMS
  const segGeo = buildSegmentGeometry(data.segments, d)
  const bandGeo = buildBandGeometry(data.segments, data.groups, d)
  const activeSeg = data.segments.find((s) => s.key === activeKey) ?? null
  const activeGroupKey = activeSeg?.groupKey ?? null

  return (
    <svg
      viewBox="0 0 1180 720"
      role="img"
      aria-label="First Credit Union brand molecule"
      className="h-auto w-full select-none overflow-visible"
      onMouseLeave={() => onFocus(null)}
    >
      <title>First Credit Union brand molecule</title>
      <desc>A radial diagram of the brand: a central core, three group bands, and nine segments.</desc>

      {/* leaders (hidden in compact) */}
      {!compact && segGeo.map((g) => {
        const seg = data.segments.find((s) => s.key === g.key)!
        const on = activeKey === null ? 0.6 : activeKey === g.key ? 1 : 0.15
        return (
          <line key={'l' + g.key} x1={g.leader.x1} y1={g.leader.y1} x2={g.leader.x2} y2={g.leader.y2}
            stroke={seg.colorVar} strokeWidth={1.5} style={{ opacity: on, transition: 'opacity .25s' }} />
        )
      })}

      {/* group bands */}
      {bandGeo.map((b) => {
        const group = data.groups.find((g) => g.key === b.groupKey)!
        const op = activeGroupKey === null ? 1 : activeGroupKey === b.groupKey ? 1 : 0.4
        return (
          <g key={'b' + b.groupKey} transform={`translate(${d.cx} ${d.cy})`} style={{ opacity: op, transition: 'opacity .25s' }}>
            <path d={b.path} fill={group.colorVar} />
            <text fontSize={13} fontWeight={700} letterSpacing="0.04em" fill="#fff" style={{ textTransform: 'uppercase', opacity: 0.92 }}>
              <textPath href={`#bandlabel-${b.groupKey}`} startOffset="50%" textAnchor="middle">{group.label}</textPath>
            </text>
          </g>
        )
      })}
      {/* band label paths live in untranslated space (already absolute coords) */}
      <defs>
        {bandGeo.map((b) => <path key={'bp' + b.groupKey} id={`bandlabel-${b.groupKey}`} d={b.labelPath} />)}
        {segGeo.map((g) => <path key={'sp' + g.key} id={`seglabel-${g.key}`} d={g.labelPath} />)}
      </defs>

      {/* segments */}
      {segGeo.map((g) => {
        const seg = data.segments.find((s) => s.key === g.key)!
        const isActive = activeKey === g.key
        const op = activeKey === null ? 1 : isActive ? 1 : 0.28
        const tx = Math.sin((g.centerAngle * Math.PI) / 180) * 8
        const ty = -Math.cos((g.centerAngle * Math.PI) / 180) * 8
        return (
          <g key={'s' + g.key}
            role="button" tabIndex={0}
            aria-label={`${seg.annotationTitle} — ${seg.attributes}`}
            onMouseEnter={() => onFocus(g.key)}
            onFocus={() => onFocus(g.key)}
            onClick={() => onSelect(g.key)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(g.key) } }}
            style={{
              cursor: 'pointer',
              opacity: op,
              transform: isActive ? `translate(${tx}px, ${ty}px) scale(1.04)` : 'none',
              transformBox: 'fill-box', transformOrigin: 'center',
              transition: 'transform .28s cubic-bezier(.2,.7,.3,1), opacity .25s',
            }}>
            <g transform={`translate(${d.cx} ${d.cy})`}><path d={g.path} fill={seg.colorVar} /></g>
            <text fontSize={11} fontWeight={600} fill="#fff" style={{ pointerEvents: 'none' }}>
              <textPath href={`#seglabel-${g.key}`} startOffset="50%" textAnchor="middle">{seg.label}</textPath>
            </text>
          </g>
        )
      })}

      {/* hub */}
      <g>
        <circle cx={d.cx} cy={d.cy} r={d.hubR} fill="var(--color-neutral-900, #2D393B)" />
        <text x={d.cx} y={d.cy - 8} textAnchor="middle" fontSize={9} letterSpacing="1.2" fontWeight={600} fill="#9fb0b5">{data.centerKicker}</text>
        <text x={d.cx} y={d.cy + 14} textAnchor="middle" fontSize={20} fontWeight={700} fill="#fff">{data.centerLabel}</text>
      </g>

      {/* annotations (hidden in compact) */}
      {!compact && segGeo.map((g) => {
        const seg = data.segments.find((s) => s.key === g.key)!
        const isActive = activeKey === g.key
        const titleOpacity = activeKey === null ? 0.5 : isActive ? 1 : 0.22
        return (
          <g key={'a' + g.key} transform={`translate(${g.annotation.x} ${g.annotation.y})`}
            onMouseEnter={() => onFocus(g.key)} onClick={() => onSelect(g.key)} style={{ cursor: 'pointer' }}>
            <text textAnchor={g.annotation.anchor} fontSize={13}
              style={{ fill: 'var(--text-foreground, currentColor)', fontWeight: isActive ? 700 : 600, opacity: titleOpacity, transition: 'opacity .25s' }}>
              {seg.annotationTitle}
            </text>
            <text textAnchor={g.annotation.anchor} y={15} fontSize={11}
              style={{ fill: 'var(--color-foreground-muted)', opacity: isActive ? 1 : 0, transition: 'opacity .25s' }}>
              {seg.attributes}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/brand-molecule/MoleculeWheel.tsx
git commit -m 'feat(brand-molecule): presentational SVG wheel'
```

---

## Task 8: BrandMolecule orchestrator (V1 focus)

**Files:**
- Create: `src/components/brand-molecule/MoleculeA11yList.tsx`
- Create: `src/components/brand-molecule/BrandMolecule.tsx`

- [ ] **Step 1: Create the screen-reader list**

```tsx
// src/components/brand-molecule/MoleculeA11yList.tsx
import type { MoleculeData } from './lib/types'

export function MoleculeA11yList({ data }: { data: MoleculeData }) {
  return (
    <ol className="sr-only">
      {data.segments.map((s) => (
        <li key={s.key}>
          <strong>{s.annotationTitle}:</strong> {s.attributes}
        </li>
      ))}
    </ol>
  )
}
```

- [ ] **Step 2: Create the orchestrator (V1 behaviour only for now)**

```tsx
// src/components/brand-molecule/BrandMolecule.tsx
'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { MoleculeWheel } from './MoleculeWheel'
import { MoleculeA11yList } from './MoleculeA11yList'
import type { MoleculeData, MoleculeVariant } from './lib/types'

interface Props {
  data: MoleculeData
  variant: MoleculeVariant
}

export function BrandMolecule({ data, variant }: Props) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="relative w-full">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
      >
        <MoleculeWheel
          data={data}
          activeKey={active}
          onFocus={setActive}
          onSelect={(k) => setActive(k)}
        />
      </motion.div>
      <MoleculeA11yList data={data} />
    </div>
  )
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. (`variant` is unused for now — that's fine; V2/V3 wire it in. If lint fails on unused var, prefix `_variant` and update in Task 11.)

- [ ] **Step 4: Commit**

```bash
git add src/components/brand-molecule/MoleculeA11yList.tsx src/components/brand-molecule/BrandMolecule.tsx
git commit -m 'feat(brand-molecule): orchestrator with V1 focus + entrance + SR list'
```

---

## Task 9: Route page (server fetch + chrome) — first visible render

**Files:**
- Create: `src/app/(frontend)/brand-molecule/page.tsx`

- [ ] **Step 1: Implement the page**

```tsx
// src/app/(frontend)/brand-molecule/page.tsx
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { BRAND_MOLECULE_QUERY } from '@/sanity/lib/queries'
import { adaptMolecule } from '@/components/brand-molecule/lib/adapt-molecule'
import { BrandMolecule } from '@/components/brand-molecule/BrandMolecule'
import type { MoleculeVariant } from '@/components/brand-molecule/lib/types'

export const metadata = { title: 'Brand Molecule' }

const VALID: MoleculeVariant[] = ['focus', 'expand', 'tour']

export default async function BrandMoleculePage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>
}) {
  const raw = await client.fetch(BRAND_MOLECULE_QUERY)
  const data = adaptMolecule(raw)
  if (!data) notFound()

  const { v } = await searchParams
  const vMap: Record<string, MoleculeVariant> = { '1': 'focus', '2': 'expand', '3': 'tour' }
  const fromQuery = v ? vMap[v] ?? (VALID.includes(v as MoleculeVariant) ? (v as MoleculeVariant) : null) : null
  const variant = fromQuery ?? data.defaultVariant

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{data.title}</h1>
        {data.intro ? <p className="mx-auto mt-3 max-w-[60ch] text-foreground-muted">{data.intro}</p> : null}
      </header>
      <BrandMolecule data={data} variant={variant} />
    </main>
  )
}
```

- [ ] **Step 2: Verify in the dev server**

Run: `npm run dev`, open `http://localhost:3000/brand-molecule`.
Expected: the molecule renders; hovering a segment lifts it, dims the rest, and the hovered annotation sharpens with its attribute line. Hovering the annotation does the same.

- [ ] **Step 3: Commit**

```bash
git add 'src/app/(frontend)/brand-molecule/page.tsx'
git commit -m 'feat(brand-molecule): public route with server fetch + V1 render'
```

---

## Task 10: V2 — click-to-expand detail (card + vaul sheet)

**Files:**
- Create: `src/components/brand-molecule/MoleculeDetail.tsx`
- Modify: `src/components/brand-molecule/BrandMolecule.tsx`

- [ ] **Step 1: Create the detail content component**

```tsx
// src/components/brand-molecule/MoleculeDetail.tsx
import { PortableText } from 'next-sanity'
import type { MoleculeSegment } from './lib/types'

export function MoleculeDetail({ segment, onClose }: { segment: MoleculeSegment; onClose: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground" style={{ color: segment.colorVar }}>{segment.annotationTitle}</h2>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1 text-foreground-muted hover:bg-surface-muted">✕</button>
      </div>
      <p className="text-sm font-medium text-foreground-muted">{segment.attributes}</p>
      {segment.detail ? (
        <div className="prose prose-sm max-w-none text-foreground-muted"><PortableText value={segment.detail} /></div>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 2: Wire V2 into the orchestrator**

Replace `BrandMolecule.tsx` with:
```tsx
// src/components/brand-molecule/BrandMolecule.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Drawer } from 'vaul'
import { MoleculeWheel } from './MoleculeWheel'
import { MoleculeDetail } from './MoleculeDetail'
import { MoleculeA11yList } from './MoleculeA11yList'
import type { MoleculeData, MoleculeVariant } from './lib/types'

export function BrandMolecule({ data, variant }: { data: MoleculeData; variant: MoleculeVariant }) {
  const reduce = useReducedMotion()
  const expandable = variant === 'expand'
  const [active, setActive] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const selectedSeg = data.segments.find((s) => s.key === selected) ?? null

  const onSelect = (k: string) => {
    if (expandable) setSelected(k)
    else setActive(k)
  }

  return (
    <div className="relative w-full">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <MoleculeWheel data={data} activeKey={active} onFocus={setActive} onSelect={onSelect} />
        </motion.div>

        {/* desktop side card (V2) */}
        {expandable && (
          <div className="hidden lg:block lg:w-[320px]">
            <AnimatePresence mode="wait">
              {selectedSeg && (
                <motion.div key={selectedSeg.key}
                  initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-md)]">
                  <MoleculeDetail segment={selectedSeg} onClose={() => setSelected(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* mobile bottom sheet (V2) */}
      {expandable && (
        <Drawer.Root open={!!selectedSeg} onOpenChange={(o) => !o && setSelected(null)}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
            <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border bg-card p-5 lg:hidden">
              <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
              {selectedSeg && <MoleculeDetail segment={selectedSeg} onClose={() => setSelected(null)} />}
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}

      <MoleculeA11yList data={data} />
    </div>
  )
}
```

- [ ] **Step 3: Add detail content to one segment in Studio (manual)**

In `/studio` → Brand Molecule → segment "Position", add a couple of `detail` paragraphs so V2 has something to show.

- [ ] **Step 4: Verify**

Run dev server, open `/brand-molecule?v=2`. Click a segment → side card appears on desktop; resize to mobile width → clicking opens the bottom sheet. Esc / ✕ / overlay closes it.

- [ ] **Step 5: Commit**

```bash
git add src/components/brand-molecule/MoleculeDetail.tsx src/components/brand-molecule/BrandMolecule.tsx
git commit -m 'feat(brand-molecule): V2 click-to-expand (desktop card + vaul sheet)'
```

---

## Task 11: V3 — auto-tour + play/pause + reduced-motion

**Files:**
- Modify: `src/components/brand-molecule/BrandMolecule.tsx`

- [ ] **Step 1: Add the auto-tour effect + control**

Inside `BrandMolecule`, after the existing state, add:
```tsx
  const autoTour = variant === 'tour'
  const [playing, setPlaying] = useState(autoTour && !reduce)
  const [paused, setPaused] = useState(false)
```
Add the effect (import `useEffect` from `react`):
```tsx
  useEffect(() => {
    if (!autoTour || !playing || paused) return
    const id = setInterval(() => {
      setActive((cur) => {
        const i = data.segments.findIndex((s) => s.key === cur)
        return data.segments[(i + 1) % data.segments.length].key
      })
    }, 2800)
    return () => clearInterval(id)
  }, [autoTour, playing, paused, data.segments])
```
Pass pause handlers to the wheel wrapper (pause on interaction):
```tsx
        <motion.div
          onPointerEnter={() => autoTour && setPaused(true)}
          onPointerLeave={() => autoTour && setPaused(false)}
          ...
        >
```
Render a play/pause control when `autoTour`:
```tsx
      {autoTour && (
        <div className="mt-4 flex justify-center">
          <button type="button" onClick={() => setPlaying((p) => !p)}
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground-muted hover:bg-surface-muted"
            aria-pressed={playing}>
            {playing ? 'Pause tour' : 'Play tour'}
          </button>
        </div>
      )}
```

- [ ] **Step 2: Verify**

Open `/brand-molecule?v=3`. Segments auto-advance every ~2.8s; hovering pauses and resumes on leave; the Pause/Play button toggles. With OS "reduce motion" on, it does not auto-start (button reads "Play tour").

- [ ] **Step 3: Commit**

```bash
git add src/components/brand-molecule/BrandMolecule.tsx
git commit -m 'feat(brand-molecule): V3 auto-tour with pause control + reduced-motion guard'
```

---

## Task 12: Version switcher + `?v=` sync

**Files:**
- Create: `src/components/brand-molecule/VersionSwitcher.tsx`
- Modify: `src/app/(frontend)/brand-molecule/page.tsx`

- [ ] **Step 1: Create the switcher**

```tsx
// src/components/brand-molecule/VersionSwitcher.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { MoleculeVariant } from './lib/types'

const OPTIONS: { v: string; variant: MoleculeVariant; label: string }[] = [
  { v: '1', variant: 'focus', label: 'V1 · Focus' },
  { v: '2', variant: 'expand', label: 'V2 · Expand' },
  { v: '3', variant: 'tour', label: 'V3 · Auto-tour' },
]

export function VersionSwitcher({ current }: { current: MoleculeVariant }) {
  const router = useRouter()
  const params = useSearchParams()
  return (
    <div role="tablist" aria-label="Molecule version" className="inline-flex gap-1 rounded-lg border border-border bg-surface-muted p-1">
      {OPTIONS.map((o) => {
        const isActive = o.variant === current
        return (
          <button key={o.v} role="tab" aria-selected={isActive}
            onClick={() => {
              const next = new URLSearchParams(params)
              next.set('v', o.v)
              router.push(`?${next.toString()}`, { scroll: false })
            }}
            className={isActive
              ? 'rounded-md bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-[var(--shadow-xs)]'
              : 'rounded-md px-3 py-1.5 text-sm text-foreground-muted hover:text-foreground'}>
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Render it in the page** (between header and `<BrandMolecule>`)

Add the import and, inside `<main>`, before `<BrandMolecule>`:
```tsx
import { VersionSwitcher } from '@/components/brand-molecule/VersionSwitcher'
// ...
      <div className="mb-8 flex justify-center"><VersionSwitcher current={variant} /></div>
```
The page already re-reads `searchParams` per request, so navigating `?v=` re-renders with the new variant. Add `key={variant}` to `<BrandMolecule>` so it remounts cleanly when the version changes:
```tsx
      <BrandMolecule key={variant} data={data} variant={variant} />
```

- [ ] **Step 3: Verify**

Open `/brand-molecule`. The switcher flips V1/V2/V3 live and updates the URL; sharing `?v=2` deep-links to V2; with no param it shows `defaultVariant` from Sanity. Changing `defaultVariant` in Studio changes the no-param default.

- [ ] **Step 4: Commit**

```bash
git add src/components/brand-molecule/VersionSwitcher.tsx 'src/app/(frontend)/brand-molecule/page.tsx'
git commit -m 'feat(brand-molecule): version switcher synced to ?v= query param'
```

---

## Task 13: Accessibility test + final verification

**Files:**
- Create: `tests/a11y/brand-molecule.spec.ts`

- [ ] **Step 1: Write the a11y test** (mirror the existing tests in `tests/a11y/`)

```ts
// tests/a11y/brand-molecule.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('brand molecule a11y', () => {
  for (const v of ['1', '2', '3']) {
    test(`no axe violations (v=${v})`, async ({ page }) => {
      await page.goto(`/brand-molecule?v=${v}`)
      const results = await new AxeBuilder({ page }).analyze()
      expect(results.violations).toEqual([])
    })
  }

  test('every segment is keyboard reachable', async ({ page }) => {
    await page.goto('/brand-molecule?v=1')
    const segments = page.locator('svg [role="button"]')
    await expect(segments).toHaveCount(9)
  })
})
```

- [ ] **Step 2: Run it**

Run: `npm run test:a11y -- brand-molecule`
Expected: PASS. Fix any axe violations (likely candidates: SVG `role="button"` elements need accessible names — already provided via `aria-label`; ensure the segmented control buttons have discernible text — they do).

- [ ] **Step 3: Full unit suite + typecheck + build**

Run: `npx vitest run && npx tsc --noEmit && npm run build`
Expected: all green.

- [ ] **Step 4: Manual verification checklist** (dev server)

- [ ] V1 `?v=1`: hover focus + two-way linking + entrance; no expand, no tour.
- [ ] V2 `?v=2`: click → desktop side card; mobile width → vaul sheet; close works.
- [ ] V3 `?v=3`: auto-advance; pause on hover; Play/Pause toggle; reduced-motion no autostart.
- [ ] Switcher updates URL and live variant; `defaultVariant` honoured with no param.
- [ ] Dark mode (toggle via `next-themes` if available) — colours invert via tokens.
- [ ] Mobile < 640px: compact wheel (annotations hidden), tap focuses, sheet for detail.

- [ ] **Step 5: Commit**

```bash
git add tests/a11y/brand-molecule.spec.ts
git commit -m 'test(brand-molecule): axe a11y + keyboard reachability'
```

---

## Self-review notes (for the implementer)

- **Spec coverage:** every spec section maps to a task — geometry/colours (T1–T2), Sanity model + colour rule (T3–T4, T2), seed (T5), adapter (T6), wheel (T7), V1 focus + entrance + SR list (T8–T9), V2 expand (T10), V3 tour + a11y pause (T11), switcher + `?v=` + `defaultVariant` (T12), responsive compact (T7 `compact` prop — wire the breakpoint in T9/T12 via a `useMediaQuery` if not already; see note below), a11y + tests (T13).
- **Compact/mobile note:** the `MoleculeWheel` accepts a `compact` prop that hides annotations/leaders. Wire it from `BrandMolecule` using a `matchMedia('(max-width: 639px)')` hook (add a tiny `useIsMobile` in T10 or T12). On mobile, set `compact` and route `onSelect` to the sheet for all variants so taps reveal detail.
- **Type consistency:** `MoleculeData`/`MoleculeSegment`/`MoleculeVariant` are defined once in `types.ts` and imported everywhere; query field names (`key`, `groupKey`, `colorToken`) match the adapter and schema.
- **No placeholders:** all code is complete; the only manual content step is adding `detail` copy in Studio (T10 step 3), which is data entry, not code.
