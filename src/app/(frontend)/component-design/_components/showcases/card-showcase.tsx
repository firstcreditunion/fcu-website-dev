'use client'

import * as React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

interface Props { initialConfig: ComponentConfigPayload | null }

export function CardShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'card',
      displayName: 'Card',
      category: 'layout',
    },
  )

  const [showHeader, setShowHeader] = React.useState(true)
  const [showDescription, setShowDescription] = React.useState(true)
  const [showFooter, setShowFooter] = React.useState(true)

  return (
    <PlaygroundShell
      id='ui-card'
      title='Card'
      description='Composable container with Header, Title, Description, Content, and Footer slots.'
      category='Layout'
      config={config}
      onConfigChange={setConfig}
      preview={
        <Card className='w-full max-w-sm'>
          {showHeader && (
            <CardHeader>
              <CardTitle>Savings Account</CardTitle>
              {showDescription && (
                <CardDescription>Earn competitive interest on your savings with no monthly fees.</CardDescription>
              )}
            </CardHeader>
          )}
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              Start saving today with as little as $1. Earn up to 4.50% p.a. on balances over $5,000.
            </p>
          </CardContent>
          {showFooter && (
            <CardFooter>
              <Button size='sm'>Open Account</Button>
            </CardFooter>
          )}
        </Card>
      }
      controls={
        <>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>Show Header</span>
            <Switch checked={showHeader} onCheckedChange={setShowHeader} size='sm' />
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>Show Description</span>
            <Switch checked={showDescription} onCheckedChange={setShowDescription} size='sm' />
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>Show Footer</span>
            <Switch checked={showFooter} onCheckedChange={setShowFooter} size='sm' />
          </div>
        </>
      }
    />
  )
}
