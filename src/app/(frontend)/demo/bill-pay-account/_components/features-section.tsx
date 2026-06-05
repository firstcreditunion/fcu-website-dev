'use client'

import { CreditCard, ListChecks, Clock, Wallet } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { FeatureItem } from '@/components/marketing'

const features = [
  {
    icon: CreditCard,
    title: 'No account fees',
    desc: 'No monthly or joining fees. The account is free to open and free to hold.',
  },
  {
    icon: ListChecks,
    title: 'Bills stay ringfenced',
    desc: 'Committed funds are separated from everyday spending so you always know what’s left.',
  },
  {
    icon: Clock,
    title: 'Automatic payments',
    desc: 'APs, direct debits, and bill payments all run on schedule without manual effort.',
  },
  {
    icon: Wallet,
    title: 'Debit card eligible',
    desc: 'Link a Mastercard® Debit Card for in-store, online, and contactless payments.',
  },
]

export function FeaturesSection() {
  return (
    <section className='relative z-10 -mt-28 px-6 sm:-mt-32 md:-mt-40 lg:px-8'>
      <div className='mx-auto max-w-7xl rounded-3xl border border-border bg-card px-8 py-14 shadow-[var(--shadow-lg)] sm:px-12 sm:py-16 md:px-16 md:py-20'>
        <BlurFade delay={0} inView>
          <h2 className='mb-12 text-center text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em] text-balance text-foreground md:mb-14'>
            What&apos;s included
          </h2>
        </BlurFade>

        <div className='grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <BlurFade key={feat.title} delay={0.08 + i * 0.08} inView>
                <FeatureItem
                  className='items-center text-center'
                  icon={<Icon strokeWidth={1.8} aria-hidden='true' />}
                  title={feat.title}
                >
                  {feat.desc}
                </FeatureItem>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
