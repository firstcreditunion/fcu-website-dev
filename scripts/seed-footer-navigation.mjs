import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '..', '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    'Missing required env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-01-28',
  useCdn: false,
})

const footerNavigationDoc = {
  _id: 'footerNavigation',
  _type: 'footerNavigation',
  title: 'Footer Navigation',
  headline: 'Your financial future starts here.',
  subheadline: 'Locally owned. Member focused. Since 1952.',
  columns: [
    {
      _key: 'col-accounts',
      _type: 'footerColumn',
      title: 'Accounts',
      links: [
        {
          _key: 'fl-everyday',
          _type: 'footerLink',
          label: 'Everyday Account',
          linkType: 'internal',
          url: '/accounts/everyday',
          openInNewTab: false,
        },
        {
          _key: 'fl-savings',
          _type: 'footerLink',
          label: 'Savings Accounts',
          linkType: 'internal',
          url: '/accounts/savings',
          openInNewTab: false,
        },
        {
          _key: 'fl-billpay',
          _type: 'footerLink',
          label: 'Bill Pay Account',
          linkType: 'internal',
          url: '/accounts/bill-pay',
          openInNewTab: false,
        },
        {
          _key: 'fl-term',
          _type: 'footerLink',
          label: 'Term Deposits',
          linkType: 'internal',
          url: '/accounts/term-deposits',
          openInNewTab: false,
        },
        {
          _key: 'fl-youth',
          _type: 'footerLink',
          label: 'Youth Accounts',
          linkType: 'internal',
          url: '/accounts/youth',
          openInNewTab: false,
        },
      ],
    },
    {
      _key: 'col-loans',
      _type: 'footerColumn',
      title: 'Loans',
      links: [
        {
          _key: 'fl-home',
          _type: 'footerLink',
          label: 'Home Loans',
          linkType: 'internal',
          url: '/loans/home-loans',
          openInNewTab: false,
        },
        {
          _key: 'fl-personal',
          _type: 'footerLink',
          label: 'Personal Loans',
          linkType: 'internal',
          url: '/loans/personal-loans',
          openInNewTab: false,
        },
        {
          _key: 'fl-vehicle',
          _type: 'footerLink',
          label: 'Vehicle Loans',
          linkType: 'internal',
          url: '/loans/vehicle-loans',
          openInNewTab: false,
        },
        {
          _key: 'fl-rates',
          _type: 'footerLink',
          label: 'Interest Rates',
          linkType: 'internal',
          url: '/rates',
          openInNewTab: false,
        },
        {
          _key: 'fl-calc',
          _type: 'footerLink',
          label: 'Loan Calculator',
          linkType: 'internal',
          url: '/tools/loan-calculator',
          openInNewTab: false,
        },
      ],
    },
    {
      _key: 'col-about',
      _type: 'footerColumn',
      title: 'About',
      links: [
        {
          _key: 'fl-about',
          _type: 'footerLink',
          label: 'About Us',
          linkType: 'internal',
          url: '/about',
          openInNewTab: false,
        },
        {
          _key: 'fl-careers',
          _type: 'footerLink',
          label: 'Careers',
          linkType: 'internal',
          url: '/careers',
          openInNewTab: false,
        },
        {
          _key: 'fl-community',
          _type: 'footerLink',
          label: 'Community',
          linkType: 'internal',
          url: '/community',
          openInNewTab: false,
        },
        {
          _key: 'fl-news',
          _type: 'footerLink',
          label: 'News',
          linkType: 'internal',
          url: '/news',
          openInNewTab: false,
        },
        {
          _key: 'fl-contact',
          _type: 'footerLink',
          label: 'Contact Us',
          linkType: 'internal',
          url: '/contact',
          openInNewTab: false,
        },
      ],
    },
    {
      _key: 'col-help',
      _type: 'footerColumn',
      title: 'Help & Support',
      links: [
        {
          _key: 'fl-faq',
          _type: 'footerLink',
          label: 'FAQs',
          linkType: 'internal',
          url: '/help/faqs',
          openInNewTab: false,
        },
        {
          _key: 'fl-security',
          _type: 'footerLink',
          label: 'Security Centre',
          linkType: 'internal',
          url: '/help/security',
          openInNewTab: false,
        },
        {
          _key: 'fl-branches',
          _type: 'footerLink',
          label: 'Find a Branch',
          linkType: 'internal',
          url: '/branches',
          openInNewTab: false,
        },
        {
          _key: 'fl-complaints',
          _type: 'footerLink',
          label: 'Complaints',
          linkType: 'internal',
          url: '/help/complaints',
          openInNewTab: false,
        },
        {
          _key: 'fl-accessibility',
          _type: 'footerLink',
          label: 'Accessibility',
          linkType: 'internal',
          url: '/accessibility',
          openInNewTab: false,
        },
      ],
    },
  ],
  newsletterCta: {
    _type: 'newsletterCta',
    heading: 'Stay up to date with FCU.',
    description:
      'Get the latest news, rates, and financial tips delivered to your inbox.',
    placeholder: 'Enter your email address',
    buttonLabel: 'Subscribe',
    disclaimer:
      '*By completing this form you are signing up to receive our emails and can unsubscribe at any time.',
  },
  appStoreLinks: {
    _type: 'appStoreLinks',
    iosUrl: 'https://apps.apple.com/nz/app/first-credit-union/id1234567890',
    androidUrl:
      'https://play.google.com/store/apps/details?id=nz.co.firstcreditunion',
  },
  showSocialLinks: true,
  showContactInfo: true,
  legalLinks: [
    {
      _key: 'll-sitemap',
      _type: 'footerLink',
      label: 'Sitemap',
      linkType: 'internal',
      url: '/sitemap',
      openInNewTab: false,
    },
    {
      _key: 'll-fscl',
      _type: 'footerLink',
      label: 'FSCL',
      linkType: 'external',
      externalUrl: 'https://www.fscl.org.nz',
      openInNewTab: true,
    },
  ],
}

async function seed() {
  console.log(`Seeding footerNavigation to ${projectId}/${dataset}...`)

  try {
    await client.createOrReplace(footerNavigationDoc)
    console.log('Published document created/replaced.')

    const doc = await client.getDocument('footerNavigation')
    console.log(`Verified: ${doc?.headline} (${doc?._id})`)
    console.log('Footer navigation seeded successfully!')
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()
