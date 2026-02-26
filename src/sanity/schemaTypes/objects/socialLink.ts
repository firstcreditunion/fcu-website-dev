import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'Threads', value: 'threads' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({ scheme: ['https'] }).error('Must be a valid HTTPS URL'),
    }),
    defineField({
      name: 'label',
      title: 'Accessible Label',
      type: 'string',
      description: 'Screen reader label, e.g. "Follow us on Facebook"',
    }),
  ],
  preview: {
    select: { platform: 'platform', url: 'url' },
    prepare({ platform, url }) {
      return {
        title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Social Link',
        subtitle: url || 'No URL set',
      }
    },
  },
})
