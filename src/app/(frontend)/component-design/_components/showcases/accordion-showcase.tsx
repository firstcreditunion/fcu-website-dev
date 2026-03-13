'use client'

import * as React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props { initialConfig: ComponentConfigPayload | null }

export function AccordionShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'accordion',
      displayName: 'Accordion',
      category: 'data',
      componentSpecificConfig: { defaultMultiple: false },
    },
  )

  const multiple = (config.componentSpecificConfig?.defaultMultiple as boolean) ?? false

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({ ...prev, componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial } }))
  }

  return (
    <PlaygroundShell
      id='ui-accordion'
      title='Accordion'
      description='Collapsible content sections. Toggle between single and multiple open items.'
      category='Data'
      config={config}
      onConfigChange={setConfig}
      preview={
        <div className='w-full max-w-md'>
          <Accordion multiple={multiple} defaultValue={[0]} className='w-full'>
            <AccordionItem>
              <AccordionTrigger>What accounts are available?</AccordionTrigger>
              <AccordionContent>
                We offer Everyday, Savings, Term Deposit, and Youth accounts tailored to your needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>How do I apply for a loan?</AccordionTrigger>
              <AccordionContent>
                Apply online through our website or visit any of our branches in the Waikato region.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>What are the membership requirements?</AccordionTrigger>
              <AccordionContent>
                Anyone living or working in the Waikato, Bay of Plenty, or King Country regions can join.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      }
      controls={
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium text-foreground'>Allow Multiple</span>
          <Switch checked={multiple} onCheckedChange={(v) => updateSpecific({ defaultMultiple: v })} size='sm' />
        </div>
      }
    />
  )
}
