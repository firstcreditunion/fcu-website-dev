# FCU Design System — Phase 2: Primitives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the form-family primitives (Button, Input, Textarea, Select, Checkbox, Radio, Switch, Label/Field) to the FCU design-system spec, and showcase them in `/design-system`.

**Architecture:** In-place reskin of existing Base UI (`@base-ui/react`) primitives — extend each component's `cva`/class config to the FCU variant/size/state matrix. Colors already come from the Phase 1 semantic tokens; this phase fixes sizing, variants, states, and affix/icon composition. Add one showcase section per component area, wired into the existing `/design-system` nav.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind v4, Base UI shadcn primitives (style `base-nova`), lucide icons. Verification via `npm run build` / `npm run lint` + browser-free checks + user eyeball at checkpoints (the headless screenshot tool can't render in this environment — established in Phase 1).

**Plan series:** Plan **2 of 7**. Source of truth: `component-design-planning/FCU-DESIGN-SYSTEM-MIGRATION-SPEC.md` §8 (universal contract) + §9 Phase 2. Visual references: hand-off `html/Components-Buttons.html`, `Components-Input.html`, `Components-Textarea-Select.html`, `Components-Selection.html` and the matching `css/buttons.css`, `css/inputs.css`, `css/selection.css` (exact values — pull per component).

**Hand-off root:** all `html/`, `css/`, and `02-component-specs.md` references below are relative to `C:\Users\ivicliph\Downloads\First Credit Union Design System\design_handoff_fcu_design_system\`.

**Conventions (same as Phase 1):**
- Work on a feature branch off `main`. Commit after each task. Inline execution with checkpoints.
- Do **not** edit Header/Footer files.
- Verification per component area: build + lint clean, then a `/design-system` section the user eyeballs against the hand-off reference; pin/adjust until it matches.

**Universal contract (spec §8 — applies to every component):**
- Sizes share one scale: **sm = 32px, md = 40px (default), lg = 48px** height; inputs and buttons at the same size align by baseline.
- Radius: sm→`rounded-md`, md/lg→`rounded-lg` (per spec; confirm vs css).
- `tabular-nums`/`font-mono` on numbers, account #, codes.
- Every icon-only control: `aria-label`. Focus-visible ring = `--ring` (`--shadow-focus`).
- Reserved-secondary: green only where a spec explicitly calls for `--fcu-secondary-*`/`--brand-accent` (Secondary button, etc.).
- Validation states (error/success) appear **after** interaction, never on load.

---

## File structure

| File | Action | Responsibility |
|---|---|---|
| `src/components/ui/button.tsx` | Modify | FCU variant/size/state matrix |
| `src/components/ui/button-group.tsx` | Verify/adjust | grouped buttons |
| `src/components/ui/input.tsx` | Modify | sizes, affixes, icon, mono, states |
| `src/components/ui/input-group.tsx`, `field.tsx` | Verify/adjust | affix + label/helper chassis |
| `src/components/ui/textarea.tsx` | Modify | counter, states (auto-grow already via `field-sizing-content`) |
| `src/components/ui/select.tsx`, `native-select.tsx` | Modify | native vs custom, sizes, states |
| `src/components/ui/checkbox.tsx` | Modify | sizes 16/18/20, indeterminate, card-group |
| `src/components/ui/radio-group.tsx` | Modify | dot indicator, inline + card group |
| `src/components/ui/switch.tsx` | Modify | track 36×20 / sm 30×18 / lg 44×24 |
| `src/components/ui/label.tsx` | Verify | likely fine as-is |
| `src/app/(frontend)/design-system/_sections/buttons.tsx` | Create | Button showcase |
| `src/app/(frontend)/design-system/_sections/inputs.tsx` | Create | Input + Textarea + Select showcase |
| `src/app/(frontend)/design-system/_sections/selection.tsx` | Create | Checkbox/Radio/Switch showcase |
| `src/app/(frontend)/design-system/_components/showcase-nav.tsx` | Modify | promote the new sections from "coming soon" to real anchors |
| `src/app/(frontend)/design-system/page.tsx` | Modify | render the new sections |

> Reuse the Phase 1 `Section` wrapper (`_components/section.tsx`) and the swatch/spec patterns from `_sections/foundations.tsx`.

---

## Task 0: Branch + baseline

- [ ] **Step 1:** From a clean, synced `main`: `git switch -c feat/design-system-phase-2-primitives`
- [ ] **Step 2:** `npm run build` → expect pass (baseline). `npm run lint` → expect 0 problems (baseline; main is clean post-Phase-1).
- [ ] **Step 3:** Start the dev server via the Phase 1 launch config (`preview_start` "dev", which runs `next dev` directly) for browser-free verification through PowerShell `Invoke-WebRequest` + the user's own browser at checkpoints.

---

## Task 1: Button

**Files:** Modify `src/components/ui/button.tsx`; verify `button-group.tsx`. Reference: `02-component-specs.md` §1 + `css/buttons.css` + `html/Components-Buttons.html`.

- [ ] **Step 1:** Read current `button.tsx` (stock: variants default/outline/secondary/ghost/destructive/link; sizes default h-8 / sm h-7 / lg h-9). Read `css/buttons.css` for exact heights, padding, colors, shadows per variant/size.
- [ ] **Step 2:** Extend the `cva`:
  - **Sizes:** `sm`=h-8 (32px), `default`(md)=h-10 (40px), `lg`=h-12 (48px); matching `icon`/`icon-sm`/`icon-lg` squares; gap sm6/md8/lg10, icon sm16/md18/lg20; `block` = full width.
  - **Variants:** `primary` (default; bg `--primary`, hover `--primary-hover`, active `--primary-active`) · `secondary` (**bg `fcu-secondary-500`**, text `fcu-secondary-950`, hover `-600`, active `-700`+white — the deliberate brand-green exception) · `outline` (border `--border-strong`) · `ghost` (→ `--surface-sunken` hover) · `destructive` (bg `--destructive`) · `destructive-outline` · `link` · `brand` (bg `--brand-accent`, marketing).
  - **States:** focus-visible ring `--shadow-focus`; active translateY .5px; disabled opacity .45; **loading** (hide label in place, centered spinner, preserve width — no reflow); error glow (primary only).
- [ ] **Step 3:** Verify `button-group.tsx` composes correctly with the new sizes/variants; adjust only if broken.
- [ ] **Step 4:** Create `_sections/buttons.tsx` rendering the full variant × size matrix + icon/loading/disabled/block states (mirror `Components-Buttons.html`). Use the `Section` wrapper, `id="buttons"`. (Note: `brand` and `link` variants needn't fill every size cell — a partial matrix for those is expected, not a defect.)
- [ ] **Step 5:** Wire into `page.tsx` + promote "Buttons" in `showcase-nav.tsx` to a real anchor.
- [ ] **Step 6:** `npm run build` (expect pass); `Invoke-WebRequest /design-system` 200 + check `preview_logs` for errors. **Checkpoint:** user eyeballs `/design-system#buttons` vs `Components-Buttons.html`; fix to fidelity.
- [ ] **Step 7:** `git add` the touched files; commit `feat(ds): reskin Button to FCU spec + showcase`.

