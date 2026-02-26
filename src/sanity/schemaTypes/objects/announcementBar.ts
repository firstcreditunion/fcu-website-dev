import { defineType, defineField } from 'sanity'
import { BellIcon } from '@sanity/icons'

export const announcementBar = defineType({
  name: 'announcementBar',
  title: 'Announcement Bar',
  type: 'object',
  icon: BellIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(200).warning('Keep under 200 characters'),
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'Optional CTA text, e.g. "Learn more"',
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'string',
      description: 'Internal path or external URL',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Success', value: 'success' },
          { title: 'Emergency', value: 'emergency' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'dismissible',
      title: 'Dismissible',
      type: 'boolean',
      description: 'Allow users to close the banner',
      initialValue: true,
    }),
    defineField({
      name: 'showOnPages',
      title: 'Show On',
      type: 'string',
      options: {
        list: [
          { title: 'All Pages', value: 'all' },
          { title: 'Homepage Only', value: 'homepage-only' },
        ],
        layout: 'radio',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'Optional: auto-show from this date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'Optional: auto-hide after this date',
    }),
  ],
})
