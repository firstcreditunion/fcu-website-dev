import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const disputeResolutionScheme = defineType({
  name: 'disputeResolutionScheme',
  title: 'Dispute Resolution Scheme',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'schemeName',
      title: 'Scheme Name',
      type: 'string',
      description: 'e.g. Financial Services Complaints Ltd (FSCL)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'schemeUrl',
      title: 'Scheme Website',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'memberNumber',
      title: 'Membership / Registration Number',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for footer or legal pages',
    }),
  ],
})
