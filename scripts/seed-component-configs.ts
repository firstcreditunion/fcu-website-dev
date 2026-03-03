/**
 * Seed script — populates Sanity with initial componentConfig documents.
 *
 * Usage:
 *   npx tsx scripts/seed-component-configs.ts
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */

import 'dotenv/config'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-05-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

interface SeedConfig {
  componentName: string
  displayName: string
  category: string
  approvedVariants?: string[]
  disabledVariants?: string[]
  approvedSizes?: string[]
  defaultVariant?: string
  defaultSize?: string
  componentSpecificConfig?: Record<string, unknown>
}

const configs: SeedConfig[] = [
  {
    componentName: 'button',
    displayName: 'Button',
    category: 'actions',
    approvedVariants: ['default', 'outline', 'secondary', 'ghost', 'link'],
    disabledVariants: ['destructive'],
    approvedSizes: ['default', 'sm', 'lg', 'icon'],
    defaultVariant: 'default',
    defaultSize: 'default',
    componentSpecificConfig: { defaultLabel: 'Button', defaultDisabled: false },
  },
  {
    componentName: 'badge',
    displayName: 'Badge',
    category: 'actions',
    approvedVariants: ['default', 'secondary', 'outline'],
    disabledVariants: ['destructive'],
    defaultVariant: 'default',
  },
  {
    componentName: 'input',
    displayName: 'Input',
    category: 'forms',
    approvedVariants: [
      'text',
      'email',
      'password',
      'number',
      'tel',
      'url',
      'search',
      'date',
    ],
    defaultVariant: 'text',
    componentSpecificConfig: { defaultPlaceholder: 'Type here...' },
  },
  {
    componentName: 'select',
    displayName: 'Select',
    category: 'forms',
    approvedSizes: ['default', 'sm'],
    defaultSize: 'default',
  },
  {
    componentName: 'switch',
    displayName: 'Switch',
    category: 'forms',
    approvedSizes: ['default', 'sm'],
    defaultSize: 'default',
  },
  {
    componentName: 'slider',
    displayName: 'Slider',
    category: 'forms',
    componentSpecificConfig: {
      defaultMin: 0,
      defaultMax: 100,
      defaultStep: 1,
      defaultOrientation: 'horizontal',
    },
  },
  {
    componentName: 'label',
    displayName: 'Label',
    category: 'forms',
  },
  {
    componentName: 'card',
    displayName: 'Card',
    category: 'layout',
  },
  {
    componentName: 'separator',
    displayName: 'Separator',
    category: 'layout',
    componentSpecificConfig: { defaultOrientation: 'horizontal' },
  },
  {
    componentName: 'tabs',
    displayName: 'Tabs',
    category: 'layout',
    approvedVariants: ['default', 'line'],
    defaultVariant: 'default',
    componentSpecificConfig: {
      defaultOrientation: 'horizontal',
      defaultListVariant: 'default',
    },
  },
  {
    componentName: 'accordion',
    displayName: 'Accordion',
    category: 'data',
    componentSpecificConfig: {
      defaultType: 'single',
      defaultCollapsible: true,
    },
  },
  {
    componentName: 'table',
    displayName: 'Table',
    category: 'data',
  },
  {
    componentName: 'dialog',
    displayName: 'Dialog',
    category: 'overlay',
    componentSpecificConfig: { showCloseButton: true },
  },
  {
    componentName: 'sheet',
    displayName: 'Sheet',
    category: 'overlay',
    componentSpecificConfig: { defaultSide: 'right', showCloseButton: true },
  },
  {
    componentName: 'tooltip',
    displayName: 'Tooltip',
    category: 'overlay',
    componentSpecificConfig: { defaultSide: 'top' },
  },
  {
    componentName: 'sonner',
    displayName: 'Toast (Sonner)',
    category: 'overlay',
  },
  {
    componentName: 'navigation-menu',
    displayName: 'Navigation Menu',
    category: 'navigation',
    componentSpecificConfig: { defaultViewport: true },
  },
  {
    componentName: 'command',
    displayName: 'Command',
    category: 'navigation',
  },
  {
    componentName: 'scroll-area',
    displayName: 'Scroll Area',
    category: 'layout',
    componentSpecificConfig: { defaultOrientation: 'vertical' },
  },
]

async function seed() {
  console.log(`Seeding ${configs.length} component configs...`)

  const transaction = client.transaction()

  for (const cfg of configs) {
    const doc = {
      _type: 'componentConfig' as const,
      _id: `componentConfig-${cfg.componentName}`,
      ...cfg,
    }
    transaction.createOrReplace(doc)
  }

  const result = await transaction.commit()
  console.log(`Done — ${result.documentIds.length} documents created/replaced.`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
