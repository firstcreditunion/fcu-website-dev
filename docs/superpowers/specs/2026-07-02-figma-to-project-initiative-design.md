# "Everything from Figma" Initiative — Design

**Date:** 2026-07-02 · **Approved by:** Isaac (design presented and accepted in-session)
**Status:** Approved design; Phase 0 produces the refreshed implementation plan.

## Goal

Implement every artifact of the FCU Figma design kit in the project — variables → components → building blocks → page builders — ending with marketing pages fully authored in Sanity via a universal page builder, and the hand-coded marketing routes retired ("full CMS takeover", decided pre-launch while stakes are low).

## Background (verified state, 2026-07-02)

- **Figma kit** (file `lDlXQhpLRP9GnRLeM31Iec`): effectively complete per the local state ledger `.agents/figma-kit-state.json` (runId `fcu-kit-2026-06-10`, phase F4-complete-except-manual-publish): 114 variables (light+dark), **16 marketing components built and user-approved** — Button, Badge, Checklist Item, Feature Item, Stat, Section Head, Product Tile, Testimonial, Alert, Description Row, Accordion Item, Step, CTA Banner, Hero, Split, Widget Placeholder — plus showcase-parity pages for all 33 `/design-system` sections and **three page recipes: Home `87:2`, Everyday `89:2`, Home Loan `90:2`**. The Navbar (proposed in the same file) shipped to `main` 2026-07-02 (`8e3687c`) and is NOT in scope here.
- **Existing plan to adopt:** `docs/superpowers/plans/2026-06-10-sanity-page-builder.md` (Tracks 2+3) — universal **14-block** page builder (`heroBlock`, `sectionHeadingBlock`, `splitBlock`, `stepsBlock`, `productTileGridBlock`, `featureGridBlock`, `statBandBlock`, `ratesFeesBlock`, `richTextBlock`, `widgetBlock`, `testimonialBlock`, `faqBlock`, `noticeBlock`, `ctaBannerBlock`), shared `pageBuilder` array on new `page` + `productPage` documents, one renderer registry in `src/components/page-builder/` composing only existing DS components, homepage via `siteSettings.homepage` reference. Its component-level spec is `docs/superpowers/specs/2026-06-10-marketing-modules-design.md`.
- **Code:** DS migration complete (~36 components, Base UI + Tailwind v4, showcased at `/design-system`); marketing modules partially present (`src/components/marketing/`: hero, split, product-tile, feature-item, checklist, section; `src/components/ui/`: cta, stat, testimonial, description-list, …). The Figma kit was built to mirror this code.
- **Staleness to repair:** the June plan predates Sanity **v6** / next-sanity 13 (plan says v5), the navbar rebuild, the dependency wave (lucide 1, recharts 3, react-day-picker 10), and the react-compiler lint constraints learned 2026-07-02.
- **Current routing reality:** `/loans/home` and `/accounts/everyday` are hand-coded static routes; `/[...slug]` renders `loanProductPage` via the old `loanPageBuilder` (11 blocks); `/` is hand-coded.

## Decisions (locked with Isaac, 2026-07-02)

1. **Foundation:** refresh & adopt the June Tracks 2+3 plan as the backbone (not a re-scope).
2. **Endgame:** full CMS takeover — recreate `/`, `/accounts/everyday`, `/loans/home` as Sanity content; retire the hand-coded routes and the `loanPageBuilder` + its 11 blocks.
3. **Open designs:** build against today's approved Figma. Follow-up backlog (schema-compatible, non-blocking): Checklist Item redesign (Isaac dislikes current; consumed by Split), final icon set (marketing deciding; lucide placeholders stay), CTA Person Card / CTA Media extensions, Hero/Full Image variants, ⌘K search-box restyle.
4. **Checkpoints:** per-phase approval gates (4 gates below). Automated probes run per-block regardless.

## Phases

Each phase is its own spec→plan→execute cycle; a phase's gate must pass (Isaac approval) before the next begins.

### Phase 0 — Refresh & audit → **Gate 1: audit report**
- Fresh Figma inventory diffed against the June ledger (catch drift since June 12). Note: the MCP page listing is unreliable for this file (returns only "Cover"); inventory via ledger node-ids + targeted `get_metadata`, with Isaac's desktop selection as fallback.
- Refresh `2026-06-10-sanity-page-builder.md` against current reality: Sanity v6 APIs, react-compiler rules (no impure calls in render, `useSyncExternalStore` for external stores, `createElement` for dynamic components), current dep majors, the shipped navbar (Header/Footer remain untouchable), Presentation `resolve.locations` cleanup (stray `post` type).
- **Variables parity audit:** 114 Figma vars ↔ `src/app/globals.css` ↔ the `designTokens` Sanity singleton. Report drift; fix only real drift (expectation: near-zero — the kit mirrors code).
- Census of real `loanProductPage` documents/content for the takeover migration; confirm which routes hand-coded pages shadow.
- Output: refreshed plan + one-page audit report.

