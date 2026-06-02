# FCU Design System — Phase 1: Foundation (Tokens + Showcase Scaffold + Intercom Removal) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the FCU design-system token system into the app site-wide, scaffold the public `/design-system` showcase with a Foundations section, and remove the Intercom analytics dashboard — all without altering the Header or Footer.

**Architecture:** Tailwind v4 token indirection. We merge the hand-off tokens into the existing `src/app/globals.css` (add cool-slate neutrals, status, extended semantics, shadows; remap shadcn semantic tokens to the FCU ramps/neutrals; preserve all existing animations, sidebar tokens, the `.dark` stub, and fonts). Components consume semantic tokens, so this reskins the site while the Header/Footer — which use explicit `fcu-*` ramps and import no `ui/` primitives — stay visually identical.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind v4 (`@theme` / `@theme inline`), Sanity, Base UI shadcn primitives. Verification via browser automation (Claude Preview / Claude in Chrome MCP) for screenshots + `npm run build` / `npm run lint`.

**Plan series:** This is plan **1 of 7**. Phases 2–7 (primitives → containers → nav → feedback → overlays → marketing) each get their own plan, written after the prior phase's sign-off. Source of truth: `component-design-planning/FCU-DESIGN-SYSTEM-MIGRATION-SPEC.md`.

**Conventions for this plan:**
- This is CSS/visual + scaffolding work; strict unit-test TDD doesn't map cleanly. We substitute **evidence-based verification**: a baseline screenshot captured *before* changes (the "expected" state for the Header/Footer safety test), build/lint gates, and a runtime token assertion. That baseline-first step is the TDD analogue — capture the expected state, then prove the change didn't break it.
- Work on a feature branch (see Task 0). Commit after each task.
- Do **not** edit `header.tsx`, `header-client.tsx`, `footer.tsx`, `footer-client.tsx`.

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `src/app/globals.css` | Token system (the merge target) | Modify |
| `src/app/layout.tsx` | Font wiring (`--font-sans` → Poppins reconciliation) | Modify (only if needed) |
| `src/app/(frontend)/design-system/page.tsx` | Public showcase entry; renders section components | Create |
| `src/app/(frontend)/design-system/layout.tsx` | Showcase shell: sidebar nav + anchors | Create |
| `src/app/(frontend)/design-system/_components/showcase-nav.tsx` | Sidebar nav (section anchors) | Create |
| `src/app/(frontend)/design-system/_components/section.tsx` | Reusable section wrapper (title + anchor) | Create |
| `src/app/(frontend)/design-system/_sections/foundations.tsx` | Foundations section: color ramps, type scale, shadows, radii | Create |
| `src/app/(frontend)/intercom-analytics/` | Analytics dashboard (delete) | Delete |

> Baseline screenshots are saved under `component-design-planning/baselines/` (gitignored or committed per your preference) — they are verification artifacts, not app code.

---

## Task 0: Branch + verify clean baseline

**Files:** none (git + tooling)

- [ ] **Step 1: Confirm clean working tree and create a feature branch**

Run:
```
git status --short
git switch -c feat/design-system-phase-1-foundation
```
Expected: clean tree (only the committed spec ahead of origin); new branch created.

- [ ] **Step 2: Confirm the app builds before any change (baseline gate)**

Run: `npm run build`
Expected: build succeeds (this is the pre-change baseline; if it fails, stop and report — do not proceed).

- [ ] **Step 3: Start the dev server for screenshotting**

Run: `npm run dev` (background)
Expected: server on http://localhost:3000.

---

## Task 1: Capture Header/Footer + sample baselines (the safety "expected" state)

**Files:** `component-design-planning/baselines/*` (artifacts)

- [ ] **Step 1: Capture baseline screenshots BEFORE token changes**

