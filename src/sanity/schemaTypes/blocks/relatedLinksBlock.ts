import { defineType, defineField, defineArrayMember } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const relatedLinksBlock = defineType({
  name: 'relatedLinksBlock',
  title: 'Related Links',
  type: 'object',
  icon: LinkIcon,
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
      of: [defineArrayMember({ type: 'relatedLinkItem' })],
      validation: (rule) => rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const total = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'Related Links',
        subtitle: `${total} link${total === 1 ? '' : 's'}`,
      }
    },
  },
})
