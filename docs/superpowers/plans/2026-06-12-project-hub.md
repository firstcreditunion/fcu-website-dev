# Project Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the FCU project-timeline Excel workbook with a Clerk-gated, realtime, fully editable Project Hub: dashboard + task-level Gantt backed by new `pt_*` tables in the `api` schema of the fcu-forms Supabase project.

**Architecture:** Server-mediated everything — Clerk-authenticated Next.js server actions own all reads/writes via the service-role key; a DB trigger writes full-row revisions to `pt_revisions` and broadcasts metadata-only pings on Supabase Realtime channel `pt:{project_id}`; browsers join that channel with the anon key purely to debounce-refetch through the authed server. UI is built exclusively from the FCU design system (`src/components/ui/*`).

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 tokens, Base UI components, Clerk v7, `@supabase/supabase-js`, `@tanstack/react-query` v5, `zod`, `date-fns` (already present), vitest (new devDep), Supabase Management API for migrations.

**Spec:** `docs/superpowers/specs/2026-06-12-project-hub-design.md` — read it first.

**Conventions for every task:**
- Work on branch `feature/project-hub` (Task 1 creates it). Commit after every task with the message given. Never commit `.agents/`, `.cursor/`, `.mcp.json`, or `.env.local`.
- All new frontend files use the `@/` alias (`@/*` → `src/*`). `cn` is at `@/lib/utils`.
- The Supabase project ref is `hojrhcbubaafsqjqvezq`. The Management API PAT is read from gitignored `.mcp.json` → `mcpServers["supabase-fcu"].env.SUPABASE_ACCESS_TOKEN` (never hardcode it, never print it).
- Migration SQL files must NOT contain `begin;`/`commit;` — the apply script wraps each file in a transaction.
- Run `npx tsc --noEmit` before each commit that touches TS; it must pass.
- **Status color utilities:** plan code uses classes like `bg-status-success-500` / `text-status-danger-700`. Before first use, confirm these utilities exist (tokens must appear as `--color-status-*` in the `@theme inline` block of `src/app/globals.css`). If they don't, do NOT add tokens — use `style={{ background: 'var(--status-success-500)' }}` (etc.) instead, keeping the DS untouched.

---

### Task 1: Branch, dependencies, vitest harness

**Files:**
- Modify: `package.json` (deps + `test` script)
- Create: `vitest.config.ts`

- [ ] **Step 1: Create the branch**

```powershell
git checkout -b feature/project-hub
```

- [ ] **Step 2: Install runtime deps and vitest**

```powershell
npm install @supabase/supabase-js @tanstack/react-query zod server-only
npm install -D vitest
```

Expected: lockfile updates, no peer-dep errors (React 19 is supported by react-query v5).

- [ ] **Step 3: Add the test script**

In `package.json` `"scripts"`, after `"lint"`:

```json
"test": "vitest run",
"test:watch": "vitest",
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
```

- [ ] **Step 5: Verify the harness runs (no tests yet → passWithNoTests not set, so expect the "no test files" exit). Run:**

```powershell
npx vitest run --passWithNoTests
```

Expected: exits 0, "No test files found".

- [ ] **Step 6: Commit**

```powershell
git add package.json package-lock.json vitest.config.ts
git commit -m "chore(project-hub): add supabase-js, react-query, zod, vitest harness"
```

---

### Task 2: Migration runner script

**Files:**
- Create: `scripts/db/apply-migrations.mjs`
- Create: `supabase/migrations/` (directory, created implicitly by Task 3's file)

- [ ] **Step 1: Create `scripts/db/apply-migrations.mjs`**

```js
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REF = 'hojrhcbubaafsqjqvezq'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

function pat() {
  if (process.env.SUPABASE_ACCESS_TOKEN) return process.env.SUPABASE_ACCESS_TOKEN
  const mcp = JSON.parse(readFileSync(path.join(root, '.mcp.json'), 'utf8'))
  return mcp.mcpServers['supabase-fcu'].env.SUPABASE_ACCESS_TOKEN
}

async function run(query) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${pat()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) throw new Error(`Management API ${res.status}: ${await res.text()}`)
  return res.json()
}

const BOOTSTRAP = `
create table if not exists api.pt_migrations (
  version text primary key,
  applied_at timestamptz not null default now()
);
alter table api.pt_migrations enable row level security;
revoke all on api.pt_migrations from anon, authenticated;
`

await run(BOOTSTRAP)
const appliedRows = await run('select version from api.pt_migrations order by version')
const applied = new Set(appliedRows.map((r) => r.version))

const dir = path.join(root, 'supabase', 'migrations')
if (!existsSync(dir)) {
  console.log('no supabase/migrations directory; nothing to do')
  process.exit(0)
}
const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()
for (const file of files) {
  if (applied.has(file)) {
    console.log(`skip    ${file}`)
    continue
  }
  const sql = readFileSync(path.join(dir, file), 'utf8')
  if (/^\s*(begin|commit)\s*;/im.test(sql)) {
    throw new Error(`${file} contains begin/commit — the runner wraps files itself`)
  }
  await run(`begin;\n${sql}\ninsert into api.pt_migrations (version) values ('${file.replace(/'/g, "''")}');\ncommit;`)
  console.log(`applied ${file}`)
}
console.log('done')
```

- [ ] **Step 2: Run it (no migrations exist yet — verifies bootstrap + PAT plumbing)**

```powershell
node scripts/db/apply-migrations.mjs
```

Expected output: `no supabase/migrations directory; nothing to do` (or `done` with no files).

- [ ] **Step 3: Verify the bootstrap table exists (read-only check)**

```powershell
$tok = (Get-Content .mcp.json -Raw | ConvertFrom-Json).mcpServers.'supabase-fcu'.env.SUPABASE_ACCESS_TOKEN
$b = @{query="select tablename, rowsecurity from pg_tables where schemaname='api' and tablename='pt_migrations'"} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "https://api.supabase.com/v1/projects/hojrhcbubaafsqjqvezq/database/query" -Headers @{Authorization="Bearer $tok"} -ContentType "application/json" -Body $b
```

Expected: one row, `rowsecurity = true`.

- [ ] **Step 4: Commit**

```powershell
git add scripts/db/apply-migrations.mjs
git commit -m "feat(project-hub): migration runner against Supabase Management API"
```

---

### Task 3: Schema migration `0001`

**Files:**
- Create: `supabase/migrations/0001_project_hub_schema.sql`

- [ ] **Step 1: Create the migration file with this exact content**

```sql
-- Project Hub schema. Spec: docs/superpowers/specs/2026-06-12-project-hub-design.md
-- No begin/commit here: the runner wraps each file in a transaction.

create type api.pt_task_status as enum ('not_started','in_progress','complete','blocked','na');
create type api.pt_risk_impact as enum ('low','medium','high');
create type api.pt_fact_section as enum ('overview','deployment');
create type api.pt_revision_action as enum ('insert','update','delete');

create table api.pt_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_id text,
  updated_by_name text,
  deleted_at timestamptz,
  deleted_by_id text,
  deleted_by_name text
);

create table api.pt_facts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references api.pt_projects(id),
  section api.pt_fact_section not null,
  label text not null,
  value text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_id text,
  updated_by_name text,
  deleted_at timestamptz,
  deleted_by_id text,
  deleted_by_name text
);
create index pt_facts_project_idx on api.pt_facts (project_id, section, sort_order);

create table api.pt_phases (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references api.pt_projects(id),
  phase_number int not null,
  name text not null,
  start_date date,
  end_date date,
  color_token text not null default 'chart-1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_id text,
  updated_by_name text,
  deleted_at timestamptz,
  deleted_by_id text,
  deleted_by_name text,
  unique (project_id, phase_number)
);

create table api.pt_task_groups (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references api.pt_projects(id),
  phase_id uuid not null references api.pt_phases(id),
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_id text,
  updated_by_name text,
  deleted_at timestamptz,
  deleted_by_id text,
  deleted_by_name text
);
create index pt_task_groups_phase_idx on api.pt_task_groups (phase_id, sort_order);

create table api.pt_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references api.pt_projects(id),
  group_id uuid not null references api.pt_task_groups(id),
  name text not null,
  start_date date,
  end_date date,
  duration_label text,
  status api.pt_task_status not null default 'not_started',
  notes text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_id text,
  updated_by_name text,
  deleted_at timestamptz,
  deleted_by_id text,
  deleted_by_name text
);
create index pt_tasks_group_idx on api.pt_tasks (group_id, sort_order);
create index pt_tasks_project_idx on api.pt_tasks (project_id);

create table api.pt_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references api.pt_projects(id),
  date date not null,
  name text not null,
  deliverable text,
  achieved boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_id text,
  updated_by_name text,
  deleted_at timestamptz,
  deleted_by_id text,
  deleted_by_name text
);
create index pt_milestones_project_idx on api.pt_milestones (project_id, sort_order);

create table api.pt_risks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references api.pt_projects(id),
  risk text not null,
  impact api.pt_risk_impact not null default 'medium',
  mitigation text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_id text,
  updated_by_name text,
  deleted_at timestamptz,
  deleted_by_id text,
  deleted_by_name text
);
create index pt_risks_project_idx on api.pt_risks (project_id, sort_order);

create table api.pt_tech_stack (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references api.pt_projects(id),
  technology text not null,
  version text not null default '',
  purpose text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_id text,
  updated_by_name text,
  deleted_at timestamptz,
  deleted_by_id text,
  deleted_by_name text
);
create index pt_tech_stack_project_idx on api.pt_tech_stack (project_id, sort_order);

create table api.pt_deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references api.pt_projects(id),
  description text not null,
  done boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_id text,
  updated_by_name text,
  deleted_at timestamptz,
  deleted_by_id text,
  deleted_by_name text
);
create index pt_deliverables_project_idx on api.pt_deliverables (project_id, sort_order);

create table api.pt_revisions (
  id bigint generated always as identity primary key,
  project_id uuid not null,
  table_name text not null,
  row_id uuid not null,
  action api.pt_revision_action not null,
  actor_id text,
  actor_name text,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);
create index pt_revisions_project_created_idx on api.pt_revisions (project_id, created_at desc);
create index pt_revisions_row_idx on api.pt_revisions (table_name, row_id);

-- keep updated_at honest regardless of caller
create or replace function api.pt_touch() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- one revision row + one metadata-only realtime ping per write
create or replace function api.pt_log_and_notify() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  v_new jsonb;
  v_old jsonb;
  v_pid uuid;
  v_rid uuid;
begin
  if tg_op = 'DELETE' then
    v_old := to_jsonb(old);
    v_pid := coalesce(nullif(v_old->>'project_id','')::uuid, (v_old->>'id')::uuid);
    v_rid := (v_old->>'id')::uuid;
    insert into api.pt_revisions (project_id, table_name, row_id, action, actor_id, actor_name, old_data, new_data)
    values (v_pid, tg_table_name, v_rid, 'delete', null, null, v_old, null);
  else
    v_new := to_jsonb(new);
    v_old := case when tg_op = 'UPDATE' then to_jsonb(old) else null end;
    v_pid := coalesce(nullif(v_new->>'project_id','')::uuid, (v_new->>'id')::uuid);
    v_rid := (v_new->>'id')::uuid;
    insert into api.pt_revisions (project_id, table_name, row_id, action, actor_id, actor_name, old_data, new_data)
    values (v_pid, tg_table_name, v_rid,
            case when tg_op = 'INSERT' then 'insert'::api.pt_revision_action else 'update'::api.pt_revision_action end,
            v_new->>'updated_by_id', v_new->>'updated_by_name', v_old, v_new);
  end if;
  perform realtime.send(
    jsonb_build_object('table', tg_table_name, 'id', v_rid::text, 'op', lower(tg_op)),
    'change',
    'pt:' || v_pid::text,
    false
  );
  return null;
end $$;

create trigger pt_touch before update on api.pt_projects for each row execute function api.pt_touch();
create trigger pt_touch before update on api.pt_facts for each row execute function api.pt_touch();
create trigger pt_touch before update on api.pt_phases for each row execute function api.pt_touch();
create trigger pt_touch before update on api.pt_task_groups for each row execute function api.pt_touch();
create trigger pt_touch before update on api.pt_tasks for each row execute function api.pt_touch();
create trigger pt_touch before update on api.pt_milestones for each row execute function api.pt_touch();
create trigger pt_touch before update on api.pt_risks for each row execute function api.pt_touch();
create trigger pt_touch before update on api.pt_tech_stack for each row execute function api.pt_touch();
create trigger pt_touch before update on api.pt_deliverables for each row execute function api.pt_touch();

create trigger pt_log after insert or update or delete on api.pt_projects for each row execute function api.pt_log_and_notify();
create trigger pt_log after insert or update or delete on api.pt_facts for each row execute function api.pt_log_and_notify();
create trigger pt_log after insert or update or delete on api.pt_phases for each row execute function api.pt_log_and_notify();
create trigger pt_log after insert or update or delete on api.pt_task_groups for each row execute function api.pt_log_and_notify();
create trigger pt_log after insert or update or delete on api.pt_tasks for each row execute function api.pt_log_and_notify();
create trigger pt_log after insert or update or delete on api.pt_milestones for each row execute function api.pt_log_and_notify();
create trigger pt_log after insert or update or delete on api.pt_risks for each row execute function api.pt_log_and_notify();
create trigger pt_log after insert or update or delete on api.pt_tech_stack for each row execute function api.pt_log_and_notify();
create trigger pt_log after insert or update or delete on api.pt_deliverables for each row execute function api.pt_log_and_notify();

