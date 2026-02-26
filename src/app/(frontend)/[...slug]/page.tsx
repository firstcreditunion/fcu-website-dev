import { ComingSoon } from '@/components/coming-soon'

type Props = {
  params: Promise<{ slug: string[] }>
}

function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default async function PlaceholderPage({ params }: Props) {
  const { slug } = await params

  const pageTitle = formatSegment(slug[slug.length - 1])

  const breadcrumbs = slug.map((segment, index) => ({
    label: formatSegment(segment),
    href: '/' + slug.slice(0, index + 1).join('/'),
  }))

  return <ComingSoon title={pageTitle} breadcrumbs={breadcrumbs} />
}
