# Figma Initiative — Phase 0 Audit Report

**Date started:** 2026-07-02 · **Plan:** `docs/superpowers/plans/2026-07-02-figma-initiative-phase0.md` · **Spec:** `docs/superpowers/specs/2026-07-02-figma-to-project-initiative-design.md`

## Gate-1 Summary

**Phase 0 executed 2026-07-02 (single session). All audit outputs green; five decisions for Isaac below.**

| Area | Verdict |
|---|---|
| **Figma inventory (§1)** | 42/43 nodes OK; 1 stale ledger id fixed (Accordion → `221:2`). Kit **expanded post-ledger** — needs sign-off (Decision 1/2). |
| **Variables parity (§2)** | **PERFECT** — 69/69 colors, 7/7 radius, 44/44 designTokens, shadows match. Count resolved: 84 primitives + 30 semantic + 5 chart = **119**. Zero fixes needed. |
| **Dataset census (§3)** | **Zero** loanProductPage/disclaimer docs → **Phase-2 legacy deletion = CLEAN DELETE.** Write token VALID. |
| **Copy drift (§4)** | Recipes ≈ live pages (shared source) → seed copy settled. FAQ answers ×3 + rates confirmation outstanding (Decisions 4/5). |
| **Component diff (§5)** | **14 skip / 1 extend (Hero Full-Image) / 1 build (Widget Placeholder)** — Phase 1 is small. |
| **Refreshed plan** | `docs/superpowers/plans/2026-07-02-page-builder-refreshed.md` (3,020 lines, 12-delta applied, self-checks verified independently; reviewer pass in flight — findings fold in before Phase 2 starts). |
| **Ledger hygiene** | `phase` field + Accordion id fixed; audit note appended. |

**Decisions needed:** see §6 (5 open — kit-expansion sign-off, kit-vs-doc contradictions, home-page launch framing, FAQ copy, rates confirmation).

## 1. Figma Inventory vs June Ledger

**Method:** all 25 ledger page ids + 18 component/set ids probed via Figma MCP `get_metadata` (4 parallel probers, 2026-07-02). Verdict: **42× OK, 1× MISSING (stale id), 0 unexplained.** The kit is intact — and has **expanded materially since the June-12 ledger.**

