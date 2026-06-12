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
