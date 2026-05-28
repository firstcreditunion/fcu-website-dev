import { defineType, defineField, defineArrayMember } from 'sanity'
import { DashboardIcon } from '@sanity/icons'

export const loanAtAGlanceBlock = defineType({
  name: 'loanAtAGlanceBlock',
  title: 'Loan At A Glance',
  type: 'object',
  icon: DashboardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [defineArrayMember({ type: 'keyValueRow' })],
      validation: (rule) => rule.min(1).max(8),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
