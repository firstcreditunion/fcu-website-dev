# Project Hub — redesign prompts for Claude Design

A sequenced set of prompts for comprehensively redesigning the `/project-hub` route to be
modern and user-friendly while staying anchored to the FCU brand and the app's tech reality
(Next.js + React + Tailwind v4 tokens + Base UI, WCAG 2.1 AA, full-bleed width).

## How to use

1. **Lead with Prompt 0 (Master context) every time** — it's the shared context the design tool needs.
2. Run **Prompt 1 (Design language)** next to lock one cohesive direction.
3. Then run **one screen prompt at a time** (Prompts 2–9). Feeding all of them at once dilutes the output.
4. Iterate on each screen ("make the bars thinner", "try a vertical milestone timeline") before moving on.
5. These keep the FCU brand and the buildable tech stack, so approved designs can be implemented as real components. When patterns prove out, decide whether to fold them **back into** the FCU design system (and Figma/Sanity) so the rest of the site can adopt them.

> Note: a comprehensive redesign will, by definition, push beyond the current FCU design system. That's an intentional, directed deviation — keep the design-system-fidelity rule in mind when deciding what graduates back into the shared system.

---

## Prompt 0 — Master context (paste first, pin it)

```
You are redesigning an internal web app called "Project Hub" for First Credit Union (FCU), a credit union in Hamilton, New Zealand. It's a private, sign-in-only tool used by the web-rebuild project team (engineers, marketing, stakeholders) to track the FCU website rebuild — it replaced an Excel workbook. Tone: professional, trustworthy, calm, but modern and a pleasure to use daily.

It's a single full-width page at /project-hub with a sticky header and 7 tabbed views. Everything is INLINE-EDITABLE (click any field to edit), updates sync in REAL TIME across users, and every change is recorded with full history + one-click revert.

The data (one project: "First Credit Union Website Rebuild", go-live 12 Aug 2026):
- Header band: project title + subtitle, a "days to go-live" countdown, overall % complete, and a live count of people currently viewing.
- Timeline (the hero view): a Gantt over Feb–Sep 2026. 6 phases → ~23 task groups → ~139 tasks. Each task has a status (not started / in progress / complete / blocked / N/A), start+end dates, a duration, and notes. Phases are collapsible swimlanes, colored per phase. A vertical "today" line crosses the chart; milestones appear as diamonds in the month header.
- Overview: editable key/value cards — project facts (duration, go-live, etc.) and deployment-strategy facts — plus a progress card per phase.
- Milestones: 7 milestones on a timeline, each with date, name, deliverable, and an achieved/overdue state.
- Risks: a register of 6 risks — risk, impact (low/medium/high), mitigation.
- Tech stack: 10 rows — technology, version, purpose.
- Deliverables: a checklist of 15 items with a done state + overall progress.
- Activity: a reverse-chronological feed of every edit, grouped by day, each with who/when and a Revert button.
- Task editor: clicking a task opens a right-side drawer to edit all its fields and see that task's change history with revert.

Brand: FCU's palette is a primary blue (cool, ~hue 220), a secondary green, and a mint accent, over cool-slate neutrals; typeface is Poppins (UI) with a monospace for numbers/dates. Status colors: green = complete/success, amber = warning/overdue, red = blocked/danger, blue = in progress.

Tech reality (so designs are buildable): Next.js + React + Tailwind v4 with design tokens, Base UI primitives. WCAG 2.1 AA is required (financial org). Full-bleed width; responsive down to mobile.

For each request I send next, redesign that specific view to be modern, clean, and highly usable, staying anchored to the FCU brand and the constraints above.
```

## Prompt 1 — Design language & direction

```
Before redesigning individual screens, define the visual + interaction language for Project Hub. Give me ONE cohesive, modern direction (not three) that feels like a best-in-class project tool — think the clarity of Linear, the editability of Notion, the data-density-done-right of a Vercel/Height dashboard — but unmistakably FCU.

Specify:
- Layout system: full-bleed shell, content max-density vs. breathing room, spacing scale, how the sticky header + tab nav behave on scroll.
- Typography scale: sizes/weights for page title, section headers, table text, labels, and tabular numerics (dates/percentages use a mono/tabular figure).
- Color usage: how the FCU blue/green/mint and the status colors (green/amber/red/blue) are applied — surfaces, accents, status, never decoration-for-its-own-sake.
- Depth & shape: border vs. shadow strategy, corner radii, dividers vs. cards.
- The "editable" affordance: how a clickable-to-edit field signals itself on hover/focus without looking cluttered at rest.
- Realtime cues: how live presence (who's viewing) and a just-changed row are shown subtly.
- Empty / loading / error states as first-class.
- Motion: restrained, purposeful micro-interactions only.
Deliver it as a short style guide + a representative hero mockup (the Timeline view) demonstrating the language. WCAG AA contrast throughout.
```

