import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const footerNavigation = defineType({
  name: 'footerNavigation',
  title: 'Footer Navigation',
  type: 'document',
  icon: BlockElementIcon,
  fieldsets: [
    {
      name: 'headlineSection',
      title: 'Headline',
      options: { collapsible: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Footer Navigation',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      fieldset: 'headlineSection',
      description:
        'Large text displayed at the top of the footer (e.g. "Your financial future starts here.")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headlineFontSizePreset',
      title: 'Font size',
      type: 'string',
      fieldset: 'headlineSection',
      description:
        'Choose a responsive Tailwind text scale (radio options below). Matches standard text-* utilities.',
      initialValue: 'default',
      options: {
        layout: 'radio',
        list: [
          {
            title: 'XS (text-xs → text-lg)',
            value: 'scale-xs',
          },
          {
            title: 'SM (text-sm → text-xl)',
            value: 'scale-sm',
          },
          {
            title: 'Base (text-base → text-2xl)',
            value: 'scale-md',
          },
          {
            title: 'LG (text-lg → text-3xl)',
            value: 'scale-lg',
          },
          {
            title: 'XL (text-xl → text-4xl)',
            value: 'scale-xl',
          },
          {
            title: '2XL (text-2xl → text-5xl)',
            value: 'scale-2xl',
          },
          {
            title: 'Default (text-3xl → text-6xl)',
            value: 'default',
          },
          {
            title: '4XL (text-4xl → text-7xl)',
            value: 'scale-4xl',
          },
          {
            title: '5XL (text-5xl → text-8xl)',
            value: 'scale-5xl',
          },
          {
            title: 'Hero 6XL (text-6xl → text-9xl)',
            value: 'scale-6xl',
          },
        ],
      },
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      description:
        'Smaller text below the headline (e.g. "Locally owned. Member focused. Since 1952.")',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      description: 'Main call-to-action button in the headline section.',
      fields: [
        defineField({
          name: 'label',
          title: 'Button label',
          type: 'string',
          initialValue: 'Become a Member',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
          initialValue: '/join',
          description: 'Relative path (e.g. /join) or full URL.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in new tab',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      description: 'Optional secondary button shown next to the primary CTA.',
      fields: [
        defineField({
          name: 'label',
          title: 'Button label',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
          description: 'Relative path (e.g. /contact) or full URL.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in new tab',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'columns',
      title: 'Navigation Columns',
      type: 'array',
      of: [defineArrayMember({ type: 'footerColumn' })],
      description:
        'Link columns displayed in the footer (e.g. Accounts, Loans, About, Help)',
      validation: (rule) => rule.min(1).max(6).error('Between 1 and 6 columns'),
    }),
    defineField({
      name: 'newsletterCta',
      title: 'Newsletter Signup',
      type: 'object',
      description:
        'Optional newsletter signup section on the left side of the footer',
      fields: [
        defineField({
          name: 'layout',
          title: 'Layout',
          type: 'string',
          description:
            'Horizontal places heading and input side-by-side. Vertical stacks them.',
          initialValue: 'horizontal',
          options: {
            layout: 'radio',
            direction: 'horizontal',
            list: [
              { title: 'Horizontal (side-by-side)', value: 'horizontal' },
              { title: 'Vertical (stacked)', value: 'vertical' },
            ],
          },
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Stay up to date with FCU.',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'placeholder',
          title: 'Input Placeholder',
          type: 'string',
          initialValue: 'Enter your email address',
        }),
        defineField({
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Subscribe',
          description: 'Used as the aria-label for the submit button',
        }),
        defineField({
          name: 'disclaimer',
          title: 'Disclaimer Text',
          type: 'text',
          rows: 2,
          initialValue:
            '*By completing this form you are signing up to receive our emails and can unsubscribe at any time.',
        }),
      ],
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      description:
        'Display social media icons in the bottom bar (pulled from Site Settings)',
      initialValue: true,
    }),
    defineField({
      name: 'showContactInfo',
      title: 'Show Contact Info',
      type: 'boolean',
      description:
        'Display phone, email, and address in the footer (pulled from Site Settings)',
      initialValue: true,
    }),
    defineField({
      name: 'legalLinks',
      title: 'Additional Legal Links',
      type: 'array',
      of: [defineArrayMember({ type: 'footerLink' })],
      description:
        'Extra compliance links beyond Privacy, Terms, and Disclosure from Site Settings',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer Navigation' }
    },
  },
})
