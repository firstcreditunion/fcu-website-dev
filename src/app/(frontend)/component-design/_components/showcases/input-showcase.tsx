'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import type { ComponentConfigPayload } from '../../_actions/save-component-config'

const ALL_TYPES = ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date']

interface Props {
  initialConfig: ComponentConfigPayload | null
}

export function InputShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'input',
      displayName: 'Input',
      category: 'forms',
      approvedVariants: ALL_TYPES,
      defaultVariant: 'text',
      componentSpecificConfig: { defaultPlaceholder: 'Type here...' },
    },
  )

  const inputType = config.previewConfig?.selectedVariant ?? config.defaultVariant ?? 'text'
  const placeholder = (config.componentSpecificConfig?.defaultPlaceholder as string) ?? 'Type here...'
  const disabled = config.previewConfig?.previewDisabled ?? false

  function updatePreview(partial: Partial<NonNullable<ComponentConfigPayload['previewConfig']>>) {
    setConfig((prev) => ({
      ...prev,
      previewConfig: { ...prev.previewConfig, ...partial },
    }))
  }

  return (
    <PlaygroundShell
      id='ui-input'
      title='Input'
      description='Text input supporting all HTML input types. Used in forms, search, and data entry.'
      category='Forms'
      config={config}
      onConfigChange={setConfig}
      preview={
        <div className='w-full max-w-sm'>
          <Input
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      }
      controls={
        <>
          <ControlRow label='Type'>
            <VariantPicker
              options={ALL_TYPES}
              value={inputType}
              onChange={(v) => updatePreview({ selectedVariant: v })}
              approved={config.approvedVariants}
            />
          </ControlRow>
          <ControlRow label='Placeholder'>
            <Input
              value={placeholder}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  componentSpecificConfig: {
                    ...prev.componentSpecificConfig,
                    defaultPlaceholder: e.target.value,
                  },
                }))
              }
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
        </>
      }
    />
  )
}
