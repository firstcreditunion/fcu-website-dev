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
