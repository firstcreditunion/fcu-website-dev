import { defineType, defineField, defineArrayMember } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
      validation: (rule) => rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const total = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'FAQ',
        subtitle: `${total} question${total === 1 ? '' : 's'}`,
      }
    },
  },
})
