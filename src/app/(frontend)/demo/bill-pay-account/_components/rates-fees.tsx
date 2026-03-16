'use client'

import Link from 'next/link'
import { BlurFade } from '@/components/ui/blur-fade'
import { ShineBorder } from '@/components/ui/shine-border'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { NumberTicker } from '@/components/ui/number-ticker'

const txFees = [
  { label: 'All deposits', free: true },
  { label: 'Cash withdrawal (branch)', free: true },
  { label: 'Automatic payments', free: true },
  { label: 'Direct debits & bill payments', free: true },
  { label: 'NZ bank transfers', free: true },
  { label: 'Disputed transaction', free: false, value: '$50.00' },
]

export function RatesFees() {
  return (
    <section className='mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8'>
      <h2 className='mb-10 text-balance text-2xl font-semibold tracking-tight text-fcu-primary-950 md:text-3xl'>
        Rates &amp; fees
      </h2>

      <div className='grid gap-5 md:grid-cols-2'>
        <BlurFade delay={0.1} inView>
          <div className='relative h-full overflow-hidden rounded-2xl border border-border bg-background'>
            <ShineBorder
              shineColor={['oklch(75.6% 0.138 220.17)', 'oklch(64.66% 0.117 219.68)']}
            />
            <div className='p-6'>
              <h3 className='mb-5 text-lg font-semibold text-foreground'>
                Interest rates
              </h3>
              <div className='space-y-0'>
                <div className='flex items-center justify-between border-b border-border py-3 text-sm'>
                  <span className='text-muted-foreground'>Credit balance</span>
                  <span className='font-mono font-semibold tabular-nums text-fcu-primary-900'>
                    <NumberTicker value={0.05} decimalPlaces={2} delay={0.2} className='text-fcu-primary-900' />
                    %&nbsp;p.a.
                  </span>
                </div>
                <div className='flex items-center justify-between py-3 text-sm'>
                  <span className='text-muted-foreground'>Overdrawn balance</span>
                  <span className='font-mono font-semibold tabular-nums text-amber-600'>
                    20.00%&nbsp;p.a.
                  </span>
                </div>
              </div>
              <p className='mt-4 text-xs leading-relaxed text-muted-foreground'>
                Looking for higher returns? Explore our{' '}
                <Link href='/accounts/savings-accounts' className='text-fcu-primary-900 hover:underline'>
                  savings accounts
                </Link>{' '}
                or{' '}
                <Link href='/accounts/term-deposits' className='text-fcu-primary-900 hover:underline'>
                  term deposits
                </Link>.
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className='relative h-full overflow-hidden rounded-2xl border border-border bg-background'>
            <ShineBorder
              shineColor={['oklch(75.6% 0.138 220.17)', 'oklch(64.66% 0.117 219.68)']}
            />
            <div className='p-6'>
              <h3 className='mb-5 text-lg font-semibold text-foreground'>
                Transaction fees
              </h3>
              <div className='space-y-0'>
                {txFees.map((fee) => (
                  <div
                    key={fee.label}
                    className='flex items-center justify-between border-b border-border py-3 text-sm last:border-b-0'
                  >
                    <span className='text-muted-foreground'>{fee.label}</span>
                    {fee.free ? (
                      <span className='rounded-full bg-fcu-secondary-500/15 px-3 py-0.5 text-xs font-semibold'>
                        <AnimatedShinyText className='text-fcu-primary-900'>
                          Free
                        </AnimatedShinyText>
                      </span>
                    ) : (
                      <span className='font-mono font-semibold tabular-nums text-foreground'>
                        {fee.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

      <p className='mt-8 text-xs leading-relaxed text-muted-foreground'>
        <strong className='font-medium text-foreground'>Depositor Compensation Scheme</strong>{' '}
        &mdash; From 1&nbsp;July&nbsp;2025, this account is covered.{' '}
        <Link
          href='/depositor-compensation-scheme'
          className='text-fcu-primary-900 hover:underline'
        >
          Learn&nbsp;more
        </Link>
      </p>
    </section>
  )
}
