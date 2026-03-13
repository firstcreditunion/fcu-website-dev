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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description:
        'Short description shown below the label. Required when this link is inside a Featured Group.',
      validation: (rule) =>
        rule.max(120).warning('Keep under 120 characters for best display'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'Thumbnail image shown alongside the link. Required when this link is inside a Featured Group.',
      options: { hotspot: true },
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
      media: 'image',
    },
    prepare({ title, linkType, url, externalUrl, media }) {
      const href = linkType === 'external' ? externalUrl : url
      return {
        title: title || 'Untitled Link',
        subtitle: href || 'No URL set',
        media,
      }
    },
  },
})