Using the browser MCP (Claude Preview or Claude in Chrome), navigate to and full-page screenshot:
- `http://localhost:3000/` (homepage — Header + ComingSoon + Footer)
- a `[...slug]` page that renders Header + ComingSoon + Footer (confirm the slug actually resolves first, e.g. `http://localhost:3000/personal-loan`; if unsure, the homepage already exercises Header + Footer and is sufficient)
Save as `baselines/before-home.png`, `baselines/before-slug.png`.

- [ ] **Step 2: Record computed token baseline**

In the browser console (via MCP `eval`), capture and note:
```js
const s = getComputedStyle(document.documentElement)
;['--primary','--secondary','--muted-foreground','--border','--background','--foreground'].map(v => [v, s.getPropertyValue(v).trim()])
```
Expected (pre-change): `--primary` ≈ `oklch(0.205 0 0)` (near-black), `--secondary` ≈ `oklch(0.97 0 0)`. Save output to `baselines/tokens-before.txt`.

- [ ] **Step 3: Commit baselines**

```
git add component-design-planning/baselines
git commit -m "test(ds): capture Header/Footer + token baselines before Phase 1"
```

---

## Task 2: Merge the token system into `globals.css`

**Files:**
- Modify: `src/app/globals.css`

**Context:** Current structure — `@theme` (fonts + `--color-fcu-*` ramps), `:root` (pure-gray shadcn semantics), `.dark`, `@theme inline` (semantic `--color-*` map + radius + animation keyframes), `@layer base`. We **keep** the `@theme` ramps and all `@theme inline` animations/sidebar untouched; we **rewrite `:root`** to add neutrals/status/extended/shadows and remap semantics; we **append** new `--color-*` exposures to `@theme inline`.

- [ ] **Step 1: Replace the `:root { … }` block** (the pure-gray block beginning `--background: oklch(1 0 0);` and ending at `--sidebar-ring`) with:

