import { defineType, defineField, defineArrayMember } from 'sanity'
import { ChartUpwardIcon } from '@sanity/icons'

export const ratesFeesBlock = defineType({
  name: 'ratesFeesBlock',
  title: 'Rates & Fees',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'ratesHeading',
      title: 'Rates Section Heading',
      type: 'string',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'rates',
      title: 'Rates',
      type: 'array',
      of: [defineArrayMember({ type: 'keyValueRow' })],
      validation: (rule) => rule.min(1).max(16),
    }),
    defineField({
      name: 'feesHeading',
      title: 'Fees Section Heading',
      type: 'string',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'fees',
      title: 'Fees',
      type: 'array',
      of: [defineArrayMember({ type: 'keyValueRow' })],
      validation: (rule) => rule.min(1).max(16),
    }),
  ],
  preview: {
    select: { title: 'heading' },
  },
})
