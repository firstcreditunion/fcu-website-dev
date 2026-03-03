'use client'

import * as React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const SAMPLE_ROWS = [
  { product: 'Everyday Account', rate: '0.10%', minDeposit: '$1', term: 'N/A' },
  { product: 'Savings Account', rate: '4.50%', minDeposit: '$1', term: 'N/A' },
  { product: 'Term Deposit (6mo)', rate: '5.25%', minDeposit: '$5,000', term: '6 months' },
  { product: 'Term Deposit (12mo)', rate: '5.50%', minDeposit: '$5,000', term: '12 months' },
  { product: 'Youth Saver', rate: '3.00%', minDeposit: '$1', term: 'N/A' },
]

interface Props { initialConfig: ComponentConfigPayload | null }

export function TableShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'table',
      displayName: 'Table',
      category: 'data',
    },
  )

  const [showCaption, setShowCaption] = React.useState(true)
  const [rowCount, setRowCount] = React.useState(3)

  return (
    <PlaygroundShell
      id='ui-table'
      title='Table'
      description='Data table with header, body, and optional caption. Composable row and cell structure.'
      category='Data'
      config={config}
      onConfigChange={setConfig}
      preview={
        <div className='w-full max-w-lg'>
          <Table>
            {showCaption && <TableCaption>FCU deposit interest rates — effective March 2026</TableCaption>}
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Min Deposit</TableHead>
                <TableHead>Term</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SAMPLE_ROWS.slice(0, rowCount).map((row) => (
                <TableRow key={row.product}>
                  <TableCell className='font-medium'>{row.product}</TableCell>
                  <TableCell>{row.rate}</TableCell>
                  <TableCell>{row.minDeposit}</TableCell>
                  <TableCell>{row.term}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
      controls={
        <>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>Show Caption</span>
            <Switch checked={showCaption} onCheckedChange={setShowCaption} size='sm' />
          </div>
          <ControlRow label={`Rows (${rowCount})`}>
            <input
              type='range'
              min={1}
              max={5}
              value={rowCount}
              onChange={(e) => setRowCount(Number(e.target.value))}
              className='w-full accent-foreground'
            />
          </ControlRow>
        </>
      }
    />
  )
}
