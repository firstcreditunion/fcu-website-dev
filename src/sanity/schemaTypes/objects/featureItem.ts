import { defineType, defineField } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature Item',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(220),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})