alter table api.pt_projects enable row level security;
alter table api.pt_facts enable row level security;
alter table api.pt_phases enable row level security;
alter table api.pt_task_groups enable row level security;
alter table api.pt_tasks enable row level security;
alter table api.pt_milestones enable row level security;
alter table api.pt_risks enable row level security;
alter table api.pt_tech_stack enable row level security;
alter table api.pt_deliverables enable row level security;
alter table api.pt_revisions enable row level security;

revoke all on api.pt_projects, api.pt_facts, api.pt_phases, api.pt_task_groups,
  api.pt_tasks, api.pt_milestones, api.pt_risks, api.pt_tech_stack,
  api.pt_deliverables, api.pt_revisions from anon, authenticated;
```

- [ ] **Step 2: Apply it**

```powershell
node scripts/db/apply-migrations.mjs
```

Expected: `applied 0001_project_hub_schema.sql` then `done`.

- [ ] **Step 3: Verify (read-only): 10 tables, RLS on, trigger count**

```powershell
$tok = (Get-Content .mcp.json -Raw | ConvertFrom-Json).mcpServers.'supabase-fcu'.env.SUPABASE_ACCESS_TOKEN
$b = @{query="select (select count(*) from pg_tables where schemaname='api' and tablename like 'pt\_%' escape '\') as tables, (select count(*) from pg_tables where schemaname='api' and tablename like 'pt\_%' escape '\' and rowsecurity) as rls_on, (select count(*) from pg_trigger t join pg_class c on c.oid=t.tgrelid join pg_namespace n on n.oid=c.relnamespace where n.nspname='api' and t.tgname='pt_log') as log_triggers"} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "https://api.supabase.com/v1/projects/hojrhcbubaafsqjqvezq/database/query" -Headers @{Authorization="Bearer $tok"} -ContentType "application/json" -Body $b
```

Expected: `tables=11` (10 + pt_migrations), `rls_on=11`, `log_triggers=9`.

- [ ] **Step 4: Smoke-test the trigger (insert + update + soft-delete a scratch project, check revisions, then hard-delete it)**

Run via the same Invoke-RestMethod pattern with this query:

```sql
insert into api.pt_projects (slug, title, updated_by_id, updated_by_name) values ('pt-smoke','smoke','t1','Tester');
update api.pt_projects set title='smoke2', updated_by_id='t1', updated_by_name='Tester' where slug='pt-smoke';
update api.pt_projects set deleted_at=now(), deleted_by_id='t1', deleted_by_name='Tester', updated_by_id='t1', updated_by_name='Tester' where slug='pt-smoke';
select action, actor_name, (new_data->>'title') as title from api.pt_revisions where table_name='pt_projects' order by id;
```

Expected rows: `insert/Tester/smoke`, `update/Tester/smoke2`, `update/Tester/smoke2` (the soft delete). Then clean up (this also exercises the `delete` branch):

```sql
delete from api.pt_projects where slug='pt-smoke';
delete from api.pt_revisions where table_name='pt_projects' and (new_data->>'slug'='pt-smoke' or old_data->>'slug'='pt-smoke');
```

- [ ] **Step 5: Commit**

```powershell
git add supabase/migrations/0001_project_hub_schema.sql
git commit -m "feat(project-hub): pt_* schema, revision/notify triggers, deny-all RLS"
```

---

### Task 4: Environment variables

**Files:**
- Modify: `.env.local` (gitignored — never commit)

- [ ] **Step 1: Fetch the project API keys via Management API and append env vars**

```powershell
$tok = (Get-Content .mcp.json -Raw | ConvertFrom-Json).mcpServers.'supabase-fcu'.env.SUPABASE_ACCESS_TOKEN
$keys = Invoke-RestMethod -Uri "https://api.supabase.com/v1/projects/hojrhcbubaafsqjqvezq/api-keys?reveal=true" -Headers @{Authorization="Bearer $tok"}
# Supabase's current API keys: publishable (sb_publishable_…) replaces the legacy
# anon JWT; secret (sb_secret_…) replaces service_role. Match on type, not name.
$pub    = ($keys | Where-Object { $_.type -eq 'publishable' -and -not $_.disabled }).api_key
$secret = ($keys | Where-Object { $_.type -eq 'secret' -and -not $_.disabled }).api_key
Add-Content .env.local "`n# Project Hub (fcu-forms)"
Add-Content .env.local "SUPABASE_URL=https://hojrhcbubaafsqjqvezq.supabase.co"
Add-Content .env.local "SUPABASE_SECRET_KEY=$secret"
Add-Content .env.local "NEXT_PUBLIC_SUPABASE_URL=https://hojrhcbubaafsqjqvezq.supabase.co"
Add-Content .env.local "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$pub"
```

Do NOT echo `$secret`. Verify presence only:

```powershell
Select-String -Path .env.local -Pattern 'SUPABASE' | ForEach-Object { ($_.Line -split '=')[0] }
```

Expected: the four variable names (`SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`). No commit (env is local). Note for rollout: the same four vars must be added in Vercel before deploy.

---

### Task 5: Seed generator + migration `0002`

**Files:**
- Create: `scripts/db/generate-seed.py`
- Create: `supabase/migrations/0002_project_hub_seed.sql` (generated — committed)

- [ ] **Step 1: Create `scripts/db/generate-seed.py`**

```python
"""Generates supabase/migrations/0002_project_hub_seed.sql from the FCU timeline workbook.
Run once: python scripts/db/generate-seed.py "C:\\Users\\ivicliph\\Downloads\\FCU_Website_Project_Timeline_2026.xlsx"
Normalization rules: docs/superpowers/specs/2026-06-12-project-hub-design.md
"""
import sys, uuid, datetime, re
from openpyxl import load_workbook

XLSX = sys.argv[1]
OUT = "supabase/migrations/0002_project_hub_seed.sql"
SLUG = "fcu-website-rebuild-2026"
YEAR = 2026
MONTHS = {m: i + 1 for i, m in enumerate(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])}
PHASE_COLORS = {1: "chart-1", 2: "chart-2", 3: "chart-3", 4: "chart-4", 5: "chart-5", 6: "fcu-mint-500"}
STATUS_MAP = {"complete": "complete", "underway": "in_progress", "n/a": "na", "": "not_started"}

def esc(s):
    return str(s).replace("'", "''").strip()

def parse_date(v):
    if v is None or str(v).strip() == "":
        return None
    if isinstance(v, datetime.datetime):
        return v.date().isoformat()
    if isinstance(v, datetime.date):
        return v.isoformat()
    m = re.match(r"^(\d{1,2})\s+([A-Za-z]{3})", str(v).strip())
    if m:
        return datetime.date(YEAR, MONTHS[m.group(2).title()], int(m.group(1))).isoformat()
    raise ValueError(f"unparseable date: {v!r}")

def sqld(d):
    return f"'{d}'" if d else "null"

def fix_typos(s):
    return s.replace("rotateble", "rotatable").replace("rotabele", "rotatable")

def networkdays(a, b):
    a, b = datetime.date.fromisoformat(a), datetime.date.fromisoformat(b)
    d, n = a, 0
    while d <= b:
        if d.weekday() < 5:
            n += 1
        d += datetime.timedelta(days=1)
    return n

wb = load_workbook(XLSX, data_only=True)
ws = wb["Project Summary"]
rows = [[c.value for c in r] for r in ws.iter_rows()]

def cell(r, c):
    v = rows[r - 1][c - 1] if r - 1 < len(rows) and c - 1 < len(rows[r - 1]) else None
    return "" if v is None else str(v).strip()

pid = str(uuid.uuid4())
stmts = []
stmts.append(
    f"insert into api.pt_projects (id, slug, title, subtitle) values "
    f"('{pid}', '{SLUG}', '{esc(cell(4, 2))}', "
    f"'7 months (Feb – Aug 2026) · Next.js 16 · Supabase · Sanity · Vercel');"
)

def ins(table, cols, vals_rows):
    for v in vals_rows:
        stmts.append(f"insert into api.{table} ({cols}) values ({v});")

# facts: overview rows 4-7, deployment rows 55-62; strip trailing ':' from labels
facts = []
for i, r in enumerate(range(4, 8)):
    facts.append(f"'{pid}', 'overview', '{esc(cell(r, 1).rstrip(':'))}', '{esc(cell(r, 2))}', {i}")
for i, r in enumerate(range(55, 63)):
    facts.append(f"'{pid}', 'deployment', '{esc(cell(r, 1).rstrip(':'))}', '{esc(cell(r, 2))}', {i}")
ins("pt_facts", "project_id, section, label, value, sort_order", facts)

# tech stack rows 11-20
ins("pt_tech_stack", "project_id, technology, version, purpose, sort_order",
    [f"'{pid}', '{esc(cell(r, 1))}', '{esc(cell(r, 2))}', '{esc(cell(r, 3))}', {i}"
     for i, r in enumerate(range(11, 21))])

# phases rows 25-30 (number, name, duration, start, end)
phase_ids = {}
phase_rows = []
for r in range(25, 31):
    num = int(cell(r, 1))
    phase_ids[num] = str(uuid.uuid4())
    phase_rows.append(
        f"'{phase_ids[num]}', '{pid}', {num}, '{esc(cell(r, 2))}', "
        f"{sqld(parse_date(rows[r - 1][3]))}, {sqld(parse_date(rows[r - 1][4]))}, '{PHASE_COLORS[num]}'")
ins("pt_phases", "id, project_id, phase_number, name, start_date, end_date, color_token", phase_rows)

# milestones rows 35-41
ins("pt_milestones", "project_id, date, name, deliverable, sort_order",
    [f"'{pid}', {sqld(parse_date(rows[r - 1][0]))}, '{esc(cell(r, 2))}', '{esc(cell(r, 3))}', {i}"
     for i, r in enumerate(range(35, 42))])

# risks rows 46-51
ins("pt_risks", "project_id, risk, impact, mitigation, sort_order",
    [f"'{pid}', '{esc(cell(r, 1))}', '{cell(r, 2).lower()}', '{esc(cell(r, 3))}', {i}"
     for i, r in enumerate(range(46, 52))])

# deliverables rows 66-80 (strip bullet, fix typos)
ins("pt_deliverables", "project_id, description, sort_order",
    [f"'{pid}', '{esc(fix_typos(cell(r, 1).lstrip('•').strip()))}', {i}"
     for i, r in enumerate(range(66, 81)) if cell(r, 1)])

# timeline sheet: phase headers (CAPS), groups (no dates), tasks (indented, dates)
ws2 = wb["Project Timeline"]
trows = [[c.value for c in r] for r in ws2.iter_rows()]
group_id = None
group_sort = {}
task_sort = {}
gstmts, tstmts = [], []
for raw in trows[4:]:  # data starts row 5
    pcol = "" if raw[0] is None else str(raw[0]).strip()
    name = "" if len(raw) < 2 or raw[1] is None else str(raw[1])
    if not pcol.startswith("Phase") or not name.strip():
        continue
    pnum = int(pcol.split()[1])
    duration = "" if len(raw) < 3 or raw[2] is None else str(raw[2]).strip()
    start = raw[3] if len(raw) > 3 else None
    end = raw[4] if len(raw) > 4 else None
    status_raw = ("" if len(raw) < 13 or raw[12] is None else str(raw[12]).strip().lower())
    if name.strip().isupper():
        continue  # phase header row; phases come from the summary sheet
    if not duration and start is None and end is None:
        group_id = str(uuid.uuid4())
        s = group_sort.get(pnum, 0)
        group_sort[pnum] = s + 1
        gstmts.append(
            f"insert into api.pt_task_groups (id, project_id, phase_id, name, sort_order) values "
            f"('{group_id}', '{pid}', '{phase_ids[pnum]}', '{esc(name)}', {s});")
        continue
    if group_id is None:
        raise ValueError(f"task before any group: {name!r}")
    # keep the label only when NOT derivable from the dates: 'Ongoing' stays;
    # '1 week' matching the span is dropped (UI computes it); a label that
    # CONTRADICTS the dates stays visible (spec: seeded as-entered).
    dl = duration if duration else None
    sd, ed = parse_date(start), parse_date(end)
    if dl:
        m = re.fullmatch(r"(\d+) (week|weeks|day|days)", dl)
        if m and sd and ed:
            n, unit = int(m.group(1)), m.group(2)
            wd = networkdays(sd, ed)
            if (unit.startswith("day") and wd == n) or (unit.startswith("week") and wd == n * 5):
                dl = None
    s = task_sort.get(group_id, 0)
    task_sort[group_id] = s + 1
    status = STATUS_MAP.get(status_raw, "not_started")
    dl_sql = f"'{esc(dl)}'" if dl else "null"
    tstmts.append(
        f"insert into api.pt_tasks (project_id, group_id, name, start_date, end_date, duration_label, status, sort_order) values "
        f"('{pid}', '{group_id}', '{esc(name)}', {sqld(sd)}, {sqld(ed)}, {dl_sql}, '{status}', {s});")

body = "\n  ".join(s.replace("\n", " ") for s in stmts + gstmts + tstmts)
sql = f"""-- Generated by scripts/db/generate-seed.py — do not hand-edit row values.
do $$
begin
  if exists (select 1 from api.pt_projects where slug = '{SLUG}') then
    raise notice 'project hub already seeded; skipping';
    return;
  end if;
  {body}
end $$;
"""
with open(OUT, "w", encoding="utf-8") as f:
    f.write(sql)
