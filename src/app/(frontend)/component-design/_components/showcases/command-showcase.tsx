'use client'

import * as React from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { PlaygroundShell } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'
import { Calculator, CreditCard, Settings, User } from 'lucide-react'

interface Props { initialConfig: ComponentConfigPayload | null }

export function CommandShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'command',
      displayName: 'Command',
      category: 'navigation',
    },
  )

  return (
    <PlaygroundShell
      id='ui-command'
      title='Command'
      description='Search-driven command palette with grouped items. Built on cmdk.'
      category='Navigation'
      config={config}
      onConfigChange={setConfig}
      preview={
        <Command className='w-full max-w-sm rounded-lg border shadow-md'>
          <CommandInput placeholder='Search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Actions'>
              <CommandItem><Calculator /> Calculator</CommandItem>
              <CommandItem><CreditCard /> Accounts</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Settings'>
              <CommandItem><User /> Profile</CommandItem>
              <CommandItem><Settings /> Preferences</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      }
      controls={
        <p className='text-xs text-muted-foreground'>
          Command palette is compositional — groups, items, and separators are assembled declaratively. Search filtering is built-in via cmdk.
        </p>
      }
    />
  )
}
