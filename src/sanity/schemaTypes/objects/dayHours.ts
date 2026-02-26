import { defineType, defineField } from 'sanity'
import { ClockIcon } from '@sanity/icons'

export const dayHours = defineType({
  name: 'dayHours',
  title: 'Day Hours',
  type: 'object',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: {
        list: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
          'Public Holidays',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'openTime',
      title: 'Opening Time',
      type: 'string',
      description: 'e.g. 8:30 AM',
      hidden: ({ parent }) => parent?.isClosed === true,
    }),
    defineField({
      name: 'closeTime',
      title: 'Closing Time',
      type: 'string',
      description: 'e.g. 4:30 PM',
      hidden: ({ parent }) => parent?.isClosed === true,
    }),
    defineField({
      name: 'isClosed',
      title: 'Closed',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { day: 'day', openTime: 'openTime', closeTime: 'closeTime', isClosed: 'isClosed' },
    prepare({ day, openTime, closeTime, isClosed }) {
      return {
        title: day || 'Day',
        subtitle: isClosed ? 'Closed' : `${openTime || '?'} – ${closeTime || '?'}`,
      }
    },
  },
})
