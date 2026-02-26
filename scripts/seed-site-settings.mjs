import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '..', '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_DEVELOPER_TOKEN
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.firstcreditunion.co.nz'

if (!projectId || !dataset || !token) {
  console.error('Missing required env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_DEVELOPER_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-01-28',
  useCdn: false,
})

const siteSettingsDoc = {
  _id: 'siteSettings',
  _type: 'siteSettings',

  // General
  siteName: 'First Credit Union',
  siteTagline: 'Banking for people, not profit',
  siteDescription:
    'First Credit Union is a member-owned financial cooperative based in Hamilton, New Zealand. We provide personal banking, loans, savings, and insurance services.',
  siteUrl: siteUrl,
  logoAlt: 'First Credit Union logo',
  locale: 'en-NZ',
  currency: 'NZD',
  dateFormat: 'DD/MM/YYYY',
  timezone: 'Pacific/Auckland',

  // SEO
  titleTemplate: '%s | First Credit Union',
  defaultSeoTitle: 'First Credit Union | Hamilton NZ',
  defaultSeoDescription:
    'First Credit Union is a member-owned credit union in Hamilton, New Zealand offering personal banking, loans, savings, and insurance.',
  twitterCardType: 'summary_large_image',
  noIndexSite: true,
  enableJsonLd: true,

  // Analytics
  enableAnalytics: false,

  // Contact
  primaryPhone: '+64 7 834 2845',
  tollFreePhone: '0800 432 000',
  primaryEmail: 'info@firstcreditunion.co.nz',
  headOfficeAddress: {
    _type: 'address',
    street: '95 Anglesea Street',
    city: 'Hamilton',
    postcode: '3204',
    region: 'Waikato',
    country: 'New Zealand',
  },
  businessHours: [
    { _key: 'mon', _type: 'dayHours', day: 'Monday', openTime: '8:30 AM', closeTime: '4:30 PM', isClosed: false },
    { _key: 'tue', _type: 'dayHours', day: 'Tuesday', openTime: '8:30 AM', closeTime: '4:30 PM', isClosed: false },
    { _key: 'wed', _type: 'dayHours', day: 'Wednesday', openTime: '8:30 AM', closeTime: '4:30 PM', isClosed: false },
    { _key: 'thu', _type: 'dayHours', day: 'Thursday', openTime: '8:30 AM', closeTime: '4:30 PM', isClosed: false },
    { _key: 'fri', _type: 'dayHours', day: 'Friday', openTime: '8:30 AM', closeTime: '4:30 PM', isClosed: false },
    { _key: 'sat', _type: 'dayHours', day: 'Saturday', openTime: '9:00 AM', closeTime: '12:00 PM', isClosed: false },
    { _key: 'sun', _type: 'dayHours', day: 'Sunday', isClosed: true },
  ],

  // Compliance
  registeredName: 'First Credit Union Incorporated',
  fspNumber: 'FSP8563',
  regulatoryBody: 'Regulated by the Reserve Bank of New Zealand',
  copyrightNotice: 'Copyright {year} First Credit Union. All rights reserved.',
  disputeResolutionScheme: {
    _type: 'disputeResolutionScheme',
    schemeName: 'Financial Services Complaints Ltd (FSCL)',
    schemeUrl: 'https://www.fscl.org.nz',
    description: 'If we cannot resolve your complaint, you can contact FSCL, our independent dispute resolution scheme.',
  },

  // Social
  socialLinks: [
    { _key: 'fb', _type: 'socialLink', platform: 'facebook', url: 'https://www.facebook.com/FirstCreditUnionNZ', label: 'Follow us on Facebook' },
    { _key: 'ig', _type: 'socialLink', platform: 'instagram', url: 'https://www.instagram.com/firstcreditunion', label: 'Follow us on Instagram' },
    { _key: 'li', _type: 'socialLink', platform: 'linkedin', url: 'https://www.linkedin.com/company/first-credit-union', label: 'Connect on LinkedIn' },
  ],

  // Appearance
  headerStyle: 'sticky',
  footerStyle: 'standard',
  enableDarkMode: false,

  // Advanced
  maintenanceMode: false,

  // Cookie consent
  cookieConsentEnabled: true,
  cookieConsentMessage: 'We use cookies to improve your experience on our website. By continuing to browse, you agree to our use of cookies.',
}

async function seed() {
  console.log(`Seeding siteSettings to ${projectId}/${dataset}...`)

  try {
    await client.createOrReplace(siteSettingsDoc)
    console.log('Draft created/replaced.')

    await client
      .patch(`drafts.siteSettings`)
      .set({})
      .commit()
      .catch(() => {})

    const publishId = 'siteSettings'
    await client.createOrReplace({ ...siteSettingsDoc, _id: publishId })
    console.log('Published document created/replaced.')

    // Verify
    const doc = await client.getDocument('siteSettings')
    console.log(`Verified: ${doc?.siteName} (${doc?._id})`)
    console.log('Site settings seeded successfully!')
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()
