'use client'

import * as React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const ALL_SIDES = ['right', 'left', 'top', 'bottom']

interface Props { initialConfig: ComponentConfigPayload | null }

export function SheetShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'sheet',
      displayName: 'Sheet',
      category: 'overlay',
      componentSpecificConfig: { defaultSide: 'right', showCloseButton: true },
    },
  )

  const side = (config.componentSpecificConfig?.defaultSide as string) ?? 'right'
  const showCloseButton = (config.componentSpecificConfig?.showCloseButton as boolean) ?? true

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({ ...prev, componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial } }))
  }

  return (
    <PlaygroundShell
      id='ui-sheet'
      title='Sheet'
      description='Slide-out panel from any edge. Used for navigation, filters, and detail views.'
      category='Overlay'
      config={config}
      onConfigChange={setConfig}
      preview={
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline'>Open Sheet ({side})</Button>
          </SheetTrigger>
          <SheetContent side={side as 'right'} showCloseButton={showCloseButton}>
            <SheetHeader>
              <SheetTitle>Account Details</SheetTitle>
              <SheetDescription>View and manage your account information.</SheetDescription>
            </SheetHeader>
            <div className='flex-1 px-4 text-sm text-muted-foreground'>
              Sheet body content goes here.
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant='outline'>Close</Button>
              </SheetClose>
              <Button>Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      }
      controls={
        <>
          <ControlRow label='Side'>
            <VariantPicker options={ALL_SIDES} value={side} onChange={(v) => updateSpecific({ defaultSide: v })} />
          </ControlRow>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>Show Close Button</span>
            <Switch checked={showCloseButton} onCheckedChange={(v) => updateSpecific({ showCloseButton: v })} size='sm' />
          </div>
        </>
      }
    />
  )
}
