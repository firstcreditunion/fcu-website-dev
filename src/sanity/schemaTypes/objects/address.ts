import { defineType, defineField } from 'sanity'
import { PinIcon } from '@sanity/icons'

export const address = defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'street',
      title: 'Street Address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'suburb',
      title: 'Suburb',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City / Town',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postcode',
      title: 'Postcode',
      type: 'string',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'e.g. Waikato',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'New Zealand',
    }),
  ],
})