print(f"wrote {OUT}: phases=6, groups={sum(group_sort.values())}, tasks={len(tstmts)}")
```

Label rule in one line: a duration label survives seeding only when it carries information the dates don't — "Ongoing" stays, an accurate "1 week" is dropped (UI computes it), and the workbook's contradictory "3 days" on a 10-week span stays so the discrepancy is visible and fixable in the UI.

- [ ] **Step 2: Run the generator**

```powershell
python scripts/db/generate-seed.py "C:\Users\ivicliph\Downloads\FCU_Website_Project_Timeline_2026.xlsx"
```

Expected: `wrote supabase/migrations/0002_project_hub_seed.sql: phases=6, groups=~20, tasks=~150` (capture actual numbers).

- [ ] **Step 3: Eyeball the generated SQL** — open it; check: project insert first, no raw `'` breakage, statuses only from the enum, milestone dates are `2026-*`, deliverables say "rotatable", the "Content gap analysis" task kept `duration_label='3 days'` with `2026-03-04`/`2026-05-13` dates.

- [ ] **Step 4: Apply + verify counts**

```powershell
node scripts/db/apply-migrations.mjs
```

Expected: `skip 0001...`, `applied 0002_project_hub_seed.sql`.

Verify with the read-only query pattern from Task 3:

```sql
select (select count(*) from api.pt_phases) phases,
       (select count(*) from api.pt_task_groups) groups,
       (select count(*) from api.pt_tasks) tasks,
       (select count(*) from api.pt_milestones) milestones,
       (select count(*) from api.pt_risks) risks,
       (select count(*) from api.pt_tech_stack) tech,
       (select count(*) from api.pt_deliverables) deliverables,
       (select count(*) from api.pt_facts) facts,
       (select count(*) from api.pt_revisions) revisions
```

Expected: phases=6, milestones=7, risks=6, tech=10, deliverables=15, facts=12; groups/tasks match Step 2's printout; revisions = sum of all inserted rows + 1 project (every seed insert fires the trigger — correct and useful: history starts at "seeded").

- [ ] **Step 5: Re-run the apply script to prove idempotence** — expected: both files `skip`.

- [ ] **Step 6: Commit**

```powershell
git add scripts/db/generate-seed.py supabase/migrations/0002_project_hub_seed.sql
git commit -m "feat(project-hub): workbook seed generator + generated seed migration"
```

---

### Task 6: Domain types + table registry (TDD)

**Files:**
- Create: `src/lib/project-hub/types.ts`
- Create: `src/lib/project-hub/tables.ts`
- Test: `src/lib/project-hub/tables.test.ts`

- [ ] **Step 1: Create `src/lib/project-hub/types.ts`**

```ts
export type PtTaskStatus = 'not_started' | 'in_progress' | 'complete' | 'blocked' | 'na'
export type PtRiskImpact = 'low' | 'medium' | 'high'
export type PtFactSection = 'overview' | 'deployment'
export type PtRevisionAction = 'insert' | 'update' | 'delete'

interface Meta {
  id: string
  created_at: string
  updated_at: string
  updated_by_id: string | null
  updated_by_name: string | null
  deleted_at: string | null
  deleted_by_id: string | null
  deleted_by_name: string | null
}

export interface PtProject extends Meta {
  slug: string
  title: string
  subtitle: string | null
}
export interface PtFact extends Meta {
  project_id: string
  section: PtFactSection
  label: string
  value: string
  sort_order: number
}
export interface PtPhase extends Meta {
  project_id: string
  phase_number: number
  name: string
  start_date: string | null
  end_date: string | null
  color_token: string
}
export interface PtTaskGroup extends Meta {
  project_id: string
  phase_id: string
  name: string
  sort_order: number
}
export interface PtTask extends Meta {
  project_id: string
  group_id: string
  name: string
  start_date: string | null
  end_date: string | null
  duration_label: string | null
  status: PtTaskStatus
  notes: string | null
  sort_order: number
}
export interface PtMilestone extends Meta {
  project_id: string
  date: string
  name: string
  deliverable: string | null
  achieved: boolean
  sort_order: number
}
export interface PtRisk extends Meta {
  project_id: string
  risk: string
  impact: PtRiskImpact
  mitigation: string
  sort_order: number
}
export interface PtTechStack extends Meta {
  project_id: string
  technology: string
  version: string
  purpose: string
  sort_order: number
}
export interface PtDeliverable extends Meta {
  project_id: string
  description: string
  done: boolean
  sort_order: number
}
export interface PtRevision {
  id: number
  project_id: string
  table_name: string
  row_id: string
  action: PtRevisionAction
  actor_id: string | null
  actor_name: string | null
  old_data: Record<string, unknown> | null
  new_data: Record<string, unknown> | null
  created_at: string
}

export interface HubPayload {
  project: PtProject
  facts: PtFact[]
  phases: PtPhase[]
  groups: PtTaskGroup[]
  tasks: PtTask[]
  milestones: PtMilestone[]
  risks: PtRisk[]
  techStack: PtTechStack[]
  deliverables: PtDeliverable[]
}

export const TASK_STATUSES: PtTaskStatus[] = ['not_started', 'in_progress', 'complete', 'blocked', 'na']
export const STATUS_LABELS: Record<PtTaskStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  complete: 'Complete',
  blocked: 'Blocked',
  na: 'N/A',
}
```

- [ ] **Step 2: Write the failing test `src/lib/project-hub/tables.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { validatePatch, validateCreate, EDITABLE_TABLES } from './tables'

describe('table registry', () => {
  it('accepts a valid task patch', () => {
    expect(validatePatch('pt_tasks', { status: 'complete', name: 'X' }))
      .toEqual({ status: 'complete', name: 'X' })
  })
  it('rejects unknown fields (mass-assignment guard)', () => {
    expect(() => validatePatch('pt_tasks', { updated_by_id: 'evil' })).toThrow()
    expect(() => validatePatch('pt_tasks', { project_id: 'evil' })).toThrow()
  })
  it('rejects unknown tables', () => {
    // @ts-expect-error runtime guard for non-TS callers
    expect(() => validatePatch('tblLoanApplication', { name: 'x' })).toThrow()
  })
  it('rejects invalid enum values', () => {
    expect(() => validatePatch('pt_tasks', { status: 'done' })).toThrow()
    expect(() => validatePatch('pt_risks', { impact: 'severe' })).toThrow()
  })
  it('rejects malformed dates', () => {
    expect(() => validatePatch('pt_tasks', { start_date: '12 Jun' })).toThrow()
    expect(validatePatch('pt_tasks', { start_date: '2026-06-12' })).toEqual({ start_date: '2026-06-12' })
    expect(validatePatch('pt_tasks', { start_date: null })).toEqual({ start_date: null })
  })
  it('validates creates and requires parents', () => {
    expect(() => validateCreate('pt_tasks', { name: 'x' })).toThrow() // missing group_id
    const ok = validateCreate('pt_tasks', {
      group_id: '7c9e6679-7425-40de-944b-e07fc1f90ae7', name: 'x',
    })
    expect(ok.name).toBe('x')
  })
  it('exposes the full editable table list', () => {
    expect(EDITABLE_TABLES).toContain('pt_deliverables')
    expect(EDITABLE_TABLES).not.toContain('pt_revisions')
  })
})
```

- [ ] **Step 3: Run to verify failure** — `npm test` → FAIL (`./tables` not found).

- [ ] **Step 4: Create `src/lib/project-hub/tables.ts`**

```ts
import { z } from 'zod'

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD').nullable()
const uuid = z.string().uuid()
const sort = z.number().int().min(0)
const status = z.enum(['not_started', 'in_progress', 'complete', 'blocked', 'na'])
const impact = z.enum(['low', 'medium', 'high'])
const section = z.enum(['overview', 'deployment'])

const REGISTRY = {
  pt_projects: {
    patch: z.object({ title: z.string().min(1), subtitle: z.string().nullable() }),
    create: null,
  },
  pt_facts: {
    patch: z.object({ label: z.string().min(1), value: z.string(), sort_order: sort }),
    create: z.object({ section, label: z.string().min(1), value: z.string().default(''), sort_order: sort.default(0) }),
  },
  pt_phases: {
    patch: z.object({
      name: z.string().min(1), start_date: isoDate, end_date: isoDate,
      color_token: z.string().min(1), phase_number: z.number().int().min(1),
    }),
    create: null,
  },
  pt_task_groups: {
    patch: z.object({ name: z.string().min(1), sort_order: sort }),
    create: z.object({ phase_id: uuid, name: z.string().min(1), sort_order: sort.default(0) }),
  },
  pt_tasks: {
    patch: z.object({
      name: z.string().min(1), start_date: isoDate, end_date: isoDate,
      duration_label: z.string().nullable(), status, notes: z.string().nullable(),
      sort_order: sort, group_id: uuid,
    }),
    create: z.object({
      group_id: uuid, name: z.string().min(1), start_date: isoDate.default(null),
      end_date: isoDate.default(null), status: status.default('not_started'),
      sort_order: sort.default(0),
    }),
  },
  pt_milestones: {
    patch: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), name: z.string().min(1),
      deliverable: z.string().nullable(), achieved: z.boolean(), sort_order: sort,
    }),
    create: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), name: z.string().min(1),
      deliverable: z.string().nullable().default(null), sort_order: sort.default(0),
    }),
  },
  pt_risks: {
    patch: z.object({ risk: z.string().min(1), impact, mitigation: z.string(), sort_order: sort }),
    create: z.object({ risk: z.string().min(1), impact: impact.default('medium'), mitigation: z.string().default(''), sort_order: sort.default(0) }),
  },
  pt_tech_stack: {
    patch: z.object({ technology: z.string().min(1), version: z.string(), purpose: z.string(), sort_order: sort }),
    create: z.object({ technology: z.string().min(1), version: z.string().default(''), purpose: z.string().default(''), sort_order: sort.default(0) }),
  },
  pt_deliverables: {
    patch: z.object({ description: z.string().min(1), done: z.boolean(), sort_order: sort }),
    create: z.object({ description: z.string().min(1), sort_order: sort.default(0) }),
  },
} as const

export type EditableTable = keyof typeof REGISTRY
export const EDITABLE_TABLES = Object.keys(REGISTRY) as EditableTable[]

function entry(table: string) {
  const e = REGISTRY[table as EditableTable]
  if (!e) throw new Error(`not an editable table: ${table}`)
  return e
}

export function validatePatch(table: EditableTable, patch: unknown) {
  const parsed = entry(table).patch.partial().strict().parse(patch)
  if (Object.keys(parsed).length === 0) throw new Error('empty patch')
  return parsed
}

export function validateCreate(table: EditableTable, values: unknown) {
  const schema = entry(table).create
  if (!schema) throw new Error(`creates not allowed on ${table}`)
  return schema.strict().parse(values)
}
```

- [ ] **Step 5: Run tests** — `npm test` → all 7 pass. (If `.strict()` placement errors arise on partial schemas in the installed zod version, use `.strip()`-free `z.strictObject` per zod v4 docs — the tests define the contract.)

- [ ] **Step 6: Typecheck + commit**

```powershell
npx tsc --noEmit
git add src/lib/project-hub/types.ts src/lib/project-hub/tables.ts src/lib/project-hub/tables.test.ts
git commit -m "feat(project-hub): domain types + zod table registry with mass-assignment guard"
```

---

### Task 7: Timeline date math (TDD)

**Files:**
- Create: `src/lib/project-hub/dates.ts`
- Test: `src/lib/project-hub/dates.test.ts`

- [ ] **Step 1: Write the failing test `src/lib/project-hub/dates.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { TIMELINE_START, TIMELINE_END, pct, barGeometry, computedDurationLabel, monthTicks } from './dates'

describe('timeline math', () => {
  it('bounds: Feb 1 is 0%, end of window is 100%', () => {
    expect(pct(TIMELINE_START)).toBe(0)
    expect(pct(TIMELINE_END)).toBe(100)
    expect(pct('2025-12-25')).toBe(0)      // clamped
    expect(pct('2026-12-25')).toBe(100)    // clamped
  })
  it('bar geometry spans inclusive end date', () => {
    const g = barGeometry('2026-06-08', '2026-06-12')!
    expect(g.leftPct).toBeGreaterThan(52)
    expect(g.leftPct).toBeLessThan(54)
    expect(g.widthPct).toBeGreaterThan(1.5)
  })
  it('returns null when either date missing', () => {
    expect(barGeometry(null, '2026-06-12')).toBeNull()
    expect(barGeometry('2026-06-12', null)).toBeNull()
  })
  it('duration labels match the workbook conventions', () => {
    expect(computedDurationLabel('2026-04-13', '2026-04-17')).toBe('1 week')   // 5 workdays
    expect(computedDurationLabel('2026-04-20', '2026-04-22')).toBe('3 days')
    expect(computedDurationLabel('2026-02-02', '2026-02-20')).toBe('3 weeks')  // 15 workdays
    expect(computedDurationLabel('2026-06-04', '2026-06-04')).toBe('1 day')
    expect(computedDurationLabel(null, '2026-06-04')).toBe('')
  })
  it('month ticks cover Feb..Sep 2026', () => {
    const ticks = monthTicks()
    expect(ticks[0].label).toBe('Feb')
    expect(ticks[ticks.length - 1].label).toBe('Sep')
    expect(ticks).toHaveLength(8)
    expect(ticks[4].leftPct).toBeGreaterThan(48) // Jun starts near midpoint
    expect(ticks[4].leftPct).toBeLessThan(52)
  })
})
```

