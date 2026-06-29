# Brand Molecule — interactive radial diagram

- **Date:** 2026-06-30
- **Status:** Design — awaiting user review
- **Route:** `/brand-molecule` (public, under the `(frontend)` group)
- **Source of truth for content:** a new Sanity singleton `brandMolecule`
- **Reference artifact:** `FCU Molecule 2024.indd` (King St., "2023 Brand Standards") — used only for content, structure, and colour intent; no vector artwork is extracted from it.

## 1. Goal

Recreate First Credit Union's printed "Brand Molecule" as an animated, interactive web component: a two-ring radial diagram (3 inner group bands, 9 outer segments, a central hub) with hover/tap focus that lifts the active segment, dims the rest, and sharpens the focused segment's annotation text so it reads clearly above the others. Colours and all copy are authored in Sanity. The diagram is generated geometry (computed SVG arcs), not an imported image.

Marketing will choose between three interaction depths, shipped as three selectable versions on the same page.

## 2. The three versions

All three share the identical wheel, entrance animation, focus behaviour, two-way label↔segment linking, colours, data, responsive behaviour, and accessibility. They differ only by an additive layer:

- **Version 1 — Focus.** Hover (desktop) or tap (touch) a segment → it lifts and brightens, siblings dim, the active group band brightens, and the active segment's annotation goes to full contrast + weight with its attribute line shown while the others fade back. Entrance animation on load. Nothing else.
- **Version 2 — Focus + Expand.** Everything in V1, plus click/tap opens a detail surface with the segment's fuller copy: a card **beside** the wheel on desktop (never overlapping the central "You first" hub), and a `vaul` bottom sheet on mobile.
- **Version 3 — Focus + Auto-tour.** Everything in V1, plus an ambient auto-cycle that advances the focused segment roughly every 2.8s, pausing on any hover/focus/tap and resuming after a short idle. Includes a visible play/pause control. Auto-start is disabled under `prefers-reduced-motion`. (No click-to-expand in V3 — focus content only.)

Implemented as `<BrandMolecule variant="focus" | "expand" | "tour" />`, internally driven by two booleans (`expandable`, `autoTour`) so the combinations are composable if ever needed.

## 3. Version switching & "marketing chooses"

- `/brand-molecule` renders a `VersionSwitcher` (segmented control — reuse the design-system Toggle Group / Tabs) labelled Version 1 / 2 / 3 with a one-line descriptor each. Switching swaps the live variant instantly for side-by-side comparison.
- A `?v=1|2|3` query param sets the initial variant and makes each version a shareable link.
- The Sanity `brandMolecule` document has a `defaultVariant` field (`focus | expand | tour`). With no query param, the page renders the default. So marketing picks the live version by editing one field — no deploy. The switcher remains available for future comparison.

## 4. Component architecture

```
src/app/(frontend)/brand-molecule/page.tsx     server: fetch singleton, render chrome + <BrandMolecule>
src/components/brand-molecule/
  BrandMolecule.tsx       client orchestrator: variant flags, active/locked state, auto-tour timer,
                          detail surface selection (card vs sheet), version switcher
  MoleculeWheel.tsx       client: pure SVG — bands, segments, curved labels, leaders, annotations,
                          center hub. Props: data, activeKey, lockedKey, onFocus, onSelect, compact,
                          reducedMotion. No business logic.
  MoleculeDetail.tsx      expand content (title, attributes, detail body, optional icon, close);
                          rendered inside a desktop side card or a vaul sheet by the orchestrator
  VersionSwitcher.tsx     segmented control; syncs variant <-> ?v= query param
  MoleculeA11yList.tsx     visually-hidden semantic <ol> mirroring all 9 segments for screen readers
  lib/molecule-geometry.ts pure: arc paths (d3-shape arc()), label-arc paths, leader endpoints,
                          group-band spans derived from segment order. Unit-tested.
  lib/molecule-colors.ts  token-name -> CSS var allowlist (the only place colour strings resolve)
```

Geometry and colour resolution are pure modules with no React, so they are unit-testable and the wheel component stays presentational.

## 5. Sanity content model — `brandMolecule` singleton

Registered as a singleton in the Studio structure (same pattern as `siteSettings` / `headerNavigation`). One document, fields:

- **Page chrome:** `title` (string), `intro` (text)
- **Version default:** `defaultVariant` (string select: `focus | expand | tour`)
- **Center hub:** `centerKicker` (string, e.g. "CORE OF BRAND"), `centerLabel` (string, e.g. "You first")
- **groups[]** — array, exactly 3 objects:
  - `key` (slug), `label` (string, e.g. "Head & Hearts"), `colorToken` (string select — DS token names)
- **segments[]** — array, exactly 9 objects:
  - `key` (slug)
  - `label` (string — the curved on-segment label)
  - `groupKey` (string select referencing one of the 3 group keys)
  - `annotationTitle` (string — outer callout heading)
  - `attributes` (string — the short focus line, e.g. "Honesty · Transparency · Fairness · Supportive")
  - `detail` (Portable Text — richer body shown only in V2 expand)
  - `colorToken` (string select — DS token names)
  - `icon` (optional string — name from the installed icon set, shown in the expand card)

Segment **angles are derived from array order + count** (drag to reorder in Studio; no angle math in the CMS). Group bands are derived by grouping consecutive segments by `groupKey`. The 3×9 structure is fixed in code; only content, colour, and copy are editable. Validation enforces 3 groups and 9 segments.

