import { defineType, defineField, defineArrayMember } from 'sanity'
import { ThLargeIcon } from '@sanity/icons'

export const featureGridBlock = defineType({
  name: 'featureGridBlock',
  title: 'Feature Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '4',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({ type: 'featureItem' })],
      validation: (rule) => rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const total = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'Feature Grid',
        subtitle: `${total} item${total === 1 ? '' : 's'}`,
      }
    },
  },
})
