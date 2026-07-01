import { defineType, defineField, defineArrayMember } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export const mainNavItem = defineType({
  name: 'mainNavItem',
  title: 'Main Navigation Item',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Text shown in the navigation bar (e.g. "Loans", "Accounts")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL Path',
      type: 'string',
      description: 'Where the top-level link navigates to (e.g. /loans)',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (value && !value.startsWith('/')) return 'Must start with /'
          return true
        }),
    }),
    defineField({
      name: 'megaMenu',
      title: 'Mega Menu Groups',
      type: 'array',
      of: [defineArrayMember({ type: 'navGroup' })],
      description: 'Leave empty for a simple link without a dropdown menu',
    }),
    defineField({
      name: 'featuredPosition',
      title: 'Featured Group Position',
      type: 'string',
      description: 'Where to place the featured image group in the dropdown',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      hidden: ({ parent }) => {
        const groups = parent?.megaMenu as Array<{ isFeatured?: boolean }> | undefined
        return !groups?.some((g) => g.isFeatured)
      },
    }),
    defineField({
      name: 'introCard',
      title: 'Intro Card',
      type: 'object',
      description: 'Audience intro shown at the left of the mega panel',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'icon', title: 'Icon / Glyph', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({
          name: 'blurb',
          title: 'Blurb',
          type: 'text',
          rows: 2,
          validation: (rule) => rule.max(140),
        }),
      ],
    }),
    defineField({
      name: 'featuredCard',
      title: 'Featured Card',
      type: 'object',
      description: 'Promo card at the right of the mega panel (rate, media, or story)',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          description: 'Small label, e.g. "FEATURED RATE"',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'e.g. "4.85% p.a." or a short promo title',
        }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'string' }),
        defineField({
          name: 'image',
          title: 'Image (optional)',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'link', title: 'Link', type: 'link' }),
      ],
    }),
    defineField({
      name: 'campaignStrip',
      title: 'Campaign Strip',
      type: 'object',
      description: 'Full-width promo strip at the bottom of the mega panel',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
          description: 'e.g. "NEW"',
        }),
        defineField({ name: 'text', title: 'Text', type: 'string' }),
        defineField({ name: 'link', title: 'Link', type: 'link' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      url: 'url',
      megaMenu: 'megaMenu',
    },
    prepare({ title, url, megaMenu }) {
      const hasMega = megaMenu && megaMenu.length > 0
      return {
        title: title || 'Untitled Item',
        subtitle: `${url || ''}${hasMega ? ` — ${megaMenu.length} group${megaMenu.length === 1 ? '' : 's'}` : ''}`,
      }
    },
  },
})