## 6. Colour resolution & design-system fidelity

`colorToken` and `groups[].colorToken` are **never raw hex** — they are token names chosen from a constrained dropdown that mirrors the FCU design-system swatches (e.g. `fcu-secondary-500`, `fcu-primary-700`, `fcu-mint-500`). `molecule-colors.ts` maps a token name to `var(--color-…)` at render. Result: colours feed from Sanity (the requirement) but only from the approved set (the standing DS-fidelity rule), and the diagram inherits light/dark mode for free. Seed data maps the 9 segments + 3 groups to the nearest DS tokens for the molecule's warm / teal / green families; marketing can re-pick within the allowed set.

## 7. Geometry

- Use `d3-shape`'s `arc()` for annular-sector path strings — gives `padAngle` (inter-segment gaps) and `cornerRadius` (soft corners) matching the printed molecule, with far less hand-trig than rolling our own.
- Curved labels ride invisible arc paths (computed) via SVG `<textPath>`, with path direction flipped for bottom-half segments so text never renders upside down.
- Leader lines: computed from each segment's outer-edge midpoint outward to its annotation anchor; annotation text-anchor (start / middle / end) chosen from the segment's horizontal position.
- All geometry is deterministic from `{count, radii, padAngle, cornerRadius}` — covered by unit tests.

## 8. Interaction & motion (`motion` / Framer)

- **Entrance:** bands + segments stagger in (scale + fade, ~0.04s stagger), hub fades, annotations follow. ~600ms total.
- **Focus** (hover desktop / tap mobile): active segment `scale ~1.04` + radial nudge ~8px along its bisector; siblings `opacity ~0.3`; active group band full, others dimmed; active annotation full contrast + bold with attribute line, others faded; leaders emphasise the active one. Two-way linked: hovering/focusing the annotation drives the same state.
- **Expand (V2):** desktop → `MoleculeDetail` card animates in beside the wheel (`AnimatePresence` + `layout`); mobile → `vaul` sheet. Esc / close button / outside-click dismisses.
- **Auto-tour (V3):** timer advances `activeKey`; pauses on pointer/focus interaction and resumes after idle; play/pause control always present.
- **`prefers-reduced-motion`:** drop entrance + radial nudge (keep opacity-only transitions); auto-tour does not auto-start (manual play only).

## 9. Responsive

- **≥ 640px:** full annotated wheel; V2 detail card sits beside it (two-column).
- **< 640px:** compact wheel as a tappable picker (segments + center hub; outer annotations hidden). Focus still works on tap; V2/V3 detail uses the `vaul` bottom sheet. V3 auto-tour pauses on first interaction as on desktop.

## 10. Accessibility

- Each segment is a real focusable control (SVG element with `role="button"`, `tabindex`, `aria-label` combining title + attributes, e.g. "Our Vision — To help everyday Kiwis succeed").
- Roving-tabindex arrow-key navigation around the ring; Enter/Space focuses (V1/V3) or expands (V2).
- The SVG carries `role="img"` + `<title>`/`<desc>`; **plus** a visually-hidden `<ol>` (`MoleculeA11yList`) enumerating all nine segments with full content, so screen-reader users get everything without traversing the graphic.
- Auto-tour (V3) satisfies WCAG 2.2.2 via the pause control + pause-on-interaction + no reduced-motion autostart.
- Dimmed sibling states stay within AA contrast; the focused annotation is the highest-contrast text. `:focus-visible` ring on segments.
- SSR renders the static wheel at rest (all annotations visible, no JS required); the client hydrates interaction.

## 11. Data fetching

- Server component fetches the singleton via `next-sanity` `sanityFetch` + `defineQuery` (typed through the existing TypeGen pipeline).
- Page chrome (`title`, `intro`) and all molecule content come from the one document.
- Optional later: Sanity Presentation live-preview overlays (not required for v1).

## 12. Testing

- **Unit (`vitest`):** `molecule-geometry.ts` — arc path determinism, angle derivation from order, group-band spans, label-flip logic, leader endpoints.
- **Unit:** `molecule-colors.ts` — every allowed token resolves to a CSS var; unknown token falls back safely.
- **A11y (`playwright` + axe, existing `test:a11y`):** `/brand-molecule` passes axe; keyboard traversal reaches every segment; auto-tour pause control present.

## 13. Out of scope (YAGNI)

- No real brand illustrations (icons from the installed set as placeholders until marketing's illustration set lands).
- No CMS-editable geometry (structure is fixed at 3×9).
- No theming beyond the approved token set; no arbitrary hex.
- No "tour + expand" combined mode in v1 (architecture allows it later).
- Page chrome limited to `title` + `intro`; not a full multi-section marketing page.

## 14. Decisions resolved

- Visual direction: **hybrid** — recognisable molecule colours mapped to DS tokens; everything else in the design system.
- Interaction: **all three depths** shipped as selectable Versions 1/2/3.
- Mobile: **compact wheel + `vaul` bottom sheet.**
- Page scope: **focused, public** — heading + intro + molecule, in site chrome.
- Expand card: **beside** the wheel on desktop; never over the hub.
- Colour source: **Sanity token references**, resolved to CSS vars.

## 15. Open questions

- None blocking. Confirm V3 should remain tour-only (no expand) — current assumption.
