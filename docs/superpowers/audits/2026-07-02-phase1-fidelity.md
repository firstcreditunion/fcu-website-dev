# Figma Initiative — Phase 1 Fidelity Sheet (Gate 2)

**Date:** 2026-07-02 · **Plan:** `docs/superpowers/plans/2026-07-02-figma-initiative-phase1.md` · Branch `feat/phase1-gap-fill`

## Scope executed
From the Gate-1 diff (audit §5: 14 skip / 1 extend / 1 build):
- **Built:** `WidgetPlaceholder` (`src/components/marketing/widget-placeholder.tsx`, kit `86:5`)
- **Extended:** `HeroFullImage` + `JumpTo` (`src/components/marketing/hero.tsx`, kit `100:74` + `109:6`)
- Both registered as `/design-system` sections (`hero-full-image`, `widget-placeholder`) — durable docs + probe surface.

## Probe results: **20/20 PASS** (token-resolved, `.agents/gate2-probe.mjs`)
| Component | Verified |
|---|---|
| WidgetPlaceholder | h-380 · radius-xl 14px · 2px dashed `--border-strong` · bg `--surface` · 12px Geist Mono widget name · 16px semibold title |
| HeroFullImage | radius-2xl 18px · photo-absent = `--surface-sunken` placeholder treatment (Isaac rule) · gradient == exact `fcu-primary-800→950` token stops · white title/eyebrow (Geist Mono pill) · container-proportional type (3.9cqw, verified at 918px container) |
| JumpTo | radius-xl · bg `--primary-subtle` · border `--primary` · mono label + primary links |
| 14 existing matches | screenshot sheet captured (14/14) — spot-check pass, no rebuilds (variant surface verified at Gate 1) |

## Engineering note — container queries
The kit frames are 1440px full-bleed; real surfaces (showcase ≈918px, builder sections ≈1200px) are narrower. The component uses **container-relative sizing** (`@container` + `cqw` units): insets 8.3cqw (=120/1440), copy column 43cqw (=620/1440), feature slot 38.9cqw (=560/1440), title 3.9cqw (=56/1440) — so it renders the exact Figma geometry at 1440 and a faithful proportional scale at any narrower width. Probes assert the ratios, not fixed pixels.

## Deviations / notes (all minor, flagged)
1. **Glyph stand-ins:** kit placeholder glyphs → lucide `SlidersHorizontal` (widget) / `ImageIcon` (photo + feature slots). Icon set is provisional (marketing deciding) — renderer-only swap later.
2. **Action buttons are a styled-by-caller slot** (matches the standard Hero pattern); the kit's white-inverted primary is demonstrated in the showcase, not baked into the component.
3. At narrow scales the two demo actions wrap to two rows (flex-wrap) — inline at design width, as Figma.

## Visual pairs
Figma `100:74` vs rendered photo/gradient variants + `86:5` vs rendered placeholder — reviewed in-session (scaled-proportional match). Screenshots: scratchpad `g2-hero-photo.png`, `g2-hero-gradient.png`, `g2-widget-ph.png`, `figma-hero-full.png`, `figma-widget-ph.png`, `g2-sheet-*.png` (14).

**Gate 2 requested from Isaac:** approve → Phase 2 (universal page builder, refreshed plan Tasks 0–11) unlocks.
