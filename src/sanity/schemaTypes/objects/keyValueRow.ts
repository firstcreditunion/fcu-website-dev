import { defineType, defineField } from 'sanity'
import { ComposeIcon } from '@sanity/icons'

export const keyValueRow = defineType({
  name: 'keyValueRow',
  title: 'Key Value Row',
  type: 'object',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Value',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
})
