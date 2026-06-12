'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import type { HubPayload } from '@/lib/project-hub/types'
import { EditableText } from './editable'
import { RowActions } from './row-actions'
import { useCreateRow, usePatchRow } from './use-hub'

export function TechStackTab({ payload }: { payload: HubPayload }) {
  const patch = usePatchRow()
  const create = useCreateRow(payload.project.id)
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Technology</TableHead>
              <TableHead className="w-36">Version / service</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead className="w-24"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payload.techStack.map((t) => (
              <TableRow key={t.id} className="group">
                <TableCell>
                  <EditableText label="technology" value={t.technology}
                    onCommit={(v) => patch.mutate({ table: 'pt_tech_stack', id: t.id, patch: { technology: v } })} />
                </TableCell>
                <TableCell>
                  <EditableText label="version" value={t.version} required={false}
                    onCommit={(v) => patch.mutate({ table: 'pt_tech_stack', id: t.id, patch: { version: v } })} />
                </TableCell>
                <TableCell>
                  <EditableText label="purpose" value={t.purpose} required={false}
                    onCommit={(v) => patch.mutate({ table: 'pt_tech_stack', id: t.id, patch: { purpose: v } })} />
                </TableCell>
                <TableCell><RowActions table="pt_tech_stack" id={t.id} name={t.technology} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="ghost" size="sm" className="mt-3"
        onClick={() => create.mutate({ table: 'pt_tech_stack', values: { technology: 'New technology', sort_order: payload.techStack.length } })}>
        <Plus /> Add technology
      </Button>
    </div>
  )
}
