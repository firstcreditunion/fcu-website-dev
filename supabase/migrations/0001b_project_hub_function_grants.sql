-- Defense-in-depth from the final review: align the pt_* trigger functions with
-- the deny-all posture used everywhere else in this feature.
-- Neither function is exploitable today (both RETURN trigger, so PostgREST cannot
-- expose them via RPC, and table-level deny-all RLS already blocks anon/authenticated),
-- but revoking the default PUBLIC EXECUTE grant and pinning pt_touch's search_path
-- removes the Supabase advisor warnings and keeps the surface consistent. Trigger
-- invocation does not require EXECUTE, so service-role writes keep firing the triggers.
-- No begin/commit here: the runner wraps each file in a transaction.

revoke execute on function api.pt_log_and_notify() from public, anon, authenticated;
revoke execute on function api.pt_touch() from public, anon, authenticated;
alter function api.pt_touch() set search_path = '';
