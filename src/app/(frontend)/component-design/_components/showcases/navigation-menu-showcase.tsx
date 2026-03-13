'use client'

import * as React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { PlaygroundShell } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props { initialConfig: ComponentConfigPayload | null }

export function NavigationMenuShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'navigation-menu',
      displayName: 'Navigation Menu',
      category: 'navigation',
      componentSpecificConfig: {},
    },
  )

  return (
    <PlaygroundShell
      id='ui-navigation-menu'
      title='Navigation Menu'
      description='Top-level navigation with mega-menu dropdown support.'
      category='Navigation'
      config={config}
      onConfigChange={setConfig}
      preview={
        <NavigationMenu>
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
      controls={null}
    />
  )
}
