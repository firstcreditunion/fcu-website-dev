import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const legalFinePrintBlock = defineType({
  name: 'legalFinePrintBlock',
  title: 'Legal Fine Print',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Legal Fine Print' }
    },
  },
})
