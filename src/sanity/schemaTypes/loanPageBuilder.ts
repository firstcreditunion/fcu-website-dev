import { defineType, defineArrayMember } from 'sanity'

export const loanPageBuilder = defineType({
  name: 'loanPageBuilder',
  title: 'Loan Page Builder',
  type: 'array',
  of: [
    defineArrayMember({ type: 'loanHeroBlock' }),
    defineArrayMember({ type: 'loanAtAGlanceBlock' }),
    defineArrayMember({ type: 'trustStatsBlock' }),
    defineArrayMember({ type: 'featureGridBlock' }),
    defineArrayMember({ type: 'loanExampleBlock' }),
    defineArrayMember({ type: 'ratesFeesBlock' }),
    defineArrayMember({ type: 'noticeBlock' }),
    defineArrayMember({ type: 'faqBlock' }),
    defineArrayMember({ type: 'relatedLinksBlock' }),
    defineArrayMember({ type: 'ctaBarBlock' }),
    defineArrayMember({ type: 'legalFinePrintBlock' }),
  ],
  options: {
    insertMenu: {
      filter: true,
      groups: [
        {
          name: 'hero-summary',
          title: 'Hero & Summary',
          of: ['loanHeroBlock', 'loanAtAGlanceBlock'],
        },
        {
          name: 'content',
          title: 'Content',
          of: ['trustStatsBlock', 'featureGridBlock', 'loanExampleBlock', 'ratesFeesBlock'],
        },
        {
          name: 'compliance-support',
          title: 'Compliance & Support',
          of: ['noticeBlock', 'faqBlock', 'relatedLinksBlock', 'legalFinePrintBlock'],
        },
        {
          name: 'conversion',
          title: 'Conversion',
          of: ['ctaBarBlock'],
        },
      ],
    },
  },
})
