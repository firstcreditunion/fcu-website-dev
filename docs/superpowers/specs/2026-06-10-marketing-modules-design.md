# FCU Marketing Modules — Figma kit + Sanity page builder

**Date:** 2026-06-10
**Status:** Approved (design); implementation plan to follow
**Owner:** Isaac (engineering) with FCU marketing as the authoring stakeholder

## 1. Purpose

Make the FCU marketing site authorable by marketing. One module vocabulary, mirrored across
three systems: a **Figma component kit** (design source of truth), a **Sanity block library +
page builder** (authoring), and **React renderers built on the existing design system**
(delivery). v1 finishes when the three hand-coded pages — `/`, `/accounts/everyday`,
`/loans/home` — are recreated as Sanity content rendered by the new builder.

## 2. Decisions (locked during brainstorm)

| Decision | Choice |
|---|---|
| Document model | Hybrid: universal block library; `page` (free composition) + `productPage` (same builder + product taxonomy fields) |
| Product facts (rates/fees/key numbers) | **Embedded per page** in blocks — no central product/rate documents in v1. Revisit via the deprecation pattern only if drift becomes a real problem. |
| Rollout | Recreate all three hand-coded pages as Sanity content; retire the hand-coded routes after visual parity is verified |
| Sequencing | **Figma first**: build and sign off the Figma kit before the Sanity/render tracks |
| Figma scope | **Marketing modules kit** (~14-15 components + tokens + foundations docs), not the full ~36-component DS |
| Block set size | Lean v1: **14 blocks** — the 12 from the brainstorm plus `stepsBlock` and `widgetBlock`, discovered during plan-writing because `/loans/home` uses the DS `Stepper` and an interactive repayment calculator (parity requires them). Charts/timeline/carousel deferred — additive later, no migrations |

## 3. Module registry (the spine)

One module = one name in all three systems.

| Module | Figma component | Sanity block | React renderer (built on DS) |
|---|---|---|---|
| Hero | `Hero` | `heroBlock` | `Hero` (marketing) |
| Section heading | `SectionHead` | `sectionHeadingBlock` | `SectionHead` |
| Product tile grid | `ProductTile` | `productTileGridBlock` | `ProductTile` grid |
| Feature grid | `FeatureItem` | `featureGridBlock` | `FeatureItem` grid |
| Split | `Split` | `splitBlock` | `Split` + Checklist/Stat/Button slots |
| Stat band | `Stat`/`StatRow` | `statBandBlock` | `StatRow divided`, 2-col copy+stats |
| Testimonial | `Testimonial` | `testimonialBlock` | `Testimonial` |
| FAQ | `Accordion` | `faqBlock` | `Accordion` |
| Rates & fees | `DescriptionList` | `ratesFeesBlock` | `DescriptionList` + `Badge` |
| Rich text | — (type styles) | `richTextBlock` | Portable Text components |
| Notice | `Alert` | `noticeBlock` | `Alert` (info/warning/legal tones) |
| CTA banner | `Cta` | `ctaBannerBlock` | `Cta` |
| Steps | `Stepper` | `stepsBlock` | `Stepper` |
| Widget | — (placeholder frame) | `widgetBlock` | Curated widget registry (v1: `repaymentCalculator`) |

Atoms consumed by the modules (also in the Figma kit): `Button`, `Badge`, `Checklist`.

Registry amendments discovered during plan-writing (target-page parity):
- `splitBlock` carries optional content slots — `checklist[]`, key-value `rows[]` (+ `footnote`),
  stat cards `stats[]`, and an `action` button — because all three Split usages on the target
  pages embed one of these (home-loan: checklist; everyday: rates rows + footnote; homepage:
  stat cards + action).
- `faqItem.answer` upgrades from plain text to minimal rich text (strong/em/link) — home-loan
  FAQ answers use bold.
- Hero `meta` items are `{ value, unit?, label }` so "6.45% p.a." renders with the muted unit
  suffix.
- Breadcrumbs are **not a block**: the route derives them from slug segments on every
  non-homepage page, matching the hand-coded pages.

## 4. Track 1 — Figma kit (first)

