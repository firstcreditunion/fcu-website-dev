# FCU Design System Migration — Design Spec

**Date:** 2026-06-02
**Status:** Approved (design) → pending implementation plan
**Author:** Engineering (with Claude)
**Source of truth (visual):** `C:\Users\ivicliph\Downloads\First Credit Union Design System\design_handoff_fcu_design_system\` (the "Claude Design" hand-off)

---

## 1. Background

Claude Design produced a complete, reviewed **HTML/CSS design system** for First Credit Union (FCU): 36 components specified as HTML reference pages + per-component CSS + a token system, plus a README "handoff" and two spec docs (`01-globals-css.md`, `02-component-specs.md`). It is **not** React — it is the visual/behavioural source of truth.

The repo (`fcu-website-dev`) is a pre-launch Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 + Sanity site. It already ships ~60 **shadcn/ui primitives on the Base UI registry** (`@base-ui/react`, `components.json` style `base-nova`, baseColor `neutral`) — but they are stock-styled, not FCU-styled.

This spec defines how we re-implement the hand-off as real React components in the repo, so the repo's component layer **becomes** the FCU design system.

## 2. Goals

- Re-implement all **36 hand-off components** to high fidelity (colors, type, spacing, radii, shadows, states, interactions are final — match them).
- Make the repo's `src/components/ui/` the single source of truth for the design system, driven by the hand-off **token system**.
- Provide a public **`/design-system`** showcase route rendering every component's variants/states.
- Verify fidelity against the hand-off references with automated screenshots **and** user sign-off, phase by phase.

## 3. Non-goals / out of scope

- **Header & Footer** (`header.tsx`, `header-client.tsx`, `footer.tsx`, `footer-client.tsx`) — **frozen**. The hand-off itself scopes them out ("already implemented in the repo — out of scope").
- Existing `/demo/*` account pages, `/component-design` playground, `/design-guidelines` — **left as-is**; they will shift cosmetically under the token reskin and that is accepted (pre-launch, internal/throwaway).
- Sanity schema/content changes.
- Dark-theme authoring — light-first; keep the existing `.dark` block working as a stub only.
- Changing the existing Clerk gate on `/component-design` (it runs Sanity-write server actions; keep it gated).

## 4. Key decisions (locked)

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1 | Scope | **All 36, phased** | Faithful to the hand-off; "don't miss anything." Review gate per phase. |
| 2 | Showcase route | **New `/design-system`** | Clean separation from the Sanity-syncing `/component-design` and the `/design-guidelines` style guide. |
| 3 | Token strategy | **Merge site-wide** | Token indirection is the engine; merge into existing `globals.css` (preserve animations) and accept the intended global reskin. |
| 4 | Verification | **Automated screenshots + user sign-off** | "Extreme precision." Playwright/browser capture vs hand-off screenshots + HTML, plus per-phase approval. |
| 5 | Primitive strategy | **Faithful in-place reskin** | Edit existing Base UI primitives to FCU spec (sizes/variants/states). The repo's components literally become the DS. |
| 6 | Existing pages | **Leave them** | They'll shift cosmetically; not production. Keeps the diff focused. |
| 7 | `/design-system` auth | **Public** | "Don't gate anything" (for this route). |
| 8 | Intercom | **Delete analytics dashboard only** | Remove `/intercom-analytics`; keep the live Penny chat widget. |

## 5. Guardrails — why Header/Footer are safe (evidence)

- **No `ui/` imports:** `header-client.tsx` and `footer-client.tsx` import **zero** components from `@/components/ui/`. So reskinning primitives (sizes/variants) cannot reach them.
- **Explicit brand ramps:** they use `bg-fcu-primary-*`, `from/to-fcu-primary-*`, `bg-fcu-secondary-*`, `text-white`, `text-gray-*` — not `bg-primary`. So the big `--primary` remap (near-black → FCU blue) never touches them.
- **Identical ramps:** the hand-off's `--fcu-*` OKLCH values are verbatim from the repo's existing `globals.css`.
- **Residual risk:** `header-client` uses a few semantic neutrals (`text-muted-foreground`, `border-border`, `bg-accent`, `text-foreground`) that shift subtly (e.g. `--muted-foreground` 0.556→0.44 L, cool tint). **Safeguard:** capture Header/Footer before/after Phase 1; if any drift is perceptible, pin those specific `header-client` usages to explicit values so H/F render identically.
- **Dead code:** `navigation-2.tsx`, `aceternity/nav1.tsx` (heavy raw `neutral-*`) are imported nowhere — irrelevant.

## 6. Architecture & approach

- **In-place reskin** of existing Base UI primitives: extend each component's `cva` config to the FCU variant/size/state matrix. Do not rewrite primitives the registry provides.
- **New files** for the ~10 custom components that have no 1:1 registry primitive.
- **Token indirection**: components consume semantic tokens only (never raw hex/oklch). Re-theme by editing the map.
- **Tooling**: use the **shadcn skill** + **Shadcn MCP** to fetch correct Base UI APIs and install any missing primitives. Target the installed `@base-ui/react` (hand-off's `@base-ui-components/react` is the older package name).
- **Icons**: lucide (the configured `iconLibrary`).

## 7. Phase 1 — Token migration (foundation)

**Merge** the hand-off token system into `src/app/globals.css`. **Do not replace the file** — it carries animation keyframes and tokens that existing components depend on.

**Add:**
- Cool-slate neutral ramp `--neutral-0 … --neutral-950` (220° hue).
- Status triplets `--status-{success,warning,danger,info}-{50,500,700}`.
- Extended semantics: `--surface`, `--surface-muted`, `--surface-sunken`, `--foreground-muted`, `--foreground-subtle`, `--primary-hover`, `--primary-active`, `--primary-subtle`, `--border-strong`, `--brand-accent`, `--brand-accent-subtle`.
- Shadow scale `--shadow-xs … --shadow-2xl` (cool-tinted, 220°) + `--shadow-focus`.

**Remap semantic tokens:**
- `--primary` → `--fcu-primary-900`; `--primary-foreground` → `--neutral-0`.
- Neutrals: `--background`/`--card`/`--popover` → `--neutral-0`; `--foreground` → `--neutral-900`; `--border`/`--input` → `--neutral-200`.
- **Reserved-secondary**: `--secondary`, `--accent`, `--muted` → **neutrals**, never brand green. Green appears only via `--fcu-secondary-*` / `--brand-accent`.
- `--ring` → `--fcu-primary-700`; `--destructive` → `--status-danger-500`.
- `--radius` → `0.625rem` (already matches).

**Preserve (must not break):**
- Existing `@theme inline` animation keyframes: `shimmer-slide`, `spin-around`, `shiny-text`, `shine`, `background-position-spin` (used by magicui/aceternity components — shimmer-button, shine-border, border-beam, animated-shiny-text, neon-gradient-card, etc.).
- `sidebar-*` tokens; the `.dark` block (keep working, light-first).
- Fonts: Poppins (sans) + Geist Mono (mono) — already loaded in `layout.tsx`; reconcile `--font-sans` → Poppins. Body already renders Poppins, so no Header/Footer typography change.

**Expose** ramps + neutrals + status as Tailwind v4 utilities via `@theme inline` (`bg-fcu-primary-700`, `bg-neutral-100`, `text-status-danger-700`, etc.).

**Chart tokens:** set `--chart-1…5` from brand ramps per hand-off. (Note: the only existing recharts consumer, `/intercom-analytics`, is being deleted — see §11 — so there is no existing chart to recolor.)

**Type scale** (apply as utility classes / typography helper): Display 2XL→Caption + Mono, per `01-globals-css.md`.

**Phase-1 acceptance:**
- `--primary` resolves to FCU Primary 900; buttons/links/rings are FCU blue.
- `--secondary` is neutral, not green; green only via `--brand-accent`/`--fcu-secondary-*`.
- Poppins renders body + headings; Geist Mono renders numbers with tabular figures.
- `rounded-lg` = 10px; shadows read cool, not black.
- Existing animated components (shimmer/shine/beam) still animate.
- **Header & Footer visually identical** to pre-migration (before/after screenshots match; pin neutral usages if needed).

## 8. Primitive reskin contract (universal rules)

- One component per file in `src/components/ui/`. Extend the registry component's `cva`; don't rewrite primitives.
- All color/spacing via semantic tokens. `tabular-nums`/`font-mono` on every number, account #, date, code.
- Every icon-only control: `aria-label`. Focus-visible ring = `--ring`.
- Form-family size contract: **sm = 32px, md = 40px (default), lg = 48px** height; inputs and buttons align by baseline.
- Validation states appear **after** interaction, never on load.
- Reserved-secondary respected everywhere.

## 9. Component manifest & phase plan (36)

> **Count note:** the hand-off has **36 components, numbered 1–36** — the README's "38" label is a typo (there is no component #37 or #38). The custom-components footnote below lists 11 items only because circular Progress is a sub-part of #13 Progress, not a separate number.

Each phase ends with: implement → showcase section → automated screenshot vs hand-off → fix to fidelity → **user sign-off** → commit. Reference HTML/CSS files live in the hand-off `html/` and `css/`.

### Phase 2 — Primitives
| # | Component | Base UI registry | FCU notes |
|---|---|---|---|
| 1 | Button | `button`, `button-group` | sizes 32/40/48; variants primary/secondary(**green** `fcu-secondary-500`)/outline/ghost/destructive/destructive-outline/link/brand; loading (preserve width), error glow |
| 2 | Input | `input`, `input-group`, `field` | leading icon, prefix/suffix affix (mono), trailing action, mono variant; error/success/loading |
| 3 | Textarea & Select | `textarea`, `select`, `native-select` | auto-grow textarea + counter; native vs custom select |
| 4 | Checkbox · Radio · Switch | `checkbox`, `radio-group`, `switch`, `label` | indeterminate; card-group; switch thumb centering rule |

### Phase 3 — Containers & data
| # | Component | Base UI registry | FCU notes |
|---|---|---|---|
| 5 | Card & Dialog | `card`, `dialog`, `alert-dialog` | accent rails; sizes; header-only padding fix; stat-card sub-layout; backdrop blur |
| 6 | Table | `table`, `data-table` | sticky head, sortable, selectable, `col-num`/`col-mono`, striped/bordered/compact, empty state |
| 7 | Alert & Badge | `alert`, `badge` | 4 statuses + neutral; subtle/solid; banner/inline; counter badge |
| 18 | Pagination | `pagination` | truncation rule; bar wrapper (summary + rows-per-page) |

### Phase 4 — Navigation & disclosure
| # | Component | Base UI registry | FCU notes |
|---|---|---|---|
| 8 | Breadcrumb & Tabs | `breadcrumb`, `tabs` | tabs: underline/pill/enclosed; overflow ellipsis |
| 9 | Accordion · Tooltip · Popover | `accordion`, `tooltip`, `popover`, `collapsible` | accordion default/subtitle/spaced/ghost; popover menu variant |
| 22 | Dropdown menu | `dropdown-menu` | checkable, submenu, danger, account-header; "⋯ more" canonical |
| 36 | Hover card | `hover-card` | member/term/payee previews |

### Phase 5 — Feedback
| # | Component | Base UI registry | FCU notes |
|---|---|---|---|
| 13 | Progress | `progress` | linear sizes/statuses + **circular** (custom SVG) |
| 14 | Skeleton | `skeleton` | shimmer; reduced-motion; primitives text/title/avatar/image/button/badge |
| 15 | Spinner | `spinner` | sizes; in-button; full-cover overlay |
| 16 | Toast | `sonner` | statuses + accent stripe; single action; cap 3 |
| 17 | Avatar | `avatar` | sizes xs–2xl; initials colorways; status dot; group stack |
| 28 | Empty state | `empty` | 4 tones; three-part rule |

### Phase 6 — Overlays & inputs
| # | Component | Base UI registry | FCU notes |
|---|---|---|---|
| 19 | Date picker | `date-picker`, `calendar` | typeable DD/MM/YYYY; range + presets; forward-only |
| 33 | Calendar (month) | `calendar` | month view (not input); event grid; +N more |
| 20 | Combobox | `combobox` | search; grouped rich rows; multi-select tokens |
| 21 | Command (⌘K) | `command` | dialog launcher; grouped; keyboard nav |
| 25 | OTP / PIN | `input-otp` | 6-digit OTP / 4-digit PIN mask; grouped 3+3 |
| 26 | Slider | `slider` | live mono value; ticks; loan-calculator |
| 24 | File upload | *custom* (`item` + `input-group`) | dropzone states; file rows; KYC |
| 32 | Tag / Chip input | *custom* | removable chips; focus-within; error |
| 34 | Toggle group | `toggle-group`, `toggle` | segmented; single/multi; block |
| 23 | Stepper | *custom* | horizontal (label below) + vertical; states |
| 35 | Rating | *custom* | brand-gold stars; display + interactive |

### Phase 7 — Marketing & patterns
| # | Component | Base UI registry | FCU notes |
|---|---|---|---|
| 10 | Stat block | *custom* (Card + Typography) | tabular value; trend; sizes; accent rail |
| 11 | Testimonial | *custom* | default/featured/compact/ghost; optional stars |
| 12 | CTA banner | *custom* | 6 variants incl. gradient primary w/ secondary glow |
| 30 | Timeline | *custom* | process + feed variants |
| 31 | Description list | *custom* (`<dl>`) | fixed label column; card/striped/compact/inline |
| 27 | Charts | `chart` (Recharts) | line/area/bar/donut/sparkline; `--chart-*`; one secondary slice |
| 29 | Carousel | `carousel` (Embla) | 1-up + multi; no autoplay; controls always |

> Custom components (no 1:1 registry primitive): Stat block, Testimonial, CTA banner, Stepper, File upload, Timeline, Description list, Tag/Chip input, Rating, circular Progress.

## 10. `/design-system` showcase route

- New App Router route `src/app/(frontend)/design-system/page.tsx` (or its own route group), **public** (no Clerk gate).
- Sidebar nav + section anchors mirroring the hand-off `html/` section order.
- **Imports** finished components from `src/components/ui/` (and custom files); never inlines component code.
- One section per component rendering its variants/sizes/states, mirroring the reference pages.

## 11. Intercom analytics removal

**Delete** (self-contained, unlinked — not referenced by nav, sitemap, or llms.txt):
- `src/app/(frontend)/intercom-analytics/` (entire folder: `page.tsx`, `data.ts`, `_components/analytics-dashboard.tsx`, `topic-bar-chart.tsx`, `channel-pie-chart.tsx`, `sentiment-chart.tsx`, `resolution-radial-chart.tsx`).

**Keep (do not touch):**
- `src/components/intercom-provider.tsx` (live Penny chat widget), its wiring in `(frontend)/layout.tsx`, and `src/types/intercom.d.ts`.

**Verify after deletion:** `npm run build` succeeds; no dangling imports/links; Penny widget still loads.

## 12. Verification workflow

Per phase:
1. Implement the components.
2. Build the relevant `/design-system` section.
3. Drive it with Playwright/browser (playwright skills + Claude Preview/Chrome MCP), capture screenshots.
4. Compare against hand-off `screenshots/` + open the `html/` reference.
5. Fix to fidelity (desktop pixel-match + responsive, no text overflow).
6. **User sign-off**, then commit.

Additionally after Phase 1: regression-check Header/Footer + 1–2 existing pages (before/after).

## 13. Risks & open items

- **Base UI version drift**: some hand-off install commands assume `@base-ui-components/react`; repo uses stable `@base-ui/react`. Use Shadcn MCP to confirm current APIs; adapt install commands.
- **`neutral-*` utility override**: exposing cool-slate as `neutral-*` overrides Tailwind's built-in neutral. Only dead nav components use raw `neutral-*` → safe; audit during Phase 1.
- **Effort**: 36 components is large; per-phase gates keep it controlled and reviewable.
- **Fidelity vs responsiveness**: specs are desktop-final; ensure responsive behaviour with no overflow (apply responsive-design practices).

## 14. File / directory impact (high level)

- `src/app/globals.css` — token merge (Phase 1).
- `src/app/layout.tsx` — font reconciliation (`--font-sans` → Poppins) if needed.
- `src/components/ui/*` — reskinned primitives + new custom component files.
- `src/app/(frontend)/design-system/**` — new showcase route.
- `src/app/(frontend)/intercom-analytics/**` — deleted.

## 15. Acceptance (overall)

- All 36 components implemented to hand-off fidelity and shown in `/design-system`.
- Semantic-token system in place; reserved-secondary honoured.
- Header & Footer byte-for-byte unchanged (verified).
- `npm run build` + `npm run lint` pass; Sanity TypeGen unaffected.
- Intercom analytics removed; Penny widget intact.
