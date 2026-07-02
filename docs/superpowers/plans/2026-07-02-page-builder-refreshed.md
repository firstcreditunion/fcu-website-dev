# Sanity Page Builder Implementation Plan — Refreshed 2026-07-02 (Initiative Phases 2+3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the unused loan page builder with a universal, DS-rendered 14-block page builder; recreate `/`, `/accounts/everyday`, `/loans/home` as Sanity content; retire the hand-coded routes.

**Architecture:** Universal `pageBuilder` array shared by two documents (`page`, `productPage` + product taxonomy). Block schemas are objects-only (one `reference`: notice → disclaimerSnippet). One React registry (`src/components/page-builder/`) renders every block strictly on existing DS components. Homepage is assigned via `siteSettings.homepage` reference.

**Tech Stack:** Next.js 16 App Router, sanity 6.3.0 (`defineType`/`defineField`/`defineArrayMember`), next-sanity 13.1.1 (`defineQuery`, `defineLive`, `sanityFetch`, `stegaClean`, `PortableText` — all verified present in v13), @sanity/client 7.23.0, Sanity TypeGen, Tailwind v4 + FCU DS, lucide-react 1.22, vitest 4 (schema gates), Playwright (verification only).

**Refreshes:** `docs/superpowers/plans/2026-06-10-sanity-page-builder.md` (June file stays untouched; task numbering preserved 0–16).
**Initiative spec:** `docs/superpowers/specs/2026-07-02-figma-to-project-initiative-design.md` (this plan is the initiative's Phase 2 + Phase 3).
**Original spec:** `docs/superpowers/specs/2026-06-10-marketing-modules-design.md`
**Phase-0 audit:** `docs/superpowers/audits/2026-07-02-figma-initiative-audit.md`

**Precondition:** Initiative **Gate 1** sign-off. The insert-menu thumbnails `public/block-previews/*.png` are **committed** (all 14, commit `53073fc`) — Task 5 ships the `views` grid config unconditionally.

**Verification model:** the repo now has vitest (added with the Project Hub work). Every schema task gates on **typegen → tsc → lint → vitest**; renderer tasks gate on tsc + eslint; the plan ends with screenshot parity + production build. Every gate uses REAL exit codes — never pipe a gate command to `tail`/`head` (pipes mask failures). Canonical pattern (git-bash):

```bash
npm run typegen > /tmp/pb-typegen.log 2>&1; EXIT=$?; echo "typegen EXIT=$EXIT"
npx tsc --noEmit > /tmp/pb-tsc.log 2>&1; EXIT=$?; echo "tsc EXIT=$EXIT"
npm run lint > /tmp/pb-lint.log 2>&1; EXIT=$?; echo "lint EXIT=$EXIT"
npx vitest run > /tmp/pb-vitest.log 2>&1; EXIT=$?; echo "vitest EXIT=$EXIT"
```

All must print `EXIT=0`; on any non-zero, read the log file. The PowerShell tool is required for `Select-Object`/`Invoke-RestMethod`; the Bash tool (git-bash) for git. Never put literal `"` inside `git commit -m` bodies.

**Conventions locked for all tasks:**
- Block `_type` names (unchanged from June): `heroBlock`, `sectionHeadingBlock`, `splitBlock`, `stepsBlock`, `productTileGridBlock`, `featureGridBlock`, `statBandBlock`, `ratesFeesBlock`, `richTextBlock`, `widgetBlock`, `testimonialBlock`, `faqBlock`, `noticeBlock`, `ctaBannerBlock`.
- Background banding field on section blocks: `background: 'default' | 'soft' | 'sunken'` → `Section` variant `default | surface | sunken`.
- All enum fields that drive rendering go through `stegaClean` in renderers.
- Headings: renderer decides levels — `heroBlock` at index 0 renders `h1`, everything else `h2`.
- Images: Sanity image with `options.hotspot: true` and required `alt` field; queries expand `asset->{ _id, url, metadata { lqip, dimensions { width, height } } }`.
- **Header/Footer are UNTOUCHABLE.** The rebuilt navbar shipped 2026-07-02; nothing in this plan modifies `src/components/header/` or the footer. The navbar's `link.icon` keys stay exactly as shipped.
- **Semantic icon keys.** Any icon string field in block schemas uses semantic MEANING keys (what the item is about), never lucide asset names. The renderer owns the meaning→lucide mapping in a registry module (`src/components/page-builder/block-icons.ts`, modeled on the navbar's `src/components/header/nav-icons.ts`). Curated set (11 kit icons): `members` (Users), `rates` (DollarSign), `location` (MapPin), `mobile` (Smartphone), `support` (LifeBuoy), `institution` (Landmark), `card` (CreditCard), `payments` (Send), `time` (Clock), `alerts` (Bell), `insights` (PieChart).
- **React-compiler lint rules** (eslint react-hooks strict — repo rule, learned 2026-07-02): (1) no impure calls in render — no `Date.now()`/`Math.random()` in component bodies, server components included; move them into plain helper functions or event handlers. (2) no `setState` directly inside `useEffect` bodies — use `useSyncExternalStore` for external stores (scroll, sessionStorage). (3) components must never be created during render — render dynamic components via `createElement(registry[type], props)` or module-level component references; NEVER `const C = map[x]; return <C/>` inline.
- **Preview routes live at APP ROOT**, outside the `(frontend)` route group (e.g. `src/app/blocks-preview/page.tsx`) — `(frontend)/layout.tsx` renders the live Header/Footer and would double-render (learned on the navbar build). Underscore-prefixed folders are unroutable private folders in Next.js — never use them for preview routes.
- **Hub ticks.** Every task ends with a project-hub update step using the recipe below. Identity is ALWAYS `updated_by_id='user_3ArZtSswVUVOky8mIUXr3kZDCOE'`, `updated_by_name='isaac.vicliph@firstcu.co.nz'` — never any other identity; never set `updated_at` (the `pt_touch` trigger owns it).

**Hub tick recipe** — write once as `.agents/hub-tick.mjs` (untracked; `.agents/` is never committed), run with `node --env-file=.env.local .agents/hub-tick.mjs "<group>" "<task>" <status> "<notes>"`:

```javascript
import { createClient } from '@supabase/supabase-js'

const [groupName, taskName, status, notes] = process.argv.slice(2)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  db: { schema: 'api' },
})

const { data: group, error: groupError } = await supabase
  .from('pt_task_groups')
  .select('id')
  .eq('name', groupName)
  .single()
if (groupError) throw groupError

const { data, error } = await supabase
  .from('pt_tasks')
  .update({
    status, // 'in_progress' | 'complete' (hub enum also has not_started/na)
    notes,
    updated_by_id: 'user_3ArZtSswVUVOky8mIUXr3kZDCOE',
    updated_by_name: 'isaac.vicliph@firstcu.co.nz',
  })
  .eq('group_id', group.id)
  .eq('name', taskName)
  .select('id, name, status')
if (error) throw error
console.log(data)
```

**Hub task mapping** (several plan tasks per hub task; tick `complete` when the LAST contributing task finishes, `in_progress` with a notes line before that):

| Hub task (verbatim name) | Group | Contributing plan tasks | `complete` after |
|---|---|---|---|
| Legacy loanPageBuilder deletion (census-gated) | Figma Initiative · P2 Universal Page Builder | Tasks 0–1 | Task 1 |
| 14 block schemas + page/productPage documents + TypeGen | Figma Initiative · P2 Universal Page Builder | Tasks 2–7 | Task 7 |
| Insert menu + thumbnails + Presentation locations | Figma Initiative · P2 Universal Page Builder | Tasks 5–6 | Task 6 |
| Renderer registry on DS components | Figma Initiative · P2 Universal Page Builder | Tasks 8–11 | Task 11 |
| All-blocks preview + behavioral probes | Figma Initiative · P2 Universal Page Builder | Phase-2 exit steps (initiative-level, after Task 11) | that step |
| Authoring dry-run (insert-menu-only script) | Figma Initiative · P2 Universal Page Builder | Phase-2 exit steps (initiative-level) | that step |
| Gate 3: all-blocks preview approved | Figma Initiative · P2 Universal Page Builder | Gate 3 approval | user approval |
| Seed 3 recipe drafts (Home / Everyday / Home Loan) | Figma Initiative · P3 Recipes & CMS Takeover | Task 13 | Task 13 |
| Pixel-check drafts vs Figma recipes (draft-mode preview) | Figma Initiative · P3 Recipes & CMS Takeover | Tasks 12, 15 | Task 15 |
| Publish-before-swap per page (Home publish = launch go-ahead) | Figma Initiative · P3 Recipes & CMS Takeover | Task 14 | Task 14 |
| Sitemap extension + 301 redirects + catch-all 404 decision | Figma Initiative · P3 Recipes & CMS Takeover | Task 14 Step 4 informs it; final tick at the initiative's sitemap/redirects step | initiative step |
| Retire loanProductPage + orphan checks + preview-route cleanup | Figma Initiative · P3 Recipes & CMS Takeover | Task 1 (deletion, P2), Task 15 (orphans + preview-route cleanup) | Task 15 |
| Gate 4: per-page approvals complete | Figma Initiative · P3 Recipes & CMS Takeover | Task 16 | Task 16 |

---

# INITIATIVE PHASE 2 (execute after Gate 1)

---

## Task 0: Branch + green baseline

**Files:** none

- [ ] **Step 1:** Create the branch and confirm a green baseline (real exit codes):

```bash
git checkout -b feat/page-builder
npx tsc --noEmit > /tmp/pb-tsc.log 2>&1; EXIT=$?; echo "tsc EXIT=$EXIT"
npm run lint > /tmp/pb-lint.log 2>&1; EXIT=$?; echo "lint EXIT=$EXIT"
npx vitest run > /tmp/pb-vitest.log 2>&1; EXIT=$?; echo "vitest EXIT=$EXIT"
```

Expected: branch created; all commands print `EXIT=0`. If not, STOP — fix `main` first.

- [ ] **Step 2 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' 'Legacy loanPageBuilder deletion (census-gated)' in_progress 'Task 0: branch feat/page-builder created, baseline green (tsc/lint/vitest EXIT=0)'`

---

## Task 1: Delete the unused loan page builder

- [ ] **Step 0 (precondition — census gate):** census verdict from the Phase-0 audit (`docs/superpowers/audits/2026-07-02-figma-initiative-audit.md` §3) = **CLEAN DELETE** — verified 2026-07-02: zero `loanProductPage`/`disclaimerSnippet` documents incl. drafts. If re-run later, re-verify count is still 0 (GROQ with `perspective: 'raw'`): `count(*[_type in ["loanProductPage","disclaimerSnippet"]]) == 0`.

Deletion is safe and frees the block names for fresh use. `disclaimerSnippet` (document type) and the objects `buttonLink`, `faqItem`, `keyValueRow`, `featureItem`, `link` are KEPT.

**Files:**
- Delete: `src/sanity/schemaTypes/loanPageBuilder.ts`, `src/sanity/schemaTypes/loanProductPage.ts`
- Delete: all 11 files in `src/sanity/schemaTypes/blocks/` (`loanHeroBlock`, `loanAtAGlanceBlock`, `trustStatsBlock`, `featureGridBlock`, `loanExampleBlock`, `ratesFeesBlock`, `noticeBlock`, `faqBlock`, `relatedLinksBlock`, `ctaBarBlock`, `legalFinePrintBlock`)
- Delete: `src/sanity/schemaTypes/objects/trustStatItem.ts`, `src/sanity/schemaTypes/objects/relatedLinkItem.ts`
- Delete: `src/sanity/seeds/loanProductPagesSeed.ts`
- Delete: `src/components/loan-page-builder/` (whole directory)
- Modify: `src/sanity/schemaTypes/index.ts` (remove all deleted imports/registrations)
- Modify: `src/sanity/lib/queries.ts` (remove `LOAN_PRODUCT_PAGE_BY_SLUG_QUERY`)
- Modify: `src/app/(frontend)/[...slug]/page.tsx` (temporarily: ComingSoon only)
- Modify: `src/sanity/presentation/resolve.ts` (remove `loanProductPage` AND drop the stray `post` location — Task 6 then adds `page` + `productPage`)
- Modify: `src/sanity/structure.ts` (remove the Loan Product Pages list item; remove `'loanProductPage'` from `HIDDEN_TYPES`)

- [ ] **Step 1:** Delete the files/directories listed above (`git rm -r` for the dir).
- [ ] **Step 2:** Strip `index.ts` to: documents `headerNavigation, footerNavigation, siteSettings, designTokens, componentConfig, designSystemUser, disclaimerSnippet` + objects `link, navGroup, mainNavItem, seo, socialLink, address, dayHours, announcementBar, disputeResolutionScheme, footerLink, footerColumn, buttonLink, keyValueRow, featureItem, faqItem, colorPalette, colorToken, variantGuideline`.
- [ ] **Step 3:** Replace `[...slug]/page.tsx` body so it only renders `ComingSoon` (keep `formatSegment`, breadcrumbs, `generateMetadata` based on the slug; remove `sanityFetch`, the loan import and types). This is temporary until Task 14 (Phase 3 routing swap). **Interim behavior is ACCEPTABLE as-is** — the census confirms zero real loan pages exist to break, so the ComingSoon-only downgrade loses nothing during Phase 2.
- [ ] **Step 4:** Verify (real exit codes):

```bash
npm run typegen > /tmp/pb-typegen.log 2>&1; EXIT=$?; echo "typegen EXIT=$EXIT"
npx tsc --noEmit > /tmp/pb-tsc.log 2>&1; EXIT=$?; echo "tsc EXIT=$EXIT"
npm run lint > /tmp/pb-lint.log 2>&1; EXIT=$?; echo "lint EXIT=$EXIT"
npx vitest run > /tmp/pb-vitest.log 2>&1; EXIT=$?; echo "vitest EXIT=$EXIT"
```

Expected: all print `EXIT=0` (typegen now extracts a smaller schema).

- [ ] **Step 5:** Commit.

```bash
git add -A src/sanity src/components/loan-page-builder 'src/app/(frontend)/[...slug]/page.tsx'
git commit -m 'refactor(sanity): remove unused loan page builder' -m 'Dataset has zero loanProductPage/disclaimer documents (census re-verified 2026-07-02), so the schema types, renderer, seed, queries, and Studio entries are deleted outright. Frees block names for the universal page builder. disclaimerSnippet and shared objects are kept.'
```

- [ ] **Step 6 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' 'Legacy loanPageBuilder deletion (census-gated)' complete 'Task 1 done: legacy builder deleted (census gate CLEAN DELETE, audit §3); gates green'`

---

## Task 2: Shared objects + shared section fields

**Files:**
- Create: `src/sanity/schemaTypes/objects/statItem.ts`
- Create: `src/sanity/schemaTypes/objects/checklistItem.ts`
- Create: `src/sanity/schemaTypes/objects/productTile.ts`
- Create: `src/sanity/schemaTypes/shared/sectionFields.ts`
- Modify: `src/sanity/schemaTypes/objects/featureItem.ts` (add `icon`)
- Modify: `src/sanity/schemaTypes/objects/faqItem.ts` (answer → minimal rich text)
- Modify: `src/sanity/schemaTypes/index.ts` (register the three new objects)

- [ ] **Step 1:** `statItem.ts`:

```typescript
import { defineType, defineField } from 'sanity'
import { TrendUpwardIcon } from '@sanity/icons'

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The number itself, e.g. 4.85% or $0 or 52,000+',
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'Optional small suffix rendered after the value, e.g. p.a.',
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'What the number means, e.g. monthly fees',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'Optional context line, e.g. in the past year',
      validation: (rule) => rule.max(60),
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
```

- [ ] **Step 2:** `checklistItem.ts`:

```typescript
import { defineType, defineField } from 'sanity'
import { CheckmarkCircleIcon } from '@sanity/icons'

export const checklistItem = defineType({
  name: 'checklistItem',
  title: 'Checklist Item',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Point',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'detail',
      title: 'Detail',
      type: 'text',
      rows: 2,
      description: 'Optional smaller line under the point.',
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'detail' } },
})
```

- [ ] **Step 3:** `productTile.ts`:

```typescript
import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const productTile = defineType({
  name: 'productTile',
  title: 'Product Tile',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small category label, e.g. Account or Lending',
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: 'image',
      title: 'Illustration',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the illustration for screen readers.',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'string',
      description: 'Internal path the tile links to, e.g. /accounts/everyday. Use # while the target page does not exist yet.',
      validation: (rule) =>
        rule.required().custom((value) =>
          value && /^[/#]/.test(value) ? true : 'Must start with / (or # as a placeholder)'
        ),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'kicker', media: 'image' },
  },
})
```

- [ ] **Step 4:** `shared/sectionFields.ts` — the two shared field sets every section block spreads in:

```typescript
import { defineField } from 'sanity'

/** Optional eyebrow/heading/lede trio rendered as a SectionHead above the block content. */
export const sectionHeadFields = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
    description: 'Small uppercase label above the heading, e.g. Everyday banking',
    validation: (rule) => rule.max(40),
  }),
  defineField({
    name: 'heading',
    title: 'Heading',
    type: 'string',
    validation: (rule) => rule.max(120),
  }),
  defineField({
    name: 'lede',
    title: 'Lede',
    type: 'text',
    rows: 2,
    description: 'Optional one-or-two sentence intro under the heading.',
    validation: (rule) => rule.max(320),
  }),
]

/** Page band rhythm — maps to the Section component variants. */
export const backgroundField = defineField({
  name: 'background',
  title: 'Background',
  type: 'string',
  description: 'Band color behind this section. Alternate default and soft to create rhythm.',
  options: {
    list: [
      { title: 'White', value: 'default' },
      { title: 'Soft blue tint', value: 'soft' },
      { title: 'Deeper tint', value: 'sunken' },
    ],
    layout: 'radio',
  },
  initialValue: 'default',
})
```

- [ ] **Step 5:** In `featureItem.ts`, add this field before `title`. The values are SEMANTIC MEANING KEYS (spec rule) derived from the kit's 11 curated icons — the renderer owns the meaning→lucide mapping in `src/components/page-builder/block-icons.ts` (Task 10). The navbar's `link.icon` (already shipped) keeps its existing keys — do not churn it:

```typescript
defineField({
  name: 'icon',
  title: 'Icon',
  type: 'string',
  description: 'What this feature is about — the site maps this meaning to the matching icon from the Figma kit.',
  options: {
    list: [
      { title: 'Members / people', value: 'members' },
      { title: 'Rates / money', value: 'rates' },
      { title: 'Location / branches', value: 'location' },
      { title: 'Mobile / app', value: 'mobile' },
      { title: 'Support / help', value: 'support' },
      { title: 'Institution / banking', value: 'institution' },
      { title: 'Card / debit card', value: 'card' },
      { title: 'Payments / transfers', value: 'payments' },
      { title: 'Time / scheduled', value: 'time' },
      { title: 'Alerts / notifications', value: 'alerts' },
      { title: 'Insights / tracking', value: 'insights' },
    ],
  },
  initialValue: 'members',
  validation: (rule) => rule.required(),
}),
```

- [ ] **Step 6:** In `faqItem.ts`, replace the `answer` field with minimal rich text (bold words appear in real FAQ answers):

```typescript
defineField({
  name: 'answer',
  title: 'Answer',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{ name: 'href', type: 'string', title: 'URL' }],
          },
        ],
      },
    },
  ],
  validation: (rule) => rule.required(),
}),
```

Also update the preview (the old one selected the plain-text answer): `preview: { select: { title: 'question' } }`.

- [ ] **Step 7:** Register `statItem`, `checklistItem`, `productTile` in `index.ts` (objects section).
- [ ] **Step 8:** Verify (canonical gate): typegen → tsc → lint → vitest, each `> /tmp/pb-*.log 2>&1; EXIT=$?` — all `EXIT=0`.
- [ ] **Step 9:** Commit.

```bash
git add src/sanity/schemaTypes
git commit -m 'feat(sanity): shared objects and section fields for the page builder' -m 'statItem (value/unit/label/note), checklistItem, productTile; featureItem gains a curated semantic icon list (11 kit meanings, renderer owns the lucide mapping); faqItem answers upgrade to minimal rich text; shared sectionHeadFields + backgroundField helpers.'
```

- [ ] **Step 10 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' '14 block schemas + page/productPage documents + TypeGen' in_progress 'Task 2 done: shared objects + section fields; semantic icon keys on featureItem'`

---

## Task 3: Block schemas — structure group (hero, sectionHeading, split, steps)

**Files:**
- Create: `src/sanity/schemaTypes/blocks/heroBlock.ts`, `sectionHeadingBlock.ts`, `splitBlock.ts`, `stepsBlock.ts`
- Modify: `src/sanity/schemaTypes/index.ts`

- [ ] **Step 1:** `heroBlock.ts`:

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Pill label above the headline, e.g. Owned by members, not shareholders',
      validation: (rule) => rule.required().max(48),
    }),
    defineField({
      name: 'heading',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(360),
    }),
    defineField({
      name: 'emphasis',
      title: 'Emphasis',
      type: 'string',
      description: 'Standard for landing pages; Compact for interior pages with a breadcrumb.',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Compact', value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Illustration',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Key Numbers',
      type: 'array',
      description: 'Up to three proof points shown under the actions.',
      of: [defineArrayMember({ type: 'statItem' })],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: 'primaryAction', title: 'Primary Button', type: 'buttonLink' }),
    defineField({ name: 'secondaryAction', title: 'Secondary Button', type: 'buttonLink' }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'eyebrow', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Hero', subtitle: subtitle ? `Hero · ${subtitle}` : 'Hero', media }
    },
  },
})
```

- [ ] **Step 2:** `sectionHeadingBlock.ts`:

```typescript
import { defineType, defineField } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import { backgroundField } from '../shared/sectionFields'

