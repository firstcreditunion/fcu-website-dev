'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { fetchHub, updateRow, createRow, softDeleteRow, moveRow, revertRevision } from '@/lib/project-hub/actions'
import type { EditableTable } from '@/lib/project-hub/tables'
import type { HubPayload } from '@/lib/project-hub/types'

export const HUB_KEY = ['project-hub'] as const
export const ACTIVITY_KEY = ['project-hub', 'activity'] as const

const TABLE_TO_KEY: Record<string, keyof HubPayload> = {
  pt_facts: 'facts', pt_phases: 'phases', pt_task_groups: 'groups', pt_tasks: 'tasks',
  pt_milestones: 'milestones', pt_risks: 'risks', pt_tech_stack: 'techStack', pt_deliverables: 'deliverables',
}

export function useHub(initial: HubPayload) {
  return useQuery({
    queryKey: HUB_KEY,
    queryFn: async () => {
      const res = await fetchHub()
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    initialData: initial,
    staleTime: 15_000,
  })
}

export function useHubInvalidate() {
  const qc = useQueryClient()
  return () => {
    void qc.invalidateQueries({ queryKey: HUB_KEY })
    void qc.invalidateQueries({ queryKey: ACTIVITY_KEY })
  }
}

export function usePatchRow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (vars: { table: EditableTable; id: string; patch: Record<string, unknown> }) => {
      const res = await updateRow(vars.table, vars.id, vars.patch)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: HUB_KEY })
      const prev = qc.getQueryData<HubPayload>(HUB_KEY)
      if (prev && vars.table !== 'pt_projects') {
        const key = TABLE_TO_KEY[vars.table]
        qc.setQueryData<HubPayload>(HUB_KEY, {
          ...prev,
          [key]: (prev[key] as { id: string }[]).map((r) => (r.id === vars.id ? { ...r, ...vars.patch } : r)),
        })
      }
      if (prev && vars.table === 'pt_projects') {
        qc.setQueryData<HubPayload>(HUB_KEY, { ...prev, project: { ...prev.project, ...vars.patch } })
      }
      return { prev }
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(HUB_KEY, ctx.prev)
      toast.error(`Save failed: ${err.message}`)
    },
    onSettled: () => void qc.invalidateQueries({ queryKey: HUB_KEY }),
  })
}

export function useCreateRow(projectId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (vars: { table: EditableTable; values: Record<string, unknown> }) => {
      const res = await createRow(vars.table, projectId, vars.values)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    onError: (err) => toast.error(`Add failed: ${err.message}`),
    onSettled: () => void qc.invalidateQueries({ queryKey: HUB_KEY }),
  })
}

export function useDeleteRow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (vars: { table: EditableTable; id: string }) => {
      const res = await softDeleteRow(vars.table, vars.id)
      if (!res.ok) throw new Error(res.error)
      return res.data
    },
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: HUB_KEY })
      const prev = qc.getQueryData<HubPayload>(HUB_KEY)
      const key = TABLE_TO_KEY[vars.table]
      if (prev && key) {
        qc.setQueryData<HubPayload>(HUB_KEY, {
          ...prev,
          [key]: (prev[key] as { id: string }[]).filter((r) => r.id !== vars.id),
        })
      }
      return { prev }
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(HUB_KEY, ctx.prev)
      toast.error(`Delete failed: ${err.message}`)
    },
    onSuccess: () => toast.success('Deleted — recover from the Activity tab'),
    onSettled: () => void qc.invalidateQueries({ queryKey: HUB_KEY }),
  })
}

export function useMoveRow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (vars: { table: EditableTable; id: string; direction: 'up' | 'down' }) => {
      const res = await moveRow(vars.table, vars.id, vars.direction)
      if (!res.ok) throw new Error(res.error)
    },
    onError: (err) => toast.error(`Reorder failed: ${err.message}`),
    onSettled: () => void qc.invalidateQueries({ queryKey: HUB_KEY }),
  })
}

export function useRevert() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (revisionId: number) => {
      const res = await revertRevision(revisionId)
      if (!res.ok) throw new Error(res.error)
    },
    onSuccess: () => toast.success('Reverted'),
    onError: (err) => toast.error(`Revert failed: ${err.message}`),
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: HUB_KEY })
      void qc.invalidateQueries({ queryKey: ACTIVITY_KEY })
    },
  })
}
