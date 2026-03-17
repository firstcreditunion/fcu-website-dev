'use client'

import Link from 'next/link'
import { BlurFade } from '@/components/ui/blur-fade'
import { NoiseBackground } from '@/components/aceternity/noise-background'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { DotPattern } from '@/components/ui/dot-pattern'
import { BillVisual } from './bill-visual'

export function HeroSection() {
  return (
    <section className='relative'>
      {/* Radiant-style rounded gradient panel */}
      <div className='absolute inset-2 bottom-0 rounded-4xl bg-linear-135 from-fcu-primary-50 from-28% to-white ring-1 ring-fcu-primary-900/5 ring-inset' />
      {/* <DotPattern className='absolute inset-2 bottom-0 overflow-hidden rounded-4xl opacity-[0.08] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]' /> */}

      {/* Container layout */}
      <div className='relative px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-360'>
          {/* Breadcrumb */}
          <nav
            className='flex flex-wrap items-center gap-1.5 pt-8 text-xs text-fcu-primary-800/50 sm:pt-10'
            aria-label='Breadcrumb'
          >
            <Link
              href='/'
              className='transition-colors hover:text-fcu-primary-900'
            >
              Home
            </Link>
            <span aria-hidden='true' className='opacity-40'>
              /
            </span>
            <Link
              href='/accounts'
              className='transition-colors hover:text-fcu-primary-900'
            >
              Accounts
            </Link>
            <span aria-hidden='true' className='opacity-40'>
              /
            </span>
            <Link
              href='/accounts/transactional-accounts'
              className='transition-colors hover:text-fcu-primary-900'
            >
              Transactional
            </Link>
            <span aria-hidden='true' className='opacity-40'>
              /
            </span>
            <span className='font-medium text-fcu-primary-950'>
              Bill Pay Account
            </span>
          </nav>

          {/* Hero content */}
          <div className='grid items-center gap-16 pt-16 pb-48 sm:pt-24 sm:pb-56 md:pt-32 md:pb-72 lg:grid-cols-2 lg:gap-20'>
            <div>
              <BlurFade delay={0} inView>
                <div className='mb-6 inline-flex items-center rounded-full border border-fcu-secondary-500/30 bg-white/60 px-4 py-1.5 shadow-xs backdrop-blur-sm'>
                  <AnimatedShinyText className='text-xs font-semibold tracking-wide text-fcu-primary-900'>
                    $0 monthly fees
                  </AnimatedShinyText>
                </div>
              </BlurFade>

              <BlurFade delay={0.1} inView>
                <h1 className='text-4xl/[0.95] font-semibold tracking-tight text-balance text-fcu-primary-950 sm:text-5xl/[0.9] md:text-6xl/[0.9]'>
                  Keep your bills separate from&nbsp;your&nbsp;spending
                </h1>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <p className='mt-8 max-w-lg text-xl/7 font-medium text-fcu-primary-800/75 sm:text-2xl/8'>
                  The Bill Pay Account ringfences committed payments &mdash;
                  rent, power, insurance &mdash; so your Everyday Account only
                  shows what&apos;s genuinely free to&nbsp;spend.
                </p>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <div className='mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row'>
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
                        className='cursor-pointer rounded-full bg-fcu-primary-900 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all active:scale-[0.98] hover:bg-fcu-primary-800'
                      >
                        Open an account
                      </button>
                    </NoiseBackground>
                  </Link>
                  <Link
                    href='/branches'
                    className='inline-flex items-center justify-center rounded-full border border-transparent bg-white/15 px-8 py-3.5 text-base font-semibold text-fcu-primary-950 shadow-md ring-1 ring-fcu-primary-900/10 backdrop-blur-sm transition-all hover:bg-white/30 hover:ring-fcu-primary-900/20'
                  >
                    Find a branch
                  </Link>
                </div>
              </BlurFade>
            </div>

            <BlurFade delay={0.4} inView direction='right'>
              <div className='hidden lg:flex lg:justify-end'>
                <BillVisual />
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}