export const sectionHeadingBlock = defineType({
  name: 'sectionHeadingBlock',
  title: 'Section Heading',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'align',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'start' },
          { title: 'Centered', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'start',
    }),
    backgroundField,
  ],
  preview: {
    select: { title: 'heading', subtitle: 'eyebrow' },
    prepare({ title, subtitle }) {
      return { title: title || 'Section Heading', subtitle: `Section Heading${subtitle ? ` · ${subtitle}` : ''}` }
    },
  },
})
```

- [ ] **Step 3:** `splitBlock.ts` — the workhorse; illustration beside a SectionHead plus optional checklist / key-value rows / stat cards / action:

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { SplitVerticalIcon } from '@sanity/icons'
import { backgroundField } from '../shared/sectionFields'

export const splitBlock = defineType({
  name: 'splitBlock',
  title: 'Split (Illustration + Content)',
  type: 'object',
  icon: SplitVerticalIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'extras', title: 'List / Numbers' },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 2,
      group: 'content',
      validation: (rule) => rule.max(360),
    }),
    defineField({
      name: 'image',
      title: 'Illustration',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageSide',
      title: 'Illustration Side',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'checklist',
      title: 'Checklist',
      type: 'array',
      group: 'extras',
      description: 'Green-tick points, e.g. reasons to borrow with us.',
      of: [defineArrayMember({ type: 'checklistItem' })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'rows',
      title: 'Fact Rows',
      type: 'array',
      group: 'extras',
      description: 'Label/value rows rendered as a rates-style table.',
      of: [defineArrayMember({ type: 'keyValueRow' })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'string',
      group: 'extras',
      description: 'Small print under the fact rows.',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'stats',
      title: 'Stat Cards',
      type: 'array',
      group: 'extras',
      description: 'Big-number cards, e.g. $2.4m returned to members.',
      of: [defineArrayMember({ type: 'statItem' })],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: 'action', title: 'Button', type: 'buttonLink', group: 'extras' }),
    { ...backgroundField, group: 'content' },
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Split', subtitle: 'Split', media }
    },
  },
})
```

- [ ] **Step 4:** `stepsBlock.ts`:

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { OlistIcon } from '@sanity/icons'
import { sectionHeadFields, backgroundField } from '../shared/sectionFields'

export const stepsBlock = defineType({
  name: 'stepsBlock',
  title: 'Steps (How It Works)',
  type: 'object',
  icon: OlistIcon,
  fields: [
    ...sectionHeadFields,
    defineField({
      name: 'items',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required().max(60),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required().max(200),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
      validation: (rule) => rule.required().min(2).max(6),
    }),
    backgroundField,
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const n = Array.isArray(items) ? items.length : 0
      return { title: title || 'Steps', subtitle: `Steps · ${n} step${n === 1 ? '' : 's'}` }
    },
  },
})
```

- [ ] **Step 5:** Register all four in `index.ts`. Verify (canonical gate): typegen → tsc → lint → vitest, all `EXIT=0`.
- [ ] **Step 6:** Commit.

```bash
git add src/sanity/schemaTypes
git commit -m 'feat(sanity): structure blocks - hero, section heading, split, steps'
```

- [ ] **Step 7 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' '14 block schemas + page/productPage documents + TypeGen' in_progress 'Task 3 done: structure blocks (hero/sectionHeading/split/steps)'`

---

## Task 4: Block schemas — content group (productTileGrid, featureGrid, statBand, ratesFees, richText, widget)

**Files:**
- Create: `src/sanity/schemaTypes/blocks/productTileGridBlock.ts`, `featureGridBlock.ts`, `statBandBlock.ts`, `ratesFeesBlock.ts`, `richTextBlock.ts`, `widgetBlock.ts`
- Modify: `src/sanity/schemaTypes/index.ts`

- [ ] **Step 1:** `productTileGridBlock.ts`:

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { ThLargeIcon } from '@sanity/icons'
import { sectionHeadFields, backgroundField } from '../shared/sectionFields'