- [ ] **Step 2: Run to verify failure** — `npm test` → FAIL (`./dates` not found).

- [ ] **Step 3: Create `src/lib/project-hub/dates.ts`**

```ts
import { differenceInCalendarDays, addDays, format, parseISO, isWeekend, startOfMonth, addMonths } from 'date-fns'

export const TIMELINE_START = '2026-02-01'
export const TIMELINE_END = '2026-09-30'
const START = parseISO(TIMELINE_START)
const TOTAL_DAYS = differenceInCalendarDays(parseISO(TIMELINE_END), START)

export function pct(iso: string): number {
  const d = differenceInCalendarDays(parseISO(iso), START)
  return Math.min(100, Math.max(0, (d / TOTAL_DAYS) * 100))
}

export function barGeometry(start: string | null, end: string | null): { leftPct: number; widthPct: number } | null {
  if (!start || !end) return null
  const left = pct(start)
  const right = pct(format(addDays(parseISO(end), 1), 'yyyy-MM-dd')) // inclusive end date
  return { leftPct: left, widthPct: Math.max(right - left, 0.6) }
}

function workdays(start: string, end: string): number {
  let d = parseISO(start)
  const e = parseISO(end)
  let n = 0
  while (d <= e) {
    if (!isWeekend(d)) n++
    d = addDays(d, 1)
  }
  return n
}

export function computedDurationLabel(start: string | null, end: string | null): string {
  if (!start || !end || parseISO(end) < parseISO(start)) return ''
  const wd = workdays(start, end)
  if (wd >= 5 && wd % 5 === 0) {
    const w = wd / 5
    return `${w} ${w === 1 ? 'week' : 'weeks'}`
  }
  return `${wd} ${wd === 1 ? 'day' : 'days'}`
}

export function monthTicks(): { label: string; leftPct: number }[] {
  const ticks: { label: string; leftPct: number }[] = []
  let m = startOfMonth(START)
  while (m <= parseISO(TIMELINE_END)) {
    ticks.push({ label: format(m, 'MMM'), leftPct: pct(format(m, 'yyyy-MM-dd')) })
    m = addMonths(m, 1)
  }
  return ticks
}

export function todayPct(todayIso: string): number | null {
  const p = pct(todayIso)
  return p <= 0 || p >= 100 ? null : p
}
```

- [ ] **Step 4: Run tests** — `npm test` → all pass (adjust test bounds only if an assertion is arithmetically wrong, never to mask a logic bug).

- [ ] **Step 5: Commit**

```powershell
npx tsc --noEmit
git add src/lib/project-hub/dates.ts src/lib/project-hub/dates.test.ts
git commit -m "feat(project-hub): timeline date math (bar geometry, workday duration labels)"
```

---

### Task 8: Revision diff humanizer (TDD)

**Files:**
- Create: `src/lib/project-hub/diff.ts`
- Test: `src/lib/project-hub/diff.test.ts`

- [ ] **Step 1: Write the failing test `src/lib/project-hub/diff.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { humanizeRevision } from './diff'
import type { PtRevision } from './types'

const base = {
  id: 1, project_id: 'p', table_name: 'pt_tasks', row_id: 'r',
  actor_id: 'u1', actor_name: 'Sam', created_at: '2026-06-12T09:14:00Z',
} as const

function rev(partial: Partial<PtRevision>): PtRevision {
  return { ...base, action: 'update', old_data: null, new_data: null, ...partial } as PtRevision
}

describe('humanizeRevision', () => {
  it('reports changed content fields only (meta ignored)', () => {
    const r = rev({
      old_data: { name: 'A', status: 'not_started', updated_at: '1', updated_by_name: 'X', sort_order: 1 },
      new_data: { name: 'A', status: 'in_progress', updated_at: '2', updated_by_name: 'Sam', sort_order: 1 },
    })
    expect(humanizeRevision(r)).toEqual([
      { field: 'status', label: 'Status', from: 'not_started', to: 'in_progress' },
    ])
  })
  it('reports soft delete as deleted', () => {
    const r = rev({
      old_data: { name: 'A', deleted_at: null },
      new_data: { name: 'A', deleted_at: '2026-06-12T00:00:00Z' },
    })
    expect(humanizeRevision(r)).toEqual([{ field: 'deleted_at', label: 'Deleted', from: null, to: null }])
  })
  it('reports restore', () => {
    const r = rev({
      old_data: { name: 'A', deleted_at: '2026-06-12T00:00:00Z' },
      new_data: { name: 'A', deleted_at: null },
    })
    expect(humanizeRevision(r)).toEqual([{ field: 'deleted_at', label: 'Restored', from: null, to: null }])
  })
  it('reports inserts as created', () => {
    const r = rev({ action: 'insert', new_data: { name: 'New task' } })
    expect(humanizeRevision(r)).toEqual([{ field: '*', label: 'Created', from: null, to: 'New task' }])
  })
})
```

- [ ] **Step 2: Run to verify failure**, then **Step 3: Create `src/lib/project-hub/diff.ts`**

```ts
import type { PtRevision } from './types'

const META = new Set([
  'id', 'project_id', 'created_at', 'updated_at', 'updated_by_id', 'updated_by_name',
  'deleted_by_id', 'deleted_by_name',
])
const LABELS: Record<string, string> = {
  name: 'Name', title: 'Title', subtitle: 'Subtitle', status: 'Status',
  start_date: 'Start date', end_date: 'End date', duration_label: 'Duration',
  notes: 'Notes', sort_order: 'Order', label: 'Label', value: 'Value',
  date: 'Date', deliverable: 'Deliverable', achieved: 'Achieved',
  risk: 'Risk', impact: 'Impact', mitigation: 'Mitigation',
  technology: 'Technology', version: 'Version', purpose: 'Purpose',
  description: 'Description', done: 'Done', phase_number: 'Phase number',
  color_token: 'Phase colour', group_id: 'Group', section: 'Section',
}

export interface FieldDiff {
  field: string
  label: string
  from: string | null
  to: string | null
}

const display = (v: unknown): string | null =>
  v === null || v === undefined ? null : String(v)

export function humanizeRevision(rev: PtRevision): FieldDiff[] {
  if (rev.action === 'insert') {
    const name = rev.new_data && (rev.new_data.name ?? rev.new_data.title ?? rev.new_data.description ?? rev.new_data.label ?? rev.new_data.risk ?? rev.new_data.technology)
    return [{ field: '*', label: 'Created', from: null, to: display(name) }]
  }
  if (rev.action === 'delete') {
    return [{ field: '*', label: 'Removed (hard delete)', from: null, to: null }]
  }
  const oldD = rev.old_data ?? {}
  const newD = rev.new_data ?? {}
  const diffs: FieldDiff[] = []
  for (const key of Object.keys(newD)) {
    if (META.has(key)) continue
    const a = oldD[key] ?? null
    const b = newD[key] ?? null
    if (JSON.stringify(a) === JSON.stringify(b)) continue
    if (key === 'deleted_at') {
      diffs.push({ field: 'deleted_at', label: b === null ? 'Restored' : 'Deleted', from: null, to: null })
      continue
    }
    diffs.push({ field: key, label: LABELS[key] ?? key, from: display(a), to: display(b) })
  }
  return diffs
}
```

- [ ] **Step 4: Run tests** — all pass. **Step 5: Commit**

```powershell
npx tsc --noEmit
git add src/lib/project-hub/diff.ts src/lib/project-hub/diff.test.ts
git commit -m "feat(project-hub): revision diff humanizer"
```

---

### Task 9: Supabase server client, hub query, server actions

**Files:**
- Create: `src/lib/project-hub/supabase-server.ts`
- Create: `src/lib/project-hub/queries.ts`
- Create: `src/lib/project-hub/actions.ts`

No browser code yet. These are server-only modules.

- [ ] **Step 1: Create `src/lib/project-hub/supabase-server.ts`**

```ts
import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function supabaseAdmin(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SECRET_KEY
    if (!url || !key) throw new Error('SUPABASE_URL / SUPABASE_SECRET_KEY not set')
    client = createClient(url, key, {
      db: { schema: 'api' },
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return client
}
```

- [ ] **Step 2: Create `src/lib/project-hub/queries.ts`**

```ts
import 'server-only'
import { supabaseAdmin } from './supabase-server'
import type { HubPayload, PtProject } from './types'

export const PROJECT_SLUG = 'fcu-website-rebuild-2026'

async function rows<T>(table: string, projectId: string, order: string): Promise<T[]> {
  const { data, error } = await supabaseAdmin()
    .from(table)
    .select('*')
    .eq('project_id', projectId)
    .is('deleted_at', null)
    .order(order, { ascending: true })
  if (error) throw new Error(`${table}: ${error.message}`)
  return data as T[]
}

export async function getProjectHub(): Promise<HubPayload> {
  const { data: project, error } = await supabaseAdmin()
    .from('pt_projects')
    .select('*')
    .eq('slug', PROJECT_SLUG)
    .is('deleted_at', null)
    .single<PtProject>()
  if (error || !project) throw new Error(`pt_projects: ${error?.message ?? 'not found'}`)
  const id = project.id
  const [facts, phases, groups, tasks, milestones, risks, techStack, deliverables] = await Promise.all([
    rows('pt_facts', id, 'sort_order'),
    rows('pt_phases', id, 'phase_number'),
    rows('pt_task_groups', id, 'sort_order'),
    rows('pt_tasks', id, 'sort_order'),
    rows('pt_milestones', id, 'sort_order'),
    rows('pt_risks', id, 'sort_order'),
    rows('pt_tech_stack', id, 'sort_order'),
    rows('pt_deliverables', id, 'sort_order'),
  ]) as [HubPayload['facts'], HubPayload['phases'], HubPayload['groups'], HubPayload['tasks'],
         HubPayload['milestones'], HubPayload['risks'], HubPayload['techStack'], HubPayload['deliverables']]
  return { project, facts, phases, groups, tasks, milestones, risks, techStack, deliverables }
}
```

- [ ] **Step 3: Create `src/lib/project-hub/actions.ts`**

```ts
'use server'

import { currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'
import { supabaseAdmin } from './supabase-server'
import { getProjectHub } from './queries'
import { validatePatch, validateCreate, EDITABLE_TABLES, type EditableTable } from './tables'
import type { HubPayload, PtRevision } from './types'

type Result<T> = { ok: true; data: T } | { ok: false; error: string }

async function actor(): Promise<{ id: string; name: string } | null> {
  const user = await currentUser()
  if (!user) return null
  const name = user.fullName
    || user.primaryEmailAddress?.emailAddress
    || user.id
  return { id: user.id, name }
}

const tableSchema = z.enum(EDITABLE_TABLES as [EditableTable, ...EditableTable[]])
const idSchema = z.string().uuid()

export async function fetchHub(): Promise<Result<HubPayload>> {
  if (!(await actor())) return { ok: false, error: 'Not signed in' }
  try {
    return { ok: true, data: await getProjectHub() }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'fetch failed' }
  }
}

export async function updateRow(tableIn: string, idIn: string, patchIn: unknown): Promise<Result<unknown>> {
  const who = await actor()
  if (!who) return { ok: false, error: 'Not signed in' }
  try {
    const table = tableSchema.parse(tableIn)
    const id = idSchema.parse(idIn)
    const patch = validatePatch(table, patchIn)
    const { data, error } = await supabaseAdmin()
      .from(table)
      .update({ ...patch, updated_by_id: who.id, updated_by_name: who.name })
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'update failed' }
  }
}

export async function createRow(tableIn: string, projectIdIn: string, valuesIn: unknown): Promise<Result<unknown>> {
  const who = await actor()
  if (!who) return { ok: false, error: 'Not signed in' }
  try {
    const table = tableSchema.parse(tableIn)
    const projectId = idSchema.parse(projectIdIn)
    const values = validateCreate(table, valuesIn)
    const { data, error } = await supabaseAdmin()
      .from(table)
      .insert({ ...values, project_id: projectId, updated_by_id: who.id, updated_by_name: who.name })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'create failed' }
  }
}

export async function softDeleteRow(tableIn: string, idIn: string): Promise<Result<unknown>> {
  const who = await actor()
  if (!who) return { ok: false, error: 'Not signed in' }
  try {
    const table = tableSchema.parse(tableIn)
    const id = idSchema.parse(idIn)
    const { data, error } = await supabaseAdmin()
      .from(table)
      .update({
        deleted_at: new Date().toISOString(), deleted_by_id: who.id, deleted_by_name: who.name,
        updated_by_id: who.id, updated_by_name: who.name,
      })
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'delete failed' }
  }
}

const REVERT_META = new Set([
  'id', 'project_id', 'created_at', 'updated_at',
  'updated_by_id', 'updated_by_name', 'deleted_by_id', 'deleted_by_name',
])

export async function revertRevision(revisionIdIn: number): Promise<Result<unknown>> {
  const who = await actor()
  if (!who) return { ok: false, error: 'Not signed in' }
  try {
    const revisionId = z.number().int().positive().parse(revisionIdIn)
    const { data: rev, error: revErr } = await supabaseAdmin()
      .from('pt_revisions')
      .select('*')
      .eq('id', revisionId)
      .single<PtRevision>()
    if (revErr || !rev) throw new Error(revErr?.message ?? 'revision not found')
    const table = tableSchema.parse(rev.table_name)
    if (rev.action === 'insert') {
      // undo a create = soft delete the row
      return await softDeleteRow(table, rev.row_id)
    }
    if (!rev.old_data) throw new Error('nothing to revert to')
    const restore: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(rev.old_data)) {
      if (!REVERT_META.has(k)) restore[k] = v
    }
    const { data, error } = await supabaseAdmin()
      .from(table)
      .update({ ...restore, updated_by_id: who.id, updated_by_name: who.name })
      .eq('id', rev.row_id) // no deleted_at filter: reverting a delete must reach the deleted row
      .select()
      .single()
    if (error) throw new Error(error.message)
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'revert failed' }
  }
}

export async function moveRow(tableIn: string, idIn: string, direction: 'up' | 'down'): Promise<Result<null>> {
  const who = await actor()
  if (!who) return { ok: false, error: 'Not signed in' }
  try {
    const table = tableSchema.parse(tableIn)
    const id = idSchema.parse(idIn)
    const sb = supabaseAdmin()
    const { data: row, error: rowErr } = await sb.from(table).select('*').eq('id', id).single()
    if (rowErr || !row) throw new Error(rowErr?.message ?? 'row not found')
    const scopeCol = table === 'pt_tasks' ? 'group_id'
      : table === 'pt_task_groups' ? 'phase_id'
      : table === 'pt_facts' ? 'section'
      : 'project_id'
    const { data: siblings, error: sibErr } = await sb
      .from(table)
      .select('id, sort_order')
      .eq(scopeCol, row[scopeCol])
      .eq('project_id', row.project_id ?? row.id)
      .is('deleted_at', null)
      .order('sort_order', { ascending: true })
    if (sibErr || !siblings) throw new Error(sibErr?.message ?? 'siblings not found')
    const i = siblings.findIndex((s) => s.id === id)
    const j = direction === 'up' ? i - 1 : i + 1
    if (i < 0 || j < 0 || j >= siblings.length) return { ok: true, data: null }
    const stamp = { updated_by_id: who.id, updated_by_name: who.name }
    const a = siblings[i], b = siblings[j]
    const { error: e1 } = await sb.from(table).update({ sort_order: b.sort_order, ...stamp }).eq('id', a.id)
    if (e1) throw new Error(e1.message)
    const { error: e2 } = await sb.from(table).update({ sort_order: a.sort_order, ...stamp }).eq('id', b.id)
    if (e2) throw new Error(e2.message)
    return { ok: true, data: null }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'move failed' }
  }
}

export async function fetchActivity(limit = 100): Promise<Result<PtRevision[]>> {
  if (!(await actor())) return { ok: false, error: 'Not signed in' }
  const { data, error } = await supabaseAdmin()
    .from('pt_revisions')
    .select('*')
    .order('id', { ascending: false })
    .limit(Math.min(limit, 300))
  if (error) return { ok: false, error: error.message }
  return { ok: true, data: data as PtRevision[] }
}

export async function fetchRowHistory(tableIn: string, idIn: string): Promise<Result<PtRevision[]>> {
  if (!(await actor())) return { ok: false, error: 'Not signed in' }
  try {
    const table = tableSchema.parse(tableIn)
    const id = idSchema.parse(idIn)
    const { data, error } = await supabaseAdmin()
      .from('pt_revisions')
      .select('*')
      .eq('table_name', table)
      .eq('row_id', id)
      .order('id', { ascending: false })
      .limit(100)
    if (error) throw new Error(error.message)
    return { ok: true, data: data as PtRevision[] }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'history failed' }
  }
}
```

