'use client'

import Link from 'next/link'
import { ArrowLeft, Construction } from 'lucide-react'
import { DotDistortionShader } from '@/components/aceternity/dot-shader'

interface ComingSoonProps {
  title: string
  breadcrumbs?: { label: string; href: string }[]
  description?: string
  isHomepage?: boolean
}

export function ComingSoon({
  title,
  breadcrumbs,
  description,
  isHomepage = false,
}: ComingSoonProps) {
  const desc =
    description ||
    (isHomepage
      ? 'We are building something amazing. Our new website is under development and will be launching soon with a fresh experience for our members.'
      : "This page is under development and will be available soon. We're working hard to bring you the best experience.")

  return (
    <main className='relative min-h-[calc(100vh-72px)] overflow-hidden bg-white'>
      <DotDistortionShader
        dotGap={14}
        dotSize={1}
        dotColor='var(--color-fcu-secondary-500)'
        glowColor='var(--color-fcu-secondary-500)'
        backgroundColor='#ffffff'
        mouseRadius={120}
        distortionStrength={1.2}
        returnSpeed={0.06}
        breathingSpeed={0.8}
        opacity={0.7}
        className='absolute inset-0'
      />

      <div className='relative z-10 flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4'>
        <div className='mx-auto max-w-2xl text-center'>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label='Breadcrumb' className='mb-8'>
              <ol className='flex items-center justify-center gap-1.5 text-sm text-gray-400'>
                <li>
                  <Link
                    href='/'
                    className='transition-colors hover:text-fcu-primary-700'
                  >
                    Home
                  </Link>
                </li>
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.href} className='flex items-center gap-1.5'>
                    <span aria-hidden='true'>/</span>
                    {i === breadcrumbs.length - 1 ? (
                      <span className='font-medium text-fcu-primary-900'>
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className='transition-colors hover:text-fcu-primary-700'
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className='mb-6 inline-flex items-center gap-2 rounded-full bg-fcu-secondary-500 px-4 py-1.5 text-xs font-semibold text-white'>
            <Construction className='h-3.5 w-3.5' />
            {isHomepage ? 'Under Development' : 'Coming Soon'}
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-fcu-primary-900 sm:text-5xl md:text-6xl'>
            {title}
          </h1>

          <p className='mt-6 text-base leading-7 text-fcu-primary-700/70 sm:text-lg'>
            {desc}
          </p>

          {!isHomepage && (
            <div className='mt-10'>
              <Link
                href='/'
                className='group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-5 py-2.5 text-sm font-medium text-fcu-primary-900 backdrop-blur-sm transition-all hover:border-fcu-primary-200 hover:bg-white hover:shadow-sm'
              >
                <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-0.5' />
                Back to Homepage
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