export const productTileGridBlock = defineType({
  name: 'productTileGridBlock',
  title: 'Product Tile Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    ...sectionHeadFields,
    defineField({
      name: 'items',
      title: 'Tiles',
      type: 'array',
      of: [defineArrayMember({ type: 'productTile' })],
      validation: (rule) => rule.required().min(2).max(6),
    }),
    backgroundField,
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const n = Array.isArray(items) ? items.length : 0
      return { title: title || 'Product Tile Grid', subtitle: `Product Tile Grid · ${n} tiles` }
    },
  },
})
```

- [ ] **Step 2:** `featureGridBlock.ts` (same shape; `items` of `featureItem`, min 3 max 6, icon `ThListIcon`, subtitle `Feature Grid · N features`). Also include after `lede` an `align` field identical to `sectionHeadingBlock`'s (the homepage "Why us" head is centered):

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { ThListIcon } from '@sanity/icons'
import { sectionHeadFields, backgroundField } from '../shared/sectionFields'

export const featureGridBlock = defineType({
  name: 'featureGridBlock',
  title: 'Feature Grid',
  type: 'object',
  icon: ThListIcon,
  fields: [
    ...sectionHeadFields,
    defineField({
      name: 'align',
      title: 'Heading Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'start' },
          { title: 'Centered', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'start',
    }),
    defineField({
      name: 'items',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({ type: 'featureItem' })],
      validation: (rule) => rule.required().min(3).max(6),
    }),
    backgroundField,
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const n = Array.isArray(items) ? items.length : 0
      return { title: title || 'Feature Grid', subtitle: `Feature Grid · ${n} features` }
    },
  },
})
```

- [ ] **Step 3:** `statBandBlock.ts`:

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { TrendUpwardIcon } from '@sanity/icons'
import { backgroundField } from '../shared/sectionFields'

export const statBandBlock = defineType({
  name: 'statBandBlock',
  title: 'Stat Band',
  type: 'object',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(360),
    }),
    defineField({ name: 'link', title: 'Text Link', type: 'buttonLink' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({ type: 'statItem' })],
      validation: (rule) => rule.required().min(2).max(4),
    }),
    backgroundField,
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Stat Band', subtitle: 'Stat Band' }
    },
  },
})
```

- [ ] **Step 4:** `ratesFeesBlock.ts`:

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { BillIcon } from '@sanity/icons'
import { sectionHeadFields, backgroundField } from '../shared/sectionFields'

export const ratesFeesBlock = defineType({
  name: 'ratesFeesBlock',
  title: 'Rates & Fees',
  type: 'object',
  icon: BillIcon,
  fields: [
    ...sectionHeadFields,
    defineField({
      name: 'ratesHeading',
      title: 'Rates Table Heading',
      type: 'string',
      initialValue: 'Interest rates',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'rates',
      title: 'Rates Rows',
      type: 'array',
      of: [defineArrayMember({ type: 'keyValueRow' })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'feesHeading',
      title: 'Fees Table Heading',
      type: 'string',
      initialValue: 'Transaction fees',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'fees',
      title: 'Fees Rows',
      type: 'array',
      description: 'Rows whose value is exactly Free render as a blue Free badge.',
      of: [defineArrayMember({ type: 'keyValueRow' })],
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
    backgroundField,
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Rates & Fees', subtitle: 'Rates & Fees' }
    },
  },
})
```

- [ ] **Step 5:** `richTextBlock.ts`:

```typescript
import { defineType, defineField } from 'sanity'
import { TextIcon } from '@sanity/icons'
import { backgroundField } from '../shared/sectionFields'

export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'string', title: 'URL' }],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
      validation: (rule) => rule.required(),
    }),
    backgroundField,
  ],
  preview: {
    select: { blocks: 'content' },
    prepare({ blocks }) {
      const first = Array.isArray(blocks)
        ? blocks.find((b: { _type?: string }) => b._type === 'block')
        : undefined
      const text = first?.children?.map((c: { text?: string }) => c.text).join('') ?? ''
      return { title: text.slice(0, 60) || 'Rich Text', subtitle: 'Rich Text' }
    },
  },
})
```

- [ ] **Step 6:** `widgetBlock.ts`:

```typescript
import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'
import { sectionHeadFields, backgroundField } from '../shared/sectionFields'

export const widgetBlock = defineType({
  name: 'widgetBlock',
  title: 'Interactive Widget',
  type: 'object',
  icon: CogIcon,
  fields: [
    ...sectionHeadFields,
    defineField({
      name: 'widget',
      title: 'Widget',
      type: 'string',
      description: 'A pre-built interactive tool. New widgets are added by the development team.',
      options: {
        list: [{ title: 'Home loan repayment calculator', value: 'repaymentCalculator' }],
      },
      validation: (rule) => rule.required(),
    }),
    backgroundField,
  ],
  preview: {
    select: { title: 'heading', widget: 'widget' },
    prepare({ title, widget }) {
      return { title: title || 'Widget', subtitle: `Widget · ${widget || 'none selected'}` }
    },
  },
})
```

- [ ] **Step 7:** Register all six in `index.ts`. Verify (canonical gate): typegen → tsc → lint → vitest, all `EXIT=0`.
- [ ] **Step 8:** Commit.

```bash
git add src/sanity/schemaTypes
git commit -m 'feat(sanity): content blocks - tiles, features, stats, rates, rich text, widget'
```

- [ ] **Step 9 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' '14 block schemas + page/productPage documents + TypeGen' in_progress 'Task 4 done: content blocks (tileGrid/featureGrid/statBand/ratesFees/richText/widget)'`

---

## Task 5: Block schemas — proof/conversion/compliance group + the pageBuilder array

**Files:**
- Create: `src/sanity/schemaTypes/blocks/testimonialBlock.ts`, `faqBlock.ts`, `noticeBlock.ts`, `ctaBannerBlock.ts`
- Create: `src/sanity/schemaTypes/pageBuilder.ts`
- Modify: `src/sanity/schemaTypes/index.ts`

- [ ] **Step 1:** `testimonialBlock.ts`:

```typescript
import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'
import { backgroundField } from '../shared/sectionFields'

export const testimonialBlock = defineType({
  name: 'testimonialBlock',
  title: 'Testimonial',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'role',
      title: 'Attribution Line',
      type: 'string',
      description: 'e.g. Member since 2018 · Tāmaki Makaurau',
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Featured (large, centered)', value: 'featured' },
          { title: 'Standard card', value: 'default' },
        ],
        layout: 'radio',
      },
      initialValue: 'featured',
    }),
    backgroundField,
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote' },
    prepare({ title, subtitle }) {
      return { title: title || 'Testimonial', subtitle: `Testimonial · ${(subtitle || '').slice(0, 50)}` }
    },
  },
})
```

- [ ] **Step 2:** `faqBlock.ts`:

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'
import { sectionHeadFields, backgroundField } from '../shared/sectionFields'

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    ...sectionHeadFields,
    defineField({
      name: 'align',
      title: 'Heading Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'start' },
          { title: 'Centered', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
      validation: (rule) => rule.required().min(1).max(12),
    }),
    backgroundField,
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const n = Array.isArray(items) ? items.length : 0
      return { title: title || 'FAQ', subtitle: `FAQ · ${n} question${n === 1 ? '' : 's'}` }
    },
  },
})
```

- [ ] **Step 3:** `noticeBlock.ts` — the only block with a reference:

```typescript
import { defineType, defineField } from 'sanity'
import { WarningOutlineIcon } from '@sanity/icons'

export const noticeBlock = defineType({
  name: 'noticeBlock',
  title: 'Notice',
  type: 'object',
  icon: WarningOutlineIcon,
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: 'Information', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Legal / regulatory', value: 'legal' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 3,
      description: 'Write the notice here, OR pick a shared disclaimer below instead.',
    }),
    defineField({
      name: 'sharedDisclaimer',
      title: 'Shared Disclaimer',
      type: 'reference',
      to: [{ type: 'disclaimerSnippet' }],
      description: 'Reusable compliance text managed under Disclaimer Snippets.',
    }),
  ],
  validation: (rule) =>
    rule.custom((value: { content?: string; sharedDisclaimer?: unknown } | undefined) => {
      if (!value) return true
      if (!value.content && !value.sharedDisclaimer) {
        return 'Add content or pick a shared disclaimer'
      }
      return true
    }),
  preview: {
    select: { title: 'title', tone: 'tone' },
    prepare({ title, tone }) {
      return { title: title || 'Notice', subtitle: `Notice · ${tone || 'info'}` }
    },
  },
})
```

- [ ] **Step 4:** `ctaBannerBlock.ts`:

```typescript
import { defineType, defineField } from 'sanity'
import { BoltIcon } from '@sanity/icons'
import { backgroundField } from '../shared/sectionFields'

export const ctaBannerBlock = defineType({
  name: 'ctaBannerBlock',
  title: 'CTA Banner',
  type: 'object',
  icon: BoltIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: 'Brand panel (dark blue)', value: 'primary' },
          { title: 'Card', value: 'default' },
          { title: 'Soft tint', value: 'subtle' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Side by side', value: 'inline' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'primaryAction', title: 'Primary Button', type: 'buttonLink' }),
    defineField({ name: 'secondaryAction', title: 'Secondary Button', type: 'buttonLink' }),
    backgroundField,
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'CTA Banner', subtitle: 'CTA Banner' }
    },
  },
})
```

- [ ] **Step 5:** `pageBuilder.ts` — the universal array with grouped insert menu. The 14 preview thumbnails `public/block-previews/<typeName>.png` are already committed (`53073fc`), so the `views` grid config ships unconditionally:

```typescript
import { defineType, defineArrayMember } from 'sanity'

export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({ type: 'heroBlock' }),
    defineArrayMember({ type: 'sectionHeadingBlock' }),
    defineArrayMember({ type: 'splitBlock' }),
    defineArrayMember({ type: 'stepsBlock' }),
    defineArrayMember({ type: 'productTileGridBlock' }),
    defineArrayMember({ type: 'featureGridBlock' }),
    defineArrayMember({ type: 'statBandBlock' }),
    defineArrayMember({ type: 'ratesFeesBlock' }),
    defineArrayMember({ type: 'richTextBlock' }),
    defineArrayMember({ type: 'widgetBlock' }),
    defineArrayMember({ type: 'testimonialBlock' }),
    defineArrayMember({ type: 'faqBlock' }),
    defineArrayMember({ type: 'noticeBlock' }),
    defineArrayMember({ type: 'ctaBannerBlock' }),
  ],
  options: {
    insertMenu: {
      filter: true,
      groups: [
        { name: 'structure', title: 'Structure', of: ['heroBlock', 'sectionHeadingBlock', 'splitBlock'] },
        {
          name: 'content',
          title: 'Content',
          of: ['productTileGridBlock', 'featureGridBlock', 'stepsBlock', 'ratesFeesBlock', 'richTextBlock', 'widgetBlock'],
        },
        { name: 'proof', title: 'Social Proof', of: ['testimonialBlock', 'statBandBlock', 'faqBlock'] },
        { name: 'conversion', title: 'Conversion', of: ['ctaBannerBlock'] },
        { name: 'compliance', title: 'Compliance', of: ['noticeBlock'] },
      ],
      views: [
        { name: 'grid', previewImageUrl: (typeName) => `/block-previews/${typeName}.png` },
        { name: 'list' },
      ],
    },
  },
})
```

- [ ] **Step 6:** Register the four blocks + `pageBuilder` in `index.ts`. Verify (canonical gate): typegen → tsc → lint → vitest, all `EXIT=0`.
- [ ] **Step 7:** Commit.

```bash
git add src/sanity/schemaTypes
git commit -m 'feat(sanity): proof and conversion blocks plus the universal pageBuilder array' -m 'testimonial, faq, notice (shared-disclaimer reference), cta banner; insert menu grouped Structure/Content/Social Proof/Conversion/Compliance with grid preview images from the Figma kit (committed at 53073fc).'
```

- [ ] **Step 8 (hub tick):** two updates — `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' '14 block schemas + page/productPage documents + TypeGen' in_progress 'Task 5 done: all 14 block schemas registered'` and `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' 'Insert menu + thumbnails + Presentation locations' in_progress 'Task 5: grouped insert menu + committed thumbnails wired'`

---

## Task 6: Documents (`page`, `productPage`), homepage assignment, Studio structure, Presentation locations

**Files:**
- Create: `src/sanity/schemaTypes/page.ts`, `src/sanity/schemaTypes/productPage.ts`
- Modify: `src/sanity/schemaTypes/siteSettings.ts` (add `homepage` reference — read the file first, append to its `fields` array)
- Modify: `src/sanity/schemaTypes/index.ts`, `src/sanity/structure.ts`, `src/sanity/presentation/resolve.ts`

- [ ] **Step 1:** `page.ts`:

```typescript
import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'settings',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      description: 'Full path without leading slash, e.g. about-us or community/grants. The homepage uses home.',
      options: { source: 'title' },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Required'
          if (!/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/.test(slug.current)) {
            return 'Lowercase letters, numbers, hyphens, and / only — no leading or trailing slash'
          }
          return true
        }),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
      group: 'content',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return { title: title || 'Untitled Page', subtitle: slug ? `/${slug}` : 'No slug' }
    },
  },
})
```

- [ ] **Step 2:** `productPage.ts` — identical shape plus the taxonomy field (copy the `page.ts` fields; do not import them — the two documents will diverge):

```typescript
import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const productPage = defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  icon: TagIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'settings',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      description: 'Full path without leading slash, e.g. accounts/everyday or loans/home.',
      options: { source: 'title' },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Required'
          if (!/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/.test(slug.current)) {
            return 'Lowercase letters, numbers, hyphens, and / only — no leading or trailing slash'
          }
          return true
        }),
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Everyday Account', value: 'everyday-account' },
          { title: 'Bill Pay Account', value: 'bill-pay-account' },
          { title: 'Expense Account', value: 'expense-account' },
          { title: 'Special Purpose Account', value: 'special-purpose-account' },
          { title: 'Kids Account', value: 'kids-account' },
          { title: 'Travel Account', value: 'travel-account' },
          { title: 'Savings', value: 'savings' },
          { title: 'Term Deposit', value: 'term-deposit' },
          { title: 'Personal Loan', value: 'personal-loan' },
          { title: 'Debt Consolidation Loan', value: 'debt-consolidation-loan' },
          { title: 'Car Loan', value: 'car-loan' },
          { title: 'Home Loan', value: 'home-loan' },
          { title: 'Travel Loan', value: 'travel-loan' },
          { title: 'Wedding Loan', value: 'wedding-loan' },
          { title: 'Christmas Loan', value: 'christmas-loan' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'other',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
      group: 'content',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', productType: 'productType' },
    prepare({ title, slug, productType }) {
      return {
        title: title || 'Untitled Product Page',
        subtitle: `${productType || 'product'}${slug ? ` · /${slug}` : ''}`,
      }
    },
  },
})
```

- [ ] **Step 3:** In `siteSettings.ts`, append to the `fields` array:

```typescript
defineField({
  name: 'homepage',
  title: 'Homepage',
  type: 'reference',
  to: [{ type: 'page' }],
  description: 'The page served at the site root (/). Swap it to change the homepage.',
}),
```

- [ ] **Step 4:** Register `page` + `productPage` in `index.ts`. In `structure.ts`: add `'page'` and `'productPage'` to `HIDDEN_TYPES`; add above the Disclaimer Snippets item:

```typescript
S.listItem()
  .title('Pages')
  .icon(DocumentIcon)
  .child(S.documentTypeList('page').title('Pages')),
