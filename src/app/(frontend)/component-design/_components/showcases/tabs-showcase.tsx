'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const LIST_VARIANTS = ['default', 'line']
const ORIENTATIONS = ['horizontal', 'vertical']

interface Props { initialConfig: ComponentConfigPayload | null }

export function TabsShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'tabs',
      displayName: 'Tabs',
      category: 'layout',
      approvedVariants: LIST_VARIANTS,
      defaultVariant: 'default',
      componentSpecificConfig: { defaultOrientation: 'horizontal', defaultListVariant: 'default' },
    },
  )

  const listVariant = (config.componentSpecificConfig?.defaultListVariant as string) ?? 'default'
  const orientation = (config.componentSpecificConfig?.defaultOrientation as string) ?? 'horizontal'

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({ ...prev, componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial } }))
  }

  return (
    <PlaygroundShell
      id='ui-tabs'
      title='Tabs'
      description='Tabbed content with default and line list variants. Supports horizontal and vertical orientation.'
      category='Layout'
      config={config}
      onConfigChange={setConfig}
      preview={
        <div className='w-full max-w-md'>
          <Tabs defaultValue='overview' orientation={orientation as 'horizontal' | 'vertical'}>
            <TabsList variant={listVariant as 'default' | 'line'}>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='features'>Features</TabsTrigger>
              <TabsTrigger value='rates'>Rates</TabsTrigger>
            </TabsList>
            <TabsContent value='overview' className='rounded-lg border p-4 text-sm text-muted-foreground'>
              First Credit Union offers a range of accounts for everyday banking.
            </TabsContent>
            <TabsContent value='features' className='rounded-lg border p-4 text-sm text-muted-foreground'>
              Online banking, mobile app, free transfers between accounts.
            </TabsContent>
            <TabsContent value='rates' className='rounded-lg border p-4 text-sm text-muted-foreground'>
              Competitive interest rates on savings and term deposits.
            </TabsContent>
          </Tabs>
        </div>
      }
      controls={
        <>
          <ControlRow label='List Variant'>
            <VariantPicker options={LIST_VARIANTS} value={listVariant} onChange={(v) => updateSpecific({ defaultListVariant: v })} approved={config.approvedVariants} />
          </ControlRow>
          <ControlRow label='Orientation'>
            <VariantPicker options={ORIENTATIONS} value={orientation} onChange={(v) => updateSpecific({ defaultOrientation: v })} />
          </ControlRow>
        </>
      }
    />
  )
}
