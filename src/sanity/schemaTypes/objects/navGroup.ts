import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon, ImageIcon } from '@sanity/icons'

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
      name: 'isFeatured',
      title: 'Featured Group',
      type: 'boolean',
      description:
        'Display links in this group as image cards with thumbnails and descriptions. When enabled, each link requires an image and description.',
      initialValue: false,
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
      isFeatured: 'isFeatured',
    },
    prepare({ title, items, isFeatured }) {
      return {
        title: title || 'Untitled Group',
        subtitle: `${isFeatured ? '★ Featured · ' : ''}${items?.length || 0} link${items?.length === 1 ? '' : 's'}`,
        media: isFeatured ? ImageIcon : BlockElementIcon,
      }
    },
  },
})
