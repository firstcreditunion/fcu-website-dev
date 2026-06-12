# Project Hub — design

**Date:** 2026-06-12
**Status:** Approved (backend and frontend sections approved in brainstorming session)
**Replaces:** `FCU_Website_Project_Timeline_2026.xlsx` (2 sheets: "Project Summary", "Project Timeline") as the team's living project tracker.

## Goal

An internal, fully editable, realtime project tracker for the FCU website rebuild, replacing the Excel workbook. Backend lives in the `api` schema of the **fcu-forms** Supabase project (`hojrhcbubaafsqjqvezq`); frontend lives in this repo behind Clerk sign-in. Built entirely from the FCU design system — no visual deviations without explicit approval.

## Decisions (locked with user)

1. **Shape:** purpose-built dashboard + task-level Gantt, not a spreadsheet replica and not a generic section builder.
2. **Access:** the whole tool requires Clerk sign-in (same pattern as `/component-design`). Any signed-in user can view and edit.
3. **Collaboration:** realtime multi-user sync plus full change history with revert.
4. **Scope:** both workbook sheets. Summary sheet → dashboard sections; Timeline sheet → editable Gantt (~150 tasks, 6 phases, statuses).
5. **Architecture:** server-mediated (Approach A). All reads/writes via Clerk-authenticated Next.js server actions using the service-role key. Supabase Realtime carries metadata-only invalidation pings — never row data. No RLS policies opened, no change to fcu-forms auth config.

## Backend (`api` schema, fcu-forms)

### Conventions

- Tables prefixed `pt_`, snake_case (matches the newer snake_case tables in `api`; cannot collide with lending tables).
- All tables: `id uuid primary key default gen_random_uuid()`, `created_at timestamptz default now()`, `updated_at timestamptz default now()`, `updated_by_id text`, `updated_by_name text`, `deleted_at timestamptz`, `deleted_by_id text`, `deleted_by_name text`. (Exception: `pt_revisions` is append-only — `id bigint generated always as identity`, `created_at`, no update/delete columns.)
- App performs **soft deletes only** (sets `deleted_at` + `deleted_by_*` via UPDATE). No hard deletes from the app.
- Enums: `pt_task_status` (`not_started`, `in_progress`, `complete`, `blocked`, `na`), `pt_risk_impact` (`low`, `medium`, `high`), `pt_fact_section` (`overview`, `deployment`), `pt_revision_action` (`insert`, `update`, `delete`).

### Tables

| Table | Purpose | Fields beyond the standard set |
|---|---|---|
| `pt_projects` | Project shell | `slug text unique not null` (`fcu-website-rebuild-2026`), `title text not null`, `subtitle text` |
| `pt_facts` | Overview + deployment-strategy key/values | `project_id fk`, `section pt_fact_section`, `label text`, `value text`, `sort_order int` |
| `pt_phases` | 6 phases | `project_id fk`, `phase_number int` (unique per project), `name text`, `start_date date`, `end_date date`, `color_token text` (FCU DS palette token name) |
| `pt_task_groups` | Groups within phases | `project_id fk`, `phase_id fk`, `name text`, `sort_order int` |
| `pt_tasks` | Timeline tasks | `project_id fk`, `group_id fk`, `name text`, `start_date date`, `end_date date` (both nullable), `duration_label text` (nullable override, e.g. "Ongoing"; null → UI computes from dates), `status pt_task_status default 'not_started'`, `notes text`, `sort_order int` |
| `pt_milestones` | 7 key milestones | `project_id fk`, `date date`, `name text`, `deliverable text`, `achieved boolean default false`, `sort_order int` |
| `pt_risks` | Risk register | `project_id fk`, `risk text`, `impact pt_risk_impact`, `mitigation text`, `sort_order int` |
| `pt_tech_stack` | Tech stack | `project_id fk`, `technology text`, `version text`, `purpose text`, `sort_order int` |
| `pt_deliverables` | Deliverables checklist | `project_id fk`, `description text`, `done boolean default false`, `sort_order int` |
| `pt_revisions` | Change history | `project_id`, `table_name text`, `row_id uuid`, `action pt_revision_action`, `actor_id text`, `actor_name text`, `old_data jsonb`, `new_data jsonb`, `created_at`. Indexes: `(project_id, created_at desc)`, `(table_name, row_id)` |

Derived, never stored: go-live countdown (from the GO-LIVE milestone), phase/overall progress (% of non-deleted tasks with `status = 'complete'`), task duration display when `duration_label` is null.

### History + realtime trigger

One generic trigger function attached `AFTER INSERT OR UPDATE OR DELETE` to every `pt_*` content table (not `pt_revisions`):

1. Writes a `pt_revisions` row — `old_data`/`new_data` are full row images (`to_jsonb`), actor read from `NEW.updated_by_id` / `NEW.updated_by_name` (for the soft-delete UPDATE these carry the deleter). Hard `DELETE` only happens via direct SQL, never from the app; that branch records `OLD` with null actor. `project_id` is read generically from the row, except on `pt_projects` where it is `id` itself.
2. Calls `realtime.send(jsonb_build_object('table', TG_TABLE_NAME, 'id', <row id>, 'op', TG_OP), 'change', 'pt:' || <project_id>, false)` — public broadcast channel, **metadata only**.

Accepted trade-off (stated to user): a holder of the anon key can observe that edits occur (table name, row uuid, timing) but never content. Upgrade path to private channels exists without redesign.

**Revert** = server action that writes a chosen revision's `old_data` back as a normal UPDATE (stamped with the reverting user). History only moves forward.

### Security

