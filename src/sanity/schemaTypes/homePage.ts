/**
 * PLACEHOLDER SCHEMA - DELETE AND REPLACE WITH PRODUCTION SCHEMA
 *
 * This is a minimal homepage schema for initial deployment testing.
 * Replace with proper content modelling based on design requirements.
 */

import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // PLACEHOLDER FIELDS - Replace with actual content structure
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline for the homepage hero section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the main headline',
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      description: 'Button text for the primary action',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'string',
      description: 'URL for the primary action button',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
