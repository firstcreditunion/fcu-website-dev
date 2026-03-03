import { defineType, defineField } from 'sanity'

export const colorToken = defineType({
  name: 'colorToken',
  title: 'Color Token',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Token Name',
      type: 'string',
      description: 'e.g. fcu-primary-900',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cssVariable',
      title: 'CSS Variable',
      type: 'string',
      description: 'e.g. --color-fcu-primary-900',
    }),
    defineField({
      name: 'oklch',
      title: 'OKLCH Value',
      type: 'string',
      description: 'Raw OKLCH value from globals.css',
    }),
    defineField({
      name: 'hex',
      title: 'Hex Value',
      type: 'string',
      description: 'Computed by culori',
    }),
    defineField({
      name: 'rgb',
      title: 'RGB Value',
      type: 'string',
      description: 'Computed by culori',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'hex' },
  },
})

export const colorPalette = defineType({
  name: 'colorPalette',
  title: 'Color Palette',
  type: 'object',
  fields: [
    defineField({
      name: 'paletteName',
      title: 'Palette Name',
      type: 'string',
      description: 'e.g. fcu-primary',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tokens',
      title: 'Tokens',
      type: 'array',
      of: [{ type: 'colorToken' }],
    }),
  ],
  preview: {
    select: { title: 'paletteName' },
  },
})

export const designTokens = defineType({
  name: 'designTokens',
  title: 'Design Tokens',
  type: 'document',
  fields: [
    defineField({
      name: 'lastSyncedAt',
      title: 'Last Synced',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'palettes',
      title: 'Color Palettes',
      type: 'array',
      of: [{ type: 'colorPalette' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Design Tokens' }),
  },
})