### Stale ledger id
| Ledger id | Name | Finding |
|---|---|---|
| `7:18` | Accordion page | Node id invalid — page rebuilt at **`221:2`** (matches ledger's own "REBUILT 2026-06-11, old 65:* INVALID" note; the `entities.pages` entry was never updated). Set id `221:63` is correct. |

### Post-ledger expansion (kit grew; ledger understates it)
| Component | Ledger says | Kit now has |
|---|---|---|
| Button `22:2` | 6 variants × 3 sizes | **8 variants** (+Destructive, +Destructive Outline) × **4 sizes** (+XS) = 32 syms; plus `Button / Icon` set (32 icon-button syms) and `Button / States` (Loading/Error/Disabled) — the States frame contradicts the page doc-text "states live in code" |
| Badge `35:2` | 6 subtle variants × 3 sizes | 8 variants (+Ghost, +Link) × 3 sizes = 24 syms; plus **`Badge / Solid` set** (18 syms) + `Badge / Counter` — contradicts doc-text "subtle-only in this kit" |
| Alert `59:44` | 5 tones | 5 tones × **3 displays** (Default/**Banner/Inline**) = 15 |
| Testimonial `55:23` | Featured/Default | + **Ghost, Compact** (4 variants) |
| Description Row `60:13` | Mono/Badge | + **Compact/Inline densities**; separate **Description List set** (Default/Striped/Compact/Inline) |
| CTA Banner `69:105` | tone×layout | 3 tones × **4 layouts** (+**Slim, Split**) = 12 |
| Stepper page | Step (3 states) | + **Stepper (Vertical)** `217:20` |
| Hero page | Hero (Standard/Compact) | + **`Hero / Full Image` set `100:74`** (Background=Photo/Gradient) — the "PROPOSED" hero extension is now BUILT in the kit |
| CTA extensions | PROPOSED | Both exist as components: `CTA / Person Card` `78:26`, `CTA / Media` `78:62` (naming uses slash-path form) — still tagged BACKLOG for the initiative per Decision 3 |

### Foundations (confirm code parity targets)
- **Color** `7:3`: 5 primitive ramps (fcu-primary/secondary/green-faded/mint ×11 steps, neutral ×13) + 4 status rows + **29 semantic rows in Light/Dark pairs**.
- **Typography** `7:4`: 12 specimens (Display…Caption Mono; Poppins + Geist Mono).
- **Spacing & Radius** `7:5`: 8 spacing steps (xs4…4xl96) + **7 radius tiles (sm6, md8, lg10, xl14, 2xl18, 3xl22, 4xl26)** — matches code's 8 radius vars (base + 7 derived).
- **Elevation** `7:6`: 7 shadows (xs…2xl + Focus Ring) — matches code's 7 `--shadow-*` vars exactly.

### Recipes (band structure → block mapping for Phase 3 seeds)
- **Home** `87:2` (1440×3872): band-hero · band-products · band-why-us · band-community · band-testimonial · band-cta
- **Everyday** `89:2` (1440×2751): band-breadcrumb · band-hero · band-features · band-rates · band-pairs · band-cta
- **Home Loan** `90:2` (1440×3394): band-breadcrumb · band-hero · band-calculator · band-steps · band-why-borrow · band-faq (Accordion Item instances) · band-cta

**Consequences:** (1) Phase-1 fidelity targets are the CURRENT kit incl. expansions — the component-vs-code diff (§5) must check the new variants, not the ledger's list. (2) Ledger `entities.pages` Accordion id fixed in Task 6. (3) The expansion suggests someone (Isaac/prior session) kept building post-ledger — **needs Isaac confirm at Gate 1** that the expansions are approved kit surface, not experiments.

## 2. Variables Parity (Figma ↔ globals.css ↔ designTokens)

**Method:** Figma values read via MCP `get_variable_defs` on the foundation **frames** (`11:2` ramps, `12:2` status+semantic, `14:2` type, `15:2` spacing/radius, `16:2` elevation — page-level nodes error, frame-level works URL-only, no desktop selection needed); code side parsed from `globals.css` with `var()` alias resolution and exact oklch→hex conversion (culori); Sanity side from the `designTokens` singleton. Script: `.agents/audit-vars-compare.mjs`.

### ✅ Verdict: PERFECT PARITY — zero drift
| Comparison | Result |
|---|---|
| 69 colors (5 ramps + neutral + status), Figma hex vs code oklch→hex | **69/69 MATCH** |
| 7 radius tokens (sm6 → 4xl26) vs code `calc(var(--radius)×k)` | **7/7 MATCH** |
| Sanity `designTokens` (44 synced ramp tokens) vs Figma | **44/44 MATCH** |
| 7 shadows (xs…2xl + Focus Ring) vs code `--shadow-*` | MATCH (Shadow/lg + Shadow/xl verified value-exact this week; remaining geometrically identical) |
| 8 spacing steps (`spacing/xs`=4 … `4xl`=96) | **By-design aliases of Tailwind's default scale** — no code vars, no drift |
| 12 type styles (Poppins/Geist Mono specimens) | Figma text **styles** (not variables); match the DS type scale in use |

### 114-vs-119 resolved
Observed union: 69 colors + 8 spacing + 7 radius = **84 = the ledger's Primitives collection exactly**; + 30 Semantic = **114** (the `phaseF4` figure). The qaAudit's **119** adds the 5 `chart/1–5` semantic vars created in wave 5. **Both ledger numbers are correct — different counting scopes. Authoritative total: 119 (84 primitives + 30 semantic + 5 chart).**

**Mode note:** the `12:2` frame renders Light/Dark pairs; the tool returns per-node resolved values, so one `--background` read back as the dark value (#010405) — a rendering artifact, not drift (dark values verified against `.dark` block separately).
**No fixes needed** — the spec's "fix only real drift" clause is satisfied vacuously; nothing for Gate-1 decision §6 item 6 (withdrawn).

## 3. Dataset Census

**Method:** GROQ via repo read client, `perspective: 'raw'` (drafts included), 2026-07-02 (`.agents/audit-census.mjs`).

| Question | Result |
|---|---|
| `loanProductPage` documents (incl. drafts) | **0** |
| `disclaimerSnippet` documents | **0** |
| loan pages referencing noticeBlock snippets | **0** |
| Orphan doc types present | `homePage`, `sitemapPage` (as the June plan predicted) |
| `designTokens` singleton | present; 4 palettes (fcu-primary/secondary/…) with cssVariable/hex/oklch per token + `lastSyncedAt` |
| `SANITY_API_WRITE_TOKEN` | **VALID** (zero-mutation `/users/me` check) |

### ⚖️ Verdict: **Phase-2 legacy deletion = CLEAN DELETE**
Zero real `loanProductPage`/`disclaimerSnippet` content exists — the June plan's delete-first Task 1 executes as written (census gate passes; no migration mini-task needed). Orphan `homePage`/`sitemapPage` docs get cleaned in Phase 3 per the refreshed plan.

## 4. Copy Drift (recipes vs live pages)

**Method:** recipe copy via `get_design_context` on frames `87:2`/`89:2`/`90:2` (exact rendered strings incl. instance overrides; subagent extraction 2026-07-02) vs live copy from a production build (`next start`, tag-stripped text). Full recipe skeletons with block mappings are preserved in the extraction output and will seed Phase 3.

| Page | Verdict | Notes |
|---|---|---|
| Home (`/` vs `87:2`) | **≈ MATCH** | Hero ("Banking that belongs to you."), stats (52,000+/4.85%/$0), 6 product tiles, 6 why-us items, community split ($2.4m/180+), testimonial, CTA — live and recipe agree nearly verbatim. |
| Everyday (`/accounts/everyday` vs `89:2`) | **≈ MATCH** | Hero, 6 features, rates table rows ($0.00/0.10%/Free·instant + illustrative footnote), 3 pairs tiles, CTA — agree. |
| Home Loan (`/loans/home` vs `90:2`) | **≈ MATCH** | Hero (6.45%), calculator band (live has the REAL interactive widget; recipe has the placeholder), 4 steps, why-borrow checklist, FAQ, CTA — agree. |

### ⚖️ Verdict: **seed source = recipe copy (equivalently: live copy)** — the two are the same content
The hand-coded pages were built from the recipes (or vice versa). Phase-3 seeding can lift copy from either; the recipes stay the Gate-4 pixel baseline. Known gaps to fill at seeding: FAQ answers exist only for Q1 in the design (3 collapsed questions have no answer copy — marketing to supply); hard-typed rates (4.85%/6.45%) must be confirmed current before publish.

### 🔎 Major correction discovered
**The live homepage is NOT "Coming Soon"** — `/` renders the full marketing home page (hand-coded). The April project-overview memory and the spec's framing ("publishing the Home document replaces the Coming-Soon homepage → de-facto launch") are stale on this point. The publish-before-swap rule still applies, but the launch-decision framing needs Gate-1 re-confirmation: what does production Vercel actually serve today, and does Home-publish still constitute a launch event?

## 5. Component-vs-Code Diff (seeds Phase 1)

**Method:** all 16 kit components judged against their code counterparts, using the **current expanded kit surface** from §1 (not the ledger's stale variant lists). Verdicts from direct file reads, 2026-07-02.

### ⚖️ Verdict: **14 skip · 0 fidelity-check · 1 extend · 1 build** — Phase 1 is small
| Component | Verdict | Phase-1 action | Note |
|---|---|---|---|
| Button, Badge, Stat, Testimonial, Alert, Description Row/List, Accordion, Stepper, CTA Banner, Section Head, Product Tile, Feature Item, Checklist Item, Split | **EXISTS** | **skip** | Full parity with the expanded kit — incl. Button's 8v×4s+states, Badge Solid+Counter, Alert 5×3 displays, Testimonial 4 variants, Stepper vertical, CTA 4 layouts. The kit was built FROM code and the post-ledger kit expansion mirrored code features that already existed. |
| **Hero** | PARTIAL | **extend** | `hero.tsx` lacks the **Hero / Full Image** variants (Background=Photo/Gradient, set `100:74`) — the one real component gap. |
| **Widget Placeholder** | MISSING | **build** | No code counterpart (globs empty) — needed by `widgetBlock`'s empty/placeholder state in the builder. Small. |

Notables: kit "Inline" CTA layout = code layout `default` (naming mismatch to record for Code Connect); Checklist stays on the disliked-but-current design per Decision 3; Feature Item's 11-icon curation is kit-side only (code accepts any icon — the builder's semantic-key registry will constrain it).

**Consequence:** Phase 1 shrinks to: extend Hero (Full Image variants) + build Widget Placeholder + fidelity-probe pass over the 14 skips (spot-check, not rebuild). Gate 2 should be quick.

## 6. Decisions — RESOLVED at Gate 1 (Isaac, 2026-07-02)

**GATE 1: APPROVED.** Phase 1 unlocked.

1. **Kit expansion — APPROVED as official surface.** Isaac: *"Figma is always the source of truth for components and design."* Phase-1 fidelity targets = the current expanded kit. Follow-up: fix the two contradicting kit doc-notes in Figma.
2. **Kit-vs-doc contradictions** — resolved by #1: the built variants win; doc-text gets corrected kit-side.
3. **Home-page launch framing — signed off.** Isaac approves the CMS-driven homepage; publish-before-swap still applies mechanically (Home publishes last), but no separate launch ceremony beyond Gate-4 per-page approval.
   **NEW instruction:** **swap all illustrations for placeholders** on the CMS-driven pages — seeds attach no illustration assets; renderers show a DS placeholder treatment where an image would appear; marketing uploads real imagery in Studio later.
4. **FAQ answer copy (§4):** still with marketing — 3 of 4 Home-Loan answers needed before Phase-3 publish.
5. **Rates confirmation (§4):** still with marketing — confirm 4.85% / 6.45% / 0.10% before publish.
6. ~~Variables audit scope~~ — withdrawn (perfect parity, nothing to decide).
