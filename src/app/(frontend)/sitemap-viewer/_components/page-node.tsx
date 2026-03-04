'use client'

import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { cn } from '@/lib/utils'
import { LEVEL_COLORS, LEVEL_LABELS, type NodeLevel } from '../_types'

export interface PageNodeData {
  label: string
  url: string
  level: NodeLevel
  isExternal?: boolean
  childCount?: number
  [key: string]: unknown
}

function PageNodeComponent({ data, selected }: NodeProps) {
  const d = data as unknown as PageNodeData
  const color = LEVEL_COLORS[d.level] ?? LEVEL_COLORS.page
  const levelLabel = LEVEL_LABELS[d.level] ?? 'Page'

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        className='h-1.5! w-1.5! border-0! bg-transparent!'
      />
      <div
        className={cn(
          'group relative flex min-w-[170px] max-w-[220px] overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-200',
          selected
            ? 'border-primary/50 ring-2 ring-primary/20 shadow-md'
            : 'border-border hover:shadow-md',
          d.level === 'root' && 'min-w-[200px]',
        )}
      >
        {/* Colored left accent */}
        <div
          className='w-1 shrink-0'
          style={{ backgroundColor: color }}
        />

        <div className='flex-1 px-3 py-2.5'>
          {/* Level badge + child count row */}
          <div className='mb-1.5 flex items-center justify-between gap-1.5'>
            <span
              className='inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider'
              style={{
                backgroundColor: `${color}15`,
                color: color,
              }}
            >
              {levelLabel}
            </span>
            <div className='flex items-center gap-1'>
              {d.isExternal && (
                <span className='rounded-md bg-pink-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-pink-600'>
                  EXT
                </span>
              )}
              {typeof d.childCount === 'number' && d.childCount > 0 && (
                <span className='rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-muted-foreground'>
                  {d.childCount}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <p
            className={cn(
              'truncate text-sm font-semibold leading-tight text-foreground',
              d.level === 'root' && 'text-base',
            )}
          >
            {d.label}
          </p>

          {/* URL */}
          <p className='mt-0.5 truncate text-[11px] font-mono text-muted-foreground/70'>
            {d.url}
          </p>
        </div>
      </div>
      <Handle
        type='source'
        position={Position.Bottom}
        className='h-1.5! w-1.5! border-0! bg-transparent!'
      />
    </>
  )
}

export const PageNode = memo(PageNodeComponent)
