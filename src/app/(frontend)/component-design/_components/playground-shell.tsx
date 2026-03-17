'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { ComponentConfigPayload } from '../_actions/save-component-config'

interface PlaygroundShellProps {
  id: string
  title: string
  description: string
  category?: string
  config: ComponentConfigPayload | null
  onConfigChange: (config: ComponentConfigPayload) => void
  preview: React.ReactNode
  controls: React.ReactNode
  guidelines?: { variant: string; usageNote?: string }[]
}

export function PlaygroundShell({
  id,
  title,
  description,
  category,
  preview,
  controls,
  guidelines,
}: PlaygroundShellProps) {
  return (
    <motion.section
      id={id}
      className='scroll-mt-8 pb-20'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className='mb-6'>
        <div className='mb-2 flex items-center gap-2'>
          <h2 className='text-2xl font-bold tracking-tight text-foreground'>
            {title}
          </h2>
          {category && (
            <Badge variant='secondary' className='text-[10px]'>
              {category}
            </Badge>
          )}
        </div>
        <p className='text-sm leading-relaxed text-muted-foreground'>
          {description}
        </p>
      </div>

      <div className='grid gap-6 lg:grid-cols-[1fr_320px]'>
        <div className='flex min-h-[200px] items-center justify-center rounded-xl border border-border bg-card p-8'>
          {preview}
        </div>

        <div className='rounded-xl border border-border bg-muted/30 p-5'>
          <p className='mb-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
            Controls
          </p>
          <div className='space-y-4'>{controls}</div>
        </div>
      </div>

      {guidelines && guidelines.length > 0 && (
        <div className='mt-4 rounded-xl border border-border bg-muted/20 p-4'>
          <p className='mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
            Usage Guidelines
          </p>
          <div className='space-y-1.5'>
            {guidelines.map((g) => (
              <div key={g.variant} className='flex items-start gap-2 text-xs'>
                <Badge variant='outline' className='shrink-0 text-[10px]'>
                  {g.variant}
                </Badge>
                <span className='text-muted-foreground'>{g.usageNote}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator className='mt-20 bg-border' />
    </motion.section>
  )
}

interface ControlRowProps {
  label: string
  children: React.ReactNode
}

export function ControlRow({ label, children }: ControlRowProps) {
  return (
    <div className='space-y-1.5'>
      <label className='text-xs font-medium text-foreground'>{label}</label>
      {children}
    </div>
  )
}

interface VariantPickerProps {
  options: string[]
  value: string
  onChange: (v: string) => void
  approved?: string[]
  disabled?: string[]
}

export function VariantPicker({
  options,
  value,
  onChange,
  approved,
  disabled,
}: VariantPickerProps) {
  return (
    <div className='flex flex-wrap gap-1.5'>
      {options.map((opt) => {
        const isDisabled = disabled?.includes(opt)
        const isApproved = !approved || approved.includes(opt)
        return (
          <button
            key={opt}
            onClick={() => !isDisabled && onChange(opt)}
            disabled={isDisabled}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
              value === opt
                ? 'border-foreground bg-foreground text-background'
                : isDisabled
                  ? 'cursor-not-allowed border-border bg-muted/50 text-muted-foreground/40 line-through'
                  : isApproved
                    ? 'border-border bg-background text-foreground hover:border-foreground/50'
                    : 'border-dashed border-border bg-background text-muted-foreground hover:border-foreground/30'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
