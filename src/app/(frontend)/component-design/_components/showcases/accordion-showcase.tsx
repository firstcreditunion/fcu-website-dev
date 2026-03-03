'use client'

import * as React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props { initialConfig: ComponentConfigPayload | null }

export function AccordionShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'accordion',
      displayName: 'Accordion',
      category: 'data',
      componentSpecificConfig: { defaultType: 'single', defaultCollapsible: true },
    },
  )

  const type = (config.componentSpecificConfig?.defaultType as string) ?? 'single'
  const collapsible = (config.componentSpecificConfig?.defaultCollapsible as boolean) ?? true

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({ ...prev, componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial } }))
  }

  const accordionProps = type === 'single'
    ? { type: 'single' as const, collapsible, defaultValue: 'item-1' }
    : { type: 'multiple' as const, defaultValue: ['item-1'] }

  return (
    <PlaygroundShell
      id='ui-accordion'
      title='Accordion'
      description='Collapsible content sections. Single or multiple mode with optional collapse-all.'
      category='Data'
      config={config}
      onConfigChange={setConfig}
      preview={
        <div className='w-full max-w-md'>
          <Accordion {...accordionProps} className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>What accounts are available?</AccordionTrigger>
              <AccordionContent>
                We offer Everyday, Savings, Term Deposit, and Youth accounts tailored to your needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>How do I apply for a loan?</AccordionTrigger>
              <AccordionContent>
                Apply online through our website or visit any of our branches in the Waikato region.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>What are the membership requirements?</AccordionTrigger>
              <AccordionContent>
                Anyone living or working in the Waikato, Bay of Plenty, or King Country regions can join.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      }
      controls={
        <>
          <ControlRow label='Type'>
            <VariantPicker options={['single', 'multiple']} value={type} onChange={(v) => updateSpecific({ defaultType: v })} />
          </ControlRow>
          {type === 'single' && (
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium text-foreground'>Collapsible</span>
              <Switch checked={collapsible} onCheckedChange={(v) => updateSpecific({ defaultCollapsible: v })} size='sm' />
            </div>
          )}
        </>
      }
    />
  )
}