S.listItem()
  .title('Product Pages')
  .icon(TagIcon)
  .child(S.documentTypeList('productPage').title('Product Pages')),
```

(add `TagIcon` to the icon imports). In `resolve.ts`, replace the locations map — the result gains `page` + `productPage` and (with Task 1's removals) no longer contains `loanProductPage` or the stray `post` type:

```typescript
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    page: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Untitled Page', href: `/${doc?.slug}` }],
      }),
    }),
    productPage: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Untitled Product Page', href: `/${doc?.slug}` }],
      }),
    }),
  },
}
```

- [ ] **Step 5:** Verify (canonical gate): typegen → tsc → lint → vitest, all `EXIT=0`.
- [ ] **Step 6:** Commit.

```bash
git add src/sanity
git commit -m 'feat(sanity): page and productPage documents, homepage assignment, studio structure'
```

- [ ] **Step 7 (hub tick):** two updates — `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' 'Insert menu + thumbnails + Presentation locations' complete 'Task 6 done: resolve.locations = page + productPage (post dropped in Task 1); Studio lists added'` and `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' '14 block schemas + page/productPage documents + TypeGen' in_progress 'Task 6 done: page/productPage documents + homepage reference'`

---

## Task 7: GROQ queries

**Files:**
- Modify: `src/sanity/lib/queries.ts` (append)

- [ ] **Step 1:** Append the two queries. The projection is explicit about `_key`/`_type`, expands image assets on every image-bearing field, and expands the one reference. (Typegen needs the literal inline — do not extract string fragments.)

```typescript
export const HOMEPAGE_SLUG_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0].homepage->slug.current
`)

export const PAGE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type in ["page", "productPage"] && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    productType,
    seo {
      title,
      description,
      noIndex,
      image { asset->{ url } }
    },
    pageBuilder[] {
      _key,
      _type,
      ...,
      image {
        ...,
        asset->{ _id, url, metadata { lqip, dimensions { width, height } } }
      },
      meta[] { _key, value, unit, label, note },
      checklist[] { _key, title, detail },
      rows[] { _key, label, value, highlight },
      stats[] { _key, value, unit, label, note },
      rates[] { _key, label, value, highlight },
      fees[] { _key, label, value, highlight },
      items[] {
        ...,
        _key,
        image {
          ...,
          asset->{ _id, url, metadata { lqip, dimensions { width, height } } }
        }
      },
      primaryAction { label, linkType, url, externalUrl, openInNewTab },
      secondaryAction { label, linkType, url, externalUrl, openInNewTab },
      action { label, linkType, url, externalUrl, openInNewTab },
      link { label, linkType, url, externalUrl, openInNewTab },
      _type == "noticeBlock" => {
        sharedDisclaimer->{ _id, name, tone, content }
      }
    }
  }
`)
```

- [ ] **Step 2:** Verify (canonical gate): typegen → tsc → lint → vitest, all `EXIT=0`; confirm `src/sanity/types.ts` now exports `PAGE_BY_SLUG_QUERYResult` (search the file).
- [ ] **Step 3:** Commit.

```bash
git add src/sanity/lib/queries.ts src/sanity/types.ts schema.json
git commit -m 'feat(sanity): page builder GROQ queries with typegen types'
```

- [ ] **Step 4 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' '14 block schemas + page/productPage documents + TypeGen' complete 'Task 7 done: GROQ queries + typegen types generated; schema work complete (Tasks 2-7)'`

---

## Task 8: Renderer foundation + first three renderers

> **React-compiler lint constraints (eslint react-hooks strict — repo rule, applies to every renderer task 8–11):**
> 1. **No impure calls in render.** No `Date.now()`/`Math.random()` in any component body — server components included. Move impure work into plain helper functions called from event handlers, or precompute it outside render.
> 2. **No `setState` directly inside `useEffect` bodies.** For external stores (scroll position, sessionStorage) use `useSyncExternalStore`.
> 3. **Components must never be created during render.** The block renderer registry renders via `createElement(registry[type], props)` or module-level component references (the `switch` below uses module-level references — compliant). NEVER `const C = map[x]; return <C/>` inline in a component body — this applies to the widget registry (Task 11) and the icon registry (Task 10), which both use `createElement`.

**Files:**
- Create: `src/components/page-builder/types.ts`, `section-shell.tsx`, `sanity-image.tsx`, `action-button.tsx`, `page-builder.tsx`
- Create: `src/components/page-builder/blocks/section-heading.tsx`, `blocks/rich-text.tsx`, `blocks/notice.tsx`

- [ ] **Step 1:** `types.ts` — every block type derives from the query result (never hand-write block shapes):

```typescript
import type { PAGE_BY_SLUG_QUERYResult } from '@/sanity/types'

export type PageResult = NonNullable<PAGE_BY_SLUG_QUERYResult>
export type PageBuilderBlock = NonNullable<PageResult['pageBuilder']>[number]

export type BlockOf<T extends PageBuilderBlock['_type']> = Extract<
  PageBuilderBlock,
  { _type: T }
>
```

- [ ] **Step 2:** `section-shell.tsx` — maps the shared `background` field onto the DS `Section`:

```tsx
import { type ComponentProps } from 'react'
import { stegaClean } from 'next-sanity'

import { Section } from '@/components/marketing'

type SectionVariant = ComponentProps<typeof Section>['variant']

const BACKGROUND_TO_VARIANT: Record<string, SectionVariant> = {
  default: 'default',
  soft: 'surface',
  sunken: 'sunken',
}

export function SectionShell({
  background,
  narrow,
  children,
}: {
  background?: string | null
  narrow?: boolean
  children: React.ReactNode
}) {
  const variant = BACKGROUND_TO_VARIANT[stegaClean(background ?? 'default') ?? 'default'] ?? 'default'
  return (
    <Section variant={variant} narrow={narrow}>
      {children}
    </Section>
  )
}
```

- [ ] **Step 3:** `sanity-image.tsx`:

```tsx
import Image from 'next/image'

import { urlFor } from '@/sanity/lib/image'

type SanityImageValue = {
  asset?: {
    _id?: string
    url?: string | null
    metadata?: {
      lqip?: string | null
      dimensions?: { width?: number | null; height?: number | null } | null
    } | null
  } | null
  alt?: string | null
} | null

export function BlockImage({
  image,
  sizes,
  priority,
  className,
}: {
  image: SanityImageValue
  sizes: string
  priority?: boolean
  className?: string
}) {
  if (!image?.asset?.url) return null
  const width = image.asset.metadata?.dimensions?.width ?? 3000
  const height = image.asset.metadata?.dimensions?.height ?? 2000
  const lqip = image.asset.metadata?.lqip ?? undefined
  return (
    <Image
      src={urlFor(image).width(1200).quality(85).auto('format').url()}
      alt={image.alt ?? ''}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      placeholder={lqip ? 'blur' : undefined}
      blurDataURL={lqip}
      className={className}
    />
  )
}
```

- [ ] **Step 4:** `action-button.tsx` — the ONLY way blocks render buttonLink fields (DS Button as Link, per the established `render`/`nativeButton` pattern):

```tsx
import Link from 'next/link'
import { stegaClean } from 'next-sanity'
import { type ComponentProps } from 'react'

import { Button } from '@/components/ui/button'

export type ButtonLinkValue = {
  label?: string | null
  linkType?: string | null
  url?: string | null
  externalUrl?: string | null
  openInNewTab?: boolean | null
} | null

export function resolveHref(link: ButtonLinkValue): string {
  if (!link) return '#'
  return stegaClean(link.linkType) === 'external'
    ? (link.externalUrl ?? '#')
    : (link.url ?? '#')
}

export function ActionButton({
  link,
  variant,
  size = 'lg',
}: {
  link: ButtonLinkValue
  variant?: ComponentProps<typeof Button>['variant']
  size?: ComponentProps<typeof Button>['size']
}) {
  if (!link?.label) return null
  const newTab = Boolean(link.openInNewTab)
  return (
    <Button
      render={
        <Link
          href={resolveHref(link)}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
        />
      }
      nativeButton={false}
      variant={variant}
      size={size}
    >
      {link.label}
    </Button>
  )
}
```

- [ ] **Step 5:** `blocks/section-heading.tsx`:

```tsx
import { stegaClean } from 'next-sanity'

import { SectionHead } from '@/components/marketing'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

export function SectionHeadingBlock({ block }: { block: BlockOf<'sectionHeadingBlock'> }) {
  return (
    <SectionShell background={block.background}>
      <SectionHead
        className='mb-0'
        eyebrow={block.eyebrow ?? ''}
        title={block.heading ?? ''}
        lede={block.lede}
        center={stegaClean(block.align) === 'center'}
      />
    </SectionShell>
  )
}
```

- [ ] **Step 6:** `blocks/rich-text.tsx`:

```tsx
import { PortableText } from 'next-sanity'

import { components } from '@/sanity/portableTextComponents'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

export function RichTextBlock({ block }: { block: BlockOf<'richTextBlock'> }) {
  if (!block.content) return null
  return (
    <SectionShell background={block.background} narrow>
      <div className='prose prose-neutral max-w-[68ch] [&_a]:text-primary'>
        <PortableText value={block.content} components={components} />
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 7:** `blocks/notice.tsx` (DS Alert; `legal` tone renders as neutral):

```tsx
import { stegaClean } from 'next-sanity'

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Wrap } from '@/components/marketing'
import type { BlockOf } from '../types'

const TONE_TO_VARIANT = {
  info: 'info',
  warning: 'warning',
  legal: 'neutral',
} as const

export function NoticeBlock({ block }: { block: BlockOf<'noticeBlock'> }) {
  const content = block.content || block.sharedDisclaimer?.content
  if (!content) return null
  const tone = (stegaClean(block.tone) ?? 'info') as keyof typeof TONE_TO_VARIANT
  const title = block.title || block.sharedDisclaimer?.name
  return (
    <div className='py-[clamp(16px,2vw,24px)]'>
      <Wrap narrow>
        <Alert variant={TONE_TO_VARIANT[tone] ?? 'info'}>
          {title ? <AlertTitle>{title}</AlertTitle> : null}
          <AlertDescription>{content}</AlertDescription>
        </Alert>
      </Wrap>
    </div>
  )
}
```

Before finalizing, read `src/components/ui/alert.tsx` exports — if the subcomponent names differ (e.g. no `AlertTitle`), use the actual exported API.

- [ ] **Step 8:** `page-builder.tsx` — the registry. Unknown types render nothing in production but log in dev. Every `case` returns JSX built from a MODULE-LEVEL component reference (react-compiler constraint 3) — never assign a component out of a map into a local and render it inline:

```tsx
import type { PageBuilderBlock } from './types'
import { SectionHeadingBlock } from './blocks/section-heading'
import { RichTextBlock } from './blocks/rich-text'
import { NoticeBlock } from './blocks/notice'

export function PageBuilder({ blocks }: { blocks: PageBuilderBlock[] | null | undefined }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null
  return (
    <>
      {blocks.map((block, index) => (
        <BlockRenderer key={block._key} block={block} index={index} />
      ))}
    </>
  )
}

