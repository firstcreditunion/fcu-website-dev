/**
 * PLACEHOLDER PAGE - Delete and replace with production homepage
 *
 * This is a minimal homepage for initial deployment testing.
 * Replace with proper components and design implementation.
 */

import { sanityFetch } from '@/sanity/lib/live'
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function Home() {
  const { data: homepage } = await sanityFetch({ query: HOMEPAGE_QUERY })

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-zinc-900'>
      {/* PLACEHOLDER HERO - Replace with production component */}
      <div className='mx-auto max-w-3xl text-center'>
        <h1 className='text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-white'>
          {homepage?.title ?? 'Welcome to First Credit Union'}
        </h1>

        {homepage?.subtitle && (
          <p className='mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300'>
            {homepage.subtitle}
          </p>
        )}

        {homepage?.ctaText && homepage?.ctaLink && (
          <div className='mt-10'>
            <Link
              href={homepage.ctaLink}
              className='rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            >
              {homepage.ctaText}
            </Link>
          </div>
        )}

        {/* PLACEHOLDER: Studio link for easy access during development */}
        <p className='mt-16 text-sm text-zinc-400'>
          <Link href='/studio' className='underline hover:text-zinc-600'>
            Open Sanity Studio
          </Link>{' '}
          to edit this content
        </p>
      </div>
    </main>
  )
}
