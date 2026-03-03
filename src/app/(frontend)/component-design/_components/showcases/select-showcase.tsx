'use client'

import * as React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const ALL_SIZES = ['default', 'sm']

interface Props { initialConfig: ComponentConfigPayload | null }

export function SelectShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'select',
      displayName: 'Select',
      category: 'forms',
      approvedSizes: ALL_SIZES,
      defaultSize: 'default',
    },
  )

  const size = (config.previewConfig?.selectedSize ?? config.defaultSize ?? 'default') as 'default' | 'sm'
  const disabled = config.previewConfig?.previewDisabled ?? false

  function updatePreview(partial: Partial<NonNullable<ComponentConfigPayload['previewConfig']>>) {
    setConfig((prev) => ({ ...prev, previewConfig: { ...prev.previewConfig, ...partial } }))
  }

  return (
    <PlaygroundShell
      id='ui-select'
      title='Select'
      description='Dropdown selection with grouped options. Built on Radix Select primitive.'
      category='Forms'
      config={config}
      onConfigChange={setConfig}
      preview={
        <Select disabled={disabled}>
          <SelectTrigger className='w-[200px]' size={size}>
            <SelectValue placeholder='Select an option' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Accounts</SelectLabel>
              <SelectItem value='everyday'>Everyday Account</SelectItem>
              <SelectItem value='savings'>Savings Account</SelectItem>
              <SelectItem value='term'>Term Deposit</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      }
      controls={
        <>
          <ControlRow label='Size'>
            <VariantPicker options={ALL_SIZES} value={size} onChange={(v) => updatePreview({ selectedSize: v })} approved={config.approvedSizes} />
          </ControlRow>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>Disabled</span>
            <Switch checked={disabled} onCheckedChange={(v) => updatePreview({ previewDisabled: v })} size='sm' />
          </div>
        </>
      }
    />
  )
}
