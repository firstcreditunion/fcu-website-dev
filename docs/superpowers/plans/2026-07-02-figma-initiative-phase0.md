# Figma Initiative — Phase 0 (Refresh & Audit) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the Gate-1 audit report + the refreshed page-builder plan that de-risk Phases 1–3 of the everything-from-Figma initiative.

**Architecture:** Read/audit phase — no production code changes. Outputs are two committed documents (audit report, refreshed plan) plus data gathered via the Figma MCP, the repo's Sanity read client, and local parsing of `globals.css`. Every task ends by ticking its hub task (MANDATORY rule, memory `project-hub-tracking`).

**Tech Stack:** Figma MCP (`get_metadata`, `get_variable_defs`, `get_design_context`), `@sanity/client` via repo `SANITY_API_READ_TOKEN`, Node scripts in `.agents/` (never committed), supabase-fcu MCP for hub reads + Node script for hub writes.

**Spec:** `docs/superpowers/specs/2026-07-02-figma-to-project-initiative-design.md`
**Adopted plan being refreshed:** `docs/superpowers/plans/2026-06-10-sanity-page-builder.md` (2,997 lines — READ IT FULLY in Task 4)
**Ledger:** `.agents/figma-kit-state.json` (trust `phaseF4`; top-level `phase` field is stale — fixed in Task 6)

**Facts already verified (do not re-derive):** Figma file `lDlXQhpLRP9GnRLeM31Iec`; MCP page-listing returns only "Cover" (broken) — use the ledger's node-ids below; block thumbnails committed at `53073fc` under `public/block-previews/`; Sanity writes only via repo tokens (hosted Sanity MCP has no project access); hub write recipe in memory `project-hub-tracking` (stamp `updated_by_id='agent:claude'`, `updated_by_name='Claude (agent)'`).

**Ledger node-id reference (from `.agents/figma-kit-state.json`):**
- Pages: Cover `0:1` · Getting Started `7:2` · Foundations/Color `7:3` · Typography `7:4` · Spacing & Radius `7:5` · Elevation `7:6` · Button `7:8` · Badge `7:9` · Checklist `7:10` · Feature Item `7:11` · Stat `7:12` · Section Head `7:13` · Product Tile `7:14` · Testimonial `7:15` · Alert `7:16` · Description List `7:17` · Accordion `7:18` · Stepper `7:19` · CTA Banner `7:20` · Hero `7:21` · Split `7:22` · Widget Placeholder `7:23` · Recipes/Home `7:25` · Recipes/Everyday `7:26` · Recipes/Home Loan `7:27` (+ Navbar page `256:2`, shipped, out of scope)
- Component sets/ids: Button `22:2` · Badge `35:2` · Checklist Item `37:8` · Feature Item `47:2` · Stat `50:2` · Section Head `53:16` · Product Tile `54:5` · Testimonial `55:23` · Alert `59:44` · Description Row `60:13` · Accordion Item `221:63` (**REBUILT 2026-06-11 — old `65:*` ids INVALID**) · remaining (Step, CTA Banner, Hero, Split, Widget Placeholder) read from ledger `components` key at execution time
- Variables: Primitives `VariableCollectionId:3:2` (84 vars), Semantic `VariableCollectionId:4:2` (30 vars, light `4:0` / dark `4:1`); qaAudit later says 119 — recount resolves
- Recipes: Home `87:2` · Everyday `89:2` · Home Loan `90:2`

---

### Task 0: Baseline + audit-report skeleton

**Files:** Create: `docs/superpowers/audits/2026-07-02-figma-initiative-audit.md`

- [ ] **Step 1:** Green baseline (work on `main` — docs-only phase, established repo practice):
```bash
cd C:/Users/ivicliph/Documents/axiom/fcu-website-dev
git checkout -- schema.json src/sanity/types.ts   # CRLF typegen noise
git status --porcelain=v1 -uno                    # expect empty
npx tsc --noEmit && npm run lint                  # both exit 0 — else STOP
```
- [ ] **Step 2:** Create the audit doc with empty sections: `## Gate-1 Summary` (filled last), `## 1. Figma Inventory vs June Ledger`, `## 2. Variables Parity (Figma ↔ globals.css ↔ designTokens)`, `## 3. Dataset Census`, `## 4. Copy Drift (recipes vs live pages)`, `## 5. Component-vs-Code Diff (seeds Phase 1)`, `## 6. Decisions Needed at Gate 1`.
- [ ] **Step 3:** Commit: `docs(audit): Phase-0 audit report skeleton`

### Task 1: Figma inventory + ledger diff

**Files:** Modify: audit doc §1

