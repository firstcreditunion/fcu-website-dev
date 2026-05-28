import { defineType, defineField } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const ctaBarBlock = defineType({
  name: 'ctaBarBlock',
  title: 'CTA Bar',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'primaryAction',
      title: 'Primary Action',
      type: 'buttonLink',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryAction',
      title: 'Secondary Action',
      type: 'buttonLink',
    }),
  ],
  preview: {
    select: { title: 'heading' },
  },
})
