'use client'

import * as React from 'react'
import { Separator } from '@/components/ui/separator'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props { initialConfig: ComponentConfigPayload | null }

export function SeparatorShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'separator',
      displayName: 'Separator',
      category: 'layout',
      componentSpecificConfig: { defaultOrientation: 'horizontal' },
    },
  )

  const orientation = (config.componentSpecificConfig?.defaultOrientation as string) ?? 'horizontal'

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({ ...prev, componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial } }))
  }

  return (
    <PlaygroundShell
      id='ui-separator'
      title='Separator'
      description='Visual divider between content sections. Horizontal or vertical orientation.'
      category='Layout'
      config={config}
      onConfigChange={setConfig}
      preview={
        orientation === 'horizontal' ? (
          <div className='w-full max-w-sm space-y-3'>
            <p className='text-sm text-foreground'>Section A</p>
            <Separator orientation='horizontal' />
            <p className='text-sm text-foreground'>Section B</p>
          </div>
        ) : (
          <div className='flex h-12 items-center gap-4'>
            <span className='text-sm text-foreground'>Left</span>
            <Separator orientation='vertical' />
            <span className='text-sm text-foreground'>Right</span>
          </div>
        )
      }
      controls={
        <ControlRow label='Orientation'>
          <VariantPicker options={['horizontal', 'vertical']} value={orientation} onChange={(v) => updateSpecific({ defaultOrientation: v })} />
        </ControlRow>
      }
    />
  )
}