function BlockRenderer({ block, index }: { block: PageBuilderBlock; index: number }) {
  switch (block._type) {
    case 'sectionHeadingBlock':
      return <SectionHeadingBlock block={block} />
    case 'richTextBlock':
      return <RichTextBlock block={block} />
    case 'noticeBlock':
      return <NoticeBlock block={block} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[page-builder] no renderer for block type: ${block._type} (index ${index})`)
      }
      return null
  }
}
```

(Each later task adds its `case` lines and imports; `index` is consumed by the hero case in Task 9.)

- [ ] **Step 9:** Verify (real exit codes): `npx tsc --noEmit > /tmp/pb-tsc.log 2>&1; EXIT=$?; echo "tsc EXIT=$EXIT"` and `npx eslint src/components/page-builder > /tmp/pb-eslint.log 2>&1; EXIT=$?; echo "eslint EXIT=$EXIT"` — both `EXIT=0`.
- [ ] **Step 10:** Commit.

```bash
git add src/components/page-builder
git commit -m 'feat(page-builder): renderer foundation with section shell, image, action button' -m 'Registry pattern keyed by _key; sectionHeading, richText, and notice render on DS Section/SectionHead/Alert; stegaClean on logic-driving enums; react-compiler-safe registry (module-level refs / createElement only).'
```

- [ ] **Step 11 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' 'Renderer registry on DS components' in_progress 'Task 8 done: foundation + sectionHeading/richText/notice renderers'`

---

## Task 9: Renderers — hero, split, steps

**Files:**
- Create: `src/components/page-builder/blocks/hero.tsx`, `blocks/split.tsx`, `blocks/steps.tsx`
- Modify: `src/components/page-builder/page-builder.tsx` (add cases)

- [ ] **Step 1:** `blocks/hero.tsx`. The marketing `Hero` takes `image: {src, alt}` (string src) — pass the Sanity CDN URL; `priority` when it is the first block; `compact` from `emphasis`. Meta values render value + muted unit:

```tsx
import { stegaClean } from 'next-sanity'

import { Hero } from '@/components/marketing'
import { urlFor } from '@/sanity/lib/image'
import { ActionButton } from '../action-button'
import type { BlockOf } from '../types'

export function HeroBlock({ block, index }: { block: BlockOf<'heroBlock'>; index: number }) {
  if (!block.image?.asset?.url) return null
  const meta = (block.meta ?? []).map((m) => ({
    label: m.label ?? '',
    value: (
      <>
        {m.value}
        {m.unit ? (
          <span className='ml-1 text-[13px] font-normal text-foreground-muted'>{m.unit}</span>
        ) : null}
      </>
    ),
  }))
  return (
    <Hero
      priority={index === 0}
      compact={stegaClean(block.emphasis) === 'compact'}
      eyebrow={block.eyebrow ?? ''}
      title={block.heading ?? ''}
      lede={block.lede ?? ''}
      image={{
        src: urlFor(block.image).width(1200).quality(85).auto('format').url(),
        alt: block.image.alt ?? '',
      }}
      meta={meta.length > 0 ? meta : undefined}
      actions={
        block.primaryAction?.label || block.secondaryAction?.label ? (
          <>
            <ActionButton link={block.primaryAction} />
            <ActionButton link={block.secondaryAction} variant='outline' />
          </>
        ) : undefined
      }
    />
  )
}
```

Note: the `Hero` component renders `h1` internally — this is why `heroBlock` carries no heading-level field. If a hero is placed mid-page, it still renders `h1`; the Studio description for `heroBlock` should say "use once, at the top" (add `description` to the schema if not already).

- [ ] **Step 2:** `blocks/split.tsx` — content side is SectionHead + whichever slots are filled (checklist → `Checklist`; rows → `DescriptionList`; stats → `Card` pair; action → outline button):

```tsx
import { stegaClean } from 'next-sanity'

import {
  Split,
  SectionHead,
  Checklist,
  ChecklistItem,
} from '@/components/marketing'
import {
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
  DescriptionDetail,
} from '@/components/ui/description-list'
import { Card, CardContent } from '@/components/ui/card'
import { urlFor } from '@/sanity/lib/image'
import { ActionButton } from '../action-button'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

export function SplitBlock({ block }: { block: BlockOf<'splitBlock'> }) {
  if (!block.image?.asset?.url) return null
  const checklist = block.checklist ?? []
  const rows = block.rows ?? []
  const stats = block.stats ?? []
  return (
    <SectionShell background={block.background}>
      <Split
        reverse={stegaClean(block.imageSide) === 'right'}
        image={{
          src: urlFor(block.image).width(1000).quality(85).auto('format').url(),
          alt: block.image.alt ?? '',
        }}
      >
        <SectionHead
          className='mb-0'
          eyebrow={block.eyebrow ?? ''}
          title={block.heading ?? ''}
          lede={block.lede}
        />
        {checklist.length > 0 ? (
          <Checklist className='mt-6'>
            {checklist.map((item) => (
              <ChecklistItem key={item._key} title={item.title ?? ''}>
                {item.detail}
              </ChecklistItem>
            ))}
          </Checklist>
        ) : null}
        {rows.length > 0 ? (
          <DescriptionList className='mt-7'>
            {rows.map((row) => (
              <DescriptionRow key={row._key} className='grid-cols-[1fr_auto] gap-4'>
                <DescriptionTerm className='text-[14px]'>{row.label}</DescriptionTerm>
                <DescriptionDetail mono className='justify-end font-semibold'>
                  {row.value}
                </DescriptionDetail>
              </DescriptionRow>
            ))}
          </DescriptionList>
        ) : null}
        {block.footnote ? (
          <p className='mt-3 text-[12.5px] text-foreground-subtle'>{block.footnote}</p>
        ) : null}
        {stats.length > 0 ? (
          <div className='mt-7 grid grid-cols-2 gap-3.5 max-[560px]:grid-cols-1'>
            {stats.map((stat) => (
              <Card key={stat._key}>
                <CardContent className='flex flex-col gap-1.5 px-5 py-[18px]'>
                  <span className='text-[13px] font-medium text-foreground-muted'>{stat.label}</span>
                  <span className='font-mono text-[28px] leading-none font-semibold tracking-[-0.02em] text-foreground tabular-nums'>
                    {stat.value}
                    {stat.unit ? (
                      <span className='ml-1 text-[13px] font-normal text-foreground-muted'>
                        {stat.unit}
                      </span>
                    ) : null}
                  </span>
                  {stat.note ? (
                    <span className='font-mono text-[12px] text-status-success-700'>{stat.note}</span>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
        {block.action?.label ? (
          <div className='mt-6'>
            <ActionButton link={block.action} variant='outline' size='default' />
          </div>
        ) : null}
      </Split>
    </SectionShell>
  )
}
```

- [ ] **Step 3:** `blocks/steps.tsx` (DS Stepper; read `src/components/ui/stepper.tsx` first to confirm the `StepItem`/`current` API used by `/loans/home` and mirror it):

```tsx
import { Stepper, type StepItem } from '@/components/ui/stepper'
import { SectionHead } from '@/components/marketing'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

export function StepsBlock({ block }: { block: BlockOf<'stepsBlock'> }) {
  const steps: StepItem[] = (block.items ?? []).map((item) => ({
    title: item.title ?? '',
    description: item.description ?? '',
  }))
  if (steps.length === 0) return null
  return (
    <SectionShell background={block.background}>
      {block.heading ? (
        <SectionHead eyebrow={block.eyebrow ?? ''} title={block.heading} lede={block.lede} />
      ) : null}
      <Stepper steps={steps} current={1} />
    </SectionShell>
  )
}
```

- [ ] **Step 4:** Add the registry cases (`heroBlock` passes `index`):

```tsx
case 'heroBlock':
  return <HeroBlock block={block} index={index} />
case 'splitBlock':
  return <SplitBlock block={block} />
case 'stepsBlock':
  return <StepsBlock block={block} />
```

- [ ] **Step 5:** Verify (real exit codes): `npx tsc --noEmit` and `npx eslint src/components/page-builder`, each `> /tmp/pb-*.log 2>&1; EXIT=$?` — both `EXIT=0`.
- [ ] **Step 6:** Commit: `git add src/components/page-builder && git commit -m 'feat(page-builder): hero, split, and steps renderers'`
- [ ] **Step 7 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' 'Renderer registry on DS components' in_progress 'Task 9 done: hero/split/steps renderers'`

---

## Task 10: Renderers — productTileGrid, featureGrid, statBand, ratesFees

**Files:**
- Create: `src/components/page-builder/block-icons.ts` (semantic-key → lucide registry, modeled on `src/components/header/nav-icons.ts`)
- Create: `blocks/product-tile-grid.tsx`, `blocks/feature-grid.tsx`, `blocks/stat-band.tsx`, `blocks/rates-fees.tsx` (under `src/components/page-builder/`)
- Modify: `page-builder.tsx` (4 cases)

- [ ] **Step 1:** `blocks/product-tile-grid.tsx` (ProductTile takes a string `src` — use the CDN URL):

```tsx
import { ProductTile, SectionHead } from '@/components/marketing'
import { urlFor } from '@/sanity/lib/image'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

export function ProductTileGridBlock({ block }: { block: BlockOf<'productTileGridBlock'> }) {
  const items = (block.items ?? []).filter((item) => item.image?.asset?.url)
  if (items.length === 0) return null
  return (
    <SectionShell background={block.background}>
      {block.heading ? (
        <SectionHead eyebrow={block.eyebrow ?? ''} title={block.heading} lede={block.lede} />
      ) : null}
      <div className='grid grid-cols-3 gap-[18px] max-[920px]:grid-cols-2 max-[560px]:grid-cols-1'>
        {items.map((item) => (
          <ProductTile
            key={item._key}
            href={item.url ?? '#'}
            kicker={item.kicker ?? ''}
            title={item.title ?? ''}
            description={item.description ?? ''}
            image={{
              src: urlFor(item.image!).width(800).quality(85).auto('format').url(),
              alt: item.image?.alt ?? '',
            }}
          />
        ))}
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 2:** `block-icons.ts` — the renderer-owned meaning→lucide mapping (one entry per semantic key from Task 2; lucide-react 1.22 export names, same style as `nav-icons.ts`):

```typescript
// src/components/page-builder/block-icons.ts
// Semantic meaning keys → lucide components for page-builder blocks.
// The keys mirror the `featureItem.icon` options list in
// src/sanity/schemaTypes/objects/featureItem.ts — keep the two in sync.
// The navbar has its own registry (src/components/header/nav-icons.ts) with
// different keys — do not merge or churn it.
import {
  Bell,
  Clock,
  CreditCard,
  DollarSign,
  Landmark,
  LifeBuoy,
  MapPin,
  PieChart,
  Send,
  Smartphone,
  Users,
  type LucideIcon,
} from 'lucide-react'

export const BLOCK_ICONS: Record<string, LucideIcon> = {
  members: Users,
  rates: DollarSign,
  location: MapPin,
  mobile: Smartphone,
  support: LifeBuoy,
  institution: Landmark,
  card: CreditCard,
  payments: Send,
  time: Clock,
  alerts: Bell,
  insights: PieChart,
}

/** Unknown/missing keys fall back to the members icon. */
export const FALLBACK_BLOCK_ICON: LucideIcon = Users
```

Then `blocks/feature-grid.tsx` — icons resolved via `createElement` (react-compiler constraint: never `const C = map[x]; <C/>` inline):

```tsx
import { createElement } from 'react'
import { stegaClean } from 'next-sanity'

import { FeatureItem, SectionHead } from '@/components/marketing'
import { BLOCK_ICONS, FALLBACK_BLOCK_ICON } from '../block-icons'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

export function FeatureGridBlock({ block }: { block: BlockOf<'featureGridBlock'> }) {
  const items = block.items ?? []
  if (items.length === 0) return null
  return (
    <SectionShell background={block.background}>
      {block.heading ? (
        <SectionHead
          eyebrow={block.eyebrow ?? ''}
          title={block.heading}
          lede={block.lede}
          center={stegaClean(block.align) === 'center'}
        />
      ) : null}
      <div className='grid grid-cols-3 gap-x-7 gap-y-6 max-[880px]:grid-cols-2 max-[880px]:gap-6 max-[560px]:grid-cols-1'>
        {items.map((item) => (
          <FeatureItem
            key={item._key}
            icon={createElement(BLOCK_ICONS[stegaClean(item.icon) ?? ''] ?? FALLBACK_BLOCK_ICON)}
            title={item.title ?? ''}
          >
            {item.description}
          </FeatureItem>
        ))}
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 3:** `blocks/stat-band.tsx` (2-col copy + divided StatRow, the bill-pay pattern):

```tsx
import { Stat, StatRow, StatLabel, StatValue, StatUnit } from '@/components/ui/stat'
import { ActionButton } from '../action-button'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

export function StatBandBlock({ block }: { block: BlockOf<'statBandBlock'> }) {
  const stats = block.stats ?? []
  if (stats.length === 0) return null
  return (
    <SectionShell background={block.background}>
      <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-16'>
        <div className='flex flex-col items-start gap-5'>
          <h2 className='text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.025em] text-balance text-foreground'>
            {block.heading}
          </h2>
          {block.body ? (
            <p className='max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base'>
              {block.body}
            </p>
          ) : null}
          {block.link?.label ? <ActionButton link={block.link} variant='link' size='default' /> : null}
        </div>
        <StatRow divided>
          {stats.map((s) => (
            <Stat key={s._key}>
              <StatValue mono>
                {s.value}
                {s.unit ? <StatUnit>{s.unit}</StatUnit> : null}
              </StatValue>
              <StatLabel>{s.label}</StatLabel>
            </Stat>
          ))}
        </StatRow>
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 4:** `blocks/rates-fees.tsx` (two DescriptionLists; fee value `Free` → subtle-blue Badge — the bill-pay pattern):

```tsx
import { Badge } from '@/components/ui/badge'
import {
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
  DescriptionDetail,
} from '@/components/ui/description-list'
import { SectionHead } from '@/components/marketing'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

type Row = { _key: string; label?: string | null; value?: string | null; highlight?: boolean | null }

function RowsTable({ heading, rows }: { heading?: string | null; rows: Row[] }) {
  if (rows.length === 0) return null
  return (
    <div>
      {heading ? <h3 className='mb-4 text-[17px] font-semibold text-foreground'>{heading}</h3> : null}
      <DescriptionList>
        {rows.map((row) => (
          <DescriptionRow key={row._key} className='grid-cols-[1fr_auto] gap-4'>
            <DescriptionTerm className='text-[14px]'>{row.label}</DescriptionTerm>
            <DescriptionDetail className='justify-end'>
              {row.value === 'Free' ? (
                <Badge variant='primary'>Free</Badge>
              ) : (
                <span
                  className={
                    row.highlight
                      ? 'font-mono font-semibold tabular-nums text-status-warning-700'
                      : 'font-mono font-semibold tabular-nums text-foreground'
                  }
                >
                  {row.value}
                </span>
              )}
            </DescriptionDetail>
          </DescriptionRow>
        ))}
      </DescriptionList>
    </div>
  )
}

export function RatesFeesBlock({ block }: { block: BlockOf<'ratesFeesBlock'> }) {
  const rates = (block.rates ?? []) as Row[]
  const fees = (block.fees ?? []) as Row[]
  if (rates.length === 0 && fees.length === 0) return null
  return (
    <SectionShell background={block.background}>
      {block.heading ? (
        <SectionHead eyebrow={block.eyebrow ?? ''} title={block.heading} lede={block.lede} />
      ) : null}
      <div className='grid gap-8 md:grid-cols-2'>
        <RowsTable heading={block.ratesHeading} rows={rates} />
        <RowsTable heading={block.feesHeading} rows={fees} />
      </div>
      {block.footnote ? (
        <p className='mt-8 text-xs leading-relaxed text-muted-foreground'>{block.footnote}</p>
      ) : null}
    </SectionShell>
  )
}
```

- [ ] **Step 5:** Add the four registry cases; verify (real exit codes) `npx tsc --noEmit` and `npx eslint src/components/page-builder`, each `> /tmp/pb-*.log 2>&1; EXIT=$?` — both `EXIT=0`; commit:

```bash
git add src/components/page-builder
git commit -m 'feat(page-builder): tile grid, feature grid, stat band, rates renderers' -m 'block-icons.ts registry maps semantic meaning keys to the 11 curated kit icons (lucide-react 1.22); feature grid resolves icons via createElement.'
```

- [ ] **Step 6 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' 'Renderer registry on DS components' in_progress 'Task 10 done: tileGrid/featureGrid/statBand/ratesFees renderers + block-icons registry'`

---

## Task 11: Renderers — testimonial, faq, ctaBanner, widget (+ calculator move)

**Files:**
- Create: `blocks/testimonial.tsx`, `blocks/faq.tsx`, `blocks/cta-banner.tsx`, `blocks/widget.tsx`
- Move: `src/app/(frontend)/loans/home/repayment-calculator.tsx` → `src/components/page-builder/widgets/repayment-calculator.tsx` (`git mv`; update the import in `loans/home/page.tsx` for now — the route dies in Task 14)
- Modify: `page-builder.tsx` (4 cases)

- [ ] **Step 1:** `blocks/testimonial.tsx` (initials derived from the name — no extra field):

```tsx
import { stegaClean } from 'next-sanity'

import {
  Testimonial,
  TestimonialMark,
  TestimonialQuote,
  TestimonialAttribution,
  TestimonialAvatar,
  TestimonialMeta,
  TestimonialName,
  TestimonialRole,
} from '@/components/ui/testimonial'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function TestimonialBlock({ block }: { block: BlockOf<'testimonialBlock'> }) {
  if (!block.quote) return null
  const variant = stegaClean(block.variant) === 'default' ? undefined : 'featured'
  return (
    <SectionShell background={block.background} narrow>
      <Testimonial variant={variant}>
        <TestimonialMark />
        <TestimonialQuote>
          <p>{block.quote}</p>
        </TestimonialQuote>
        <TestimonialAttribution>
          <TestimonialAvatar>{initialsOf(block.name ?? '')}</TestimonialAvatar>
          <TestimonialMeta>
            <TestimonialName>{block.name}</TestimonialName>
            {block.role ? <TestimonialRole>{block.role}</TestimonialRole> : null}
          </TestimonialMeta>
        </TestimonialAttribution>
      </Testimonial>
    </SectionShell>
  )
}
```

Before finalizing, read `src/components/ui/testimonial.tsx` and mirror its real variant prop type.

- [ ] **Step 2:** `blocks/faq.tsx` (DS Accordion `multiple`, first item open; answers are Portable Text):

```tsx
import { PortableText, stegaClean } from 'next-sanity'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { SectionHead } from '@/components/marketing'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

export function FaqBlock({ block }: { block: BlockOf<'faqBlock'> }) {
  const items = (block.items ?? []).filter((item) => item.question)
  if (items.length === 0) return null
  return (
    <SectionShell background={block.background} narrow>
      {block.heading ? (
        <SectionHead
          eyebrow={block.eyebrow ?? ''}
          title={block.heading}
          lede={block.lede}
          center={stegaClean(block.align) !== 'start'}
        />
      ) : null}
      <Accordion multiple defaultValue={[items[0]._key]}>
        {items.map((item) => (
          <AccordionItem key={item._key} value={item._key}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              {Array.isArray(item.answer) ? <PortableText value={item.answer} /> : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  )
}
```

- [ ] **Step 3:** `blocks/cta-banner.tsx`:

```tsx
import { stegaClean } from 'next-sanity'

import {
  Cta,
  CtaContent,
  CtaEyebrow,
  CtaTitle,
  CtaMessage,
  CtaActions,
} from '@/components/ui/cta'
import { ActionButton } from '../action-button'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

export function CtaBannerBlock({ block }: { block: BlockOf<'ctaBannerBlock'> }) {
  if (!block.heading) return null
  const tone = (stegaClean(block.tone) ?? 'primary') as 'primary' | 'default' | 'subtle'
  const layout = stegaClean(block.layout) === 'inline' ? 'default' : 'centered'
  return (
    <SectionShell background={block.background}>
      <Cta tone={tone} layout={layout}>
        <CtaContent>
          {block.eyebrow ? <CtaEyebrow>{block.eyebrow}</CtaEyebrow> : null}
          <CtaTitle>{block.heading}</CtaTitle>
          {block.message ? <CtaMessage>{block.message}</CtaMessage> : null}
        </CtaContent>
        <CtaActions>
          <ActionButton link={block.primaryAction} />
          <ActionButton link={block.secondaryAction} variant='ghost' />
        </CtaActions>
      </Cta>
    </SectionShell>
  )
}
```

- [ ] **Step 4:** Move the calculator and create `blocks/widget.tsx` with the widget registry:

```bash
git mv 'src/app/(frontend)/loans/home/repayment-calculator.tsx' src/components/page-builder/widgets/repayment-calculator.tsx
```

Update the import in `src/app/(frontend)/loans/home/page.tsx` to `@/components/page-builder/widgets/repayment-calculator`, then (react-compiler constraint: dynamic component from a map renders via `createElement`, never `const C = map[x]; <C/>`):

```tsx
import { createElement } from 'react'
import { stegaClean } from 'next-sanity'

import { SectionHead } from '@/components/marketing'
import { RepaymentCalculator } from '../widgets/repayment-calculator'
import { SectionShell } from '../section-shell'
import type { BlockOf } from '../types'

const WIDGETS: Record<string, React.ComponentType> = {
  repaymentCalculator: RepaymentCalculator,
}

export function WidgetBlock({ block }: { block: BlockOf<'widgetBlock'> }) {
  const widget = WIDGETS[stegaClean(block.widget) ?? '']
  if (!widget) return null
  return (
    <SectionShell background={block.background}>
      {block.heading ? (
        <SectionHead center eyebrow={block.eyebrow ?? ''} title={block.heading} lede={block.lede} />
      ) : null}
      {createElement(widget)}
    </SectionShell>
  )
}
```

(Check the calculator's named export when moving; if it exports default, adjust the import. The calculator is a client component using recharts 3.9.1 — it moves as-is; do not touch its chart code in this task.)

- [ ] **Step 5:** Add the four registry cases — the registry now covers all 14 types; remove nothing. Verify (real exit codes) `npx tsc --noEmit` and `npx eslint src/components/page-builder 'src/app/(frontend)/loans/home'`, each `> /tmp/pb-*.log 2>&1; EXIT=$?` — both `EXIT=0`.
- [ ] **Step 6:** Commit:

```bash
git add -A src/components/page-builder 'src/app/(frontend)/loans/home'
git commit -m 'feat(page-builder): testimonial, faq, cta, widget renderers; calculator becomes a widget'
```

- [ ] **Step 7 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' 'Renderer registry on DS components' complete 'Task 11 done: all 14 block renderers registered (Tasks 8-11)'`

---

## Phase 2 exit (initiative-level steps — not June tasks)

After Task 11, three initiative steps close Phase 2 (defined in the initiative spec §Phase 2; listed here so the hub ticks and the preview-route rule are unambiguous):

1. **All-blocks preview + behavioral probes.** Build a TEMPORARY preview route at `src/app/blocks-preview/page.tsx` — **app root, OUTSIDE the `(frontend)` route group** (`(frontend)/layout.tsx` renders the live Header/Footer and would double-render; learned on the navbar build). Do NOT use an underscore-prefixed folder — those are unroutable private folders in Next.js. The route renders all 14 blocks with fixture props through the real registry; Playwright probes (`.agents/`, untracked) verify accordion toggling, calculator interactivity, and band variants. Hub tick on pass: `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P2 Universal Page Builder' 'All-blocks preview + behavioral probes' complete '...'`. The route is deleted in Task 15 (preview-route cleanup).
2. **Authoring dry-run (insert-menu-only script).** A scripted Studio walkthrough assembling a page using only the insert menu (spec §7.2). Hub tick: `'Authoring dry-run (insert-menu-only script)' complete`.
3. **Gate 3.** User reviews the all-blocks preview; approval unlocks Phase 3. Hub tick: `'Gate 3: all-blocks preview approved' complete` — only after explicit user approval.

---

# INITIATIVE PHASE 3 (execute only after Gate 3 approval)

---

## Task 12: Baseline screenshots of the hand-coded pages

**Files:**
- Create: `.agents/parity-shot.mjs` (untracked — `.agents/` is never committed)

- [ ] **Step 1:** Write the script following the established pattern (`.agents/billpay-shot.mjs`): Playwright chromium, desktop 1440×900 + mobile 390×844, scroll-through loop to trigger BlurFade/IntersectionObserver entrances, fullPage PNGs. Parameterize: `node .agents/parity-shot.mjs <urlPath> <outPrefix>`.
- [ ] **Step 2:** With the dev server on :3001 (Preview MCP config `fcu3001`), capture the three baselines:

```
node .agents/parity-shot.mjs /                 .agents/baseline-home
node .agents/parity-shot.mjs /accounts/everyday .agents/baseline-everyday
node .agents/parity-shot.mjs /loans/home        .agents/baseline-homeloan
```

Expected: six PNGs in `.agents/`. No commit (untracked tooling).

- [ ] **Step 3 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P3 Recipes & CMS Takeover' 'Pixel-check drafts vs Figma recipes (draft-mode preview)' in_progress 'Task 12 done: 6 baseline screenshots captured'`

---

## Task 13: Seed the three pages as Sanity content

**Files:**
- Create: `scripts/seed-marketing-pages.mjs`
- Modify: `package.json` (add script `"seed:pages": "node --env-file=.env.local scripts/seed-marketing-pages.mjs"`)

- [ ] **Step 1:** Script skeleton — `@sanity/client` (7.23.0) with the write token, idempotent asset upload by `originalFilename`, `createOrReplace` for documents, then patch `siteSettings.homepage`:

```javascript
import { readFileSync, createReadStream } from 'node:fs'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'c8w93txa',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const key = (() => {
  let n = 0
  return (prefix) => `${prefix}-${(n++).toString(36)}`
})()

async function uploadImage(filename) {
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $fn][0]._id',
    { fn: filename }
  )
  if (existing) return existing
  const asset = await client.assets.upload(
    'image',
    createReadStream(`illustrations/${filename}`),
    { filename }
  )
  return asset._id
}

function img(assetId, alt) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId }, alt }
}

function btn(label, url) {
  return { _type: 'buttonLink', label, linkType: 'internal', url, openInNewTab: false }
}

function richText(text) {
  return [
    {
      _type: 'block',
      _key: key('rt'),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: key('sp'), text, marks: [] }],
    },
  ]
}
```

Note: the `illustrations/` source directory sits at the repo root; confirm each filename with `ls illustrations` before referencing (known set includes `online-banking.png`, `everyday-account.png`, `home-loan.png`, `car-loan.png`, `kids-account.png`, `debt-consolidation.png`, `travel-account.png`, `community.png`, `bill-pay.png`). If a file exists only under `public/illustrations/`, read it from there instead.

- [ ] **Step 2:** Build the **home** document. Copy is transcribed verbatim from `src/app/(frontend)/page.tsx` (kept intact until Task 14). Block sequence:

```javascript
const home = {
  _id: 'page-home',
  _type: 'page',
  title: 'Banking that belongs to you',
  slug: { _type: 'slug', current: 'home' },
  seo: {
    _type: 'seo',
    title: 'Banking that belongs to you',
    description:
      'First Credit Union is owned by our members across Aotearoa — fairer rates, no monthly fees, and profits that return to the community.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _type: 'heroBlock', _key: key('b'),
      eyebrow: 'Owned by members, not shareholders',
      heading: 'Banking that belongs to you.',
      lede: '…(verbatim from page.tsx)…',
      emphasis: 'standard',
      image: img(ids['online-banking.png'], 'A small-business owner with a tray of baking and a person on a laptop, celebrating their growth.'),
      meta: [
        { _type: 'statItem', _key: key('m'), value: '52,000+', label: 'members nationwide' },
        { _type: 'statItem', _key: key('m'), value: '4.85%', unit: 'p.a.', label: 'top saver rate' },
        { _type: 'statItem', _key: key('m'), value: '$0', label: 'monthly account fees' },
      ],
      primaryAction: btn('Become a member', '#'),
      secondaryAction: btn('Explore accounts', '/accounts/everyday'),
    },
    { _type: 'productTileGridBlock', _key: key('b'), background: 'soft',
      eyebrow: 'Everyday banking', heading: 'Accounts and loans for real life.',
      lede: '…(verbatim)…',
      items: [ /* 6 productTile objects — kicker/title/description/url verbatim; image via ids map */ ] },
    { _type: 'featureGridBlock', _key: key('b'), align: 'center',
      eyebrow: 'Why First Credit Union', heading: 'The difference is who we answer to.',
      items: [ /* 6 featureItem objects with semantic icons: members, rates, location, mobile, support, institution */ ] },
    { _type: 'splitBlock', _key: key('b'), background: 'soft', imageSide: 'left',
      eyebrow: 'Community', heading: 'Profit with a purpose.', lede: '…(verbatim)…',
      image: img(ids['community.png'], 'Three people planting and tending seedlings together in their community.'),
      stats: [
        { _type: 'statItem', _key: key('m'), value: '$2.4m', label: 'Returned to members & community', note: 'in the past year' },
        { _type: 'statItem', _key: key('m'), value: '180+', label: 'Local grants funded', note: 'since 2020' },
      ],
      action: btn('See our community impact', '#') },
    { _type: 'testimonialBlock', _key: key('b'), variant: 'featured',
      quote: '…(verbatim)…', name: 'Mereana Te Awa', role: 'Member since 2018 · Tāmaki Makaurau' },
    { _type: 'ctaBannerBlock', _key: key('b'), background: 'sunken', tone: 'primary', layout: 'centered',
      eyebrow: 'Three minutes to join', heading: 'Ready to bank with people, not shareholders?',
      message: '…(verbatim)…',
      primaryAction: btn('Become a member', '#'), secondaryAction: btn('Talk to us first', '#') },
  ],
}
```

Every `…(verbatim)…` and items array MUST be transcribed word-for-word from the source page file — open it and copy. No paraphrasing (parity screenshots will catch drift). Note the testimonial quote contains an `<em>` segment in the original; seed it as plain text (accepted minor loss) — flag in the Task 15 parity notes.

- [ ] **Step 3:** Build **accounts/everyday** (`_id: 'product-page-everyday'`, `_type: 'productPage'`, `productType: 'everyday-account'`, slug `accounts/everyday`) from `src/app/(frontend)/accounts/everyday/page.tsx`:

| Source section | Block | Fields |
|---|---|---|
| Hero (compact, breadcrumb auto) | `heroBlock` | emphasis `compact`; eyebrow/heading/lede/meta (3 statItems: `$0` monthly fees, `~3 min` to open, `Instant` FCU transfers)/actions verbatim; image `everyday-account.png` |
| "What's included" feature grid | `featureGridBlock` | background `soft`; 6 items, semantic icons: card, payments, time, alerts, rates, insights |
| Rates split (illustration right) | `splitBlock` | imageSide `right`; image `bill-pay.png`; eyebrow `Rates & fees`; heading/lede verbatim; rows = the 5 `RATES` entries (term→label, value→value); footnote verbatim |
| "Pairs well with" tiles | `productTileGridBlock` | background `soft`; 3 tiles verbatim |
| CTA (side-by-side) | `ctaBannerBlock` | tone `primary`, layout `inline`; eyebrow/heading/message/actions verbatim |

- [ ] **Step 4:** Build **loans/home** (`_id: 'product-page-home-loan'`, `_type: 'productPage'`, `productType: 'home-loan'`, slug `loans/home`) from `src/app/(frontend)/loans/home/page.tsx`:

| Source section | Block | Fields |
|---|---|---|
| Hero (compact) | `heroBlock` | meta: `6.45%` + unit `p.a.` / `$0` application fee / `Local` lending team; image `home-loan.png`; rest verbatim |
| Repayment calculator | `widgetBlock` | background `soft`; widget `repaymentCalculator`; center head: eyebrow `Repayment estimator`, heading + lede verbatim |
| "How it works" stepper | `stepsBlock` | head: eyebrow `How it works`, heading `From first chat to keys in hand.`; items = the 4 `STEPS` verbatim |
| "Why borrow with us" split | `splitBlock` | background `soft`; image `debt-consolidation.png`; checklist = the 4 ChecklistItems (title + detail) verbatim |
| FAQ | `faqBlock` | align `center`; eyebrow `Good to know`, heading verbatim; 4 faqItems — answers via `richText()` with the bold segments seeded as separate spans with `marks: ['strong']` |
| Apply CTA | `ctaBannerBlock` | background `soft`; tone `primary`, layout `centered`; verbatim |

- [ ] **Step 5:** Finish the script: `createOrReplace` all three docs in one transaction, then
`client.patch('siteSettings').set({ homepage: { _type: 'reference', _ref: 'page-home' } }).commit()`,
log created ids. Run it:

```bash
npm run seed:pages > /tmp/pb-seed.log 2>&1; EXIT=$?; echo "seed EXIT=$EXIT"
```

Expected: `EXIT=0`; log shows three document ids + homepage patched.

- [ ] **Step 6:** Verify via GROQ (PowerShell, read token from `.env.local` — never print it):

```
count(*[_type in ["page","productPage"]]) == 3
*[_id == "siteSettings"][0].homepage._ref == "page-home"
```

- [ ] **Step 7:** Commit:

```bash
git add scripts/seed-marketing-pages.mjs package.json
git commit -m 'feat(content): seed homepage, everyday account, and home loan pages'
```

- [ ] **Step 8 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P3 Recipes & CMS Takeover' 'Seed 3 recipe drafts (Home / Everyday / Home Loan)' complete 'Task 13 done: page-home + product-page-everyday + product-page-home-loan seeded, homepage assigned'`

---

## Task 14: Routing swap (root + catch-all), retire hand-coded routes

**Files:**
- Modify: `src/app/(frontend)/page.tsx` (full rewrite)
- Modify: `src/app/(frontend)/[...slug]/page.tsx` (full rewrite)
- Delete: `src/app/(frontend)/accounts/everyday/page.tsx`, `src/app/(frontend)/loans/home/page.tsx` (and the now-empty dirs)

Per the initiative's publish-before-swap rule: the Home publish is the launch go-ahead — get explicit user approval on the seeded Home draft before executing this task's Step 1.

- [ ] **Step 1:** Root `page.tsx` (next-sanity 13 `sanityFetch` — no `tag` option is used anywhere in this plan, so the v13 `requestTag` rename does not affect it):

```tsx
import { sanityFetch } from '@/sanity/lib/live'
import { HOMEPAGE_SLUG_QUERY, PAGE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { PageBuilder } from '@/components/page-builder/page-builder'
import { ComingSoon } from '@/components/coming-soon'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const { data: slug } = await sanityFetch({ query: HOMEPAGE_SLUG_QUERY })
  if (!slug) return { title: 'Coming Soon' }
  const { data: page } = await sanityFetch({ query: PAGE_BY_SLUG_QUERY, params: { slug } })
  return {
    title: page?.seo?.title || page?.title || 'First Credit Union',
    description: page?.seo?.description || undefined,
    robots: page?.seo?.noIndex ? 'noindex, nofollow' : undefined,
  }
}

export default async function HomePage() {
  const { data: slug } = await sanityFetch({ query: HOMEPAGE_SLUG_QUERY })
  const { data: page } = slug
    ? await sanityFetch({ query: PAGE_BY_SLUG_QUERY, params: { slug } })
    : { data: null }
  if (!page?.pageBuilder?.length) return <ComingSoon title='Coming Soon' />
  return (
    <main id='main'>
      <PageBuilder blocks={page.pageBuilder} />
    </main>
  )
}
```

- [ ] **Step 2:** `[...slug]/page.tsx` — Sanity page with auto-breadcrumbs (DS Breadcrumb, same markup as the deleted hand-coded pages), ComingSoon fallback:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'

import { ComingSoon } from '@/components/coming-soon'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { PageBuilder } from '@/components/page-builder/page-builder'
import { Wrap } from '@/components/marketing'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Props = { params: Promise<{ slug: string[] }> }

function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const slugPath = slug.join('/')
  const { data: page } = await sanityFetch({
    query: PAGE_BY_SLUG_QUERY,
    params: { slug: slugPath },
  })
  if (!page) return { title: formatSegment(slug[slug.length - 1]) }
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || undefined,
    robots: page.seo?.noIndex ? 'noindex, nofollow' : undefined,
  }
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params
  const slugPath = slug.join('/')
  const { data: page } = await sanityFetch({
    query: PAGE_BY_SLUG_QUERY,
    params: { slug: slugPath },
  })

  const crumbs = slug.slice(0, -1).map((segment, index) => ({
    label: formatSegment(segment),
    href: '/' + slug.slice(0, index + 1).join('/'),
  }))

  if (!page?.pageBuilder?.length) {
    return (
      <ComingSoon
        title={formatSegment(slug[slug.length - 1])}
        breadcrumbs={[...crumbs, { label: formatSegment(slug[slug.length - 1]), href: '/' + slugPath }]}
      />
    )
  }

  return (
    <main id='main'>
      <Wrap className='pt-4'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href='/' />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.map((crumb) => (
              <BreadcrumbItem key={crumb.href}>
                <BreadcrumbSeparator />
                <BreadcrumbLink render={<Link href={crumb.href} />}>{crumb.label}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{page.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Wrap>
      <PageBuilder blocks={page.pageBuilder} />
    </main>
  )
}
```

(Match the hand-coded breadcrumb structure exactly — separators as siblings inside the list; check `breadcrumb.tsx` if the Item/Separator nesting differs.)

- [ ] **Step 3:** Delete the two hand-coded routes:

```bash
git rm 'src/app/(frontend)/accounts/everyday/page.tsx' 'src/app/(frontend)/loans/home/page.tsx'
```

- [ ] **Step 4:** Verify (real exit codes): `npx tsc --noEmit` and `npm run lint`, each `> /tmp/pb-*.log 2>&1; EXIT=$?` — both `EXIT=0`. With the dev server running, all three URLs return 200 **and** contain their hero headline text (PowerShell `Invoke-WebRequest` + content match on `/`, `/accounts/everyday`, `/loans/home`). Also check an unknown path (e.g. `/branches`) still renders ComingSoon with 200 — record the observed behavior; it is the input to the initiative's catch-all 404 decision (hub task 'Sitemap extension + 301 redirects + catch-all 404 decision', which stays with the initiative's sitemap/redirects step, not this plan).
- [ ] **Step 5:** Commit:

```bash
git add -A 'src/app/(frontend)'
git commit -m 'feat(routes): serve homepage and pages from Sanity, retire hand-coded marketing routes'
```

- [ ] **Step 6 (hub tick):** two updates — `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P3 Recipes & CMS Takeover' 'Publish-before-swap per page (Home publish = launch go-ahead)' complete 'Task 14 done: Sanity routes live for /, /accounts/everyday, /loans/home; hand-coded routes retired'` and `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P3 Recipes & CMS Takeover' 'Sitemap extension + 301 redirects + catch-all 404 decision' in_progress 'Task 14 Step 4: unknown-path behavior recorded (ComingSoon 200); sitemap/redirects decision pending at initiative step'`

---

## Task 15: Visual parity + dataset cleanup

**Files:** renderer fixes as needed; no new files committed

- [ ] **Step 1:** Re-run the Task 12 script against the SAME three URLs (now Sanity-rendered) with `sanity-` prefixes. Open each baseline/sanity pair and compare section-by-section (band backgrounds, spacing, type scale, icons, button variants, breadcrumbs, calculator presence).
- [ ] **Step 2:** Fix renderer (not content) diffs; re-shoot until equivalent. Known accepted deltas: testimonial `<em>` styling; hero illustration art direction (3:2 source preserved).
- [ ] **Step 3:** Console check: run the established console-capture pattern (`.agents/billpay-console.mjs` adapted to the three URLs). Expected: zero NEW errors/warnings from page code (pre-existing environmental noise: Intercom, Clerk dev keys, fcu-logo warning, a11y-dev init).
- [ ] **Step 4:** Presentation smoke test: open `http://localhost:3001/studio`, Presentation tool → the homepage document → confirm overlays appear and a text edit live-updates.
- [ ] **Step 5:** Dataset cleanup — delete the two orphaned legacy docs (PowerShell, token from `.env.local`):

```
ids = *[_type in ["homePage","sitemapPage"]]._id
POST https://c8w93txa.api.sanity.io/v2025-01-01/data/mutate/production
body: { "mutations": ids.map(id => ({ "delete": { "id": id } })) }
```

Verify `count(*[_type in ["homePage","sitemapPage"]]) == 0`.

- [ ] **Step 6:** Preview-route cleanup — delete the temporary Phase-2 route `src/app/blocks-preview/` (if it still exists) and its fixtures; commit the removal.
- [ ] **Step 7:** Commit any parity fixes: `git add src/components/page-builder && git commit -m 'fix(page-builder): visual parity adjustments against hand-coded baselines'` (skip if no diffs).
- [ ] **Step 8 (hub tick):** two updates — `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P3 Recipes & CMS Takeover' 'Pixel-check drafts vs Figma recipes (draft-mode preview)' complete 'Task 15 done: parity confirmed vs baselines (Tasks 12+15); accepted deltas noted'` and `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P3 Recipes & CMS Takeover' 'Retire loanProductPage + orphan checks + preview-route cleanup' complete 'Task 15 done: loanProductPage retired in Task 1; homePage/sitemapPage orphans deleted; blocks-preview route removed'`

---

## Task 16: Final gate + ship

- [ ] **Step 1:** Full verification (real exit codes):

```bash
npm run typegen > /tmp/pb-typegen.log 2>&1; EXIT=$?; echo "typegen EXIT=$EXIT"
npx tsc --noEmit > /tmp/pb-tsc.log 2>&1; EXIT=$?; echo "tsc EXIT=$EXIT"
npm run lint > /tmp/pb-lint.log 2>&1; EXIT=$?; echo "lint EXIT=$EXIT"
npx vitest run > /tmp/pb-vitest.log 2>&1; EXIT=$?; echo "vitest EXIT=$EXIT"
npm run build > /tmp/pb-build.log 2>&1; EXIT=$?; echo "build EXIT=$EXIT"
```

Expected: all print `EXIT=0`; build log shows `/` and `[...slug]` compiled, no type errors.

- [ ] **Step 2:** Studio sanity check: `/studio` → Pages list shows Home; Product Pages shows the two products; insert menu shows the five groups with grid thumbnails (committed at `53073fc`).
- [ ] **Step 3:** Ship (the established flow):

```bash
git checkout main
git merge --ff-only feat/page-builder
gh auth switch --user firstcreditunion
git push origin main
git branch -d feat/page-builder
```

- [ ] **Step 4:** Acceptance read-back against the spec §7 — confirm all four criteria, with screenshots for the user. Per-page approvals per the initiative's Gate 4.
- [ ] **Step 5 (hub tick):** `node --env-file=.env.local .agents/hub-tick.mjs 'Figma Initiative · P3 Recipes & CMS Takeover' 'Gate 4: per-page approvals complete' complete 'Task 16 done: full gate green, shipped to main, per-page approvals read back'` — run only AFTER the user has approved each page.

---

## Self-review notes (kept honest)

- Spec §7.2 ("marketing can assemble from the insert menu alone") is exercised by the Phase-2 authoring dry-run (initiative step) and Task 16 Step 2, plus the field descriptions written throughout Tasks 2–6.
- Spec §6 visual-editing locations: Task 6 Step 4. Per-block presentation queries: explicitly out of scope (spec §9).
- The `…(verbatim)…` markers in Task 13 are **transcription instructions pointing at exact source files**, not design placeholders — the copy already exists in-repo and parity screenshots enforce fidelity.
- The June plan's task numbering (0–16) is preserved exactly; only phase headings, gates, hub ticks, and the delta items below were layered on.

---

## Delta log (2026-07-02 refresh — every checklist item applied or N/A)

1. **Header block + initiative spec reference — APPLIED.** Header keeps the June goal verbatim and the same 14 block `_type` names; now references `docs/superpowers/specs/2026-07-02-figma-to-project-initiative-design.md`, the Phase-0 audit, and states that the June file is untouched. Precondition changed from "Track 1 sign-off" to "Gate 1 sign-off" (the initiative's renaming of the same gate).
2. **Re-sequencing — APPLIED.** June Tasks 0–11 sit under "# INITIATIVE PHASE 2 (execute after Gate 1)" in original order; Tasks 12–16 under "# INITIATIVE PHASE 3 (execute only after Gate 3 approval)". Task 1 stays first (after the Task 0 branch step) and gained precondition Step 0 with the census verdict: CLEAN DELETE per audit §3, verified 2026-07-02, zero loanProductPage/disclaimerSnippet documents incl. drafts, re-verify count is still 0 if re-run later. All 17 task headings (Task 0–Task 16) appear exactly once. A non-task "Phase 2 exit" section was added between the phases to host the three initiative-level steps (all-blocks preview, authoring dry-run, Gate 3) that the hub tracks but the June plan never numbered. Minor pointer fix: June Task 1 Step 3 said the ComingSoon downgrade was "temporary until Task 12"; the `[...slug]` rewrite actually happens in Task 14, so the pointer now says Task 14.
3. **Sanity v6 / next-sanity 13 — APPLIED.** Tech-stack line updated from "sanity v5" to sanity 6.3.0 / next-sanity 13.1.1 / @sanity/client 7.23.0. API audit of everything the plan uses: `defineQuery`, `defineLive`, `sanityFetch`, `stegaClean`, `PortableText`, `defineType`/`defineField`/`defineArrayMember`, `defineLocations` — all still exist in the installed versions. The plan never passes the renamed `tag` option to `sanityFetch`/`SanityLive` (would now be `requestTag`) and never uses the removed `defineLive` options (`stega`/`fetchOptions`/`intervalOnGoAway`), so no code fixes were required — a note to that effect was added at Task 14 Step 1.
4. **React-compiler lint rules — APPLIED.** Added as plan-wide conventions and as an explicit constraint block at the top of Task 8 (the renderer-registry task): no impure calls in render (incl. server components), no setState inside useEffect bodies (useSyncExternalStore for external stores), and no components created during render. Two June snippets violated rule 3 and were fixed: Task 11 `WidgetBlock` (`const Widget = WIDGETS[...]; <Widget/>` → `createElement(widget)`) and Task 10 `FeatureGridBlock` (`const Icon = ICONS[...]; <Icon/>` inside the map → `createElement(BLOCK_ICONS[...] ?? FALLBACK_BLOCK_ICON)`). The Task 8 switch registry already used module-level component references — kept, marked compliant.
5. **Semantic icon keys — APPLIED.** Task 2 Step 5's `featureItem.icon` options list previously used lucide asset names (`users`, `dollar-sign`, `map-pin`, `smartphone`, `life-buoy`, `landmark`, `credit-card`, `send`, `clock`, `bell`, `pie-chart`, `shield-check`, `wallet`, `percent`, `home`, `sparkles`); it now uses the 11 semantic meaning keys `members/rates/location/mobile/support/institution/card/payments/time/alerts/insights` mapped 1:1 to the kit's curated icons (Users, DollarSign, MapPin, Smartphone, LifeBuoy, Landmark, CreditCard, Send, Clock, Bell, PieChart). The 5 non-curated June options (shield-check, wallet, percent, home, sparkles) are dropped per the spec's 11-icon rule; `initialValue` changed `sparkles` → `members`. The renderer owns the meaning→lucide mapping in the new `src/components/page-builder/block-icons.ts` (Task 10), modeled on the navbar's `nav-icons.ts`. Task 13's seed icon lists were updated to the semantic keys (home: members/rates/location/mobile/support/institution; everyday: card/payments/time/alerts/rates/insights). The navbar's shipped `link.icon` keys are explicitly left untouched.
6. **Preview route placement — APPLIED.** The June plan had no preview-route task, so the rule is codified as a convention plus the "Phase 2 exit" section: any temporary preview route lives at `src/app/blocks-preview/page.tsx` (app root, outside the `(frontend)` group whose layout renders the live Header/Footer — double-render risk), and underscore-prefixed folders are banned for routes (they are unroutable private folders). Cleanup added as Task 15 Step 6.
7. **Thumbnails committed — APPLIED.** All conditional "if thumbnails exist" language removed: the header precondition, Task 5 Step 5 (the `views` grid config now ships unconditionally, noting commit `53073fc`), the Task 5 commit message, and Task 16 Step 2 ("+ thumbnails if Track 1 exported them" → "with grid thumbnails, committed at 53073fc").
8. **Header/Footer untouchable + resolve.locations — APPLIED.** New convention: Header/Footer are untouchable (rebuilt navbar shipped 2026-07-02). The locations changes were already correct in June (Task 1 drops `loanProductPage` and the stray `post` type; Task 6 adds `page` + `productPage`); Task 6 Step 4 now states the net result explicitly.
9. **[...slug] interim behavior — APPLIED (no change needed).** Task 1 Step 3 now records that the ComingSoon-only downgrade during Phase 2 is acceptable as-is, citing the census (zero real loan pages exist to break).
10. **Real exit codes in gates — APPLIED.** Every verification step now uses `cmd > /tmp/x 2>&1; EXIT=$?` (no piping to tail/head), and schema tasks (0–7, 16) gate on typegen → tsc → lint → vitest (vitest was added to the repo with the Project Hub work; the June "no unit-test framework" note is superseded). Renderer tasks (8–11) gate tsc + eslint with the same pattern; Task 13's seed run and Task 16's build also capture real exit codes.
11. **Hub ticks — APPLIED.** Every task (0–16) ends with a hub-tick step. Canonical recipe added to conventions: `.agents/hub-tick.mjs` (untracked) using `@supabase/supabase-js` `createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, { db: { schema: 'api' } })` from `.env.local`, updating `api.pt_tasks` (matched via `pt_task_groups.name` + task `name`) with `status`/`notes` + `updated_by_id='user_3ArZtSswVUVOky8mIUXr3kZDCOE'`/`updated_by_name='isaac.vicliph@firstcu.co.nz'`, never setting `updated_at`. Full mapping table added (all 13 hub task names verbatim, both groups). Multi-contributor ticks: '14 block schemas…' completes at Task 7; 'Insert menu…' at Task 6; 'Renderer registry…' at Task 11; 'Pixel-check…' at Task 15; 'Retire loanProductPage…' at Task 15; 'Legacy loanPageBuilder deletion…' at Task 1; 'Seed 3 recipe drafts' at Task 13; 'Publish-before-swap…' at Task 14; 'Gate 4' at Task 16. Three hub tasks ('All-blocks preview + behavioral probes', 'Authoring dry-run (insert-menu-only script)', 'Gate 3: all-blocks preview approved') have no June contributor — they tick at the initiative-level Phase 2 exit steps, documented in that section. 'Sitemap extension + 301 redirects + catch-all 404 decision' is informed by Task 14 Step 4 but ticks at the initiative's own sitemap/redirects step.
12. **Dep majors — APPLIED (mostly N/A).** lucide-react: Task 10's June imports used the `UsersIcon`-suffix style; updated to the plain lucide-react 1.22 export names (`Users`, `DollarSign`, `PieChart`, …) matching the shipped `nav-icons.ts`, inside the new `block-icons.ts`. recharts: the plan's only contact is the repayment calculator moved verbatim in Task 11 — it already runs on recharts 3.9.1 in-repo; a "do not touch its chart code" note added; no plan text referenced recharts APIs → otherwise N/A. react-day-picker: no references anywhere in the June plan → N/A.

**Self-check (run before finishing):** no "sanity v5" outside this log; no `revalidateSyncTags` anywhere; no `tag:` option on any `sanityFetch` call; no underscore-prefixed route paths (the underscore-folder mentions are the ban itself); no lucide asset names inside schema `options.list` values (the only icon options list uses semantic keys; `@sanity/icons` imports and the renderer-side lucide imports are not schema options). All 17 June task headings appear exactly once.
