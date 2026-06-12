-- Hardening follow-ups from the Task 3 code review.
-- 1. Broadcast failures must never abort the user's write: guard realtime.send
--    locally instead of relying on the deployed realtime version self-catching.
-- 2. Document the SECURITY DEFINER invariants (owner: postgres; no dynamic SQL)
--    and the intentional ON DELETE NO ACTION posture.
-- No begin/commit here: the runner wraps each file in a transaction.

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
  begin
    perform realtime.send(
      jsonb_build_object('table', tg_table_name, 'id', v_rid::text, 'op', lower(tg_op)),
      'change',
      'pt:' || v_pid::text,
      false
    );
  exception when others then
    null; -- broadcast failure must never abort the user's write
  end;
  return null;
end $$;

comment on function api.pt_log_and_notify() is
  'Project Hub audit + broadcast trigger. SECURITY DEFINER (owner: postgres) with search_path pinned empty. '
  'INVARIANT: contains NO dynamic SQL — never add EXECUTE/format() over tg_table_name or row data. '
  'Broadcast errors are swallowed by design; the revision insert is the part that must succeed.';

comment on table api.pt_projects is
  'Project Hub root table. Child FKs use ON DELETE NO ACTION intentionally: the app only soft-deletes; '
  'a hard project delete is a deliberate multi-statement operator action.';