## Prompt 2 — App shell, header band & tab navigation

```
Redesign the full-bleed app shell: the sticky top header band and the tab navigation for the 7 views (Overview, Timeline, Milestones, Risks, Tech stack, Deliverables, Activity).

Header must surface, scannably: project title + subtitle, a prominent "days to go-live" countdown (the single most important number), overall % complete (as a progress indicator), and a live "N viewing" presence badge. Consider a compact, always-visible health summary. The tab nav should make Timeline the default, work full-width, scroll/condense gracefully on mobile, and be keyboard-navigable. Show the header in both a "healthy/on-track" and an "at-risk" state.
```

## Prompt 3 — Timeline / Gantt (the hero)

```
Redesign the Timeline view: a full-width, editable Gantt across Feb–Sep 2026 with 6 collapsible phase swimlanes → task groups → ~139 task bars. Requirements: month columns with week ticks; a clear vertical "today" marker; milestone diamonds aligned in the month header; bars colored by phase and visually encoding status (not started / in progress / complete / blocked / N/A); a left "name" column (collapsible/resizable feel) that stays aligned with bars when the chart scrolls horizontally; a quick status toggle on each row; inline "add task"; and tasks with no dates listed clearly. Clicking a bar/name opens the task drawer (separate prompt). Make 139 rows feel calm and navigable, not overwhelming — strong density management, sticky phase headers, and an obvious way to scan progress at a glance. Show collapsed and expanded phases, and a hover/selected bar state.
```

## Prompt 4 — Overview dashboard

```
Redesign the Overview view into a modern project dashboard. It holds two groups of editable key/value facts (general project facts; deployment-strategy facts) and a progress card per phase (6 phases, each showing % complete and task counts). Move beyond plain key/value lists: design scannable info cards/stat tiles with clear hierarchy, the phase progress as an at-a-glance visual, and keep every value inline-editable with a clean add/remove affordance. This is the "executive glance" screen — it should answer "how's the project doing?" in 3 seconds while full-width.
```

## Prompt 5 — Milestones

```
Redesign the Milestones view: 7 key milestones, each with a date, name, deliverable description, and an achieved/overdue/upcoming state. Design a modern milestone timeline (horizontal or vertical) that makes status obvious at a glance, highlights the next upcoming and any overdue ones, ties visually to the go-live date, and keeps each field inline-editable with an achieved toggle. Show achieved, upcoming, and overdue treatments.
```

## Prompt 6 — Risks register

```
Redesign the Risks view: a register of risks, each with a risk description, an impact level (low / medium / high), and a mitigation. Design a clear, modern register — consider an impact-weighted layout or color-coded severity — that lets the team scan high-impact risks instantly, edit any field inline, and add/remove rows. Make impact unmistakable (color + label, accessible, never color-only). Show all three impact levels.
```

## Prompt 7 — Tech stack & Deliverables

```
Redesign two list views to match the new language:
1) Tech stack — 10 rows of technology / version / purpose. A clean, modern reference table or card grid, inline-editable, easy to add rows.
2) Deliverables — a 15-item checklist with a done state and an overall progress indicator. Make checking items satisfying, show completed vs. remaining clearly, keep descriptions inline-editable, and surface the completion progress prominently. Both full-width with good use of horizontal space (e.g., multi-column where it aids scanning).
```

## Prompt 8 — Activity feed & Task editor drawer

```
Redesign two connected surfaces:
1) Activity feed — a reverse-chronological log of every edit, grouped by day. Each entry shows what changed (field: old → new, humanized), who made it, when, and which item, with a one-click Revert. Design it to be skimmable and trustworthy (an audit trail), with clear day grouping and a calm visual rhythm.
2) Task editor drawer — a right-side panel opened from a task. It edits the task's name, status, start/end dates, duration, and notes, and shows THAT task's change history with revert, plus a delete action. Design a focused, modern editing panel with clean field layout, the status control, an auto-vs-override duration hint, and an integrated mini history. Show the drawer open over the Timeline.
```

## Prompt 9 — States, interactions & polish

```
Design the cross-cutting states and micro-interactions for Project Hub: (a) inline-edit affordance at rest / hover / active / saving / error, (b) realtime — how a row that just changed under another user is highlighted, and how live presence is shown, (c) empty, loading (skeletons), and error states for every list/view, (d) add/delete/reorder controls that stay discoverable but unobtrusive, (e) keyboard-first behaviors and visible focus, (f) the optimistic-save feeling (instant, with subtle confirmation). Keep motion restrained and purposeful. Deliver these as a small interaction spec with example frames.
```

---

## Implementation note

When designs are approved, they can be built as real components under
`src/app/(frontend)/project-hub/_components/` and `src/lib/project-hub/`. The data layer
(server actions, realtime, table registry, types) stays as-is — the redesign is presentational,
so the existing hooks (`use-hub.ts`, `use-realtime.ts`) and server actions don't need to change.