- [ ] **Step 4: Typecheck** — `npx tsc --noEmit` → clean. (Note: for `moveRow`'s `row[scopeCol]` indexing, type the row as `.single<{ [k: string]: unknown }>()` and pass the scope value through `String(...)` — resolve to a clean-compiling form without `any`.)

- [ ] **Step 4b: Mocked action tests — create `src/lib/project-hub/actions.test.ts`**

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockUser = vi.hoisted(() => ({ value: null as null | { id: string; fullName: string | null; primaryEmailAddress: { emailAddress: string } | null } }))
vi.mock('@clerk/nextjs/server', () => ({ currentUser: async () => mockUser.value }))
vi.mock('server-only', () => ({}))

const calls = vi.hoisted(() => ({ updates: [] as Record<string, unknown>[] }))
vi.mock('./supabase-server', () => ({
  supabaseAdmin: () => ({
    from: () => ({
      update: (payload: Record<string, unknown>) => {
        calls.updates.push(payload)
        const chain = {
          eq: () => chain,
          is: () => chain,
          select: () => ({ single: async () => ({ data: { id: 'r1', ...payload }, error: null }) }),
        }
        return chain
      },
    }),
  }),
}))

import { updateRow } from './actions'

describe('updateRow', () => {
  beforeEach(() => { calls.updates.length = 0 })
  it('rejects when not signed in', async () => {
    mockUser.value = null
    const res = await updateRow('pt_tasks', '7c9e6679-7425-40de-944b-e07fc1f90ae7', { name: 'x' })
    expect(res).toEqual({ ok: false, error: 'Not signed in' })
    expect(calls.updates).toHaveLength(0)
  })
  it('stamps the actor and passes only validated fields', async () => {
    mockUser.value = { id: 'u1', fullName: 'Sam Isaac', primaryEmailAddress: null }
    const res = await updateRow('pt_tasks', '7c9e6679-7425-40de-944b-e07fc1f90ae7', { status: 'complete' })
    expect(res.ok).toBe(true)
    expect(calls.updates[0]).toEqual({ status: 'complete', updated_by_id: 'u1', updated_by_name: 'Sam Isaac' })
  })
  it('refuses non-pt tables and invalid patches', async () => {
    mockUser.value = { id: 'u1', fullName: 'Sam', primaryEmailAddress: null }
    expect((await updateRow('tblLoanApplication', '7c9e6679-7425-40de-944b-e07fc1f90ae7', { name: 'x' })).ok).toBe(false)
    expect((await updateRow('pt_tasks', '7c9e6679-7425-40de-944b-e07fc1f90ae7', { updated_by_id: 'evil' })).ok).toBe(false)
  })
})
```

Run `npm test` — all pass (the `'use server'` pragma is inert under vitest's node environment; if the Next build complains about importing actions in tests, exclude `*.test.ts` via tsconfig `exclude` — vitest has its own config).

- [ ] **Step 5: Commit**

```powershell
git add src/lib/project-hub/supabase-server.ts src/lib/project-hub/queries.ts src/lib/project-hub/actions.ts
git commit -m "feat(project-hub): server-only supabase client, hub query, validated server actions"
```

---

### Task 10: Route gate, page scaffold, React Query + realtime wiring

**Files:**
- Modify: `src/proxy.ts:3`
- Create: `src/app/(frontend)/project-hub/page.tsx`
- Create: `src/app/(frontend)/project-hub/_components/hub-shell.tsx`
- Create: `src/app/(frontend)/project-hub/_components/use-hub.ts`
- Create: `src/app/(frontend)/project-hub/_components/use-realtime.ts`
- Create: `src/app/(frontend)/project-hub/_components/header-band.tsx`

- [ ] **Step 1: Protect the route** — in `src/proxy.ts` change line 3 to:

```ts
const isProtectedRoute = createRouteMatcher(['/component-design(.*)', '/project-hub(.*)'])
```

- [ ] **Step 2: Create `page.tsx` (server component)**

```tsx
import { auth } from '@clerk/nextjs/server'
import { getProjectHub } from '@/lib/project-hub/queries'
import { HubShell } from './_components/hub-shell'

export const metadata = { title: 'Project Hub — FCU website rebuild', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function ProjectHubPage() {
  await auth.protect()
  const payload = await getProjectHub()
  return <HubShell initial={payload} />
}
```

- [ ] **Step 3: Create `use-hub.ts` (client hook: query + generic optimistic mutations)**

```ts
'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { fetchHub, updateRow, createRow, softDeleteRow, moveRow, revertRevision } from '@/lib/project-hub/actions'
import type { EditableTable } from '@/lib/project-hub/tables'
import type { HubPayload } from '@/lib/project-hub/types'

export const HUB_KEY = ['project-hub'] as const
export const ACTIVITY_KEY = ['project-hub', 'activity'] as const

const TABLE_TO_KEY: Record<string, keyof HubPayload> = {
  pt_facts: 'facts', pt_phases: 'phases', pt_task_groups: 'groups', pt_tasks: 'tasks',
  pt_milestones: 'milestones', pt_risks: 'risks', pt_tech_stack: 'techStack', pt_deliverables: 'deliverables',
}

export function useHub(initial: HubPayload) {
  return useQuery({
    queryKey: HUB_KEY,
    queryFn: async () => {
      const res = await fetchHub()
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    initialData: initial,
    staleTime: 15_000,
  })
}

export function useHubInvalidate() {
  const qc = useQueryClient()
  return () => {
    void qc.invalidateQueries({ queryKey: HUB_KEY })
    void qc.invalidateQueries({ queryKey: ACTIVITY_KEY })
  }
}

export function usePatchRow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (vars: { table: EditableTable; id: string; patch: Record<string, unknown> }) => {
      const res = await updateRow(vars.table, vars.id, vars.patch)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: HUB_KEY })
      const prev = qc.getQueryData<HubPayload>(HUB_KEY)
      if (prev && vars.table !== 'pt_projects') {
        const key = TABLE_TO_KEY[vars.table]
        qc.setQueryData<HubPayload>(HUB_KEY, {
          ...prev,
          [key]: (prev[key] as { id: string }[]).map((r) => (r.id === vars.id ? { ...r, ...vars.patch } : r)),
        })
      }
      if (prev && vars.table === 'pt_projects') {
        qc.setQueryData<HubPayload>(HUB_KEY, { ...prev, project: { ...prev.project, ...vars.patch } })
      }
      return { prev }
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(HUB_KEY, ctx.prev)
      toast.error(`Save failed: ${err.message}`)
    },
    onSettled: () => void qc.invalidateQueries({ queryKey: HUB_KEY }),
  })
}

export function useCreateRow(projectId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (vars: { table: EditableTable; values: Record<string, unknown> }) => {
      const res = await createRow(vars.table, projectId, vars.values)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    onError: (err) => toast.error(`Add failed: ${err.message}`),
    onSettled: () => void qc.invalidateQueries({ queryKey: HUB_KEY }),
  })
}

export function useDeleteRow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (vars: { table: EditableTable; id: string }) => {
      const res = await softDeleteRow(vars.table, vars.id)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: HUB_KEY })
      const prev = qc.getQueryData<HubPayload>(HUB_KEY)
      const key = TABLE_TO_KEY[vars.table]
      if (prev && key) {
        qc.setQueryData<HubPayload>(HUB_KEY, {
          ...prev,
          [key]: (prev[key] as { id: string }[]).filter((r) => r.id !== vars.id),
        })
      }
      return { prev }
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(HUB_KEY, ctx.prev)
      toast.error(`Delete failed: ${err.message}`)
    },
    onSuccess: () => toast.success('Deleted — recover from the Activity tab'),
    onSettled: () => void qc.invalidateQueries({ queryKey: HUB_KEY }),
  })
}

export function useMoveRow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (vars: { table: EditableTable; id: string; direction: 'up' | 'down' }) => {
      const res = await moveRow(vars.table, vars.id, vars.direction)
      if (!res.ok) throw new Error(res.error)
    },
    onError: (err) => toast.error(`Reorder failed: ${err.message}`),
    onSettled: () => void qc.invalidateQueries({ queryKey: HUB_KEY }),
  })
}

export function useRevert() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (revisionId: number) => {
      const res = await revertRevision(revisionId)
      if (!res.ok) throw new Error(res.error)
    },
    onSuccess: () => toast.success('Reverted'),
    onError: (err) => toast.error(`Revert failed: ${err.message}`),
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: HUB_KEY })
      void qc.invalidateQueries({ queryKey: ACTIVITY_KEY })
    },
  })
}
```

- [ ] **Step 4: Create `use-realtime.ts` (broadcast subscribe + presence count + debounced invalidate)**

```ts
'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | null = null
function supabaseBrowser(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) return null
  if (!browserClient) browserClient = createClient(url, key, { auth: { persistSession: false } })
  return browserClient
}

export function useHubRealtime(projectId: string, onChange: () => void) {
  const [viewers, setViewers] = useState(1)
  const [live, setLive] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cb = useRef(onChange)
  cb.current = onChange

  useEffect(() => {
    const sb = supabaseBrowser()
    if (!sb) return
    const channel = sb.channel(`pt:${projectId}`, {
      config: { presence: { key: crypto.randomUUID() } },
    })
    channel
      .on('broadcast', { event: 'change' }, () => {
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => cb.current(), 500)
      })
      .on('presence', { event: 'sync' }, () => {
        setViewers(Math.max(1, Object.keys(channel.presenceState()).length))
      })
      .subscribe((status) => {
        setLive(status === 'SUBSCRIBED')
        if (status === 'SUBSCRIBED') {
          void channel.track({}) // anonymous: no identity on the public channel
          cb.current() // refetch once on (re)join to cover missed pings
        }
      })
    return () => {
      if (timer.current) clearTimeout(timer.current)
      void sb.removeChannel(channel)
    }
  }, [projectId])

  return { viewers, live }
}
```

- [ ] **Step 5: Create `header-band.tsx`**

```tsx
'use client'

