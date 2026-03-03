'use client'

import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const SAMPLE_ITEMS = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)

interface Props { initialConfig: ComponentConfigPayload | null }

export function ScrollAreaShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'scroll-area',
      displayName: 'Scroll Area',
      category: 'layout',
      componentSpecificConfig: { defaultOrientation: 'vertical' },
    },
  )

  const orientation = (config.componentSpecificConfig?.defaultOrientation as string) ?? 'vertical'

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({ ...prev, componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial } }))
  }

  return (
    <PlaygroundShell
      id='ui-scroll-area'
      title='Scroll Area'
      description='Custom-styled scrollable container with thin scrollbar. Vertical or horizontal.'
      category='Layout'
      config={config}
      onConfigChange={setConfig}
      preview={
        orientation === 'vertical' ? (
          <ScrollArea className='h-48 w-48 rounded-md border'>
            <div className='p-4'>
              <h4 className='mb-2 text-sm font-semibold'>Branches</h4>
              {SAMPLE_ITEMS.map((item) => (
                <React.Fragment key={item}>
                  <div className='py-1.5 text-xs'>{item}</div>
                  <Separator />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <ScrollArea className='w-72 whitespace-nowrap rounded-md border'>
            <div className='flex gap-4 p-4'>
              {SAMPLE_ITEMS.map((item) => (
                <div key={item} className='flex size-16 shrink-0 items-center justify-center rounded-md border bg-muted text-xs font-medium'>
                  {item}
                </div>
              ))}
            </div>
          </ScrollArea>
        )
      }
      controls={
        <ControlRow label='Orientation'>
          <VariantPicker options={['vertical', 'horizontal']} value={orientation} onChange={(v) => updateSpecific({ defaultOrientation: v })} />
        </ControlRow>
      }
    />
  )
}
