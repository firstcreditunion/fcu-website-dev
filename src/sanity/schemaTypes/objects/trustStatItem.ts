import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const trustStatItem = defineType({
  name: 'trustStatItem',
  title: 'Trust Stat Item',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