New Figma design file **"FCU Design System"** inside the user's Figma project
**"First Credit Union Website"** (project URL to be provided at execution; planKey
`team::1245546878752354318`). Built with the `figma-generate-library` phased workflow —
explicit user checkpoint at each phase boundary and per component; `figma-use` loaded for
every `use_figma` call; state ledger maintained for resumability.

- **F0 Discovery.** Codebase analysis complete (tokens in `src/app/globals.css`; component
  APIs in `src/components/ui` + `src/components/marketing`). Inspect the new file,
  `get_libraries` + `search_design_system` sweep, then lock scope (registry above + token
  set). **Checkpoint.**
- **F1 Foundations.** Variable collections mirroring `globals.css`:
  - `Primitives` (1 mode): FCU ramps (`fcu-primary/secondary/mint 50–950`), neutrals,
    status ramps, spacing scale, radius scale.
  - `Semantic` (Light + Dark modes): background/surface*/foreground*/primary*/border*/
    status*/card/ring — aliased to primitives, matching `:root` and `.dark` maps.
  - Every variable scoped (never `ALL_SCOPES`); WEB code syntax `var(--…)` matching the
    real CSS variable names. Text styles (display → caption + mono eyebrow) and effect
    styles (shadow-xs/sm/md/lg, focus). **Checkpoint.**
- **F2 File structure.** Cover → Getting Started → Foundations docs (color swatches, type
  specimens, spacing bars) → `---` → one page per component → `---` → **Page Recipes**
  (the three target pages assembled from kit components — marketing's preview of the page
  builder output). **Checkpoint.**
- **F3 Components.** One at a time, atoms first (Button, Badge), variants bound to
  variables only, INSTANCE_SWAP for icons, variant matrices capped, screenshot +
  sign-off per component. **Checkpoint each.**
- **F4 QA + publish.** Naming/binding/contrast audit; publish as team library. Code
  Connect proper is Organization/Enterprise-gated (team is Pro): instead, every Figma
  component description carries its React import path + Sanity block name (readable by
  `get_design_context`; upgradeable to real Code Connect later).

## 5. Track 2 — Sanity content model

### Documents
- **`page`** — title, full-path slug (e.g. `accounts/everyday`), `pageBuilder` (universal
  array), `seo`. No custom status field — native draft/publish is the workflow.
- **`productPage`** — same fields + `productType` (account/loan taxonomy carried over from
  `loanProductPage`). Thin by design: taxonomy for related-product queries/breadcrumbs and
  a curated insert menu; product facts stay embedded in blocks per the data decision.
- **Homepage assignment** — `siteSettings.homepage` → `reference` to `page`; the root route
  renders whatever it points at.
- **Kept** — `disclaimerSnippet` (the one sanctioned reference target — shared compliance
  text used by `noticeBlock`), `siteSettings`, `headerNavigation`, `footerNavigation`.
- **Untouched (out of scope)** — `designTokens`, `componentConfig`, `designSystemUser`.

### Blocks
All 14 are objects (`defineType`/`defineField`/`defineArrayMember`), each with an
`@sanity/icons` icon, a non-engineer-friendly preview (title + block-name subtitle +
media/icon fallback), and an insert-menu group: Structure / Content / Social proof /
Conversion / Compliance.

Modeling rules:
- Meaning-first fields: `tone`, `emphasis`, `align: start|center` — never colors, sizes,
  or column counts that fail the redesign test.
- Full-section blocks (all except `heroBlock`, which has its own panel treatment, and
  `noticeBlock`, which is inline) get one constrained `background: default | soft | sunken`
  field for page band rhythm (maps to `Section` variants `default | surface | sunken`).
- Heading levels are computed by the renderer (first hero → `h1`), never stored.
- Reuse existing objects: `buttonLink`, `faqItem`, `keyValueRow`, `featureItem`; new
  `productTile` object. Feature icons: curated lucide-name list (dropdown); renderer maps
  name → icon component.
- Validation: required headings with max lengths, min/max on arrays, alt text required on
  images.

### Lifecycle
- The loan builder (`loanPageBuilder`, its 11 blocks, `loanProductPage`, and the legacy
  renderer `src/components/loan-page-builder/`) is **absorbed and deleted outright** —
  the dataset has zero loan documents, so no deprecation cycle is needed.
