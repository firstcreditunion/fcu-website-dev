import { defineType, defineField } from 'sanity'
import { WarningOutlineIcon } from '@sanity/icons'

export const noticeBlock = defineType({
  name: 'noticeBlock',
  title: 'Notice',
  type: 'object',
  icon: WarningOutlineIcon,
  fields: [
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
      initialValue: 'info',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 4,
      description: 'Leave empty to use a shared disclaimer snippet.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { sharedDisclaimer?: { _ref?: string } } | undefined
          if (value || parent?.sharedDisclaimer?._ref) return true
          return 'Add content or select a shared disclaimer snippet'
        }),
    }),
    defineField({
      name: 'sharedDisclaimer',
      title: 'Shared Disclaimer Snippet',
      type: 'reference',
      to: [{ type: 'disclaimerSnippet' }],
      description: 'Optional shared legal/compliance text.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'tone' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Notice',
        subtitle: subtitle || 'info',
      }
    },
  },
})
