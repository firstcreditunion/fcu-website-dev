import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const loanHeroBlock = defineType({
  name: 'loanHeroBlock',
  title: 'Loan Hero',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(420),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Split', value: 'split' },
          { title: 'Full Width', value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'split',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryAction',
      title: 'Primary Action',
      type: 'buttonLink',
    }),
    defineField({
      name: 'secondaryAction',
      title: 'Secondary Action',
      type: 'buttonLink',
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'badge' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Loan Hero',
        subtitle: subtitle || 'Loan Hero',
      }
    },
  },
})
