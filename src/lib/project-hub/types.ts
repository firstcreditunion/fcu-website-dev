export type PtTaskStatus = 'not_started' | 'in_progress' | 'complete' | 'blocked' | 'na'
export type PtRiskImpact = 'low' | 'medium' | 'high'
export type PtFactSection = 'overview' | 'deployment'
export type PtRevisionAction = 'insert' | 'update' | 'delete'

interface Meta {
  id: string
  created_at: string
  updated_at: string
  updated_by_id: string | null
  updated_by_name: string | null
  deleted_at: string | null
  deleted_by_id: string | null
  deleted_by_name: string | null
}

export interface PtProject extends Meta {
  slug: string
  title: string
  subtitle: string | null
}
export interface PtFact extends Meta {
  project_id: string
  section: PtFactSection
  label: string
  value: string
  sort_order: number
}
export interface PtPhase extends Meta {
  project_id: string
  phase_number: number
  name: string
  start_date: string | null
  end_date: string | null
  color_token: string
}
export interface PtTaskGroup extends Meta {
  project_id: string
  phase_id: string
  name: string
  sort_order: number
}
export interface PtTask extends Meta {
  project_id: string
  group_id: string
  name: string
  start_date: string | null
  end_date: string | null
  duration_label: string | null
  status: PtTaskStatus
  notes: string | null
  sort_order: number
}
export interface PtMilestone extends Meta {
  project_id: string
  date: string
  name: string
  deliverable: string | null
  achieved: boolean
  sort_order: number
}
export interface PtRisk extends Meta {
  project_id: string
  risk: string
  impact: PtRiskImpact
  mitigation: string
  sort_order: number
}
export interface PtTechStack extends Meta {
  project_id: string
  technology: string
  version: string
  purpose: string
  sort_order: number
}
export interface PtDeliverable extends Meta {
  project_id: string
  description: string
  done: boolean
  sort_order: number
}
export interface PtRevision {
  id: number
  project_id: string
  table_name: string
  row_id: string
  action: PtRevisionAction
  actor_id: string | null
  actor_name: string | null
  old_data: Record<string, unknown> | null
  new_data: Record<string, unknown> | null
  created_at: string
}

export interface HubPayload {
  project: PtProject
  facts: PtFact[]
  phases: PtPhase[]
  groups: PtTaskGroup[]
  tasks: PtTask[]
  milestones: PtMilestone[]
  risks: PtRisk[]
  techStack: PtTechStack[]
  deliverables: PtDeliverable[]
}

export const TASK_STATUSES: PtTaskStatus[] = ['not_started', 'in_progress', 'complete', 'blocked', 'na']
export const STATUS_LABELS: Record<PtTaskStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  complete: 'Complete',
  blocked: 'Blocked',
  na: 'N/A',
}
