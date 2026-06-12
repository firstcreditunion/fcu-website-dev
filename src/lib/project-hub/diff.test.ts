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
