import { defineType, defineField, defineArrayMember } from 'sanity'
import { BillIcon } from '@sanity/icons'

export const loanExampleBlock = defineType({
  name: 'loanExampleBlock',
  title: 'Loan Example',
  type: 'object',
  icon: BillIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [defineArrayMember({ type: 'keyValueRow' })],
      validation: (rule) => rule.required().min(2).max(20),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
  ],
  preview: {
    select: { title: 'heading' },
  },
})
