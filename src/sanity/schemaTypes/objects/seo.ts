import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the page title for search engines. 50–60 characters recommended.',
      validation: (rule) =>
        rule.max(70).warning('SEO titles should be under 60 characters for best results'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Summary shown in search results. 150–160 characters recommended.',
      validation: (rule) =>
        rule.max(200).warning('Meta descriptions should be under 160 characters'),
    }),
    defineField({
      name: 'image',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for Open Graph / Twitter cards. 1200×630 recommended.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'When enabled, search engines will not index this page.',
      initialValue: false,
    }),
  ],
})
