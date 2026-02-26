import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL Path',
      type: 'string',
      description: 'Relative path e.g. /loans/products/personal-loan',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown> | undefined
          if (parent?.linkType !== 'internal') return true
          if (!value) return 'URL is required for internal links'
          if (!value.startsWith('/')) return 'Internal URLs must start with /'
          return true
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).custom((value, context) => {
          const parent = context.parent as Record<string, unknown> | undefined
          if (parent?.linkType !== 'external') return true
          if (!value) return 'URL is required for external links'
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
        title: title || 'Untitled Link',
        subtitle: href || 'No URL set',
      }
    },
  },
})