```css
:root {
  /* ── Neutrals — cool slate, 220° (harmonise with primary blue) ── */
  --neutral-0:   oklch(100%   0     0);
  --neutral-25:  oklch(99.0%  0.003 220);
  --neutral-50:  oklch(97.8%  0.005 220);
  --neutral-100: oklch(95.5%  0.007 220);
  --neutral-200: oklch(91.5%  0.010 220);
  --neutral-300: oklch(85.0%  0.012 220);
  --neutral-400: oklch(70.0%  0.014 220);
  --neutral-500: oklch(56.0%  0.014 220);
  --neutral-600: oklch(44.0%  0.014 220);
  --neutral-700: oklch(34.0%  0.014 220);
  --neutral-800: oklch(24.0%  0.013 220);
  --neutral-900: oklch(16.5%  0.012 220);
  --neutral-950: oklch(10.0%  0.010 220);

  /* ── Status ── */
  --status-success-50:  oklch(96% 0.030 160);
  --status-success-500: oklch(58% 0.110 160);
  --status-success-700: oklch(44% 0.090 160);
  --status-warning-50:  oklch(97% 0.030 75);
  --status-warning-500: oklch(70% 0.130 75);
  --status-warning-700: oklch(52% 0.110 75);
  --status-danger-50:   oklch(96% 0.025 25);
  --status-danger-500:  oklch(60% 0.180 25);
  --status-danger-700:  oklch(48% 0.160 25);
  --status-info-50:     oklch(96% 0.025 240);
  --status-info-500:    oklch(62% 0.140 240);
  --status-info-700:    oklch(48% 0.115 240);

  /* ── Radius ── */
  --radius: 0.625rem;

  /* ── shadcn semantic tokens (THE MAP) — reference ramps/neutrals ── */
  --background: var(--neutral-0);
  --foreground: var(--neutral-900);
  --card: var(--neutral-0);
  --card-foreground: var(--neutral-900);
  --popover: var(--neutral-0);
  --popover-foreground: var(--neutral-900);

  --primary: var(--color-fcu-primary-900);
  --primary-foreground: var(--neutral-0);

  /* Reserved-secondary: maps to NEUTRAL, never brand green */
  --secondary: var(--neutral-100);
  --secondary-foreground: var(--neutral-900);
  --muted: var(--neutral-100);
  --muted-foreground: var(--neutral-600);
  --accent: var(--neutral-100);
  --accent-foreground: var(--neutral-900);

  --destructive: var(--status-danger-500);
  --destructive-foreground: var(--neutral-0);

  --border: var(--neutral-200);
  --input: var(--neutral-200);
  --ring: var(--color-fcu-primary-700);

  /* ── Extended semantic tokens ── */
  --surface: var(--neutral-25);
  --surface-muted: var(--neutral-50);
  --surface-sunken: var(--neutral-100);
  --foreground-muted: var(--neutral-600);
  --foreground-subtle: var(--neutral-500);
  --primary-hover: var(--color-fcu-primary-800);
  --primary-active: var(--color-fcu-primary-950);
  --primary-subtle: var(--color-fcu-primary-50);
  --border-strong: var(--neutral-300);
  --brand-accent: var(--color-fcu-secondary-700);
  --brand-accent-subtle: var(--color-fcu-secondary-100);

  /* ── Chart palette (brand-derived per spec) ── */
  --chart-1: var(--color-fcu-primary-700);
  --chart-2: var(--color-fcu-primary-400);
  --chart-3: var(--color-fcu-secondary-500);
  --chart-4: var(--color-fcu-mint-500);
  --chart-5: var(--neutral-300);

  /* ── Shadows — cool-tinted (220°) ── */
  --shadow-xs: 0 1px 2px 0 oklch(20% 0.02 220 / 0.04);
  --shadow-sm: 0 1px 2px 0 oklch(20% 0.02 220 / 0.05), 0 1px 3px 0 oklch(20% 0.02 220 / 0.04);
  --shadow-md: 0 2px 4px -1px oklch(20% 0.02 220 / 0.06), 0 4px 8px -2px oklch(20% 0.02 220 / 0.05);
  --shadow-lg: 0 4px 8px -2px oklch(20% 0.02 220 / 0.06), 0 12px 24px -4px oklch(20% 0.02 220 / 0.08);
  --shadow-xl: 0 8px 16px -4px oklch(20% 0.02 220 / 0.08), 0 24px 48px -8px oklch(20% 0.02 220 / 0.10);
  --shadow-2xl: 0 32px 64px -12px oklch(20% 0.02 220 / 0.14);
  --shadow-focus: 0 0 0 3px oklch(70% 0.10 220 / 0.35);

  /* ── Sidebar (remapped to brand/neutral) ── */
  --sidebar: var(--neutral-25);
  --sidebar-foreground: var(--neutral-900);
  --sidebar-primary: var(--color-fcu-primary-900);
  --sidebar-primary-foreground: var(--neutral-0);
  --sidebar-accent: var(--neutral-100);
  --sidebar-accent-foreground: var(--neutral-900);
  --sidebar-border: var(--neutral-200);
  --sidebar-ring: var(--color-fcu-primary-700);
}
```

> Note: `var(--color-fcu-primary-900)` etc. resolve because the existing `@theme` block emits the `fcu-*` ramps as `:root` custom properties. Do **not** move or rename the `@theme` ramp block — the Header/Footer's `bg-fcu-*` utilities depend on it.

- [ ] **Step 2: Leave the `.dark { … }` block as-is** (light-first; keep the existing dark stub working). No change.

- [ ] **Step 3: Append new token exposures inside the existing `@theme inline { … }` block** (do NOT remove the existing semantic `--color-*` mappings, radius, sidebar, animations, or keyframes). Add:

