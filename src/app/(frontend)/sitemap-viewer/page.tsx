import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { HEADER_NAVIGATION_QUERY } from '@/sanity/lib/queries'
import { SitemapFlow } from './_components/sitemap-flow'
import type { HeaderNavigation } from './_types'

const readClient = client.withConfig({ token, useCdn: false })

export const metadata = {
  title: 'Sitemap Viewer — First Credit Union',
  description: 'Visual sitemap derived from the Sanity navigation structure',
}

export const dynamic = 'force-dynamic'

export default async function SitemapViewerPage() {
  const navigation = await readClient.fetch<HeaderNavigation | null>(
    HEADER_NAVIGATION_QUERY,
  )

  return <SitemapFlow navigation={navigation} />
}
