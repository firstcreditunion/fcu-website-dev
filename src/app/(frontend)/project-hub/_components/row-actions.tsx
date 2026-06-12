'use client'

import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDeleteRow, useMoveRow } from './use-hub'
import type { EditableTable } from '@/lib/project-hub/tables'

export function RowActions({ table, id, name }: { table: EditableTable; id: string; name: string }) {
  const move = useMoveRow()
  const del = useDeleteRow()
  return (
    <span className="inline-flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
      <Button variant="ghost" size="icon-xs" aria-label={`Move ${name} up`}
        onClick={() => move.mutate({ table, id, direction: 'up' })}><ArrowUp /></Button>
      <Button variant="ghost" size="icon-xs" aria-label={`Move ${name} down`}
        onClick={() => move.mutate({ table, id, direction: 'down' })}><ArrowDown /></Button>
      <Button variant="ghost" size="icon-xs" aria-label={`Delete ${name}`}
        onClick={() => del.mutate({ table, id })}><Trash2 /></Button>
    </span>
  )
}