- [ ] **Step 1:** Probe every ledger PAGE id with `get_metadata` (fileKey `lDlXQhpLRP9GnRLeM31Iec`, nodeId per list above). For each record: exists? name matches ledger? child-count. Batch 4–6 calls per message.
- [ ] **Step 2:** Probe every COMPONENT SET id the same way (read the full `components` map from the ledger first: `node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync('.agents/figma-kit-state.json','utf8')).components,null,1))"`).
- [ ] **Step 3:** Drift hunt beyond the ledger: `get_metadata` each RECIPE page (`7:25`,`7:26`,`7:27`) and compare frame inventory vs ledger `phaseF4`/`parityBuild` notes; anything unrecognized → drift table.
- [ ] **Step 4:** Write §1: per-node table (id · ledger name · status OK/RENAMED/MISSING/NEW) + a "needs Isaac visual confirm" list (page-listing is broken, so unknown NEW pages can only be confirmed by Isaac in the desktop app — collect for Gate 1, do not block).
- [ ] **Step 5:** Commit `docs(audit): Figma inventory vs ledger`. Hub tick: `Figma re-inventory + diff vs June ledger` → `complete` (script pattern: `.agents/hub-tick-2026-07-02b.mjs`).

### Task 2: Variables parity audit (the "variables" layer)

**Files:** Create: `.agents/audit-vars.mjs` · Modify: audit doc §2

- [ ] **Step 1:** Figma side: `get_variable_defs` on foundation pages `7:3`,`7:4`,`7:5`,`7:6` + `get_metadata`-discovered doc frames if defs come back sparse (tool returns per-node USED vars — union the results; if union < 100, fall back to asking Isaac to select the collections in desktop at Gate 1 and note the limitation). Record: name → resolved value per mode where visible.
- [ ] **Step 2:** Code side: `.agents/audit-vars.mjs` parses `src/app/globals.css` custom properties — extract `--color-*`, `--radius*`, `--shadow-*`, semantic `:root`/`.dark` vars into JSON (`grep -oE '^\s*--[a-z0-9-]+:' + value capture`; print name+value pairs).
- [ ] **Step 3:** Sanity side: read the `designTokens` singleton via a `.agents` script using `createClient` + `SANITY_API_READ_TOKEN` (pattern: `.agents/seed-nav-draft.mjs` but read-only; GROQ `*[_id=="designTokens"][0]`).
- [ ] **Step 4:** Write §2: three-way table (token · Figma · code · Sanity · verdict MATCH/DRIFT/ONLY-IN-X), the authoritative var count (resolves 114-vs-119), and a drift list. **Report only — no fixes in Phase 0** unless a drift is trivially a typo (then list it under §6 Decisions).
- [ ] **Step 5:** Commit `docs(audit): variables parity`. Hub tick: `Variables parity audit …` → `complete`.

### Task 3: Dataset census + copy drift

**Files:** Create: `.agents/audit-census.mjs` · Modify: audit doc §3 + §4

- [ ] **Step 1:** Census script (read client, `perspective:'raw'` so drafts count): counts + slugs/titles for `loanProductPage` (published AND `drafts.*`), any `homePage`/`sitemapPage` orphan types, `disclaimerSnippet` usage (referenced by legacy noticeBlock). Output verbatim into §3 with the verdict line: **"Phase-2 legacy deletion = clean delete"** (if zero real docs) **or "migrate first"** (list what must move).
- [ ] **Step 2:** Copy extraction, Figma side: `get_metadata` on `87:2`, `89:2`, `90:2` — text-node names/content give the recipe copy skeleton (headlines, section titles, CTAs).
- [ ] **Step 3:** Copy extraction, live side: `curl -s http://localhost:3300/ , /accounts/everyday , /loans/home` from a `next start -p 3300` of the current build; strip tags (`node` + a 5-line text extractor); if the dev/start server can't run, use the production Vercel URL.
- [ ] **Step 4:** Write §4: per-page drift table (recipe copy vs live copy · divergence noted) + recommendation ("seed from recipe" vs "seed from live copy") per page — this settles the Gate-4 copy source per the spec.
- [ ] **Step 5:** Commit `docs(audit): census + copy drift`. Hub tick: `loanProductPage + orphan-docs census; recipe copy-drift audit` → `complete`.

### Task 4: Refresh the June plan (the big one)

**Files:** Create: `docs/superpowers/plans/2026-07-02-page-builder-refreshed.md` (June file stays untouched)

