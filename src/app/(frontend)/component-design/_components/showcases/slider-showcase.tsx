'use client'

import * as React from 'react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props { initialConfig: ComponentConfigPayload | null }

export function SliderShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'slider',
      displayName: 'Slider',
      category: 'forms',
      componentSpecificConfig: { defaultMin: 0, defaultMax: 100, defaultStep: 1, defaultOrientation: 'horizontal' },
    },
  )

  const min = (config.componentSpecificConfig?.defaultMin as number) ?? 0
  const max = (config.componentSpecificConfig?.defaultMax as number) ?? 100
  const step = (config.componentSpecificConfig?.defaultStep as number) ?? 1
  const orientation = (config.componentSpecificConfig?.defaultOrientation as string) ?? 'horizontal'
  const disabled = config.previewConfig?.previewDisabled ?? false
  const [value, setValue] = React.useState([50])

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({
      ...prev,
      componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial },
    }))
  }

  return (
    <PlaygroundShell
      id='ui-slider'
      title='Slider'
      description='Range input control. Supports horizontal/vertical orientation and custom min/max/step.'
      category='Forms'
      config={config}
      onConfigChange={setConfig}
      preview={
        <div className={orientation === 'vertical' ? 'flex h-44 items-center' : 'w-full max-w-sm'}>
          <Slider
            value={value}
            onValueChange={setValue}
            min={min}
            max={max}
            step={step}
            orientation={orientation as 'horizontal' | 'vertical'}
            disabled={disabled}
          />
          <p className='mt-3 text-center text-sm font-medium text-muted-foreground'>{value[0]}</p>
        </div>
      }
      controls={
        <>
          <ControlRow label='Orientation'>
            <VariantPicker options={['horizontal', 'vertical']} value={orientation} onChange={(v) => updateSpecific({ defaultOrientation: v })} />
          </ControlRow>
          <ControlRow label='Min'>
            <Input type='number' value={min} onChange={(e) => updateSpecific({ defaultMin: Number(e.target.value) })} className='h-8 text-xs' />
          </ControlRow>
          <ControlRow label='Max'>
            <Input type='number' value={max} onChange={(e) => updateSpecific({ defaultMax: Number(e.target.value) })} className='h-8 text-xs' />
          </ControlRow>
          <ControlRow label='Step'>
            <Input type='number' value={step} onChange={(e) => updateSpecific({ defaultStep: Number(e.target.value) })} className='h-8 text-xs' />
          </ControlRow>
        </>
      }
    />
  )
}