- RLS **enabled** on all `pt_*` tables with **zero policies** → PostgREST denies anon/authenticated; only the service-role key (server-side env var) can touch them. Verify during implementation that this matches the existing `api`-schema posture; if existing tables also revoke schema grants, mirror that too.
- Clerk `auth()` check in every server action; route added to `isProtectedRoute` in `src/proxy.ts`.
- No Supabase auth-config changes. Lending tables untouched. The browser receives only `NEXT_PUBLIC_SUPABASE_URL` + anon key (for the Realtime websocket join).

### Migrations & seed

- New `supabase/migrations/` directory in this repo: `0001_project_hub_schema.sql`, `0002_project_hub_seed.sql`.
- Applied by `scripts/db/apply-migrations.mjs`: reads the PAT from the gitignored `.mcp.json` (or `SUPABASE_ACCESS_TOKEN` env), posts each unapplied file to the Management API query endpoint, records applied versions in `api.pt_migrations (version text primary key, applied_at timestamptz)` — the script bootstraps that table if missing.
- Seed SQL is generated **once** by a checked-in script (`scripts/db/generate-seed.py`, reusing the workbook parser) and committed. Normalization rules:
  - Phases ordered 1→6 regardless of sheet block order (sheet had P4 before P3).
  - Text dates ("9 Feb", "13 May") parsed as 2026 dates; Excel datetimes → dates.
  - Status mapping: `Complete`→`complete`, `underway`→`in_progress`, `N/A`→`na`, blank→`not_started` (case-insensitive).
  - Original row order preserved via `sort_order` within each group/section.
  - Data contradictions (e.g. "Content gap analysis": duration "3 days", dates 4 Mar→13 May) seeded as-entered; the UI makes them visible and fixable.
  - Typos in deliverables fixed ("rotateble"/"rotabele" → "rotatable"); the two trailing un-bulleted rows become normal deliverables.
  - Summary-sheet milestones are canonical (timeline sheet repeats them); legend rows not seeded (phase colors come from `color_token`).
  - Phase `color_token` values assigned from the FCU DS palette at seed time.

## Frontend (this repo)

### Route, deps, data flow

- `src/app/(frontend)/project-hub/page.tsx` + `/project-hub(.*)` added to the Clerk protected matcher in `src/proxy.ts`.
- New deps (only these): `@supabase/supabase-js`, `@tanstack/react-query`, `zod`.
- One server query (`getProjectHub`) returns the full hub payload (~200 small rows) into a single React Query key. Mutations are per-entity server actions validated with zod: optimistic update → server write (actor stamped from Clerk session) → trigger writes revision + broadcasts → other clients debounce-refetch (~500 ms). Failures roll back optimistic state and show a DS toast.
- Concurrency: last-write-wins per field; both values land in history. Documented, acceptable for this team size.
- Realtime: browser joins public broadcast channel `pt:{project_id}` with the anon key; payloads are used only as an invalidation signal.

### Views (tabs)

1. **Overview** — overview facts, deployment-strategy facts (editable key/value lists, addable), phase summary cards with computed progress bars.
2. **Timeline** (default) — custom Gantt, CSS grid, no library: collapsible phase swimlanes; month columns Feb–Sep 2026 with week ticks; today line; milestone diamonds in the month header; bars positioned from dates and colored by phase `color_token`, status shown via pip + bar treatment; click row → side-panel editor (all fields + that row's history with revert); click status pip → cycle status; add task/group inline; tasks without dates listed un-barred.
3. **Milestones** — vertical timeline; achieved toggle; overdue badge computed (`date < today && !achieved`).
4. **Risks** — editable register with impact badges.
5. **Tech stack** — editable table.
6. **Deliverables** — checklist with `done` toggles + progress.
7. **Activity** — global `pt_revisions` feed, humanized field-level diffs, revert buttons, grouped by day.

Header band (all views): title/subtitle, days-to-go-live (from GO-LIVE milestone), overall % complete, count of connected viewers (Realtime presence on the same channel — anonymous client ids only, count displayed, no identities on the public channel).

### Editing UX & accessibility

- Inline click-to-edit with DS inputs everywhere; Enter saves, Esc cancels; side panel for full task editing.
- Add + soft-delete on every collection; deleted rows recoverable from Activity (revert).
- Reordering via keyboard-accessible move up/down controls (no drag-and-drop dependency in v1).
- Full keyboard path for every interaction; `aria-live` announcements when realtime refetches change visible data; WCAG 2.1 AA per DS standards.

### Deliberately deferred (schema already supports)

Gantt bar drag/resize; drag-reorder; private realtime channels; multi-project navigation (single project resolved by slug constant in v1).

## Error handling

- Server actions return typed `{ ok } | { error }` results; zod-validated inputs; Clerk check first.
- Client: optimistic rollback + toast on error; React Query retry/backoff on reads; Realtime disconnect → automatic resubscribe + one refetch on rejoin (data is server-fetched, so a dropped socket degrades to manual-refresh semantics, never wrong data).
- Migration script is transactional per file and stops on first failure. The seed is guarded, not row-idempotent: it no-ops entirely if a `pt_projects` row with the seed slug already exists (most child tables have no natural unique key, so a whole-seed guard is the honest mechanism).

## Testing & verification

- Unit (vitest): seed parser (date/status normalization), Gantt date math (bar geometry, today position), diff humanizer, status cycling.
- Server actions: integration tests with mocked Supabase/Clerk clients (auth rejection, validation failure, actor stamping).
- Live verification with preview tools before completion: sign-in gate, edit round-trip, realtime ping across two sessions, revert flow, screenshots of all tabs (desktop + mobile width).

## Rollout

1. Migration `0001` + `0002` applied to fcu-forms `api` schema (verify with read-only queries).
2. Env vars added locally + Vercel: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server-only), `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Frontend shipped behind Clerk; `/project-hub` linked nowhere publicly.
4. Excel workbook retired; this tool becomes the source of truth.
