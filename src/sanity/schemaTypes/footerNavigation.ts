import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const footerNavigation = defineType({
  name: 'footerNavigation',
  title: 'Footer Navigation',
  type: 'document',
  icon: BlockElementIcon,
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
      description: 'Large text displayed at the top of the footer (e.g. "Your financial future starts here.")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      description: 'Smaller text below the headline (e.g. "Locally owned. Member focused. Since 1952.")',
    }),
    defineField({
      name: 'columns',
      title: 'Navigation Columns',
      type: 'array',
      of: [defineArrayMember({ type: 'footerColumn' })],
      description: 'Link columns displayed in the footer (e.g. Accounts, Loans, About, Help)',
      validation: (rule) =>
        rule.min(1).max(5).error('Between 1 and 5 columns'),
    }),
    defineField({
      name: 'newsletterCta',
      title: 'Newsletter Signup',
      type: 'object',
      description: 'Optional newsletter signup section on the left side of the footer',
      fields: [
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
      name: 'appStoreLinks',
      title: 'App Store Links',
      type: 'object',
      description: 'Links to mobile app downloads',
      fields: [
        defineField({
          name: 'iosUrl',
          title: 'iOS App Store URL',
          type: 'url',
          validation: (rule) => rule.uri({ scheme: ['https'] }),
        }),
        defineField({
          name: 'androidUrl',
          title: 'Google Play Store URL',
          type: 'url',
          validation: (rule) => rule.uri({ scheme: ['https'] }),
        }),
      ],
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      description: 'Display social media icons in the bottom bar (pulled from Site Settings)',
      initialValue: true,
    }),
    defineField({
      name: 'showContactInfo',
      title: 'Show Contact Info',
      type: 'boolean',
      description: 'Display phone, email, and address in the footer (pulled from Site Settings)',
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
