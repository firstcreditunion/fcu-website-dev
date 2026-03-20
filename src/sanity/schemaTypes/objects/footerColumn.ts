import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string',
      description: 'Heading displayed above the links (e.g. "Accounts", "Loans")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({ type: 'footerLink' })],
      validation: (rule) => rule.min(1).error('Add at least one link'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      links: 'links',
    },
    prepare({ title, links }) {
      return {
        title: title || 'Untitled Column',
        subtitle: `${links?.length || 0} link${links?.length === 1 ? '' : 's'}`,
      }
    },
  },
})
