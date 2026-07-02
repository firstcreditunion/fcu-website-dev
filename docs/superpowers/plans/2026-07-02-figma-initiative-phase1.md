# Figma Initiative — Phase 1 (Component Gap-Fill) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Small phase — 2 components + fidelity gate.

**Goal:** Close the two component gaps from the Gate-1 diff (audit §5) — extend Hero with the Full-Image variants, build Widget Placeholder — and produce the Gate-2 fidelity sheet.

**Architecture:** Pure presentational components on the existing DS (Base UI + Tailwind v4 tokens, `src/components/marketing/`), showcased at `/design-system` (repo convention: every kit component has a showcase section = the probe surface). No Sanity coupling (schemas land in Phase 2 per the Figma doc-note "shipped to schema + renderer together" — the renderer half is Phase 2's heroBlock/widgetBlock tasks).

**Fidelity sources (Figma = source of truth, Isaac 2026-07-02):** Hero/Full Image set `100:74` (Background=Photo|Gradient; eyebrow/actions/feature toggles; Jump-To bar `109:6`) · Widget Placeholder `86:5`. Specs extracted 2026-07-02 via `get_design_context` (exact values embedded in tasks).

**Hub group:** `Figma Initiative · P1 Component Gap-Fill` — tick per task (Isaac's identity).

---

### Task 0: Branch + hub sync
- [ ] `git checkout -b feat/phase1-gap-fill` from up-to-date `main`; green baseline (tsc/lint real exit codes)
- [ ] Hub: `Component diff: 16 kit components vs code (from Gate 1)` → `complete` (evidence: audit §5, done in Phase 0); `Build/reskin gap components to Figma fidelity` → `in_progress`
- [ ] Commit plan doc

### Task 1: WidgetPlaceholder (`src/components/marketing/widget-placeholder.tsx`)
Spec (86:5): `bg-surface`, `border-2 border-dashed border-border-strong`, `rounded-xl`, h-[380px], flex-col centered gap-2.5; 40px muted glyph (lucide `SlidersHorizontal` stand-in — kit glyph is placeholder-set anyway, note in sheet); title "Interactive widget — rendered by the app" 16px Poppins SemiBold `text-foreground-muted`; widget name 12px Geist Mono Medium `text-foreground-subtle`. Props: `{ widget: string; className? }`.
- [ ] Component + showcase section (`/design-system` `_sections/widget-placeholder.tsx`, registered in nav SECTIONS + page)
- [ ] Gate: typegen-untouched, tsc/lint/vitest real exits → commit

### Task 2: HeroFullImage + JumpTo (extend `src/components/marketing/hero.tsx`)
Spec (100:74): 560px full-bleed panel `rounded-2xl` overflow-clip.
- Background `gradient`: `linear-gradient(159deg, var(--color-fcu-primary-800) 14.8%, var(--color-fcu-primary-950) 85.2%)`.
- Background `photo`: cover image + dual scrim `linear-gradient(180deg, transparent 60%, color-mix(in oklch, var(--color-fcu-primary-950) 45%, transparent) 100%), linear-gradient(90deg, color-mix(in oklch, var(--color-fcu-primary-950) 92%, transparent) 0%, color-mix(... 55%, transparent) 55%, color-mix(... 8%, transparent) 100%)`; **photo absent → placeholder treatment** (`bg-surface-sunken`, centered muted glyph) per the Isaac placeholder rule — matches the kit's own Photo-variant placeholder.
- Content column (left, max-w-[620px], vertically centered, desktop inset 120px → responsive `px-[clamp(24px,8.3vw,120px)]`): eyebrow pill (white/14 bg, white/25 border, rounded-full, 12px mono uppercase white), title 56px→clamp Poppins SemiBold leading-[1.06] tracking-[-0.03em] white, lede 18px/1.6 white/82, actions slot (ReactNode — callers style; showcase demos the white-inverted primary + white ghost per Figma).
- Feature slot (optional, right, 560px, vertically centered): `{ src, alt }` renders image; `'placeholder'` renders the kit's slot look (white/8 bg rounded-[14px], centered glyph + "transparent product shot" 11px mono white/50).
- `JumpTo` export (109:6 Bar style): full-width, `bg-primary-subtle border border-primary rounded-xl px-[22px] py-[13px]`, "JUMP TO" 11px mono +0.44 uppercase `text-foreground-subtle`, links 13px Poppins Medium `text-primary` separated by `·`; props `links: {label, anchor}[]`.
- Mobile (<880px): single column, feature slot stacks below (or hides via prop), insets collapse.
- [ ] Implement + showcase section (Photo-placeholder, Gradient, feature-slot, JumpTo demos)
- [ ] Gate: tsc/lint/vitest → commit

### Task 3: Fidelity gate (Gate 2)
- [ ] Playwright probe (navbar machinery, `.agents/`): token-resolved computed styles on the two NEW components (panel radius 18px, gradient stops resolve to fcu-primary-800/950, dashed border-strong, mono eyebrow metrics) + settled screenshots vs Figma `get_screenshot` of `100:74` / `86:5`
- [ ] Screenshot sheet of the 14 existing matches from `/design-system` (spot-check pass — the diff already verified their variant surface; no rebuilds)
- [ ] Assemble Gate-2 fidelity sheet (`docs/superpowers/audits/2026-07-02-phase1-fidelity.md`), commit, ff-merge → main, push
- [ ] Hub: `Build/reskin gap components…` + `Fidelity probe suite green…` → `complete`; present Gate 2 to Isaac; on approval `Gate 2: fidelity sheet approved` → `complete`, P2 first task → `in_progress`

**Out of scope:** heroBlock/widgetBlock schemas + renderers (Phase 2); Jump-To style decision beyond Bar (kit keeps variants); the two Figma doc-note fixes (separate follow-up).
