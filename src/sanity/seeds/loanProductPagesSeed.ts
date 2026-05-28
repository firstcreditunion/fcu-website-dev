type SeedBlock = {
  _type: string
  _key: string
  [key: string]: unknown
}

type LoanProductSeedDocument = {
  _id: string
  _type: 'loanProductPage'
  title: string
  slug: { _type: 'slug'; current: string }
  loanProductType: string
  status: 'draft' | 'ready' | 'published'
  pageBuilder: SeedBlock[]
  seo: {
    _type: 'seo'
    title: string
    description: string
    noIndex: boolean
  }
}

const COMMON_NOTICE: SeedBlock = {
  _type: 'noticeBlock',
  _key: 'notice-responsible-lending',
  tone: 'legal',
  title: 'Responsible lending',
  content:
    'You are protected by responsible lending laws. Before borrowing, review the Responsible Borrowing Code and make sure repayments are affordable.',
}

const COMMON_CTA: SeedBlock = {
  _type: 'ctaBarBlock',
  _key: 'cta-contact',
  heading: 'Ready to take the next step?',
  description: 'Apply online in minutes or contact our team for help choosing the right loan option.',
  primaryAction: {
    _type: 'buttonLink',
    label: 'Apply online',
    linkType: 'internal',
    url: '/loans/loan-application',
    openInNewTab: false,
  },
  secondaryAction: {
    _type: 'buttonLink',
    label: 'Contact us',
    linkType: 'internal',
    url: '/contact',
    openInNewTab: false,
  },
}

function createSeedDocument(config: {
  title: string
  slug: string
  productType: string
  summary: string
}): LoanProductSeedDocument {
  return {
    _id: `loan-product-page-${config.slug}`,
    _type: 'loanProductPage',
    title: config.title,
    slug: { _type: 'slug', current: config.slug },
    loanProductType: config.productType,
    status: 'draft',
    pageBuilder: [
      {
        _type: 'loanHeroBlock',
        _key: 'hero',
        badge: 'Loan product',
        headline: config.title,
        summary: config.summary,
        layout: 'split',
        primaryAction: {
          _type: 'buttonLink',
          label: 'Apply now',
          linkType: 'internal',
          url: '/loans/loan-application',
          openInNewTab: false,
        },
      },
      {
        _type: 'featureGridBlock',
        _key: 'features',
        heading: 'Why First Credit Union',
        columns: '4',
        items: [
          {
            _type: 'featureItem',
            _key: 'feature-1',
            title: 'No application fee',
            description: 'No application fee for eligible loan products.',
          },
          {
            _type: 'featureItem',
            _key: 'feature-2',
            title: 'Flexible repayments',
            description: 'Choose a repayment frequency that fits your pay cycle.',
          },
        ],
      },
      COMMON_NOTICE,
      COMMON_CTA,
      {
        _type: 'legalFinePrintBlock',
        _key: 'legal',
        content:
          'Normal lending criteria, interest rates, and terms apply. Rates and fees can change. Review full product disclosure before applying.',
      },
    ],
    seo: {
      _type: 'seo',
      title: config.title,
      description: config.summary,
      noIndex: false,
    },
  }
}

export const loanProductPageSeedDocuments: LoanProductSeedDocument[] = [
  createSeedDocument({
    title: 'Home Loans',
    slug: 'loans/products/home-loan',
    productType: 'home-loan',
    summary:
      'Home loans with competitive rates and flexible repayment options for owner-occupied homes.',
  }),
  createSeedDocument({
    title: 'Travel Loan',
    slug: 'loans/products/travel-loan',
    productType: 'travel-loan',
    summary: 'Finance your next holiday and repay over time with a flexible travel loan.',
  }),
  createSeedDocument({
    title: 'Wedding Loan',
    slug: 'loans/products/wedding-loan',
    productType: 'wedding-loan',
    summary: 'Spread wedding costs with flexible terms and no application fee.',
  }),
  createSeedDocument({
    title: 'Christmas Loan',
    slug: 'loans/products/christmas-loan',
    productType: 'christmas-loan',
    summary: 'Cover festive season expenses with manageable repayments.',
  }),
  createSeedDocument({
    title: 'Hardship Support',
    slug: 'loans/hardship',
    productType: 'hardship',
    summary:
      'Support options for members experiencing financial hardship. Contact us early for more options.',
  }),
]
