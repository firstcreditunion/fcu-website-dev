'use client'

import Link from 'next/link'
import { NoiseBackground } from '@/components/aceternity/noise-background'

export function CtaSection() {
  return (
    <section className='relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-t from-fcu-primary-50 via-fcu-primary-50/40 to-white' />

      <div className='relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='mb-4 text-balance text-2xl font-semibold tracking-tight text-fcu-primary-950 md:text-3xl'>
            Ready to separate your bills?
          </h2>
          <p className='mb-8 text-base leading-relaxed text-fcu-primary-800/70'>
            Contact us by phone or visit a branch &mdash; our team will have you
            set up quickly. Call centre hours: Mon&nbsp;10&thinsp;am&ndash;5&thinsp;pm,
            Tue&ndash;Fri&nbsp;8&thinsp;am&ndash;5&thinsp;pm.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            <Link href='/contact'>
              <NoiseBackground
                containerClassName='w-fit rounded-full p-[3px]'
                gradientColors={[
                  'oklch(75.6% 0.138 220.17)',
                  'oklch(47.85% 0.087 220.03)',
                  'oklch(64.66% 0.117 219.68)',
                ]}
                speed={0.06}
                noiseIntensity={0.15}
              >
                <button
                  type='button'
                  className='cursor-pointer rounded-full bg-fcu-primary-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors active:scale-[0.98] hover:bg-fcu-primary-800'
                >
                  Contact us
                </button>
              </NoiseBackground>
            </Link>
            <Link
              href='/branches'
              className='inline-flex items-center rounded-full border border-fcu-primary-900/20 bg-white/60 px-7 py-3.5 text-sm font-semibold text-fcu-primary-900 backdrop-blur-sm transition-colors hover:border-fcu-primary-900/40 hover:bg-white/80'
            >
              Find a branch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
