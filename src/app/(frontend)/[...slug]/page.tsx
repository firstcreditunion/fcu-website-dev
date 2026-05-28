import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'
import { sanityFetch } from '@/sanity/lib/live'
import { LOAN_PRODUCT_PAGE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { LoanPageBuilder } from '@/components/loan-page-builder/page-builder'

type Props = {
  params: Promise<{ slug: string[] }>
}

function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

type LoanProductPage = {
  _id: string
  title?: string
  slug?: string
  seo?: {
    title?: string
    description?: string
    noIndex?: boolean
  }
  pageBuilder?: Array<{ _key: string; _type: string; [key: string]: unknown }>
}

async function getLoanProductPage(slugPath: string) {
  const { data } = await sanityFetch({
    query: LOAN_PRODUCT_PAGE_BY_SLUG_QUERY,
    params: { slug: slugPath },
  })
  return data as LoanProductPage | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const slugPath = slug.join('/')
  const loanPage = await getLoanProductPage(slugPath)

  if (!loanPage) {
    return {
      title: formatSegment(slug[slug.length - 1]),
    }
  }

  return {
    title: loanPage.seo?.title || loanPage.title,
    description: loanPage.seo?.description,
    robots: loanPage.seo?.noIndex ? 'noindex, nofollow' : undefined,
  }
}

export default async function PlaceholderPage({ params }: Props) {
  const { slug } = await params
  const slugPath = slug.join('/')
  const loanPage = await getLoanProductPage(slugPath)

  if (loanPage?.pageBuilder?.length) {
    return <LoanPageBuilder blocks={loanPage.pageBuilder} />
  }

  const pageTitle = formatSegment(slug[slug.length - 1])

  const breadcrumbs = slug.map((segment, index) => ({
    label: formatSegment(segment),
    href: '/' + slug.slice(0, index + 1).join('/'),
  }))

  return <ComingSoon title={pageTitle} breadcrumbs={breadcrumbs} />
}