```css
  /* ── Neutrals as utilities (overrides Tailwind default neutral — intended) ── */
  --color-neutral-0: var(--neutral-0);
  --color-neutral-25: var(--neutral-25);
  --color-neutral-50: var(--neutral-50);
  --color-neutral-100: var(--neutral-100);
  --color-neutral-200: var(--neutral-200);
  --color-neutral-300: var(--neutral-300);
  --color-neutral-400: var(--neutral-400);
  --color-neutral-500: var(--neutral-500);
  --color-neutral-600: var(--neutral-600);
  --color-neutral-700: var(--neutral-700);
  --color-neutral-800: var(--neutral-800);
  --color-neutral-900: var(--neutral-900);
  --color-neutral-950: var(--neutral-950);

  /* ── Status as utilities ── */
  --color-status-success-50: var(--status-success-50);
  --color-status-success-500: var(--status-success-500);
  --color-status-success-700: var(--status-success-700);
  --color-status-warning-50: var(--status-warning-50);
  --color-status-warning-500: var(--status-warning-500);
  --color-status-warning-700: var(--status-warning-700);
  --color-status-danger-50: var(--status-danger-50);
  --color-status-danger-500: var(--status-danger-500);
  --color-status-danger-700: var(--status-danger-700);
  --color-status-info-50: var(--status-info-50);
  --color-status-info-500: var(--status-info-500);
  --color-status-info-700: var(--status-info-700);

  /* ── Extended semantics as utilities ── */
  --color-surface: var(--surface);
  --color-surface-muted: var(--surface-muted);
  --color-surface-sunken: var(--surface-sunken);
  --color-foreground-muted: var(--foreground-muted);
  --color-foreground-subtle: var(--foreground-subtle);
  --color-primary-hover: var(--primary-hover);
  --color-primary-active: var(--primary-active);
  --color-primary-subtle: var(--primary-subtle);
  --color-border-strong: var(--border-strong);
  --color-brand-accent: var(--brand-accent);
  --color-brand-accent-subtle: var(--brand-accent-subtle);
```

- [ ] **Step 4: Build to verify the CSS compiles**

Run: `npm run build`
Expected: build succeeds. If Tailwind errors on an unknown var, fix the offending reference before continuing.

- [ ] **Step 5: Commit**

```
git add src/app/globals.css
git commit -m "feat(ds): merge FCU design-system tokens into globals.css"
```

---

## Task 3: Reconcile fonts (only if needed)

**Files:**
- Inspect: `src/app/layout.tsx`
- Inspect: the `@theme` font block in `src/app/globals.css`

- [ ] **Step 1: Verify `--font-sans` resolves to Poppins**

The hand-off wants `--font-sans` = Poppins. Today `layout.tsx` sets Geist's variable as `--font-sans` on `<html>` while `<body>` uses `poppins.className`, and `globals.css` `@theme` declares `--font-sans: 'Poppins', …`. Confirm body text renders Poppins (it already should). Only change wiring if the rendered body font is NOT Poppins.

- [ ] **Step 2: If a change is needed**, align so `--font-sans` → Poppins and `--font-mono` → Geist Mono without altering the Header/Footer's rendered typography (they inherit body Poppins today). Otherwise, no change.

- [ ] **Step 3: Build + commit (only if changed)**

```
npm run build
git add src/app/layout.tsx src/app/globals.css
git commit -m "fix(ds): wire --font-sans to Poppins for the design system"
```

---

## Task 4: Header/Footer safety verification (the critical gate)

**Files:** `component-design-planning/baselines/*` (artifacts)

- [ ] **Step 1: Capture AFTER screenshots** (dev server running) at the same URLs as Task 1: save `baselines/after-home.png`, `baselines/after-slug.png`.

- [ ] **Step 2: Compare Header & Footer regions before vs after**

Visually diff the Header (top) and Footer (bottom) regions of `before-*` vs `after-*`.
Expected: **identical**. The body/middle (ComingSoon) may shift (neutral/primary reskin) — that's fine. If the Header or Footer changed:
- Identify the offending semantic class in `header-client.tsx` (likely `text-muted-foreground`, `border-border`, `bg-accent`, or `text-foreground`).
- Per the spec §5 safeguard, pin that specific usage to an explicit value (e.g. swap `text-muted-foreground` for an explicit `text-[oklch(0.556_0_0)]` or a frozen utility) **in the showcase-safe way** — but do NOT restructure the Header. Re-screenshot until Header/Footer match.

