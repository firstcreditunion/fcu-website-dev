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
