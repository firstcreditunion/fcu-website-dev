# FCU Figma Kit — Build Runbook (Track 1)

> **Execution mode:** INTERACTIVE — this track is driven by the `figma:figma-generate-library`
> skill over the Figma MCP server, with a user checkpoint at every phase boundary and per
> component. It is NOT suitable for subagent dispatch or parallel execution (`use_figma`
> calls must be strictly sequential). The `figma:figma-use` skill MUST be loaded before
> every `use_figma` call; pass `skillNames: "figma-use,figma-generate-library"`.

**Goal:** A published Figma team library, "FCU Design System", inside the user's
"First Credit Union Website" project — tokens mirroring `src/app/globals.css` (light + dark)
and ~16 marketing-module components bound to those tokens, finishing with Page Recipes for
the three target pages.

**Spec:** `docs/superpowers/specs/2026-06-10-marketing-modules-design.md` §4

**State ledger:** `.agents/figma-kit-state.json` (untracked) — update after every `use_figma`
call with `{key → nodeId/variableId}`; re-read at the start of every session. Resume protocol:
read-only `use_figma` scan + this file.

---

## Inputs (collect before F0)

- [ ] **Figma project URL** for "First Credit Union Website" (user-provided) → extract
      `projectId` from `figma.com/files/(project|.../project)/:projectId`.
- [x] planKey: `team::1245546878752354318` (from `whoami`)
- [x] Fonts: **Poppins** (sans) + **Geist Mono** (mono) — verify availability with
      `figma.listAvailableFontsAsync()` in F1 before any text write. Poppins semi-bold style
      string is `"SemiBold"` in Google Fonts but Figma may report `"Semi Bold"` — always use
      the string returned by `listAvailableFontsAsync`.

## Source of truth (read at execution time — do not trust memory)

| What | Where |
|---|---|
| Color ramps (`fcu-primary/secondary/mint 50–950`, `neutral 0–950`, `status-*`) | `src/app/globals.css` `@theme` block |
| Semantic map light (`--background`, `--surface*`, `--foreground*`, `--primary*`, `--border*`, `--card`, `--ring`, `--destructive`, status aliases) | `src/app/globals.css` `:root` |
| Semantic map dark | `src/app/globals.css` `.dark` |
| Radius + shadows + font vars | `src/app/globals.css` `@theme` / `:root` |
| Component variant axes | cva blocks in `src/components/ui/*.tsx`, props in `src/components/marketing/*.tsx` |

---

## F0 — Discovery & scope lock

- [ ] Get the project URL from the user; run `create_new_file` with
      `{ fileName: "FCU Design System", editorType: "design", planKey: "team::1245546878752354318", projectId: <extracted> }`.
      Record `fileKey` in the state ledger. (Load `figma:figma-create-new-file` first.)
- [ ] Read-only `use_figma` with `inspectFileStructure.js` (skill script) — confirm the file
      is empty; record default page id.
- [ ] `get_libraries({ fileKey })` then `search_design_system` for "button", "color",
      "spacing" — confirm no existing FCU org library to reuse (expected: none).
- [ ] Read `src/app/globals.css` and produce the locked token list (names + values + light/dark
      pairs) and the locked component list (§F3 table below).
- [ ] ✋ **CHECKPOINT — present token list + component list; get explicit approval.**

## F1 — Foundations (variables + styles)

Collections (use `createVariableCollection.js` + `createSemanticTokens.js` skill scripts):

- [ ] `Primitives` (1 mode "Value"), scopes `[]` (hidden): `fcu-primary/50…950`,
      `fcu-secondary/50…950`, `fcu-mint/50…950`, `neutral/0…950`, `status/success|warning|danger|info/50|500|700`
      (exact set from globals.css), `spacing/xs=4 sm=8 md=16 lg=24 xl=32 2xl=48 3xl=64 4xl=96`,
      `radius/sm md lg xl full` (values from `--radius*`).
- [ ] `Semantic` (modes "Light" + "Dark"): every `:root`/`.dark` semantic token as an **alias**
      to a primitive (never raw values). Scopes: backgrounds `FRAME_FILL, SHAPE_FILL`; text
      `TEXT_FILL`; borders/ring `STROKE_COLOR`; spacing `GAP`; radii `CORNER_RADIUS`.
      WEB code syntax with the `var()` wrapper and the REAL CSS var name —
      e.g. `var(--background)`, `var(--color-fcu-primary-900)`.
- [ ] Text styles (Poppins unless noted): `Display`, `H1`, `H2`, `H3`, `H4`, `Lede`, `Body`,
      `Body Small`, `Caption`; Geist Mono: `Eyebrow Mono` (12px, +4% tracking, uppercase),
      `Stat Value`, `Caption Mono`. Sizes from the marketing components' clamp() midpoints
      (read the component classes; e.g. H1 ≈ 48/1.04 semibold −3.5%).