- [ ] **Step 3: Record computed tokens AFTER and confirm the remap**

Re-run the Step-2 console snippet from Task 1.
Expected: `--primary` now resolves to FCU blue (≈ `oklch(0.478…0.087 220)`), `--secondary` resolves to a **neutral** (cool slate), not green. Save to `baselines/tokens-after.txt`.

- [ ] **Step 4: Commit verification artifacts**

```
git add component-design-planning/baselines
git commit -m "test(ds): Header/Footer unchanged; tokens remapped (Phase 1 safety gate)"
```

---

## Task 5: Remove the Intercom analytics dashboard

**Files:**
- Delete: `src/app/(frontend)/intercom-analytics/` (entire folder)

- [ ] **Step 1: Confirm no inbound references** (should be none — verified in spec §11)

Run a search for `intercom-analytics` across `src/`.
Expected: matches only inside the folder being deleted. If a nav/sitemap/link references it, remove that reference too.

- [ ] **Step 2: Delete the folder**

```
git rm -r "src/app/(frontend)/intercom-analytics"
```

- [ ] **Step 3: Confirm the Penny widget is untouched**

Verify `src/components/intercom-provider.tsx`, its import/use in `src/app/(frontend)/layout.tsx`, and `src/types/intercom.d.ts` still exist and are unchanged.

- [ ] **Step 4: Build to confirm no dangling imports**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```
git commit -m "chore: remove Intercom analytics dashboard (keep Penny chat widget)"
```

---

## Task 6: Scaffold the public `/design-system` showcase

**Files:**
- Create: `src/app/(frontend)/design-system/layout.tsx`
- Create: `src/app/(frontend)/design-system/page.tsx`
- Create: `src/app/(frontend)/design-system/_components/section.tsx`
- Create: `src/app/(frontend)/design-system/_components/showcase-nav.tsx`

> Public route (no Clerk gate). It lives under `(frontend)` so it inherits the site shell; if the global Header/Footer are unwanted on the showcase, render it within its own layout container. Decision for execution: keep the global Header/Footer (simplest) unless they crowd the gallery — confirm during review.

- [ ] **Step 1: Create `section.tsx`** — a wrapper that renders an anchored `<section>` with an `id`, a title (H2), optional description, and children. Uses semantic tokens only.

- [ ] **Step 2: Create `showcase-nav.tsx`** — a sidebar listing section anchors (Foundations first; placeholders for the upcoming component phases). Sticky on desktop, collapses on mobile.

- [ ] **Step 3: Create `layout.tsx`** — two-column shell: `showcase-nav` + scrollable content area (`max-w` container). Semantic tokens; responsive.

- [ ] **Step 4: Create `page.tsx`** — imports the Foundations section (Task 7) and renders it inside the shell. Imports section components; does NOT inline component code.

- [ ] **Step 5: Build + view**

Run: `npm run build`; then load `http://localhost:3000/design-system`.
Expected: route renders 200, sidebar + empty content shell visible, no Clerk redirect.

- [ ] **Step 6: Commit**

```
git add "src/app/(frontend)/design-system"
git commit -m "feat(ds): scaffold public /design-system showcase shell"
```

---

## Task 7: Build the Foundations section

**Files:**
- Create: `src/app/(frontend)/design-system/_sections/foundations.tsx`

Reference: hand-off `html/Foundations.html` + `screenshots/01-Foundations.png` + `01-globals-css.md` (type scale).

