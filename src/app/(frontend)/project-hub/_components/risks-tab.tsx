'use client'

import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import type { HubPayload, PtRiskImpact } from '@/lib/project-hub/types'
import { EditableSelect, EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

const IMPACTS: readonly PtRiskImpact[] = ['low', 'medium', 'high']
const IMPACT_LABELS: Record<PtRiskImpact, string> = { low: 'Low', medium: 'Medium', high: 'High' }
const IMPACT_BADGE: Record<PtRiskImpact, 'success' | 'warning' | 'danger'> = {
  low: 'success', medium: 'warning', high: 'danger',
}

export function RisksTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Risk</TableHead>
              <TableHead className="w-32">Impact</TableHead>
              <TableHead>Mitigation</TableHead>
              <TableHead className="w-24"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payload.risks.map((r) => (
              <TableRow key={r.id} className="group">
                <TableCell>
                  <EditableText label="risk" value={r.risk}
                    onCommit={(v) => patch.mutate({ table: 'pt_risks', id: r.id, patch: { risk: v } })} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant={IMPACT_BADGE[r.impact]}>{IMPACT_LABELS[r.impact]}</Badge>
                    <EditableSelect label="impact" value={r.impact} options={IMPACTS} labels={IMPACT_LABELS}
                      onCommit={(v) => patch.mutate({ table: 'pt_risks', id: r.id, patch: { impact: v } })}
                      className="w-24" />
                  </div>
                </TableCell>
                <TableCell>
                  <EditableText label="mitigation" value={r.mitigation} required={false}
                    onCommit={(v) => patch.mutate({ table: 'pt_risks', id: r.id, patch: { mitigation: v } })} />
                </TableCell>
                <TableCell><RowActions table="pt_risks" id={r.id} name={r.risk} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="ghost" size="sm" className="mt-3"
        onClick={() => create.mutate({ table: 'pt_risks', values: { risk: 'New risk', sort_order: payload.risks.length } })}>
        <Plus /> Add risk
      </Button>
    </div>
  )
}