- [ ] **Step 1:** Read `docs/superpowers/plans/2026-06-10-sanity-page-builder.md` END TO END (2,997 lines — multiple Reads with offsets; do not skim).
- [ ] **Step 2:** Write the refreshed plan applying this delta checklist — every item either applied or explicitly noted N/A:
  1. Header: same 14 block names; goal unchanged; reference the initiative spec.
  2. **Re-sequence:** June Tasks 0–11 stay (Phase 2 of the initiative, in order, legacy-deletion Task 1 FIRST but now **census-gated**: prepend "verify §3 census verdict = clean delete; else run the migration mini-task"); June Tasks 12–16 move under a `## PHASE 3 (initiative) — execute only after Gate 3` heading.
  3. Sanity v6/next-sanity 13: replace v5-isms (verify each API the plan names against installed versions — `defineLive`, `sanityFetch`, `presentationTool`, TypeGen CLI flags).
  4. React-compiler constraints: no `Date.now()`/impure calls in render (server components included), `useSyncExternalStore` for external stores, `createElement` for registry-driven dynamic components (the block renderer registry!), no components created during render.
  5. **Semantic icon keys** (spec cross-cutting rule): `featureItem.icon` list becomes meaning keys (`members`,`support`,`rates`,`security`,`card`,`payments`,`location`,`time`,`growth` — final list drawn from the 11 ledger Feature-Item icons) with renderer-owned mapping. Note the navbar `link.icon` precedent uses object-name keys — acceptable, do NOT churn it.
  6. Preview route lesson: any temp preview page goes at app root OUTSIDE `(frontend)` (double-header lesson, navbar plan).
  7. Thumbnails: state as committed (`53073fc`); Task 5's conditional language removed.
  8. Header/Footer untouchable; Presentation `resolve.locations` gains `page`/`productPage` and drops the stray `post`.
  9. `[...slug]` interim behavior during Phase 2 per census verdict.
  10. Verification gates: real-exit-code pattern (`cmd > /tmp/x 2>&1; echo EXIT=$?` — never pipe-masked), `typegen → tsc → lint → vitest` per schema task.
  11. Hub ticks: add a "tick hub task X" step to every task, mapping to the four initiative groups created 2026-07-02.
- [ ] **Step 3:** Self-check: grep the refreshed plan for `sanity v5`, `revalidateSyncTags`, `_nav-preview`-style underscore routes, lucide icon names in schema definitions — all must be absent. Confirm every June task number appears exactly once (re-sequenced, none dropped silently).
- [ ] **Step 4:** Commit `docs(plan): refreshed page-builder plan (v6 + resequenced + initiative rules)`. Hub tick: `Refresh June builder plan into new dated file (re-sequenced)` → `complete`.

### Task 5: Component-vs-code diff (seeds Phase 1)

**Files:** Modify: audit doc §5

- [ ] **Step 1:** For each of the 16 kit components, inspect the code candidate: `src/components/marketing/{hero,split,product-tile,feature-item,checklist,section}.tsx`, `src/components/ui/{button,badge,stat,testimonial,alert,description-list,accordion,cta}.tsx` (+ Glob for step/stepper, widget, section-head candidates). Judge: EXISTS (name+role match) / PARTIAL (exists, kit variant coverage unknown) / MISSING.
- [ ] **Step 2:** Write §5 table: kit component · set id · code file · verdict · Phase-1 action (skip / fidelity-check only / build). Include the ledger's flags verbatim: Checklist "USER DISLIKES DESIGN" (build to current kit anyway per Decision 3), Feature-Item "ICONS PROVISIONAL", Accordion REBUILT ids.
- [ ] **Step 3:** Commit `docs(audit): component-vs-code diff`. Hub tick: `Component diff: 16 kit components vs code (from Gate 1)` → leave `not_started` (it's a P1 task — the diff here only SEEDS it; note this in §5).

### Task 6: Ledger hygiene + Gate-1 assembly

**Files:** Modify: `.agents/figma-kit-state.json` (local, never committed) + audit doc

- [ ] **Step 1:** Fix the ledger's stale top-level `phase` → `"F4-complete-awaiting-manual-publish"` (one-line Node edit; `.agents/` is uncommitted by convention).
- [ ] **Step 2:** Write `## Gate-1 Summary` at the top of the audit doc: one page — inventory verdict, var count + drift count, census verdict (clean-delete vs migrate), copy-source recommendation per page, component diff counts (skip/check/build), open decisions list (§6).
- [ ] **Step 3:** Full gate: `npx tsc --noEmit && npm run lint && npm test` (exit 0 — docs phase, must stay green). Commit `docs(audit): Gate-1 summary`. Push `main` (gh: firstcreditunion).
- [ ] **Step 4:** Present Gate 1 to Isaac (summary + links + decisions). On approval: hub ticks — `Gate 1: audit report approved` → `complete`, and P1 group's first task → `in_progress`.

---

**Rollback:** docs-only — revert commits; hub statuses are editable (set back with a note).
**Out of scope for Phase 0:** any `src/` change, any Sanity schema/content change, any Figma write, fixing variable drift (report → Gate-1 decision).
