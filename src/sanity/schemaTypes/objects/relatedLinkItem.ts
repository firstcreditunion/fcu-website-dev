import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const relatedLinkItem = defineType({
  name: 'relatedLinkItem',
  title: 'Related Link Item',
  type: 'object',
  icon: LinkIcon,
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
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'buttonLink',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'link.url',
      external: 'link.externalUrl',
    },
    prepare({ title, subtitle, external }) {
      return {
        title: title || 'Untitled Related Link',
        subtitle: external || subtitle || 'No URL set',
      }
    },
  },
})
