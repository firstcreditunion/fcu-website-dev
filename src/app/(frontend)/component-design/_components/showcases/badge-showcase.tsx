'use client'

import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const ALL_VARIANTS = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']

interface Props {
  initialConfig: ComponentConfigPayload | null
}

export function BadgeShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'badge',
      displayName: 'Badge',
      category: 'actions',
      approvedVariants: ALL_VARIANTS,
      defaultVariant: 'default',
    },
  )

  const variant = (config.previewConfig?.selectedVariant ?? config.defaultVariant ?? 'default') as 'default'
  const label = config.previewConfig?.previewLabel ?? 'Badge'

  function updatePreview(partial: Partial<NonNullable<ComponentConfigPayload['previewConfig']>>) {
    setConfig((prev) => ({
      ...prev,
      previewConfig: { ...prev.previewConfig, ...partial },
    }))
  }

  return (
    <PlaygroundShell
      id='ui-badge'
      title='Badge'
      description='Status indicator with 6 variants. Used for tags, counts, and status labels.'
      category='Actions'
      config={config}
      onConfigChange={setConfig}
      guidelines={config.variantGuidelines?.map((g) => ({
        variant: g.variant,
        usageNote: g.usageNote,
      }))}
      preview={
        <div className='flex flex-wrap items-center gap-3'>
          <Badge variant={variant}>{label}</Badge>
          {ALL_VARIANTS.filter((v) => v !== variant).map((v) => (
            <Badge key={v} variant={v as 'default'} className='opacity-40'>
              {v}
            </Badge>
          ))}
        </div>
      }
      controls={
        <>
          <ControlRow label='Variant'>
            <VariantPicker
              options={ALL_VARIANTS}
              value={variant}
              onChange={(v) => updatePreview({ selectedVariant: v })}
              approved={config.approvedVariants}
              disabled={config.disabledVariants}
            />
          </ControlRow>
          <ControlRow label='Label'>
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
