import { defineType, defineField } from 'sanity'
import { WarningOutlineIcon } from '@sanity/icons'

export const disclaimerSnippet = defineType({
  name: 'disclaimerSnippet',
  title: 'Disclaimer Snippet',
  type: 'document',
  icon: WarningOutlineIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Legal', value: 'legal' },
        ],
        layout: 'radio',
      },
      initialValue: 'legal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tone' },
  },
})
