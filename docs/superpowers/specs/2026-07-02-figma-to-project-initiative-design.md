# "Everything from Figma" Initiative — Design

**Date:** 2026-07-02 · **Approved by:** Isaac (design presented and accepted in-session)
**Status:** Approved design, revised after 3-lens spec review; Phase 0 produces the refreshed implementation plan.

## Goal

Implement every artifact of the FCU Figma design kit in the project — variables → components → building blocks → page builders — ending with marketing pages fully authored in Sanity via a universal page builder, and the hand-coded marketing routes retired ("full CMS takeover", decided pre-launch while stakes are low).

## Background (verified state, 2026-07-02)

- **Figma kit** (file `lDlXQhpLRP9GnRLeM31Iec`): effectively complete per the local state ledger `.agents/figma-kit-state.json` — specifically its `phaseF4` entry: COMPLETE except manual publish (NB: the ledger's top-level `phase` field is stale at "F2-complete-awaiting-checkpoint"; trust `phaseF4`, and fix the stale field during Phase 0). Contents: the Figma variable set (ledger self-conflicts: 114 per `phaseF4` vs 119 per `qaAudit` — the chart/1-5 semantic vars are the likely delta; **Phase 0's re-count is authoritative**), **16 marketing components built and user-approved** — Button, Badge, Checklist Item, Feature Item, Stat, Section Head, Product Tile, Testimonial, Alert, Description Row, Accordion Item, Step, CTA Banner, Hero, Split, Widget Placeholder — plus showcase-parity pages for all 33 `/design-system` sections and **three page recipes: Home `87:2`, Everyday `89:2`, Home Loan `90:2`**. The Navbar (proposed in the same file) shipped to `main` 2026-07-02 (`8e3687c`) and is NOT in scope here.
- **Existing plan to adopt:** `docs/superpowers/plans/2026-06-10-sanity-page-builder.md` (Tracks 2+3) — universal **14-block** page builder (`heroBlock`, `sectionHeadingBlock`, `splitBlock`, `stepsBlock`, `productTileGridBlock`, `featureGridBlock`, `statBandBlock`, `ratesFeesBlock`, `richTextBlock`, `widgetBlock`, `testimonialBlock`, `faqBlock`, `noticeBlock`, `ctaBannerBlock`), shared `pageBuilder` array on new `page` + `productPage` documents, one renderer registry in `src/components/page-builder/` composing only existing DS components, homepage via `siteSettings.homepage` reference. Its component-level spec is `docs/superpowers/specs/2026-06-10-marketing-modules-design.md`. Insert-menu thumbnails are **already exported and committed** under `public/block-previews/` (`53073fc`); re-export only if Phase 0 finds visual drift.
- **Name collision constraint (drives sequencing):** four of the 14 new block `_type`s reuse legacy loan-block names — `featureGridBlock`, `ratesFeesBlock`, `faqBlock`, `noticeBlock` (all four legacy files exist today in `src/sanity/schemaTypes/blocks/`). The June plan deletes the legacy loan builder FIRST precisely to free these names. Retirement therefore cannot wait for Phase 3 (see Phase 2).
- **Code:** DS migration complete (~36 components, Base UI + Tailwind v4, showcased at `/design-system`); marketing modules partially present (`src/components/marketing/`: hero, split, product-tile, feature-item, checklist, section; `src/components/ui/`: cta, stat, testimonial, description-list, …). The Figma kit was built to mirror this code.
- **Staleness to repair:** the June plan predates Sanity **v6** / next-sanity 13 (plan says v5), the navbar rebuild, the dependency wave (lucide 1, recharts 3, react-day-picker 10), and the react-compiler lint constraints learned 2026-07-02.
- **Current routing reality:** `/loans/home` and `/accounts/everyday` are hand-coded static routes that shadow the catch-all; `/[...slug]` renders `loanProductPage` via the old `loanPageBuilder` (11 blocks); `/` is hand-coded (Coming Soon).
- **Sanity write access:** verified working 2026-07-02 — `SANITY_API_WRITE_TOKEN` via `@sanity/client` seeded `drafts.headerNavigation` (the hosted Sanity MCP account is NOT a member of project `c8w93txa`; all dataset writes go through the repo token).

## Decisions (locked with Isaac, 2026-07-02)

