import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const loanProductPage = defineType({
  name: 'loanProductPage',
  title: 'Loan Product Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'settings',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'loanProductType',
      title: 'Loan Product Type',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Personal Loan', value: 'personal-loan' },
          {
            title: 'Debt Consolidation Loan',
            value: 'debt-consolidation-loan',
          },
          { title: 'Car Loan', value: 'car-loan' },
          { title: 'Home Loan', value: 'home-loan' },
          { title: 'Travel Loan', value: 'travel-loan' },
          { title: 'Wedding Loan', value: 'wedding-loan' },
          { title: 'Christmas Loan', value: 'christmas-loan' },
          { title: 'Hardship', value: 'hardship' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'other',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Ready', value: 'ready' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'loanPageBuilder',
      group: 'content',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || 'Untitled Loan Product Page',
        subtitle: `${status || 'draft'} ${subtitle ? `• /${subtitle}` : ''}`,
      }
    },
  },
})
