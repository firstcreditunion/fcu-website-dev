import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { JsonLd, generateOrganizationSchema } from '@/lib/json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

async function getSettings() {
  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false,
  })
  return data
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()

  if (!settings) {
    return {
      metadataBase: new URL(siteUrl),
      title: 'First Credit Union',
    }
  }

  const titleTemplate = settings.titleTemplate || '%s | First Credit Union'

  const metadata: Metadata = {
    metadataBase: new URL(settings.siteUrl || siteUrl),
    title: {
      template: titleTemplate,
      default: settings.defaultSeoTitle || settings.siteName || 'First Credit Union',
    },
    description: settings.defaultSeoDescription || settings.siteDescription || undefined,
  }

  if (settings.defaultOgImage) {
    metadata.openGraph = {
      images: [
        {
          url: urlFor(settings.defaultOgImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
        },
      ],
    }
  }

  if (settings.twitterHandle || settings.twitterCardType) {
    metadata.twitter = {
      card: settings.twitterCardType === 'summary' ? 'summary' : 'summary_large_image',
      site: settings.twitterHandle || undefined,
    }
  }

  if (settings.noIndexSite) {
    metadata.robots = 'noindex, nofollow'
  }

  const verification: Metadata['verification'] = {}
  if (settings.googleSiteVerification) {
    verification.google = settings.googleSiteVerification
  }
  if (settings.bingSiteVerification) {
    verification.other = { 'msvalidate.01': settings.bingSiteVerification }
  }
  if (verification.google || verification.other) {
    metadata.verification = verification
  }

  return metadata
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSettings()

  const locale = (settings as Record<string, unknown> | null)?.locale
  const lang = typeof locale === 'string' ? locale.split('-')[0] : 'en'

  return (
    <html lang={lang}>
      <body className={poppins.className}>
        {settings?.enableJsonLd && (
          <JsonLd data={generateOrganizationSchema(settings)} />
        )}
        {children}
      </body>
    </html>
  )
}