- [ ] **Step 1: Implement the Foundations section** rendering:
  - **Color ramps:** swatch rows for `fcu-primary` (50–950), `fcu-secondary`, `fcu-mint`, `fcu-green-faded`, `neutral` (0–950), and status (success/warning/danger/info). Each swatch shows the utility name + resolved value. Use the exposed utilities (`bg-fcu-primary-700`, `bg-neutral-100`, `bg-status-danger-500`, etc.). Note: the four `fcu-*` ramps are already emitted as `bg-fcu-*` utilities by the existing `@theme` block — no extra exposure is needed; only `neutral-*` and `status-*` were newly added in Task 2.
  - **Semantic tokens:** swatches for `background/foreground/card/primary/secondary/muted/accent/border/ring/destructive/brand-accent`.
  - **Type scale:** one row per token, rendered in Poppins (mono row in Geist Mono w/ tabular nums). Exact values (size / line-height / tracking / weight), inlined from `01-globals-css.md` so this task is self-contained:
    - Display 2XL — 72 / 1.05 / -0.035em / 600
    - Display XL — 60 / 1.05 / -0.030em / 600
    - Display L — 48 / 1.10 / -0.025em / 600
    - Display M — 36 / 1.15 / -0.020em / 600
    - H1 — 30 / 1.20 / -0.018em / 600
    - H2 — 24 / 1.25 / -0.012em / 600
    - H3 — 20 / 1.30 / -0.008em / 600
    - H4 — 18 / 1.35 / -0.004em / 600
    - Body L — 17 / 1.60 / 0 / 400
    - Body M (base) — 15 / 1.60 / 0 / 400
    - Body S — 13 / 1.55 / 0 / 400
    - Label — 13 / 1.30 / -0.002em / 500
    - Caption — 11.5 / 1.45 / 0.04em / 500 (uppercase)
    - Mono — 13 / 1.50 / 0 / 400 (Geist Mono, tabular nums)
  - **Radii:** boxes for `rounded-sm/md/lg/xl/2xl`.
  - **Shadows:** cards for `shadow-xs … shadow-2xl` + focus ring sample.

- [ ] **Step 2: Build + screenshot the Foundations section**

Run: `npm run build`; load `/design-system#foundations`; screenshot to `baselines/foundations-after.png`.

- [ ] **Step 3: Compare to the reference**

Open `screenshots/01-Foundations.png` and `html/Foundations.html`. Verify ramps, type scale, radii, and shadows match (reserved-secondary respected: green only in the secondary ramp + `brand-accent`, not in semantic surfaces).
Expected: high-fidelity match. Fix discrepancies.

- [ ] **Step 4: Commit**

```
git add "src/app/(frontend)/design-system/_sections/foundations.tsx" component-design-planning/baselines
git commit -m "feat(ds): Foundations showcase section (ramps, type, radii, shadows)"
```

---

## Task 8: Phase-1 acceptance gate

**Files:** none (verification)

- [ ] **Step 1: Automated gates**

Run: `npm run build` then `npm run lint`.
Expected: both pass. (`npm run build` also runs `typegen` via `prebuild` — Sanity types unaffected.)

- [ ] **Step 2: Acceptance checklist** (from spec §7) — confirm each:
  - `--primary` = FCU blue; links/rings/buttons read blue.
  - `--secondary`/`--accent`/`--muted` are neutral, not green; green only via `brand-accent`/`fcu-secondary-*`.
  - Body + headings render Poppins; numbers render Geist Mono w/ tabular figures.
  - `rounded-lg` = 10px; shadows read cool, not black.
  - Existing animated components still animate (spot-check a page using shimmer/shine/border-beam, e.g. footer or a demo page).
  - **Header & Footer visually identical** to baseline (Task 4).
  - Penny chat widget still loads; `/intercom-analytics` is gone (404).

- [ ] **Step 3: Summarize for sign-off**

Post the before/after Header/Footer screenshots, the Foundations screenshot vs reference, and the token before/after values. **Await user sign-off** before merging the branch or starting Phase 2.

- [ ] **Step 4: (After sign-off) Finishing the branch**

Use superpowers:finishing-a-development-branch to decide merge/PR. Do not push to `main` without confirming scope (per the repo's git working style).

---

## Out of scope (Phase 1)

Component reskins (Phases 2–7), dark-theme authoring, changes to `/demo`, `/component-design`, `/design-guidelines`, Sanity schema/content, and any edit to Header/Footer files.
