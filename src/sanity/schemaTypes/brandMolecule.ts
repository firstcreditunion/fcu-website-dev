// src/sanity/schemaTypes/brandMolecule.ts
import { defineType, defineField, defineArrayMember } from 'sanity'
import { ColorWheelIcon } from '@sanity/icons'
import { COLOR_TOKENS } from '@/components/brand-molecule/lib/molecule-colors'

const colorTokenOptions = COLOR_TOKENS.map((t) => ({ title: t, value: t }))

export const brandMolecule = defineType({
  name: 'brandMolecule',
  title: 'Brand Molecule',
  type: 'document',
  icon: ColorWheelIcon,
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
    defineField({
      name: 'defaultVariant',
      title: 'Live Version',
      type: 'string',
      description: 'Which interaction version visitors see by default. The ?v= query param overrides this for previews.',
      initialValue: 'focus',
      options: {
        list: [
          { title: 'V1 — Focus only', value: 'focus' },
          { title: 'V2 — Focus + click to expand', value: 'expand' },
          { title: 'V3 — Focus + auto-tour', value: 'tour' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'centerKicker', title: 'Center Kicker', type: 'string', initialValue: 'CORE OF BRAND' }),
    defineField({ name: 'centerLabel', title: 'Center Label', type: 'string', initialValue: 'You first', validation: (r) => r.required() }),
    defineField({
      name: 'groups',
      title: 'Groups (exactly 3)',
      type: 'array',
      validation: (r) => r.length(3).error('The molecule needs exactly 3 groups'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'group',
          fields: [
            defineField({ name: 'key', title: 'Key', type: 'slug', validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'colorToken', title: 'Colour', type: 'string', options: { list: colorTokenOptions }, validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'colorToken' } },
        }),
      ],
    }),
    defineField({
      name: 'segments',
      title: 'Segments (exactly 9)',
      type: 'array',
      validation: (r) => r.length(9).error('The molecule needs exactly 9 segments'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'segment',
          fields: [
            defineField({ name: 'key', title: 'Key', type: 'slug', validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Segment Label', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'groupKey',
              title: 'Group',
              type: 'string',
              description: 'Must match a group key above.',
              validation: (rule) =>
                rule.required().custom((val, ctx) => {
                  const keys = ((ctx.document?.groups as Array<{ key?: { current?: string } }>) ?? []).map((g) => g?.key?.current)
                  return !val || keys.includes(val as string) ? true : 'Must match a group key above'
                }),
            }),
            defineField({ name: 'annotationTitle', title: 'Annotation Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'attributes', title: 'Attributes (focus line)', type: 'string', description: 'Short line shown when the segment is focused, e.g. "Honesty · Transparency · Fairness".' }),
            defineField({ name: 'detail', title: 'Detail (expand body)', type: 'array', of: [defineArrayMember({ type: 'block' })], description: 'Richer copy shown in V2 when the segment is clicked.' }),
            defineField({ name: 'colorToken', title: 'Colour', type: 'string', options: { list: colorTokenOptions }, validation: (r) => r.required() }),
            defineField({ name: 'icon', title: 'Icon name', type: 'string', description: 'Optional lucide/tabler icon name shown in the expand card.' }),
          ],
          preview: { select: { title: 'annotationTitle', subtitle: 'groupKey' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Brand Molecule' }) },
})
