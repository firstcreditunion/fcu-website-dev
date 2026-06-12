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
    // Restore deleted_at ONLY when this revision actually changed it (i.e. it
    // captured a soft delete or a restore). Otherwise reverting an old content
    // edit would silently resurrect a row that was soft-deleted later.
    const deletedChanged =
      (rev.old_data.deleted_at ?? null) !== (rev.new_data?.deleted_at ?? null)
    const restore: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(rev.old_data)) {
      if (REVERT_META.has(k)) continue
      if (k === 'deleted_at' && !deletedChanged) continue
      restore[k] = v
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
    const { data: row, error: rowErr } = await sb
      .from(table)
      .select('*')
      .eq('id', id)
      .single<{ [k: string]: unknown }>()
    if (rowErr || !row) throw new Error(rowErr?.message ?? 'row not found')
    const scopeCol = table === 'pt_tasks' ? 'group_id'
      : table === 'pt_task_groups' ? 'phase_id'
      : table === 'pt_facts' ? 'section'
      : 'project_id'
    const { data: siblings, error: sibErr } = await sb
      .from(table)
      .select('id, sort_order')
      .eq(scopeCol, String(row[scopeCol]))
      .eq('project_id', String(row['project_id'] ?? row['id']))
      .is('deleted_at', null)
      .order('sort_order', { ascending: true })
    if (sibErr || !siblings) throw new Error(sibErr?.message ?? 'siblings not found')
    const i = siblings.findIndex((s: { id: unknown }) => s.id === id)
    const j = direction === 'up' ? i - 1 : i + 1
    if (i < 0 || j < 0 || j >= siblings.length) return { ok: true, data: null }
    const stamp = { updated_by_id: who.id, updated_by_name: who.name }
    const a = siblings[i] as { id: string; sort_order: number }
    const b = siblings[j] as { id: string; sort_order: number }
    const { error: e1 } = await sb.from(table).update({ sort_order: b.sort_order, ...stamp }).eq('id', a.id)
    if (e1) throw new Error(e1.message)
    const { error: e2 } = await sb.from(table).update({ sort_order: a.sort_order, ...stamp }).eq('id', b.id)
    if (e2) {
      // best-effort compensation so a half-applied swap can't leave two rows
      // sharing a sort_order
      await sb.from(table).update({ sort_order: a.sort_order, ...stamp }).eq('id', a.id)
      throw new Error(e2.message)
    }
    return { ok: true, data: null }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'move failed' }
  }
}

export async function fetchActivity(limit = 100): Promise<Result<PtRevision[]>> {
  if (!(await actor())) return { ok: false, error: 'Not signed in' }
  try {
    const { data, error } = await supabaseAdmin()
      .from('pt_revisions')
      .select('*')
      .order('id', { ascending: false })
      .limit(Math.min(limit, 300))
    if (error) throw new Error(error.message)
    return { ok: true, data: data as PtRevision[] }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'activity failed' }
  }
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
