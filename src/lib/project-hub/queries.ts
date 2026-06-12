import 'server-only'
import { supabaseAdmin } from './supabase-server'
import type { HubPayload, PtProject } from './types'

export const PROJECT_SLUG = 'fcu-website-rebuild-2026'

async function rows<T>(table: string, projectId: string, order: string): Promise<T[]> {
  const { data, error } = await supabaseAdmin()
    .from(table)
    .select('*')
    .eq('project_id', projectId)
    .is('deleted_at', null)
    .order(order, { ascending: true })
  if (error) throw new Error(`${table}: ${error.message}`)
  return data as T[]
}

export async function getProjectHub(): Promise<HubPayload> {
  const { data: project, error } = await supabaseAdmin()
    .from('pt_projects')
    .select('*')
    .eq('slug', PROJECT_SLUG)
    .is('deleted_at', null)
    .single<PtProject>()
  if (error || !project) throw new Error(`pt_projects: ${error?.message ?? 'not found'}`)
  const id = project.id
  const [facts, phases, groups, tasks, milestones, risks, techStack, deliverables] = await Promise.all([
    rows('pt_facts', id, 'sort_order'),
    rows('pt_phases', id, 'phase_number'),
    rows('pt_task_groups', id, 'sort_order'),
    rows('pt_tasks', id, 'sort_order'),
    rows('pt_milestones', id, 'sort_order'),
    rows('pt_risks', id, 'sort_order'),
    rows('pt_tech_stack', id, 'sort_order'),
    rows('pt_deliverables', id, 'sort_order'),
  ]) as [HubPayload['facts'], HubPayload['phases'], HubPayload['groups'], HubPayload['tasks'],
         HubPayload['milestones'], HubPayload['risks'], HubPayload['techStack'], HubPayload['deliverables']]
  return { project, facts, phases, groups, tasks, milestones, risks, techStack, deliverables }
}
