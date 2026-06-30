'use client'

import { Plus, Trash2 } from 'lucide-react'
import type { HubPayload } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { useCreateRow, useDeleteRow, usePatchRow } from './use-hub'

export function TechStackTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  const del = useDeleteRow()

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="m-0 text-lg font-semibold tracking-tight">Tech stack</h1>
          <p className="mt-0.5 mb-0 text-[12.5px] text-foreground-muted">
            {payload.techStack.length} technologies powering the rebuild
          </p>
        </div>
        <button
          type="button"
          disabled={create.isPending}
          onClick={() => create.mutate({
            table: 'pt_tech_stack',
            values: { technology: 'New technology', sort_order: payload.techStack.length },
          })}
          className="inline-flex items-center gap-1.5 rounded-[9px] border-none px-[15px] py-2.5 font-sans text-[12.5px] font-semibold shadow-sm hover:bg-primary-hover disabled:opacity-60"
          style={{ color: 'var(--primary-foreground)', background: 'var(--primary)' }}
        >
          <Plus aria-hidden="true" className="size-3.5" />
          Add technology
        </button>
      </div>

      <div className="grid gap-[13px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {payload.techStack.map((t) => (
          <div
            key={t.id}
            className="relative rounded-[13px] border shadow-sm"
            style={{ background: 'var(--card)', borderColor: 'var(--border)', padding: '16px 17px' }}
          >
            <button
              type="button"
              aria-label={`Remove ${t.technology}`}
              title="Remove"
              onClick={() => del.mutate({ table: 'pt_tech_stack', id: t.id })}
              className="absolute top-[11px] right-[11px] grid size-[26px] place-items-center rounded-[7px] border border-transparent text-foreground-subtle hover:border-status-danger-500/40 hover:bg-card hover:text-status-danger-700"
            >
              <Trash2 className="size-3.5" />
            </button>

            <div className="flex flex-wrap items-center gap-2.5 pr-[30px]">
              <EditableText
                label="technology"
                value={t.technology}
                onCommit={(v) => patch.mutate({ table: 'pt_tech_stack', id: t.id, patch: { technology: v } })}
                className="text-[15px] font-semibold tracking-tight"
              />
              <EditableText
                label="version"
                value={t.version}
                required={false}
                onCommit={(v) => patch.mutate({ table: 'pt_tech_stack', id: t.id, patch: { version: v } })}
                className="rounded-full bg-brand-accent-subtle px-2.5 font-mono text-[11px] font-semibold text-brand-accent"
              />
            </div>

            <EditableText
              label="purpose"
              value={t.purpose}
              required={false}
              multiline
              onCommit={(v) => patch.mutate({ table: 'pt_tech_stack', id: t.id, patch: { purpose: v } })}
              className="mt-2.5 text-[12.5px] leading-relaxed text-foreground-muted"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
