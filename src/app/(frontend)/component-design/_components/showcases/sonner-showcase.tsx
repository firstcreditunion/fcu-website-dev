'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { PlaygroundShell, ControlRow } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props { initialConfig: ComponentConfigPayload | null }

export function SonnerShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'sonner',
      displayName: 'Toast (Sonner)',
      category: 'overlay',
    },
  )

  return (
    <PlaygroundShell
      id='ui-sonner'
      title='Toast (Sonner)'
      description='Non-blocking notification toasts. Five types: default, success, error, warning, info.'
      category='Overlay'
      config={config}
      onConfigChange={setConfig}
      preview={
        <div className='flex flex-wrap gap-2'>
          <Button variant='outline' size='sm' onClick={() => toast('Default notification')}>
            Default
          </Button>
          <Button variant='outline' size='sm' onClick={() => toast.success('Action completed')}>
            Success
          </Button>
          <Button variant='outline' size='sm' onClick={() => toast.error('Something went wrong')}>
            Error
          </Button>
          <Button variant='outline' size='sm' onClick={() => toast.warning('Please review your input')}>
            Warning
          </Button>
          <Button variant='outline' size='sm' onClick={() => toast.info('New rates available')}>
            Info
          </Button>
        </div>
      }
      controls={
        <p className='text-xs text-muted-foreground'>
          Click the buttons in the preview to trigger each toast type. Toast appearance is controlled globally via the Toaster component in the root layout.
        </p>
      }
    />
  )
}
