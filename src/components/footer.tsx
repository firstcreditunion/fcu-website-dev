import { sanityFetch } from '@/sanity/lib/live'
import {
  FOOTER_NAVIGATION_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/lib/queries'
import { FooterClient } from './footer-client'

export default async function Footer() {
  const [{ data: footerData }, { data: settingsData }] = await Promise.all([
    sanityFetch({ query: FOOTER_NAVIGATION_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ])

  return <FooterClient footerData={footerData} settingsData={settingsData} />
}
