import { defineType, defineField } from 'sanity'

export const variantGuideline = defineType({
  name: 'variantGuideline',
  title: 'Variant Guideline',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'colorToken',
      title: 'Color Token',
      type: 'string',
      description: 'Reference to a design token name (e.g. fcu-primary-900)',
    }),
    defineField({
      name: 'usageNote',
      title: 'Usage Note',
      type: 'text',
      rows: 2,
      description: 'When and how to use this variant',
    }),
  ],
  preview: {
    select: { title: 'variant', subtitle: 'usageNote' },
  },
})

export const componentConfig = defineType({
  name: 'componentConfig',
  title: 'Component Config',
  type: 'document',
  fields: [
    defineField({
      name: 'componentName',
      title: 'Component Name',
      type: 'string',
      description: 'Slug identifier, e.g. button',
      validation: (r) => r.required(),
      readOnly: true,
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Human-readable name, e.g. Button',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Actions', value: 'actions' },
          { title: 'Forms', value: 'forms' },
          { title: 'Layout', value: 'layout' },
          { title: 'Overlay', value: 'overlay' },
          { title: 'Navigation', value: 'navigation' },
          { title: 'Data', value: 'data' },
        ],
      },
    }),
    defineField({
      name: 'approvedVariants',
      title: 'Approved Variants',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Variants approved for use in FCU',
    }),
    defineField({
      name: 'disabledVariants',
      title: 'Disabled Variants',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Variants explicitly excluded',
    }),
    defineField({
      name: 'approvedSizes',
      title: 'Approved Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Sizes approved for use',
    }),
    defineField({
      name: 'defaultVariant',
      title: 'Default Variant',
      type: 'string',
    }),
    defineField({
      name: 'defaultSize',
      title: 'Default Size',
      type: 'string',
    }),
    defineField({
      name: 'variantGuidelines',
      title: 'Variant Guidelines',
      type: 'array',
      of: [{ type: 'variantGuideline' }],
    }),
    defineField({
      name: 'componentSpecificConfig',
      title: 'Component-Specific Config',
      type: 'object',
      description: 'Configuration unique to this component type',
      fields: [
        defineField({ name: 'defaultLabel', title: 'Default Label', type: 'string' }),
        defineField({ name: 'defaultDisabled', title: 'Default Disabled', type: 'boolean' }),
        defineField({
          name: 'defaultType',
          title: 'Default Type',
          type: 'string',
          options: { list: ['single', 'multiple'] },
        }),
        defineField({ name: 'defaultCollapsible', title: 'Default Collapsible', type: 'boolean' }),
        defineField({
          name: 'defaultSide',
          title: 'Default Side',
          type: 'string',
          options: { list: ['top', 'right', 'bottom', 'left'] },
        }),
        defineField({
          name: 'defaultOrientation',
          title: 'Default Orientation',
          type: 'string',
          options: { list: ['horizontal', 'vertical'] },
        }),
        defineField({
          name: 'defaultListVariant',
          title: 'Default List Variant',
          type: 'string',
          options: { list: ['default', 'line'] },
        }),
        defineField({ name: 'showCloseButton', title: 'Show Close Button', type: 'boolean' }),
        defineField({ name: 'defaultViewport', title: 'Default Viewport', type: 'boolean' }),
        defineField({ name: 'defaultPlaceholder', title: 'Default Placeholder', type: 'string' }),
        defineField({ name: 'defaultMin', title: 'Default Min', type: 'number' }),
        defineField({ name: 'defaultMax', title: 'Default Max', type: 'number' }),
        defineField({ name: 'defaultStep', title: 'Default Step', type: 'number' }),
      ],
    }),
    defineField({
      name: 'previewConfig',
      title: 'Preview Config',
      type: 'object',
      description: 'Current playground state for persistence',
      fields: [
        defineField({ name: 'selectedVariant', title: 'Selected Variant', type: 'string' }),
        defineField({ name: 'selectedSize', title: 'Selected Size', type: 'string' }),
        defineField({ name: 'previewLabel', title: 'Preview Label', type: 'string' }),
        defineField({ name: 'previewDisabled', title: 'Preview Disabled', type: 'boolean' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'displayName', subtitle: 'category' },
  },
})
