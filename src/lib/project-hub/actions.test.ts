import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockUser = vi.hoisted(() => ({ value: null as null | { id: string; fullName: string | null; primaryEmailAddress: { emailAddress: string } | null } }))
vi.mock('@clerk/nextjs/server', () => ({ currentUser: async () => mockUser.value }))
vi.mock('server-only', () => ({}))

const db = vi.hoisted(() => ({
  updates: [] as { table: string; payload: Record<string, unknown> }[],
  // queue of results returned by successive select() chains (single OR list)
  selectResults: [] as { data: unknown; error: { message: string } | null }[],
}))

vi.mock('./supabase-server', () => ({
  supabaseAdmin: () => ({
    from: (table: string) => ({
      update: (payload: Record<string, unknown>) => {
        db.updates.push({ table, payload })
        const chain = {
          eq: () => chain,
          is: () => chain,
          select: () => ({ single: async () => ({ data: { id: 'r1', ...payload }, error: null }) }),
          then: (resolve: (v: unknown) => void) => resolve({ data: null, error: null }),
        }
        return chain
      },
      select: () => {
        const result = db.selectResults.shift() ?? { data: null, error: { message: 'no mock select result queued' } }
        const chain = {
          eq: () => chain,
          is: () => chain,
          order: () => chain,
          limit: () => chain,
          single: async () => result,
          then: (resolve: (v: unknown) => void) => resolve(result),
        }
        return chain
      },
    }),
  }),
}))

import { updateRow, revertRevision, moveRow } from './actions'

const ROW_ID = '7c9e6679-7425-40de-944b-e07fc1f90ae7'
const OTHER_ID = '9b2f1c44-1d3a-4f6e-8a51-3c2b9e07d815'

beforeEach(() => {
  db.updates.length = 0
  db.selectResults.length = 0
})

describe('updateRow', () => {
  it('rejects when not signed in', async () => {
    mockUser.value = null
    const res = await updateRow('pt_tasks', ROW_ID, { name: 'x' })
    expect(res).toEqual({ ok: false, error: 'Not signed in' })
    expect(db.updates).toHaveLength(0)
  })
  it('stamps the actor and passes only validated fields', async () => {
    mockUser.value = { id: 'u1', fullName: 'Sam Isaac', primaryEmailAddress: null }
    const res = await updateRow('pt_tasks', ROW_ID, { status: 'complete' })
    expect(res.ok).toBe(true)
    expect(db.updates[0].payload).toEqual({ status: 'complete', updated_by_id: 'u1', updated_by_name: 'Sam Isaac' })
  })
  it('refuses non-pt tables and invalid patches', async () => {
    mockUser.value = { id: 'u1', fullName: 'Sam', primaryEmailAddress: null }
    expect((await updateRow('tblLoanApplication', ROW_ID, { name: 'x' })).ok).toBe(false)
    expect((await updateRow('pt_tasks', ROW_ID, { updated_by_id: 'evil' })).ok).toBe(false)
  })
})

describe('revertRevision', () => {
  const baseRevision = {
    id: 5, project_id: 'p1', table_name: 'pt_tasks', row_id: ROW_ID,
    actor_id: 'u0', actor_name: 'Earlier User', created_at: '2026-06-10T00:00:00Z',
  }

  it('does not resurrect a soft-deleted row when reverting a content edit', async () => {
    mockUser.value = { id: 'u1', fullName: 'Sam', primaryEmailAddress: null }
    db.selectResults.push({
      data: {
        ...baseRevision, action: 'update',
        old_data: { id: ROW_ID, project_id: 'p1', name: 'Old name', status: 'in_progress', deleted_at: null, sort_order: 1 },
        new_data: { id: ROW_ID, project_id: 'p1', name: 'New name', status: 'in_progress', deleted_at: null, sort_order: 1 },
      },
      error: null,
    })
    const res = await revertRevision(5)
    expect(res.ok).toBe(true)
    const payload = db.updates[0].payload
    expect(payload.name).toBe('Old name')
    expect('deleted_at' in payload).toBe(false) // lifecycle untouched
    expect('project_id' in payload).toBe(false) // meta stripped
    expect(payload.updated_by_id).toBe('u1')
  })

  it('restores deleted_at when reverting the soft-delete revision itself', async () => {
    mockUser.value = { id: 'u1', fullName: 'Sam', primaryEmailAddress: null }
    db.selectResults.push({
      data: {
        ...baseRevision, action: 'update',
        old_data: { id: ROW_ID, project_id: 'p1', name: 'Task', deleted_at: null },
        new_data: { id: ROW_ID, project_id: 'p1', name: 'Task', deleted_at: '2026-06-12T01:00:00Z' },
      },
      error: null,
    })
    const res = await revertRevision(5)
    expect(res.ok).toBe(true)
    expect(db.updates[0].payload.deleted_at).toBeNull() // restore
  })

  it('reverts an insert by soft-deleting the row', async () => {
    mockUser.value = { id: 'u1', fullName: 'Sam', primaryEmailAddress: null }
    db.selectResults.push({
      data: { ...baseRevision, action: 'insert', old_data: null, new_data: { id: ROW_ID, name: 'Created' } },
      error: null,
    })
    const res = await revertRevision(5)
    expect(res.ok).toBe(true)
    const payload = db.updates[0].payload
    expect(payload.deleted_at).toBeTruthy()
    expect(payload.updated_by_id).toBe('u1') // audit attribution preserved
    expect(payload.deleted_by_id).toBe('u1')
  })
})

describe('moveRow', () => {
  it('is a no-op success at the top boundary and issues no updates', async () => {
    mockUser.value = { id: 'u1', fullName: 'Sam', primaryEmailAddress: null }
    db.selectResults.push({ data: { id: ROW_ID, group_id: 'g1', project_id: 'p1', sort_order: 0 }, error: null })
    db.selectResults.push({ data: [{ id: ROW_ID, sort_order: 0 }, { id: OTHER_ID, sort_order: 1 }], error: null })
    const res = await moveRow('pt_tasks', ROW_ID, 'up')
    expect(res).toEqual({ ok: true, data: null })
    expect(db.updates).toHaveLength(0)
  })
})
