'use client'

import Link from 'next/link'
import { BlurFade } from '@/components/ui/blur-fade'
import { NoiseBackground } from '@/components/aceternity/noise-background'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { NumberTicker } from '@/components/ui/number-ticker'
import { DotPattern } from '@/components/ui/dot-pattern'
import { BillVisual } from './bill-visual'

export function HeroSection() {
  return (
    <section className='relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-b from-fcu-primary-50 via-fcu-primary-50/50 to-white' />
      <DotPattern className='absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]' />

      <div className='relative mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 md:pb-24 lg:px-8'>
        <nav
          className='mb-8 flex flex-wrap items-center gap-1.5 text-xs text-fcu-primary-800/50 md:mb-12'
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

        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-16'>
          <div>
            <BlurFade delay={0} inView>
              <div className='mb-5 inline-flex items-center rounded-full border border-fcu-secondary-500/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm'>
                <AnimatedShinyText className='text-xs font-semibold tracking-wide text-fcu-primary-900'>
                  $0 monthly fees
                </AnimatedShinyText>
              </div>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <h1 className='mb-4 text-pretty text-4xl font-semibold tracking-tight text-fcu-primary-950 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]'>
                Keep your bills separate from&nbsp;your&nbsp;spending
              </h1>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <p className='mb-8 max-w-lg text-lg leading-relaxed text-fcu-primary-800/80'>
                The Bill Pay Account ringfences committed payments &mdash; rent,
                power, insurance &mdash; so your Everyday Account only shows
                what&apos;s genuinely free to&nbsp;spend.
              </p>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <div className='flex flex-wrap items-center gap-3'>
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
                      className='cursor-pointer rounded-full bg-fcu-primary-900 px-7 py-3 text-sm font-semibold text-white transition-colors active:scale-[0.98] hover:bg-fcu-primary-800'
                    >
                      Open an account
                    </button>
                  </NoiseBackground>
                </Link>
                <Link
                  href='/branches'
                  className='inline-flex items-center rounded-full border border-fcu-primary-900/20 bg-white/60 px-6 py-3 text-sm font-semibold text-fcu-primary-900 backdrop-blur-sm transition-colors hover:border-fcu-primary-900/40 hover:bg-white/80'
                >
                  Find a branch
                </Link>
              </div>
            </BlurFade>
          </div>

          <BlurFade delay={0.4} inView direction='right'>
            <div className='hidden lg:block'>
              <BillVisual />
            </div>
          </BlurFade>
        </div>

        <div className='mt-14 grid grid-cols-3 gap-3 md:mt-20 md:gap-5'>
          {[
            { prefix: '$', value: 0, label: 'Monthly fees', suffix: '' },
            { prefix: '', value: 24, label: 'Hour access', suffix: '/7' },
            { prefix: '$', value: 0, label: 'NZ transfer fees', suffix: '' },
          ].map((stat, i) => (
            <BlurFade key={stat.label} delay={0.5 + i * 0.1} inView>
              <div className='rounded-2xl border border-fcu-primary-200/60 bg-white/70 px-3 py-3.5 text-center backdrop-blur-sm sm:px-5 sm:py-4'>
                <div className='font-mono text-xl font-semibold tabular-nums text-fcu-primary-950 sm:text-2xl md:text-3xl'>
                  {stat.prefix}
                  <NumberTicker
                    value={stat.value}
                    delay={0.6 + i * 0.1}
                    className='text-fcu-primary-950'
                  />
                  {stat.suffix}
                </div>
                <div className='mt-0.5 text-[10px] font-medium text-fcu-primary-800/60 sm:mt-1 sm:text-xs'>
                  {stat.label}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
