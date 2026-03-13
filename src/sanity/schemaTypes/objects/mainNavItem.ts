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
