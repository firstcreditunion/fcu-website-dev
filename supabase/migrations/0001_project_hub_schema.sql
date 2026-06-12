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
