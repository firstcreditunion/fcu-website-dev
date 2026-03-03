'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const ALL_VARIANTS = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
const ALL_SIZES = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg']

interface Props {
  initialConfig: ComponentConfigPayload | null
}

export function ButtonShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'button',
      displayName: 'Button',
      category: 'actions',
      approvedVariants: ALL_VARIANTS,
      approvedSizes: ALL_SIZES,
      defaultVariant: 'default',
      defaultSize: 'default',
    },
  )

  const variant = (config.previewConfig?.selectedVariant ?? config.defaultVariant ?? 'default') as 'default'
  const size = (config.previewConfig?.selectedSize ?? config.defaultSize ?? 'default') as 'default'
  const label = config.previewConfig?.previewLabel ?? 'Button'
  const disabled = config.previewConfig?.previewDisabled ?? false
  const [showIcon, setShowIcon] = React.useState(false)

  function update(partial: Partial<ComponentConfigPayload>) {
    setConfig((prev) => ({ ...prev, ...partial }))
  }

  function updatePreview(partial: Partial<NonNullable<ComponentConfigPayload['previewConfig']>>) {
    setConfig((prev) => ({
      ...prev,
      previewConfig: { ...prev.previewConfig, ...partial },
    }))
  }

  return (
    <PlaygroundShell
      id='ui-button'
      title='Button'
      description='Primary action trigger with 6 variants and 8 sizes. Supports icons, disabled state, and asChild composition.'
      category='Actions'
      config={config}
      onConfigChange={setConfig}
      guidelines={config.variantGuidelines?.map((g) => ({
        variant: g.variant,
        usageNote: g.usageNote,
      }))}
      preview={
        <div className='flex flex-wrap items-center gap-3'>
          <Button variant={variant} size={size} disabled={disabled}>
            {showIcon && <ArrowRight />}
            {!size.startsWith('icon') && label}
          </Button>
          {ALL_VARIANTS.filter((v) => v !== variant).map((v) => (
            <Button key={v} variant={v as 'default'} size={size} disabled={disabled} className='opacity-40'>
              {v}
            </Button>
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

          <ControlRow label='Size'>
            <VariantPicker
              options={ALL_SIZES}
              value={size}
              onChange={(v) => updatePreview({ selectedSize: v })}
              approved={config.approvedSizes}
            />
          </ControlRow>

          <ControlRow label='Label'>
            <Input
              value={label}
              onChange={(e) => updatePreview({ previewLabel: e.target.value })}
              className='h-8 text-xs'
            />
          </ControlRow>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>Disabled</span>
            <Switch
              checked={disabled}
              onCheckedChange={(v) => updatePreview({ previewDisabled: v })}
              size='sm'
            />
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>Show Icon</span>
            <Switch checked={showIcon} onCheckedChange={setShowIcon} size='sm' />
          </div>
        </>
      }
    />
  )
}
