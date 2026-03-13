'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props {
  initialConfig: ComponentConfigPayload | null
}

export function DialogShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'dialog',
      displayName: 'Dialog',
      category: 'overlay',
      componentSpecificConfig: { showCloseButton: true },
    },
  )

  const showCloseButton =
    (config.componentSpecificConfig?.showCloseButton as boolean) ?? true

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({
      ...prev,
      componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial },
    }))
  }

  return (
    <PlaygroundShell
      id='ui-dialog'
      title='Dialog'
      description='Modal dialog with overlay. Includes header, footer, close button, and focus trap.'
      category='Overlay'
      config={config}
      onConfigChange={setConfig}
      preview={
        <Dialog>
          <DialogTrigger>
            <Button variant='outline'>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent
            showCloseButton={showCloseButton}
            className='sm:max-w-[425px]'
          >
            <DialogHeader>
              <DialogTitle>Contact Us</DialogTitle>
              <DialogDescription>
                Send us a message and we will get back to you within 24 hours.
              </DialogDescription>
            </DialogHeader>
            <div className='py-4 text-sm text-muted-foreground'>
              Dialog content area — forms, messages, or confirmations go here.
            </div>
            <DialogFooter>
              <DialogClose >
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
      controls={
        <>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>
              Show Close Button
            </span>
            <Switch
              checked={showCloseButton}
              onCheckedChange={(v) => updateSpecific({ showCloseButton: v })}
              size='sm'
            />
          </div>
        </>
      }
    />
  )
}
