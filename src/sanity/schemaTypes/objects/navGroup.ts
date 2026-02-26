import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const navGroup = defineType({
  name: 'navGroup',
  title: 'Navigation Group',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Group Title',
      type: 'string',
      description: 'Column heading in the mega menu (e.g. "Products", "Resources")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
      validation: (rule) => rule.min(1).error('Add at least one link'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Untitled Group',
        subtitle: `${items?.length || 0} link${items?.length === 1 ? '' : 's'}`,
      }
    },
  },
})