---

## Task 2: Input + Field

**Files:** Modify `input.tsx`; verify/adjust `input-group.tsx`, `field.tsx`. Reference: §2 + `css/inputs.css` + `Components-Input.html`.

- [ ] **Step 1:** Read current `input.tsx` (stock single `h-8` input), `input-group.tsx`, `field.tsx`. Read `css/inputs.css`.
- [ ] **Step 2:** Add size support (sm32/md40/lg48; radius sm`md`/md`lg`/lg`lg`) — via a `cva` or `data-size`. The control row owns the border + focus ring (`:focus-within`) so affixes/icons share focus.
- [ ] **Step 3:** Support compositions via `input-group`/`field`: leading icon; prefix/suffix **affix** (e.g. `NZ$`, `% p.a.` — non-tabbable, mono, `--surface-muted` bg); trailing action button (show-password/copy — icon + `aria-label`); **mono** variant (`tabular-nums`, for account#/IRD/codes).
- [ ] **Step 4:** States: default/hover/focus/disabled/read-only/**error** (border `--destructive`, tinted bg, actionable message)/**success** (border success + check)/**loading** (trailing spinner). Required `*` in `--destructive`; helper text below (never placeholder-as-label).
- [ ] **Step 5:** Create the Input portion of `_sections/inputs.tsx` (`id="inputs"`) — sizes, affixes, icon, mono, all states.
- [ ] **Step 6:** Build + checkpoint (eyeball vs `Components-Input.html`) → fix → commit `feat(ds): reskin Input (sizes, affixes, states) + showcase`.

---

## Task 3: Textarea & Select

**Files:** Modify `textarea.tsx`, `select.tsx`, `native-select.tsx`. Reference: §3 + `css/inputs.css` + `Components-Textarea-Select.html`.

- [ ] **Step 1:** Read current files (textarea already auto-grows via `field-sizing-content`; select is stock).
- [ ] **Step 2:** **Textarea:** add optional counter (`x / max`), closed height = input md, states mirror Input. Confirm `field-sizing-content` covers auto-grow (cap ~480px, `resize:none`); if a JS fallback is needed for non-supporting browsers, note it (don't add unless required).
- [ ] **Step 3:** **Select:** native (`native-select` — chevron via bg-image, sizes, best for mobile/≤7 options) + custom (`select` — rich two-line rows + trailing metadata). Placeholder = disabled selected option. States unset/selected/focus/disabled/error. Before composing the custom two-line rows, use the Shadcn MCP to confirm the installed Base UI `select` exposes the needed item slots.
- [ ] **Step 4:** Add the Textarea + Select portions to `_sections/inputs.tsx`.
- [ ] **Step 5:** Build + checkpoint (vs `Components-Textarea-Select.html`) → fix → commit `feat(ds): reskin Textarea & Select + showcase`.

---

## Task 4: Checkbox · Radio · Switch

**Files:** Modify `checkbox.tsx`, `radio-group.tsx`, `switch.tsx`; verify `label.tsx`. Reference: §4 + `css/selection.css` + `Components-Selection.html`.

- [ ] **Step 1:** Read current files. (Checkbox `size-4`, no indeterminate; Switch `h-[18.4px] w-[32px]`; verify radio-group.)
- [ ] **Step 2:** Shared `.control` chassis: indicator 18px (sm16/lg20), ≥28px hit row, label 500-weight + optional description line.
- [ ] **Step 3:** **Checkbox:** unchecked/checked (bg `--primary`, white check)/**indeterminate** (white dash — add `data-indeterminate` handling + a Minus indicator)/focus/disabled/error. **Card-group** variant = bordered selectable cards (selected → primary border + `--primary-subtle` bg).
- [ ] **Step 4:** **Radio:** circle indicator, inner dot centered via **absolute + translate, NOT flex** (avoids sub-pixel drift). Inline group + card group.
- [ ] **Step 5:** **Switch:** track **36×20** (sm 30×18 / lg 44×24), thumb 14px, centered via `top:50%;translateY(-50%)` with `border:0` on track. On = `--primary`. Settings-row pattern (label left, switch right). (Replaces the current `18.4×32`.)
- [ ] **Step 6:** Create `_sections/selection.tsx` (`id="selection"`) — all three, all states + card-group + inline/settings-row patterns.
- [ ] **Step 7:** Build + checkpoint (vs `Components-Selection.html`) → fix → commit `feat(ds): reskin Checkbox/Radio/Switch + showcase`.

---

## Task 5: Nav wiring + Phase-2 acceptance gate

- [ ] **Step 1:** In `showcase-nav.tsx`, move Buttons / Inputs & Forms / (Selection) from the "Coming soon" list into the active anchor list; confirm `page.tsx` renders all new sections in order.
- [ ] **Step 2:** `npm run build` + `npm run lint` → both pass (0 errors; keep 0 warnings — any new warning in Phase 2 files must be fixed).
- [ ] **Step 3:** Acceptance checklist: every Phase-2 component matches its hand-off reference at desktop + is responsive (no overflow); sizes align across the form family (input md = button md = 40px); reserved-secondary respected (green only on Secondary button etc.); icon-only controls have `aria-label`; Header/Footer still untouched.
- [ ] **Step 4:** Summarize for **user sign-off**. Then use superpowers:finishing-a-development-branch (push + PR via the `firstcreditunion` gh account — `gh auth switch --user firstcreditunion` in the same shell as the push).

---

## Risks / notes

- **Sizing ripple:** changing Button/Input default heights (32→40px) will shift the existing `/component-design` playground + `/demo` pages cosmetically — accepted (pre-launch, out of scope), same as Phase 1.
- **Base UI APIs:** use the Shadcn MCP to confirm current Base UI prop names (e.g. checkbox `indeterminate`, radio indicator) before extending.
- **Exact values:** the `css/*.css` files are the source of truth for px/colors; the `02-component-specs` contracts are the structure. When they disagree, the CSS wins (it's the reviewed prototype).
- **Verification:** headless screenshots don't work here; rely on build/lint + `Invoke-WebRequest` smoke + the user's browser eyeball at each task checkpoint.

## Out of scope (Phase 2)
Containers/data/nav/feedback/overlays/marketing components (Phases 3–7), Header/Footer, existing `/demo` + `/component-design` + `/design-guidelines`, dark-theme authoring.