- The two orphaned legacy documents (`homePage`, `sitemapPage` — types no longer in the
  schema) are deleted from the dataset.

## 6. Track 3 — Renderer + integration

- **`src/components/page-builder/`** — `PageBuilder.tsx` registry (`_type` → renderer,
  `_key` as React key, semantic heading logic) + one file per block renderer, each built
  strictly on DS components. `stegaClean` on every enum that drives rendering logic.
- **Queries** — `PAGE_BY_SLUG_QUERY`, `HOMEPAGE_QUERY` via `defineQuery`; explicit
  `_key`/`_type` projections; reference expansion only for `noticeBlock.sharedDisclaimer`.
  Typegen (`npm run typegen` via predev/prebuild) → `Extract<>` block prop types.
- **Routing** — root `page.tsx` fetches `siteSettings.homepage`; `[...slug]` resolves
  `page`/`productPage` by slug; ComingSoon remains the fallback. Hand-coded routes for the
  three pages are deleted after parity verification.
- **Images** — Sanity image assets (hotspot on, alt required) via `urlFor` + `next/image`
  with LQIP. Relevant `/illustrations` PNGs uploaded to Sanity as the starter asset
  library.
- **Visual editing** — existing Live Content API + Presentation + draft-mode stack; add
  `page`/`productPage` locations in `src/sanity/presentation/resolve.ts`; remove the stale
  `post` location. Per-block presentation queries are a v1.1 optimization.
- **Seeding** — a script using `SANITY_API_WRITE_TOKEN` creates the three pages as content
  (incl. image asset uploads), modeled on the existing (never-run) seed pattern.
- **Studio** — `structure.ts` gains Pages + Product Pages lists. Stretch: insert-menu grid
  preview thumbnails exported from the Figma kit components.

## 7. Acceptance criteria

1. **Figma**: published team library in the "First Credit Union Website" project; tokens
   mirror `globals.css` (light + dark); all kit components signed off; Page Recipes page
   shows all three target pages.
2. **Sanity**: marketing can assemble each of the three pages from the insert menu alone;
   labels, descriptions, and previews written for non-engineers.
3. **Frontend**: the three Sanity-rendered pages are visually equivalent to the hand-coded
   originals (screenshot comparison); `npx tsc --noEmit` clean; `npm run lint` exit 0; no
   new console errors; click-to-edit overlays work in Presentation.
4. **Cleanup**: loan builder schema + renderer deleted; orphan documents deleted;
   hand-coded page routes retired; exactly one page-builder renderer remains.

## 8. Operational notes & constraints

- **Sanity auth gap**: the local `sanity` CLI login and the Sanity MCP connector use an
  account that is not a member of project `c8w93txa` (API calls 403). The app works via
  env tokens; seeding uses `SANITY_API_WRITE_TOKEN`. Re-auth (`sanity login` /
  reconnect MCP with the FCU account) is recommended for future CLI/MCP content ops.
- **Code Connect** is unavailable on the Pro plan — component descriptions carry the
  mapping instead (see F4).
- **Reserved-secondary policy** holds everywhere: `fcu-secondary` green appears only via
  sanctioned DS variants (e.g. `Button variant="secondary"`), never as block-level chrome.
- Git flow per project convention: feature branch per track unit → logical split commits →
  `git merge --ff-only` to `main` → push as `firstcreditunion`; never stage `.agents/`,
  `.cursor/`, `.claude/`. Figma work leaves no git footprint beyond this spec and any
  exported preview thumbnails.
- Execution inputs needed: the "First Credit Union Website" Figma **project URL** (to
  extract `projectId` for `create_new_file`).

## 9. Out of scope (v1)

- Charts, timeline, carousel, comparison-table blocks (additive later).
- Central product/rate documents and cross-page rate sync.
- Per-block presentation queries (fast-path live editing) — v1.1.
- Localization, A/B experimentation, scheduled publishing workflows.
- The `/component-design` playground stack (`designTokens`/`componentConfig`/
  `designSystemUser`) — untouched.
- Real Code Connect mappings (plan-gated).
