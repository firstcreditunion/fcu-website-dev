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
  it('rejects unknown fields on create (mass-assignment guard)', () => {
    expect(() => validateCreate('pt_tasks', {
      group_id: '7c9e6679-7425-40de-944b-e07fc1f90ae7', name: 'x', project_id: 'evil',
    })).toThrow()
  })
  it('treats explicit-undefined patches as empty', () => {
    expect(() => validatePatch('pt_tasks', { name: undefined })).toThrow()
  })
  it('exposes the full editable table list', () => {
    expect(EDITABLE_TABLES).toContain('pt_deliverables')
    expect(EDITABLE_TABLES).not.toContain('pt_revisions')
  })
})