1. **Foundation:** refresh & adopt the June Tracks 2+3 plan as the backbone. "Refresh" explicitly includes **re-sequencing its tasks to the initiative's phase boundaries** (see Phases) — the plan's content is adopted; its ordering is not sacred.
2. **Endgame:** full CMS takeover — recreate `/`, `/accounts/everyday`, `/loans/home` as Sanity content; retire the hand-coded routes and the `loanPageBuilder` + its 11 blocks.
3. **Open designs:** build against today's approved Figma. Follow-up backlog (non-blocking): Checklist Item redesign (Isaac dislikes current; consumed by Split — **Gates 2 and 4 approve fidelity to the CURRENT kit; the current Checklist look is explicitly not grounds for failing a gate**; the redesign lands later touching code+Figma only, no schema/content change), final icon set (marketing deciding; lucide placeholders stay — **schemas store semantic meaning keys, never lucide asset names**, so the swap stays renderer-only; see Cross-cutting), CTA Person Card / CTA Media extensions, Hero/Full Image variants, ⌘K search-box restyle.
4. **Checkpoints:** per-phase approval gates (4 gates below). Automated probes run per-block regardless.

## Phases

Each phase is its own plan→execute cycle gated on Isaac's approval of the previous phase's evidence. Planning handoff: **Phase 0 outputs (a) the refreshed Phases-2+3 plan as a NEW dated file** (e.g. `docs/superpowers/plans/2026-07-0X-page-builder-refreshed.md`; the June file stays untouched as historical record) **and (b) the audit report, which includes the 16-component-vs-code diff that seeds Phase 1.** Phase 1 gets its own short plan authored after Gate 1.

### Phase 0 — Refresh & audit → **Gate 1: audit report**
- Fresh Figma inventory diffed against the June ledger (catch drift since June 12). The MCP page listing is unreliable for this file (returns only "Cover"); inventory via ledger node-ids + targeted `get_metadata`, with Isaac's desktop selection as fallback.
- Refresh the June plan into the new dated file: Sanity v6 APIs, react-compiler rules (no impure calls in render, `useSyncExternalStore` for external stores, `createElement` for dynamic components), current dep majors, the shipped navbar (Header/Footer remain untouchable), Presentation `resolve.locations` cleanup (stray `post` type), **icon fields switched to semantic meaning keys**, and the **re-sequencing:** June Tasks 0–11 (schemas, documents, queries, renderers, incl. the legacy-deletion Task 1) → Phase 2; June Tasks 12–16 (baselines, seeding, route swap, retirement) → Phase 3, split at the Gate-3 boundary.
- **Variables parity audit:** authoritative re-count of Figma vars ↔ `src/app/globals.css` ↔ the `designTokens` Sanity singleton. Report drift; fix only real drift (expectation: near-zero — the kit mirrors code).
- **Census:** count + content of real `loanProductPage` (and orphan `homePage`/`sitemapPage`) documents — this decides whether Phase 2's legacy deletion needs a prior content migration or is a clean delete (June's zero-documents check is 3 weeks stale). Also audit **copy drift** between the Figma recipes and the live hand-coded pages, so the seed-copy source is settled before Phase 3.
- Output: refreshed plan + one-page audit report (variables verdict, census, copy-drift notes, component-vs-code diff).

### Phase 1 — Component gap-fill → **Gate 2: fidelity sheet**
- Using Phase 0's diff: build/reskin only the gaps among the 16 kit components, to Figma fidelity, with the navbar machinery (token-resolved computed-style probes + settled screenshots; Playwright — the embedded preview browser is AV-broken on this machine).
- Components stay pure (no Sanity coupling); DS-fidelity rule applies — any Figma↔code-DS conflict stops for Isaac's call.
- Output: side-by-side fidelity sheet, 16/16 green (fidelity = current kit, per Decision 3).

### Phase 2 — Universal page builder → **Gate 3: all-blocks preview + authoring dry-run**
- Executes the refreshed plan's Tasks 0–11: **legacy `loanPageBuilder` + 11 blocks deleted at the START** (conditional on the Phase-0 census: clean delete if zero real documents, else migrate first — this frees the four colliding block names; `/[...slug]` handling during the interim follows the refreshed plan), then 14 block object schemas + `page`/`productPage` documents + product taxonomy (dormant until a related-products block lands — kept because retrofitting would touch published documents), one renderer registry composing only Phase-1 components, categorized insert-menu with the committed thumbnails, `stegaClean` on enum-driven rendering, TypeGen at every schema step, Presentation `resolve.locations` for the new documents.
- Hand-coded routes (`/`, `/accounts/everyday`, `/loans/home`) stay live throughout; builder verified on a temporary preview route (app root, outside `(frontend)`, per the navbar lesson).
- Gate 3 evidence: preview page rendering all 14 blocks (demo data) vs Figma; behavioral probes on interactive blocks (FAQ accordion, repayment-calculator widget); **authoring dry-run** — Isaac role-plays marketing against a written script ("assemble page X from the insert menu alone, no code, no docs"), friction items recorded (this is the evidence for success criterion 1).

