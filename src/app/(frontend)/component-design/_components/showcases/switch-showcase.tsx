'use client'

import * as React from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const ALL_SIZES = ['default', 'sm']

interface Props { initialConfig: ComponentConfigPayload | null }

export function SwitchShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'switch',
      displayName: 'Switch',
      category: 'forms',
      approvedSizes: ALL_SIZES,
      defaultSize: 'default',
    },
  )

  const size = (config.previewConfig?.selectedSize ?? config.defaultSize ?? 'default') as 'default' | 'sm'
  const disabled = config.previewConfig?.previewDisabled ?? false
  const [checked, setChecked] = React.useState(false)

  function updatePreview(partial: Partial<NonNullable<ComponentConfigPayload['previewConfig']>>) {
    setConfig((prev) => ({ ...prev, previewConfig: { ...prev.previewConfig, ...partial } }))
  }

  return (
    <PlaygroundShell
      id='ui-switch'
      title='Switch'
      description='Toggle control for binary settings. Two sizes available.'
      category='Forms'
      config={config}
      onConfigChange={setConfig}
      preview={
        <div className='flex items-center gap-3'>
          <Switch checked={checked} onCheckedChange={setChecked} size={size} disabled={disabled} id='switch-demo' />
          <Label htmlFor='switch-demo'>{checked ? 'On' : 'Off'}</Label>
        </div>
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
