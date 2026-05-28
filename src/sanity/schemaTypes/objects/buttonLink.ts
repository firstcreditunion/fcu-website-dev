import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const buttonLink = defineType({
  name: 'buttonLink',
  title: 'Button Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Internal URL',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined
          if (parent?.linkType !== 'internal') return true
          if (!value) return 'Internal URL is required'
          if (!value.startsWith('/')) return 'Internal URL must start with /'
          return true
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.uri({ scheme: ['https'] }).custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined
          if (parent?.linkType !== 'external') return true
          if (!value) return 'External URL is required'
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      url: 'url',
      externalUrl: 'externalUrl',
    },
    prepare({ title, linkType, url, externalUrl }) {
      const href = linkType === 'external' ? externalUrl : url
      return {
        title: title || 'Untitled Button Link',
        subtitle: href || 'No URL set',
      }
    },
  },
})
