import { defineType, defineField, defineArrayMember } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export const headerNavigation = defineType({
  name: 'headerNavigation',
  title: 'Header Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Header Navigation',
    }),
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [defineArrayMember({ type: 'mainNavItem' })],
      description:
        'Top-level navigation items displayed in the header bar. Each item can optionally include a mega menu dropdown.',
      validation: (rule) => rule.min(1).error('At least one navigation item is required'),
    }),
    defineField({
      name: 'utilityNav',
      title: 'Utility Navigation',
      type: 'object',
      description: 'Action buttons and search displayed on the right side of the header',
      fields: [
        defineField({
          name: 'primaryAction',
          title: 'Primary Action (CTA Button)',
          type: 'object',
          description: 'Prominent call-to-action button (e.g. "Apply for Loan")',
          fields: [
            defineField({
              name: 'label',
              title: 'Button Label',
              type: 'string',
              initialValue: 'Apply for Loan',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              initialValue: '/loans/loan-application',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'secondaryAction',
          title: 'Secondary Action (Login Button)',
          type: 'object',
          description: 'Secondary action button (e.g. "Login")',
          fields: [
            defineField({
              name: 'label',
              title: 'Button Label',
              type: 'string',
              initialValue: 'Login',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'External login URL (e.g. internet banking)',
              validation: (rule) => rule.uri({ scheme: ['https'] }),
            }),
          ],
        }),
        defineField({
          name: 'showSearch',
          title: 'Show Search',
          type: 'boolean',
          initialValue: true,
          description: 'Display the search icon in the header',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Header Navigation' }
    },
  },
})