### Phase 3 — Recipes & CMS takeover → **Gate 4: per-page approval**
- Executes the refreshed plan's Tasks 12–16. Seed the three Figma recipes as **draft** `page` documents (copy source: the Figma recipes, cross-checked against live hand-coded copy per the Phase-0 drift audit — **the Figma recipes are the Gate-4 baseline**; hand-coded pages serve as a secondary content-completeness check).
- **Pre-swap preview mechanism (Gate-4 evidence):** draft pages render full-page-with-chrome through the catch-all inside `(frontend)` via Presentation/draft-mode (existing `/api/draft-mode` routes), plus temporary non-shadowed slugs where needed — pixel-check happens there, BEFORE any route change.
- **Publish-before-swap rule:** a hand-coded route is swapped/retired only AFTER its page document is **published** (publish is a named Gate-4 sub-step, Isaac/marketing's action). **Publishing the Home document replaces the Coming-Soon homepage in production — it is the de-facto public launch and requires Isaac's separate, explicit go-ahead.**
- SEO surface: extend `src/app/sitemap.ts` to enumerate published `page`/`productPage` slugs (today it derives only from `headerNavigation`); redirects via `next.config.ts` `redirects()` with `curl -I` 301 probes as gate evidence; decide + record catch-all unknown-slug behavior post-takeover (`notFound()` vs Coming-Soon while pre-launch).
- Cleanup: remove the Phase-2 temporary preview route; retire `loanProductPage` document type after a **GROQ orphan check (remaining `loanProductPage` count == 0, captured as gate evidence)** and a migrated-count-matches-census check; homepage via `siteSettings.homepage`.

## Non-goals

Navbar/Footer changes (shipped/untouchable) · dark-mode page variants · the follow-up backlog above · forms/auth/project-hub/brand-molecule · Figma Sites/Make output (per `figma-usage-rules` — R3/R4) · finalizing the icon set.

## Cross-cutting rules

- **DS fidelity** (memory `design-system-fidelity`): never deviate without Isaac's explicit approval; verify against component source + live `/design-system`; approved deviations ship tri-system (code + Figma + Sanity).
- **Icon fields store semantic meaning keys** (e.g. `members`, `support`, `rates`, `security`, `card`), never renderer-library asset names; renderers own the meaning→icon mapping so the eventual icon-set swap is renderer-only.
- **Process:** feature branch per phase (worktree if concurrent sessions possible), per-task commits, gates with REAL exit codes (no pipe-masked failures), `typegen → tsc → lint → vitest` before every commit, `.agents`/`.cursor`/`.claude` never committed.
- **Sanity:** additive schema changes where possible (the one destructive step — legacy builder deletion — is census-gated at Phase 2 start); every schema task runs TypeGen; CMS writes are draft-only and ask-first; all dataset writes via the repo `SANITY_API_WRITE_TOKEN` (hosted Sanity MCP has no project access — confirm token validity in Phase 0).
- **Environment:** dev server must be user-run (backgrounded ones die); stop dev server before native-binary installs; PowerShell for PS cmdlets, git-bash for git; no literal `"` in commit bodies via PS.

## Success criteria

1. **Authoring dry-run passes** (Gate 3): a page assembled in Studio from the insert menu alone — no code, no docs — with friction items triaged; this evidences "marketing can assemble pages without engineering".
2. `/`, `/accounts/everyday`, `/loans/home` render from **published** Sanity content, pixel-faithful to the Figma recipes (Gate-4 baseline), hand-coded versions deleted; sitemap lists all published pages; retired paths 301 correctly.
3. `loanPageBuilder` and its 11 blocks are gone (GROQ orphan check == 0 on record); no orphaned schema types or preview routes; TypeGen/`tsc`/lint/build/vitest green; production build deployable.
4. Every phase gate carries evidence (audit report / fidelity sheet / probe results + dry-run / screenshots + 301 probes + orphan checks), approved by Isaac.

## Risks & mitigations

- **Figma drift since June ledger** → Phase 0 re-inventory before anything builds.
- **MCP page-listing unreliability** → ledger node-ids + desktop-selection fallback.
- **Legacy content migration** (`loanProductPage`) → Phase 0 census gates the Phase-2 deletion; migrate before delete if documents exist; drafts-first.
- **Route swap vs publish timing** → publish-before-swap rule above; Home publish = launch decision, explicitly Isaac's.
- **Copy drift between recipes and live pages** → Phase 0 audit settles the copy source before seeding.
- **Scope creep from the follow-up backlog** → backlog items are explicitly out; gates approve fidelity to the current kit; schema designed so backlog items slot in additively.
- **SanityLive/Next-16 request overage (open decision)** → unchanged by this initiative; revisit at Phase 3 route swap where page count grows.
