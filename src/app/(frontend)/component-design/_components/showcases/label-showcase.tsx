'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props { initialConfig: ComponentConfigPayload | null }

export function LabelShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'label',
      displayName: 'Label',
      category: 'forms',
      previewConfig: { previewLabel: 'Email Address' },
    },
  )

  const label = config.previewConfig?.previewLabel ?? 'Email Address'
  const disabled = config.previewConfig?.previewDisabled ?? false

  function updatePreview(partial: Partial<NonNullable<ComponentConfigPayload['previewConfig']>>) {
    setConfig((prev) => ({ ...prev, previewConfig: { ...prev.previewConfig, ...partial } }))
  }

  return (
    <PlaygroundShell
      id='ui-label'
      title='Label'
      description='Accessible form label. Automatically handles focus and disabled states via peer selectors.'
      category='Forms'
      config={config}
      onConfigChange={setConfig}
      preview={
        <div className='grid w-full max-w-sm gap-2' data-disabled={disabled || undefined}>
          <Label htmlFor='label-demo'>{label}</Label>
          <Input id='label-demo' placeholder='user@firstcu.co.nz' disabled={disabled} />
        </div>
      }
      controls={
        <>
          <ControlRow label='Label Text'>
            <Input value={label} onChange={(e) => updatePreview({ previewLabel: e.target.value })} className='h-8 text-xs' />
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