- [ ] Effect styles: `shadow/xs sm md lg` + `focus` from globals.css `--shadow-*`/`--shadow-focus`.
- [ ] Validate with `validateCreation.js`; update ledger.
- [ ] ✋ **CHECKPOINT — variable/style summary (counts + screenshot of a swatch sheet).**

## F2 — File structure & foundations docs

- [ ] Pages in order: `Cover`, `Getting Started`, `Foundations / Color`,
      `Foundations / Typography`, `Foundations / Spacing & Radius`, `Foundations / Elevation`,
      `———`, one page per component (F3 order), `———`, `Recipes / Home`,
      `Recipes / Everyday Account`, `Recipes / Home Loan`.
- [ ] Cover: brand panel (fcu-primary-900 bg, white wordmark text, kit name + date).
      Foundations docs via `createDocumentationPage.js`: color swatch grids per ramp +
      semantic pairs (Light/Dark side-by-side), type specimens, spacing bars, radius tiles,
      shadow cards.
- [ ] ✋ **CHECKPOINT — page list + screenshots.**

## F3 — Components (one per page, one at a time, sign-off each)

Build order (atoms → molecules → sections). Variant axes are the cva axes from code — at
execution read the component file first and mirror its real API. Bind every fill/stroke/
radius/gap to Semantic variables; INSTANCE_SWAP for icons; text props for labels.

| # | Component | Variant axes (from code) | Notes |
|---|---|---|---|
| 1 | `Button` | variant: default/secondary/outline/ghost/link/destructive × size: sm/default/lg/icon | icon INSTANCE_SWAP; secondary = the sanctioned fcu-secondary green |
| 2 | `Badge` | variant: neutral/primary/success/warning/danger/info × size: sm/default/lg × solid bool | dot bool as BOOLEAN prop |
| 3 | `Checklist Item` | with/without sub-line (BOOLEAN) | success-50 circle + check icon |
| 4 | `Feature Item` | — (TEXT props: title, body; INSTANCE_SWAP icon) | primary-subtle icon chip |
| 5 | `Stat` | size: sm/md/hero × bordered bool × accent bool | + `Stat Row (divided)` composite |
| 6 | `Section Head` | align: start/center | eyebrow tick (primary 18×2px) on start |
| 7 | `Product Tile` | — | 3:2 art panel (surface bg) + kicker/title/desc/learn-more |
| 8 | `Testimonial` | variant: default/featured | quote mark, avatar initials |
| 9 | `Alert` | variant: info/success/warning/danger/neutral | maps to noticeBlock tones |
| 10 | `Description List` | row variants: text value / badge value | rates & fees tables |
| 11 | `Accordion Item` | state: closed/open | + FAQ stack composite |
| 12 | `Stepper` | step state: complete/current/upcoming | 4-step horizontal composite |
| 13 | `CTA Banner` | tone: default/primary/subtle × layout: default/centered | primary = fcu gradient, white-pill button |
| 14 | `Hero` | emphasis: standard/compact | eyebrow pill, h1, lede, actions, meta (value+unit+label), illustration slot over blob |
| 15 | `Split` | imageSide: left/right × blob bool | content slot (SLOT/instance area) |
| 16 | `Widget Placeholder` | — | dashed frame + label, used only in Recipes |

Per component: build base → variants (`createComponentWithVariants.js` + grid layout) →
properties → bind variables (`bindVariablesToComponent.js`) → page doc note → `get_metadata`
+ `get_screenshot` → ✋ **CHECKPOINT** → next.

- [ ] Component description on every component:
      `Code: <import path> · Sanity: <blockName> · DS page: /design-system#<anchor>`
      (the Pro-plan substitute for Code Connect).

## F4 — Recipes, QA, publish

- [ ] Assemble the three Recipes pages from published components only (instances, no detached
      frames), matching the hand-coded pages section-by-section (use `.agents/` screenshots of
      the live pages as reference).
- [ ] QA audit: no unnamed nodes, no hardcoded fills/strokes (scan for unbound paints), no
      `ALL_SCOPES` variables, contrast spot-check on primary/white pairs.
- [ ] Publish as team library; confirm it appears in `get_libraries` for the file.
- [ ] Export per-component PNG thumbnails (`get_screenshot`, maxDimension 480) to
      `public/block-previews/<blockName>.png` for the Studio insert-menu grid (used by Track 2
      Task 5). Commit those PNGs only:
      `git add public/block-previews && git commit -m 'feat(studio): block preview thumbnails from Figma kit'`
- [ ] ✋ **FINAL CHECKPOINT — full-kit review, sign-off closes Track 1.**
