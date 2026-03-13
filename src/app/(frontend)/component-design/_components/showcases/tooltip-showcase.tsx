'use client'

import * as React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const ALL_SIDES = ['top', 'right', 'bottom', 'left']

interface Props {
  initialConfig: ComponentConfigPayload | null
}

export function TooltipShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'tooltip',
      displayName: 'Tooltip',
      category: 'overlay',
      componentSpecificConfig: { defaultSide: 'top' },
      previewConfig: { previewLabel: 'Hover for more info' },
    },
  )

  const side = (config.componentSpecificConfig?.defaultSide as string) ?? 'top'
  const label = config.previewConfig?.previewLabel ?? 'Hover for more info'

  function updateSpecific(partial: Record<string, unknown>) {
    setConfig((prev) => ({
      ...prev,
      componentSpecificConfig: { ...prev.componentSpecificConfig, ...partial },
    }))
  }

  function updatePreview(
    partial: Partial<NonNullable<ComponentConfigPayload['previewConfig']>>,
  ) {
    setConfig((prev) => ({
      ...prev,
      previewConfig: { ...prev.previewConfig, ...partial },
    }))
  }

  return (
    <PlaygroundShell
      id='ui-tooltip'
      title='Tooltip'
      description='Informational popup on hover. Configurable side and content.'
      category='Overlay'
      config={config}
      onConfigChange={setConfig}
      preview={
        <Tooltip>
          <TooltipTrigger render={<Button variant='outline' />}>
            Hover Me
          </TooltipTrigger>
          <TooltipContent side={side as 'top'}>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      }
      controls={
        <>
          <ControlRow label='Side'>
            <VariantPicker
              options={ALL_SIDES}
              value={side}
              onChange={(v) => updateSpecific({ defaultSide: v })}
            />
          </ControlRow>
          <ControlRow label='Content'>
            <Input
              value={label}
              onChange={(e) => updatePreview({ previewLabel: e.target.value })}
              className='h-8 text-xs'
            />
          </ControlRow>
        </>
      }
    />
  )
}
