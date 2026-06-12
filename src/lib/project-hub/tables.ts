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

export function validateCreate(table: EditableTable, values: unknown): Record<string, unknown> {
  const schema = entry(table).create
  if (!schema) throw new Error(`creates not allowed on ${table}`)
  return schema.strict().parse(values) as Record<string, unknown>
}