import { differenceInCalendarDays, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { HubPayload } from '@/lib/project-hub/types'

export function HeaderBand({ payload, viewers, live }: { payload: HubPayload; viewers: number; live: boolean }) {
  const goLive = payload.milestones.find((m) => m.name.toUpperCase().includes('GO-LIVE'))
  const days = goLive ? differenceInCalendarDays(parseISO(goLive.date), new Date()) : null
  const active = payload.tasks
  const pctDone = active.length === 0 ? 0 : Math.round((active.filter((t) => t.status === 'complete').length / active.length) * 100)
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{payload.project.title}</h1>
        {payload.project.subtitle ? (
          <p className="mt-1 text-sm text-foreground-muted">{payload.project.subtitle}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        {days !== null ? (
          <div className="rounded-lg bg-surface-muted px-4 py-2 text-center">
            <div className="text-xs text-foreground-muted">to go-live</div>
            <div className="text-xl font-semibold tabular-nums text-foreground">{days} days</div>
          </div>
        ) : null}
        <div className="w-40 rounded-lg bg-surface-muted px-4 py-2">
          <div className="flex justify-between text-xs text-foreground-muted">
            <span>complete</span>
            <span className="tabular-nums">{pctDone}%</span>
          </div>
          <Progress value={pctDone} size="sm" className="mt-1.5" />
        </div>
        <Badge variant={live ? 'success' : 'neutral'} dot>
          {viewers} viewing
        </Badge>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create `hub-shell.tsx` (provider + tabs skeleton; tab bodies are placeholders replaced by Tasks 12–17 — each later task swaps its placeholder for the real component, so this is the only file with temporary content)**

```tsx
'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HeaderBand } from './header-band'
import { useHub, useHubInvalidate } from './use-hub'
import { useHubRealtime } from './use-realtime'
import type { HubPayload } from '@/lib/project-hub/types'

const TABS = ['overview', 'timeline', 'milestones', 'risks', 'tech-stack', 'deliverables', 'activity'] as const

function HubInner({ initial }: { initial: HubPayload }) {
  const { data } = useHub(initial)
  const invalidate = useHubInvalidate()
  const { viewers, live } = useHubRealtime(initial.project.id, invalidate)
  const payload = data ?? initial
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <HeaderBand payload={payload} viewers={viewers} live={live} />
      <div aria-live="polite" className="sr-only">
        Project data updates automatically while others edit.
      </div>
      <Tabs defaultValue="timeline" className="mt-6">
        <TabsList variant="underline" className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="tech-stack">Tech stack</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        {TABS.map((t) => (
          <TabsContent key={t} value={t} className="mt-6">
            <p className="text-sm text-foreground-muted">({t} — coming in a later task)</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export function HubShell({ initial }: { initial: HubPayload }) {
  const [qc] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: 1 } } }))
  return (
    <QueryClientProvider client={qc}>
      <HubInner initial={initial} />
    </QueryClientProvider>
  )
}
```

- [ ] **Step 7: Verify live** — `npm run dev`, then with the preview tools: load `/project-hub`. Expected: Clerk sign-in redirect when signed out; after sign-in (manual, once): header shows title, days to go-live, % complete, "1 viewing" badge turns green (subscribed). Console free of errors.

- [ ] **Step 8: Typecheck + commit**

```powershell
npx tsc --noEmit
git add src/proxy.ts "src/app/(frontend)/project-hub"
git commit -m "feat(project-hub): gated route, hub shell, react-query + realtime invalidation"
```

---

### Task 11: Inline editing primitives

**Files:**
- Create: `src/app/(frontend)/project-hub/_components/editable.tsx`

- [ ] **Step 1: Create `editable.tsx`** — three primitives used by every tab. Behavior contract: click (or Enter/Space on focus) starts editing; Enter commits, Esc cancels, blur commits if changed; empty text reverts for required fields.

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

export function EditableText({
  value, onCommit, required = true, multiline = false, className, label,
}: {
  value: string
  onCommit: (next: string) => void
  required?: boolean
  multiline?: boolean
  className?: string
  label: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (editing) {
      setDraft(value)
      requestAnimationFrame(() => ref.current?.focus())
    }
  }, [editing, value])

  function commit() {
    const next = draft.trim()
    setEditing(false)
    if (next === value) return
    if (!next && required) return
    onCommit(next)
  }

  if (!editing) {
    return (
      <button
        type="button"
        aria-label={`Edit ${label}`}
        onClick={() => setEditing(true)}
        className={cn(
          'rounded-md px-1.5 py-0.5 text-left hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-ring',
          !value && 'italic text-foreground-subtle',
          className,
        )}
      >
        {value || `Add ${label}…`}
      </button>
    )
  }
  const shared = {
    value: draft,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(e.target.value),
    onBlur: commit,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !multiline) { e.preventDefault(); commit() }
      if (e.key === 'Escape') { setDraft(value); setEditing(false) }
    },
    'aria-label': label,
  }
  return multiline
    ? <Textarea {...shared} ref={ref as React.Ref<HTMLTextAreaElement>} rows={3} className={className} />
    : <Input {...shared} ref={ref as React.Ref<HTMLInputElement>} size="sm" className={className} />
}

export function EditableDate({
  value, onCommit, label, className,
}: {
  value: string | null
  onCommit: (next: string | null) => void
  label: string
  className?: string
}) {
  // native date input: keyboard-complete, locale-aware, zero extra deps
  return (
    <Input
      type="date"
      size="sm"
      aria-label={label}
      value={value ?? ''}
      min="2026-01-01"
      max="2026-12-31"
      onChange={(e) => onCommit(e.target.value || null)}
      className={cn('w-36 tabular-nums', className)}
    />
  )
}

export function EditableSelect<T extends string>({
  value, options, labels, onCommit, label, className,
}: {
  value: T
  options: readonly T[]
  labels: Record<T, string>
  onCommit: (next: T) => void
  label: string
  className?: string
}) {
  return (
    <Select value={value} onValueChange={(v) => v && v !== value && onCommit(v as T)}>
      <SelectTrigger size="sm" aria-label={label} className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>{labels[o]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
```

(If `Input`/`Textarea` don't forward refs in this DS, wrap with `autoFocus` instead of the `ref` dance — check the component source first; do not modify DS components.)

- [ ] **Step 2: Typecheck + commit**

```powershell
npx tsc --noEmit
git add "src/app/(frontend)/project-hub/_components/editable.tsx"
git commit -m "feat(project-hub): inline editing primitives (text, date, select)"
```

---

### Task 12: Shared list scaffolding + Overview, Risks, Tech stack, Deliverables tabs

**Files:**
- Create: `src/app/(frontend)/project-hub/_components/row-actions.tsx`
- Create: `src/app/(frontend)/project-hub/_components/overview-tab.tsx`
- Create: `src/app/(frontend)/project-hub/_components/risks-tab.tsx`
- Create: `src/app/(frontend)/project-hub/_components/tech-stack-tab.tsx`
- Create: `src/app/(frontend)/project-hub/_components/deliverables-tab.tsx`
- Modify: `src/app/(frontend)/project-hub/_components/hub-shell.tsx` (swap 4 placeholders)

- [ ] **Step 1: Create `row-actions.tsx`** (move up/down + delete, used by all list rows)

```tsx
'use client'

import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDeleteRow, useMoveRow } from './use-hub'
import type { EditableTable } from '@/lib/project-hub/tables'

export function RowActions({ table, id, name }: { table: EditableTable; id: string; name: string }) {
  const move = useMoveRow()
  const del = useDeleteRow()
  return (
    <span className="inline-flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
      <Button variant="ghost" size="icon-xs" aria-label={`Move ${name} up`}
        onClick={() => move.mutate({ table, id, direction: 'up' })}><ArrowUp /></Button>
      <Button variant="ghost" size="icon-xs" aria-label={`Move ${name} down`}
        onClick={() => move.mutate({ table, id, direction: 'down' })}><ArrowDown /></Button>
      <Button variant="ghost" size="icon-xs" aria-label={`Delete ${name}`}
        onClick={() => del.mutate({ table, id })}><Trash2 /></Button>
    </span>
  )
}
```

- [ ] **Step 2: Create `overview-tab.tsx`**

```tsx
'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { computedDurationLabel } from '@/lib/project-hub/dates'
import type { HubPayload, PtFactSection } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

function FactList({ payload, section, title }: { payload: HubPayload; section: PtFactSection; title: string }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const facts = payload.facts.filter((f) => f.section === section)
  return (
    <Card variant="outlined">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-1">
          {facts.map((f) => (
            <div key={f.id} className="group grid grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] items-baseline gap-2 text-sm">
              <dt>
                <EditableText label={`${f.label} label`} value={f.label} className="font-medium text-foreground"
                  onCommit={(v) => patch.mutate({ table: 'pt_facts', id: f.id, patch: { label: v } })} />
              </dt>
              <dd>
                <EditableText label={`${f.label} value`} value={f.value} required={false} className="text-foreground-muted"
                  onCommit={(v) => patch.mutate({ table: 'pt_facts', id: f.id, patch: { value: v } })} />
              </dd>
              <RowActions table="pt_facts" id={f.id} name={f.label} />
            </div>
          ))}
        </dl>
        <Button variant="ghost" size="sm" className="mt-3"
          onClick={() => create.mutate({ table: 'pt_facts', values: { section, label: 'New item', value: '', sort_order: facts.length } })}>
          <Plus /> Add item
        </Button>
      </CardContent>
    </Card>
  )
}

export function OverviewTab({ payload }: { payload: HubPayload }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <FactList payload={payload} section="overview" title="Project overview" />
        <FactList payload={payload} section="deployment" title="Vercel deployment strategy" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {payload.phases.map((ph) => {
          const tasks = payload.tasks.filter((t) =>
            payload.groups.some((g) => g.id === t.group_id && g.phase_id === ph.id))
          const done = tasks.filter((t) => t.status === 'complete').length
          const pctDone = tasks.length ? Math.round((done / tasks.length) * 100) : 0
          return (
            <Card key={ph.id} variant="outlined">
              <CardContent className="pt-5">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="size-2.5 rounded-full" style={{ background: `var(--color-${ph.color_token}, var(--${ph.color_token}))` }} />
                  <span className="text-sm font-medium text-foreground">Phase {ph.phase_number} — {ph.name}</span>
                </div>
                <p className="mt-1 text-xs text-foreground-muted">
                  {ph.start_date && ph.end_date ? computedDurationLabel(ph.start_date, ph.end_date) : 'No dates'} · {done}/{tasks.length} tasks
                </p>
                <Progress value={pctDone} size="sm" className="mt-3" />
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `risks-tab.tsx`**

```tsx
'use client'

import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import type { HubPayload, PtRiskImpact } from '@/lib/project-hub/types'
import { EditableSelect, EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

const IMPACTS: readonly PtRiskImpact[] = ['low', 'medium', 'high']
const IMPACT_LABELS: Record<PtRiskImpact, string> = { low: 'Low', medium: 'Medium', high: 'High' }
const IMPACT_BADGE: Record<PtRiskImpact, 'success' | 'warning' | 'danger'> = {
  low: 'success', medium: 'warning', high: 'danger',
}

export function RisksTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Risk</TableHead>
              <TableHead className="w-32">Impact</TableHead>
              <TableHead>Mitigation</TableHead>
              <TableHead className="w-24"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payload.risks.map((r) => (
              <TableRow key={r.id} className="group">
                <TableCell>
                  <EditableText label="risk" value={r.risk}
                    onCommit={(v) => patch.mutate({ table: 'pt_risks', id: r.id, patch: { risk: v } })} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant={IMPACT_BADGE[r.impact]}>{IMPACT_LABELS[r.impact]}</Badge>
                    <EditableSelect label="impact" value={r.impact} options={IMPACTS} labels={IMPACT_LABELS}
                      onCommit={(v) => patch.mutate({ table: 'pt_risks', id: r.id, patch: { impact: v } })}
                      className="w-24" />
                  </div>
                </TableCell>
                <TableCell>
                  <EditableText label="mitigation" value={r.mitigation} required={false}
                    onCommit={(v) => patch.mutate({ table: 'pt_risks', id: r.id, patch: { mitigation: v } })} />
                </TableCell>
                <TableCell><RowActions table="pt_risks" id={r.id} name={r.risk} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="ghost" size="sm" className="mt-3"
        onClick={() => create.mutate({ table: 'pt_risks', values: { risk: 'New risk', sort_order: payload.risks.length } })}>
        <Plus /> Add risk
      </Button>
    </div>
  )
}
```

- [ ] **Step 4: Create `tech-stack-tab.tsx`** (same shape as risks — technology/version/purpose text columns)

```tsx
'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import type { HubPayload } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

export function TechStackTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Technology</TableHead>
              <TableHead className="w-36">Version / service</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead className="w-24"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payload.techStack.map((t) => (
              <TableRow key={t.id} className="group">
                <TableCell>
                  <EditableText label="technology" value={t.technology}
                    onCommit={(v) => patch.mutate({ table: 'pt_tech_stack', id: t.id, patch: { technology: v } })} />
                </TableCell>
                <TableCell>
                  <EditableText label="version" value={t.version} required={false}
                    onCommit={(v) => patch.mutate({ table: 'pt_tech_stack', id: t.id, patch: { version: v } })} />
                </TableCell>
                <TableCell>
                  <EditableText label="purpose" value={t.purpose} required={false}
                    onCommit={(v) => patch.mutate({ table: 'pt_tech_stack', id: t.id, patch: { purpose: v } })} />
                </TableCell>
                <TableCell><RowActions table="pt_tech_stack" id={t.id} name={t.technology} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="ghost" size="sm" className="mt-3"
        onClick={() => create.mutate({ table: 'pt_tech_stack', values: { technology: 'New technology', sort_order: payload.techStack.length } })}>
        <Plus /> Add technology
      </Button>
    </div>
  )
}
```

- [ ] **Step 5: Create `deliverables-tab.tsx`**

```tsx
'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import type { HubPayload } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

export function DeliverablesTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const done = payload.deliverables.filter((d) => d.done).length
  const pctDone = payload.deliverables.length ? Math.round((done / payload.deliverables.length) * 100) : 0
  return (
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center gap-3">
        <Progress value={pctDone} size="sm" className="w-48" />
        <span className="text-sm tabular-nums text-foreground-muted">{done}/{payload.deliverables.length} delivered</span>
      </div>
      <ul className="space-y-1">
        {payload.deliverables.map((d) => (
          <li key={d.id} className="group flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-muted">
            <Checkbox
              checked={d.done}
              aria-label={`Mark "${d.description}" ${d.done ? 'not delivered' : 'delivered'}`}
              onCheckedChange={(checked) =>
                patch.mutate({ table: 'pt_deliverables', id: d.id, patch: { done: checked === true } })}
            />
            <EditableText label="deliverable" value={d.description}
              className={d.done ? 'text-foreground-subtle line-through' : ''}
              onCommit={(v) => patch.mutate({ table: 'pt_deliverables', id: d.id, patch: { description: v } })} />
            <span className="ml-auto"><RowActions table="pt_deliverables" id={d.id} name={d.description} /></span>
          </li>
        ))}
      </ul>
      <Button variant="ghost" size="sm" className="mt-3"
        onClick={() => create.mutate({ table: 'pt_deliverables', values: { description: 'New deliverable', sort_order: payload.deliverables.length } })}>
        <Plus /> Add deliverable
      </Button>
    </div>
  )
}
```

(Check `Checkbox` prop name in `src/components/ui/checkbox.tsx` — Base UI uses `onCheckedChange`; if this DS wrapper renamed it, follow the DS.)

- [ ] **Step 6: Wire into `hub-shell.tsx`** — replace the four placeholders:

```tsx
<TabsContent value="overview" className="mt-6"><OverviewTab payload={payload} /></TabsContent>
<TabsContent value="risks" className="mt-6"><RisksTab payload={payload} /></TabsContent>
<TabsContent value="tech-stack" className="mt-6"><TechStackTab payload={payload} /></TabsContent>
<TabsContent value="deliverables" className="mt-6"><DeliverablesTab payload={payload} /></TabsContent>
```

with imports, keeping the `timeline`/`milestones`/`activity` placeholders (remove the TABS.map loop, write the seven `TabsContent` blocks explicitly).

- [ ] **Step 7: Verify live with preview tools** — edit a risk's text (Enter), toggle a deliverable, add + delete a fact; confirm: optimistic UI, toasts on delete, values survive reload, `pt_revisions` grew (read-only count query).

- [ ] **Step 8: Typecheck + commit**

```powershell
npx tsc --noEmit
git add "src/app/(frontend)/project-hub/_components"
git commit -m "feat(project-hub): overview, risks, tech stack, deliverables tabs with inline editing"
```

---

### Task 13: Gantt timeline tab

**Files:**
- Create: `src/app/(frontend)/project-hub/_components/timeline-tab.tsx`
- Modify: `src/app/(frontend)/project-hub/_components/hub-shell.tsx` (swap placeholder, pass `onOpenTask`)

- [ ] **Step 1: Create `timeline-tab.tsx`**

```tsx
'use client'

import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { barGeometry, computedDurationLabel, monthTicks, todayPct } from '@/lib/project-hub/dates'
import { STATUS_LABELS, TASK_STATUSES, type HubPayload, type PtTask, type PtTaskStatus } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { useCreateRow, usePatchRow } from './use-hub'

const STATUS_PIP: Record<PtTaskStatus, string> = {
  not_started: 'border-2 border-border-strong bg-transparent',
  in_progress: 'bg-primary',
  complete: 'bg-status-success-500',
  blocked: 'bg-status-danger-500',
  na: 'bg-border-strong',
}
const STATUS_BAR: Record<PtTaskStatus, string> = {
  not_started: 'opacity-35',
  in_progress: 'opacity-90',
  complete: 'opacity-70 saturate-50',
  blocked: 'opacity-90 ring-2 ring-status-danger-500',
  na: 'opacity-25',
}

function phaseColor(token: string): string {
  return `var(--color-${token}, var(--${token}))`
}

export function TimelineTab({ payload, onOpenTask }: { payload: HubPayload; onOpenTask: (task: PtTask) => void }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const ticks = useMemo(() => monthTicks(), [])
  const today = todayPct(format(new Date(), 'yyyy-MM-dd'))

  function cycleStatus(t: PtTask) {
    const next = TASK_STATUSES[(TASK_STATUSES.indexOf(t.status) + 1) % TASK_STATUSES.length]
    patch.mutate({ table: 'pt_tasks', id: t.id, patch: { status: next } })
  }
  function togglePhase(id: string) {
    setCollapsed((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  const NAME_COL = 'w-[260px] min-w-[260px] sm:w-[300px] sm:min-w-[300px]'

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[860px]">
        {/* month header */}
        <div className="flex border-b border-border text-xs text-foreground-muted">
          <div className={cn(NAME_COL, 'py-2 pr-2 font-medium')}>Phase / task</div>
          <div className="relative h-8 flex-1">
            {ticks.map((t) => (
              <span key={t.label} className="absolute top-2 border-l border-border pl-1" style={{ left: `${t.leftPct}%` }}>
                {t.label}
              </span>
            ))}
            {payload.milestones.map((m) => (
              <Tooltip key={m.id}>
                <TooltipTrigger
                  className="absolute top-0.5 -translate-x-1/2 text-[10px]"
                  style={{ left: `${barGeometry(m.date, m.date)?.leftPct ?? 0}%` }}
                  aria-label={`Milestone: ${m.name}, ${m.date}`}
                >
                  <span aria-hidden className={m.achieved ? 'text-status-success-700' : 'text-foreground-subtle'}>◆</span>
                </TooltipTrigger>
                <TooltipContent>{m.name} — {format(new Date(m.date), 'd MMM')}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* rows */}
        <div className="relative">
          {today !== null ? (
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-status-danger-500"
              style={{ left: `calc(${NAME_COL.includes('260') ? '' : ''}300px + (100% - 300px) * ${today / 100})` }}
            />
          ) : null}
          {payload.phases.map((ph) => {
            const groups = payload.groups.filter((g) => g.phase_id === ph.id)
            const phaseTasks = payload.tasks.filter((t) => groups.some((g) => g.id === t.group_id))
            const done = phaseTasks.filter((t) => t.status === 'complete').length
            const phaseBar = barGeometry(ph.start_date, ph.end_date)
            const isCollapsed = collapsed.has(ph.id)
            return (
              <div key={ph.id}>
                <div className="flex items-center border-b border-border bg-surface-muted">
                  <div className={cn(NAME_COL, 'flex items-center gap-1 py-1.5 pr-2')}>
                    <Button variant="ghost" size="icon-xs" aria-expanded={!isCollapsed}
                      aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} phase ${ph.phase_number}`}
                      onClick={() => togglePhase(ph.id)}>
                      {isCollapsed ? <ChevronRight /> : <ChevronDown />}
                    </Button>
                    <span className="truncate text-sm font-medium text-foreground">
                      Phase {ph.phase_number} — {ph.name}
                    </span>
                    <span className="ml-auto text-xs tabular-nums text-foreground-muted">{done}/{phaseTasks.length}</span>
                  </div>
                  <div className="relative h-9 flex-1">
                    {phaseBar ? (
                      <div aria-hidden className="absolute top-3 h-2.5 rounded-full opacity-50"
                        style={{ left: `${phaseBar.leftPct}%`, width: `${phaseBar.widthPct}%`, background: phaseColor(ph.color_token) }} />
                    ) : null}
                  </div>
                </div>
                {!isCollapsed && groups.map((g) => {
                  const tasks = payload.tasks.filter((t) => t.group_id === g.id)
                  return (
                    <div key={g.id}>
                      <div className="flex items-center border-b border-border/60">
                        <div className={cn(NAME_COL, 'flex items-baseline gap-2 py-1 pl-8 pr-2')}>
                          <EditableText label="group name" value={g.name} className="text-xs font-medium text-foreground-muted"
                            onCommit={(v) => patch.mutate({ table: 'pt_task_groups', id: g.id, patch: { name: v } })} />
                          <Button variant="ghost" size="icon-xs" aria-label={`Add task to ${g.name}`}
                            onClick={() => create.mutate({ table: 'pt_tasks', values: { group_id: g.id, name: 'New task', sort_order: tasks.length } })}>
                            <Plus />
                          </Button>
                        </div>
                        <div className="flex-1" />
                      </div>
                      {tasks.map((t) => {
                        const bar = barGeometry(t.start_date, t.end_date)
                        const duration = t.duration_label ?? computedDurationLabel(t.start_date, t.end_date)
                        return (
                          <div key={t.id} className="group flex items-center border-b border-border/40 hover:bg-surface-muted/60">
                            <div className={cn(NAME_COL, 'flex items-center gap-2 py-1 pl-10 pr-2')}>
                              <button
                                type="button"
                                aria-label={`Status: ${STATUS_LABELS[t.status]}. Click to change.`}
                                title={STATUS_LABELS[t.status]}
                                onClick={() => cycleStatus(t)}
                                className={cn('size-2.5 shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-ring', STATUS_PIP[t.status])}
                              />
                              <button
                                type="button"
                                onClick={() => onOpenTask(t)}
                                className="truncate text-left text-sm text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                              >
                                {t.name}
                              </button>
                            </div>
                            <div className="relative h-8 flex-1">
                              {bar ? (
                                <button
                                  type="button"
                                  aria-label={`${t.name}: ${t.start_date} to ${t.end_date}${duration ? `, ${duration}` : ''}`}
                                  onClick={() => onOpenTask(t)}
                                  className={cn('absolute top-2.5 h-3 rounded-full focus-visible:outline-2 focus-visible:outline-ring', STATUS_BAR[t.status])}
                                  style={{ left: `${bar.leftPct}%`, width: `${bar.widthPct}%`, background: phaseColor(ph.color_token) }}
                                />
                              ) : (
                                <span className="absolute left-1 top-1.5 text-xs italic text-foreground-subtle">no dates</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* legend */}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-foreground-muted">
          {(TASK_STATUSES as readonly PtTaskStatus[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span aria-hidden className={cn('size-2.5 rounded-full', STATUS_PIP[s])} />
              {STATUS_LABELS[s]}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-3 w-0.5 bg-status-danger-500" /> today
          </span>
          <span>◆ milestone</span>
        </div>
      </div>
    </div>
  )
}
```

Implementation note for the today line: the `left` calc shown is approximate — compute it the same way the bars do by rendering the line INSIDE a full-height absolutely-positioned overlay that spans only the chart column. Concretely: wrap the rows region in `relative`, add `<div className="absolute inset-y-0 right-0 left-[300px] pointer-events-none">` (matching `NAME_COL` width at the breakpoint in play, 260px below `sm`) and position the line inside it at `left: ${today}%`. Do the same trick for the milestone diamonds row if alignment drifts.

- [ ] **Step 2: Wire into `hub-shell.tsx`** — add task-panel state (the panel itself arrives in Task 14; for now `onOpenTask` stores state and renders nothing):

```tsx
const [openTask, setOpenTask] = useState<PtTask | null>(null)
...
<TabsContent value="timeline" className="mt-6">
  <TimelineTab payload={payload} onOpenTask={setOpenTask} />
</TabsContent>
```

- [ ] **Step 3: Verify live with preview tools** — Timeline tab: 6 phase swimlanes in order, bars colored per phase, today line lands mid-June, milestone diamonds hover-tooltip, collapse/expand works, status pip click cycles status (optimistic + persists), group rename works, "Add task" creates "New task" with no dates ("no dates" label). Screenshot desktop + `preview_resize` 390px (horizontal scroll must work).

- [ ] **Step 4: Typecheck + commit**

```powershell
npx tsc --noEmit
git add "src/app/(frontend)/project-hub/_components/timeline-tab.tsx" "src/app/(frontend)/project-hub/_components/hub-shell.tsx"
git commit -m "feat(project-hub): editable gantt timeline with today line and milestone markers"
```

---

### Task 14: Task editor panel (drawer + per-row history)

**Files:**
- Create: `src/app/(frontend)/project-hub/_components/task-panel.tsx`
- Create: `src/app/(frontend)/project-hub/_components/history-list.tsx`
- Modify: `src/app/(frontend)/project-hub/_components/hub-shell.tsx`

- [ ] **Step 1: Create `history-list.tsx`** (shared by task panel + activity tab)

```tsx
'use client'

import { format, parseISO } from 'date-fns'
import { Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { humanizeRevision } from '@/lib/project-hub/diff'
import type { PtRevision } from '@/lib/project-hub/types'
import { useRevert } from './use-hub'

export function RevisionItem({ rev, showTable = false }: { rev: PtRevision; showTable?: boolean }) {
  const revert = useRevert()
  const diffs = humanizeRevision(rev)
  if (diffs.length === 0) return null
  const canRevert = rev.action !== 'delete'
  return (
    <div className="flex items-start justify-between gap-2 py-2">
      <div className="min-w-0 text-sm">
        {diffs.map((d) => (
          <p key={d.field} className="truncate">
            <span className="font-medium text-foreground">{d.label}</span>
            {d.from !== null || d.to !== null ? (
              <>
                {d.from !== null ? <span className="text-foreground-subtle"> {d.from} →</span> : null}
                {d.to !== null ? <span className="text-foreground-muted"> {d.to}</span> : null}
              </>
            ) : null}
          </p>
        ))}
        <p className="mt-0.5 text-xs text-foreground-subtle">
          {rev.actor_name ?? 'System'} · {format(parseISO(rev.created_at), 'd MMM, HH:mm')}
          {showTable ? ` · ${rev.table_name.replace('pt_', '').replace('_', ' ')}` : ''}
        </p>
      </div>
      {canRevert ? (
        <Button variant="outline" size="xs" onClick={() => revert.mutate(rev.id)} aria-label="Revert this change">
          <Undo2 /> Revert
        </Button>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 2: Create `task-panel.tsx`**

```tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchRowHistory } from '@/lib/project-hub/actions'
import { computedDurationLabel } from '@/lib/project-hub/dates'
import { STATUS_LABELS, TASK_STATUSES, type HubPayload, type PtTask } from '@/lib/project-hub/types'
import { EditableDate, EditableSelect, EditableText } from './editable'
import { RevisionItem } from './history-list'
import { useDeleteRow, usePatchRow } from './use-hub'

export function TaskPanel({ task, payload, onClose }: { task: PtTask | null; payload: HubPayload; onClose: () => void }) {
  const patch = usePatchRow()
  const del = useDeleteRow()
  // live row from cache so optimistic edits show immediately
  const live = task ? payload.tasks.find((t) => t.id === task.id) ?? task : null
  const history = useQuery({
    queryKey: ['project-hub', 'history', task?.id],
    queryFn: async () => {
      const res = await fetchRowHistory('pt_tasks', task!.id)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    enabled: !!task,
  })

  return (
    <Drawer direction="right" open={!!task} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        {live ? (
          <>
            <DrawerHeader>
              <DrawerTitle>
                <EditableText label="task name" value={live.name}
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { name: v } })} />
              </DrawerTitle>
              <DrawerDescription>
                {payload.groups.find((g) => g.id === live.group_id)?.name}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
              <div className="grid grid-cols-[6rem_1fr] items-center gap-x-3 gap-y-3">
                <Label>Status</Label>
                <EditableSelect label="status" value={live.status} options={TASK_STATUSES} labels={STATUS_LABELS}
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { status: v } })} />
                <Label>Start</Label>
                <EditableDate label="start date" value={live.start_date}
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { start_date: v } })} />
                <Label>End</Label>
                <EditableDate label="end date" value={live.end_date}
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { end_date: v } })} />
                <Label>Duration</Label>
                <div className="text-sm text-foreground-muted">
                  <EditableText label="duration override" value={live.duration_label ?? ''} required={false}
                    onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { duration_label: v || null } })} />
                  <span className="ml-1 text-xs text-foreground-subtle">
                    {live.duration_label
                      ? `(auto: ${computedDurationLabel(live.start_date, live.end_date) || '—'})`
                      : `(auto${computedDurationLabel(live.start_date, live.end_date) ? '' : ': add dates'})`}
                  </span>
                </div>
                <Label className="self-start pt-1">Notes</Label>
                <EditableText label="notes" value={live.notes ?? ''} required={false} multiline
                  onCommit={(v) => patch.mutate({ table: 'pt_tasks', id: live.id, patch: { notes: v || null } })} />
              </div>
              <Button variant="destructive-outline" size="sm"
                onClick={() => { del.mutate({ table: 'pt_tasks', id: live.id }); onClose() }}>
                <Trash2 /> Delete task
              </Button>
              <Separator />
              <div>
                <h3 className="mb-1 text-sm font-medium text-foreground">History</h3>
                {history.isLoading ? <Skeleton className="h-16 w-full" /> : null}
                {history.data?.length === 0 ? (
                  <p className="text-sm text-foreground-subtle">No changes yet.</p>
                ) : null}
                <div className="divide-y divide-border">
                  {history.data?.map((rev) => <RevisionItem key={rev.id} rev={rev} />)}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}
```

(If `separator.tsx` exports differently, check the file; worst case use `<div className="h-px bg-border" role="separator" />`. If the DS `Drawer` defaults to bottom and takes no `direction` prop on `Drawer`, check `drawer.tsx` — vaul's prop is `direction="right"` on the root; follow the DS source.)

- [ ] **Step 3: Render in `hub-shell.tsx`** after `</Tabs>`:

```tsx
<TaskPanel task={openTask} payload={payload} onClose={() => setOpenTask(null)} />
```

- [ ] **Step 4: Verify live** — click a task name/bar → drawer opens from the right; edit status/dates/notes (each persists + Gantt bar moves on date change); duration shows auto-label, override works ("Ongoing"); history lists the edits just made with your Clerk name; Revert restores the previous value; delete closes panel + row leaves the Gantt + toast points at Activity.

- [ ] **Step 5: Typecheck + commit**

```powershell
npx tsc --noEmit
git add "src/app/(frontend)/project-hub/_components"
git commit -m "feat(project-hub): task editor drawer with per-row history and revert"
```

---

### Task 15: Milestones tab

**Files:**
- Create: `src/app/(frontend)/project-hub/_components/milestones-tab.tsx`
- Modify: `src/app/(frontend)/project-hub/_components/hub-shell.tsx` (swap placeholder)

- [ ] **Step 1: Create `milestones-tab.tsx`**

```tsx
'use client'

import { isBefore, parseISO, startOfToday } from 'date-fns'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { HubPayload } from '@/lib/project-hub/types'
import { EditableDate, EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

export function MilestonesTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const today = startOfToday()
  const sorted = [...payload.milestones].sort((a, b) => a.date.localeCompare(b.date))
  return (
    <div className="max-w-3xl">
      <ol className="relative ml-3 border-l-2 border-border">
        {sorted.map((m) => {
          const overdue = !m.achieved && isBefore(parseISO(m.date), today)
          return (
            <li key={m.id} className="group relative mb-6 ml-6">
              <span
                aria-hidden
                className={cn(
                  'absolute -left-[31px] top-1 size-3.5 rounded-full border-2',
                  m.achieved ? 'border-status-success-500 bg-status-success-500'
                    : overdue ? 'border-status-danger-500 bg-surface'
                    : 'border-border-strong bg-surface',
                )}
              />
              <div className="flex flex-wrap items-center gap-2">
                <EditableDate label="milestone date" value={m.date}
                  onCommit={(v) => v && patch.mutate({ table: 'pt_milestones', id: m.id, patch: { date: v } })} />
                <EditableText label="milestone name" value={m.name} className="font-medium"
                  onCommit={(v) => patch.mutate({ table: 'pt_milestones', id: m.id, patch: { name: v } })} />
                {m.achieved ? <Badge variant="success">Achieved</Badge> : null}
                {overdue ? <Badge variant="danger">Overdue</Badge> : null}
                <label className="ml-auto flex items-center gap-1.5 text-xs text-foreground-muted">
                  <Checkbox checked={m.achieved} aria-label={`Mark ${m.name} achieved`}
                    onCheckedChange={(c) => patch.mutate({ table: 'pt_milestones', id: m.id, patch: { achieved: c === true } })} />
                  achieved
                </label>
                <RowActions table="pt_milestones" id={m.id} name={m.name} />
              </div>
              <EditableText label="deliverable" value={m.deliverable ?? ''} required={false}
                className="mt-1 block text-sm text-foreground-muted"
                onCommit={(v) => patch.mutate({ table: 'pt_milestones', id: m.id, patch: { deliverable: v || null } })} />
            </li>
          )
        })}
      </ol>
      <Button variant="ghost" size="sm"
        onClick={() => create.mutate({ table: 'pt_milestones', values: { date: '2026-08-31', name: 'New milestone', sort_order: payload.milestones.length } })}>
        <Plus /> Add milestone
      </Button>
    </div>
  )
}
```

- [ ] **Step 2: Wire into hub-shell, verify live** (timeline diamonds update when a milestone date changes; achieved toggle flips diamond color), **typecheck + commit**

```powershell
npx tsc --noEmit
git add "src/app/(frontend)/project-hub/_components"
git commit -m "feat(project-hub): milestones timeline with achieved/overdue states"
```

---

### Task 16: Activity tab

**Files:**
- Create: `src/app/(frontend)/project-hub/_components/activity-tab.tsx`
- Modify: `src/app/(frontend)/project-hub/_components/hub-shell.tsx` (swap last placeholder)

- [ ] **Step 1: Create `activity-tab.tsx`**

```tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchActivity } from '@/lib/project-hub/actions'
import type { PtRevision } from '@/lib/project-hub/types'
import { ACTIVITY_KEY } from './use-hub'
import { RevisionItem } from './history-list'

export function ActivityTab() {
  const { data, isLoading, error } = useQuery({
    queryKey: ACTIVITY_KEY,
    queryFn: async () => {
      const res = await fetchActivity(150)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
  })
  if (isLoading) return <Skeleton className="h-40 w-full max-w-3xl" />
  if (error) return <p className="text-sm text-status-danger-700">Couldn’t load activity: {error.message}</p>
  const byDay = new Map<string, PtRevision[]>()
  for (const rev of data ?? []) {
    const day = format(parseISO(rev.created_at), 'EEEE d MMMM yyyy')
    byDay.set(day, [...(byDay.get(day) ?? []), rev])
  }
  return (
    <div className="max-w-3xl">
      {[...byDay.entries()].map(([day, revs]) => (
        <section key={day} className="mb-6">
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground-subtle">{day}</h3>
          <div className="divide-y divide-border rounded-lg border border-border px-4">
            {revs.map((rev) => <RevisionItem key={rev.id} rev={rev} showTable />)}
          </div>
        </section>
      ))}
      {(data ?? []).length === 0 ? <p className="text-sm text-foreground-subtle">No activity yet.</p> : null}
    </div>
  )
}
```

- [ ] **Step 2: Wire into hub-shell, verify live** — feed shows seed inserts + your edits grouped by day; reverting a soft delete from here restores the row (check it reappears in its tab). **Typecheck + commit**

```powershell
npx tsc --noEmit
git add "src/app/(frontend)/project-hub/_components"
git commit -m "feat(project-hub): global activity feed with day grouping and revert"
```

---

### Task 17: Realtime end-to-end check + polish pass

**Files:**
- Possibly small fixes across `_components/*` (whatever verification surfaces)

- [ ] **Step 1: Two-client realtime test** — with the preview session open on Timeline, run one UPDATE via the Management API pattern (status flip on any task, include `updated_by_*` values). Expected: within ~1s the open page refetches and shows the change without reload; the "viewing" badge stays subscribed. Revert the change from the UI afterwards.

- [ ] **Step 2: Disconnect/reconnect** — `preview_eval` → `window.dispatchEvent(new Event('offline'))` is unreliable for sockets; instead stop/start the dev server and confirm the channel resubscribes (badge returns to green) and a refetch fires (use-realtime's SUBSCRIBED branch).

- [ ] **Step 3: Keyboard sweep** — tab through: tab triggers, status pips (Enter cycles), task names (Enter opens drawer), inline editors (Enter saves, Esc cancels), row actions reachable via focus (focus-within makes them visible). Fix any focus traps/invisible focus.

- [ ] **Step 4: `npm run lint` and `npm run test:a11y`** (if the a11y suite targets specific routes only, run a quick axe pass on `/project-hub` via the existing playwright setup pattern in `tests/a11y/` — add `project-hub.spec.ts` mirroring an existing spec there if trivial; otherwise note why skipped). Expected: no new violations; common offenders to fix: missing accessible names on icon buttons, contrast on subtle text.

- [ ] **Step 5: Screenshots** — `preview_screenshot` of every tab desktop + Timeline at 390px. Share in chat.

- [ ] **Step 6: Commit**

```powershell
npx tsc --noEmit
git add -A -- "src/app/(frontend)/project-hub" src/lib/project-hub tests
git commit -m "fix(project-hub): realtime + keyboard + a11y polish pass"
```

---

### Task 18: Finish branch

- [ ] **Step 1: Full gate** — `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build` all green.

- [ ] **Step 2: Merge per repo convention (ff-only) and push**

```powershell
git checkout main
git merge --ff-only feature/project-hub
git push
git branch -d feature/project-hub
```

- [ ] **Step 3: Post-merge notes** — remind the user: (a) add the four Supabase env vars in Vercel before the next deploy; (b) the Excel workbook is now retired — the hub is the source of truth; (c) `/project-hub` is Clerk-gated and unlisted.

---

## Self-review checklist (run after writing, before executing)

- Spec coverage: schema/triggers/RLS (T3), seed+normalization (T5), env (T4), gated route (T10), seven tabs (T12–T16 + shell), realtime+presence (T10/T17), history+revert (T14/T16), soft delete (T9/T12), reorder (T9/T12), unit tests (T6–T8), live verification (T13/T14/T17), rollout (T4/T18). Gantt bar drag, dnd, private channels, multi-project: deferred by spec — no tasks, correct.
- Types referenced across tasks: `HubPayload`/`EditableTable`/`PtTask` defined in T6 and imported consistently; `Result<T>` local to actions; hooks exported from `use-hub` match imports in T12–T16.
- Known execution-time checks called out inline: DS `Checkbox`/`Drawer`/`Separator` prop shapes, zod strict-partial API, ref forwarding on `Input`/`Textarea`, today-line alignment.
