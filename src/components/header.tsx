import { sanityFetch } from '@/sanity/lib/live'
import { HEADER_NAVIGATION_QUERY } from '@/sanity/lib/queries'
import { HeaderClient } from '@/components/header-client'

export default async function Header() {
  const { data } = await sanityFetch({ query: HEADER_NAVIGATION_QUERY })
  return <HeaderClient data={data} />
}
