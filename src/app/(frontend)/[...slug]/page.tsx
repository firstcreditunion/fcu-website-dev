import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string[] }>
}

export default async function PlaceholderPage({ params }: Props) {
  const { slug } = await params
  const path = `/${slug.join('/')}`
  const pageTitle = slug[slug.length - 1]
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <main className='flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4'>
      <div className='mx-auto max-w-lg text-center'>
        <div className='mb-6 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600'>
          Placeholder Page
        </div>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          {pageTitle}
        </h1>
        <p className='mt-4 text-base text-gray-500'>
          This page is under construction. The final content for{' '}
          <code className='rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-700'>
            {path}
          </code>{' '}
          will be built out as part of the full site development.
        </p>
        <div className='mt-8'>
          <Link
            href='/'
            className='text-sm font-medium text-blue-600 transition-colors hover:text-blue-700'
          >
            &larr; Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
