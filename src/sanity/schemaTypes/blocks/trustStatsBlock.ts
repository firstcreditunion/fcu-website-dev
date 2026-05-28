import { defineType, defineField, defineArrayMember } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const trustStatsBlock = defineType({
  name: 'trustStatsBlock',
  title: 'Trust Stats',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({ type: 'trustStatItem' })],
      validation: (rule) => rule.required().min(2).max(6),
    }),
  ],
  preview: {
    select: { title: 'heading', count: 'items' },
    prepare({ title, count }) {
      const total = Array.isArray(count) ? count.length : 0
      return {
        title: title || 'Trust Stats',
        subtitle: `${total} item${total === 1 ? '' : 's'}`,
      }
    },
  },
})
