'use client'

import * as React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props { initialConfig: ComponentConfigPayload | null }

export function NavigationMenuShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'navigation-menu',
      displayName: 'Navigation Menu',
      category: 'navigation',
      componentSpecificConfig: { defaultViewport: true },
    },
  )

  const viewport = (config.componentSpecificConfig?.defaultViewport as boolean) ?? true

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({ ...prev, componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial } }))
  }

  return (
    <PlaygroundShell
      id='ui-navigation-menu'
      title='Navigation Menu'
      description='Top-level navigation with mega-menu dropdown support. Viewport can be toggled.'
      category='Navigation'
      config={config}
      onConfigChange={setConfig}
      preview={
        <NavigationMenu viewport={viewport}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Personal</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid w-[320px] gap-1 p-2'>
                  <NavigationMenuLink>Everyday Accounts</NavigationMenuLink>
                  <NavigationMenuLink>Savings</NavigationMenuLink>
                  <NavigationMenuLink>Home Loans</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Business</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid w-[320px] gap-1 p-2'>
                  <NavigationMenuLink>Business Accounts</NavigationMenuLink>
                  <NavigationMenuLink>Commercial Lending</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      }
      controls={
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium text-foreground'>Use Viewport</span>
          <Switch checked={viewport} onCheckedChange={(v) => updateSpecific({ defaultViewport: v })} size='sm' />
        </div>
      }
    />
  )
}