### Phase 1 — Component gap-fill → **Gate 2: fidelity sheet**
- Authoritative diff: 16 kit components vs code. Build/reskin only the gaps, to Figma fidelity, using the navbar machinery (token-resolved computed-style probes + settled screenshots; Playwright — the embedded preview browser is AV-broken on this machine).
- Components stay pure (no Sanity coupling); DS-fidelity rule applies — any conflict between Figma and code DS stops for Isaac's call.
- Output: side-by-side fidelity sheet, 16/16 green.

### Phase 2 — Universal page builder → **Gate 3: all-blocks preview**
- The refreshed June plan executes here: 14 block object schemas + `page`/`productPage` documents + product taxonomy; one renderer registry composing only Phase-1 components; categorized insert-menu (thumbnails under `public/block-previews/`, ships without grid views if not exported yet); `stegaClean` on enum-driven rendering; TypeGen at every schema step; Presentation `resolve.locations` for the new documents.
- Old routes stay live throughout; builder verified on a temporary preview route (at app root, outside `(frontend)`, per the navbar lesson — the group layout renders the live header).
- Output: preview page rendering all 14 blocks (demo data) vs Figma, plus the six-assertion-style behavioral probes where blocks are interactive (accordion, tabs).

### Phase 3 — Recipes & CMS takeover → **Gate 4: per-page approval**
- Seed the three Figma recipes as **draft** `page` documents (Home `87:2`, Everyday `89:2`, Home Loan `90:2`); pixel-check each against its recipe.
- Per approved page: route swap to the catch-all renderer → retire that hand-coded route. After all three: retire `loanPageBuilder` + 11 legacy blocks + `loanProductPage` (migrate real content into `productPage` first, per the Phase-0 census), redirects where paths change, homepage via `siteSettings.homepage`.
- Publishing remains Isaac/marketing's action in Studio.

## Non-goals

Navbar/Footer changes (shipped/untouchable) · dark-mode page variants · the follow-up backlog above · forms/auth/project-hub/brand-molecule · Figma Sites/Make output (per `figma-usage-rules` — R3/R4) · finalizing the icon set.

## Cross-cutting rules

- **DS fidelity** (memory `design-system-fidelity`): never deviate without Isaac's explicit approval; verify against component source + live `/design-system`; approved deviations ship tri-system (code + Figma + Sanity).
- **Process:** feature branch per phase (worktree if concurrent sessions possible), per-task commits, gates with REAL exit codes (no pipe-masked failures), `typegen → tsc → lint → vitest` before every commit, `.agents`/`.cursor`/`.claude` never committed.
- **Sanity:** additive schema changes where possible; every schema task runs TypeGen (predev/prebuild coupling means mismatches fail builds); CMS writes are draft-only and ask-first.
- **Environment:** dev server must be user-run (backgrounded ones die); stop dev server before native-binary installs; PowerShell for PS cmdlets, git-bash for git; no literal `"` in commit bodies via PS.

## Success criteria

1. Marketing can assemble and publish a new page in Studio using the 14 blocks without engineering involvement.
2. `/`, `/accounts/everyday`, `/loans/home` render from Sanity content, pixel-faithful to the Figma recipes, hand-coded versions deleted.
3. `loanPageBuilder` and its 11 blocks are gone; no orphaned schema types; TypeGen/`tsc`/lint/build/vitest green; production build deployable.
4. Every phase gate carries evidence (audit report / fidelity sheet / probe results / screenshots), approved by Isaac.

## Risks & mitigations

- **Figma drift since June ledger** → Phase 0 re-inventory before anything builds.
- **MCP page-listing unreliability** → ledger node-ids + desktop-selection fallback.
- **Legacy content migration** (`loanProductPage`) → Phase 0 census; migrate before retirement; drafts-first.
- **Scope creep from the follow-up backlog** → backlog items are explicitly out; schema designed so they slot in additively.
- **SanityLive/Next-16 request overage (open decision)** → unchanged by this initiative; revisit at Phase 3 route swap where page count grows.
