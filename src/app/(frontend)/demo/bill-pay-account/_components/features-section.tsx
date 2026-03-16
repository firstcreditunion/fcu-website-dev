'use client'

import { CreditCard, ListChecks, Clock, Wallet } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'

const features = [
  {
    icon: CreditCard,
    title: 'No account fees',
    desc: 'No monthly or joining fees. The account is free to open and free to hold.',
  },
  {
    icon: ListChecks,
    title: 'Bills stay ringfenced',
    desc: 'Committed funds are separated from everyday spending so you always know what\u2019s left.',
  },
  {
    icon: Clock,
    title: 'Automatic payments',
    desc: 'APs, direct debits, and bill payments all run on schedule without manual effort.',
  },
  {
    icon: Wallet,
    title: 'Debit card eligible',
    desc: 'Link a Mastercard\u00AE Debit Card for in-store, online, and contactless payments.',
  },
]

export function FeaturesSection() {
  return (
    <section className='mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8'>
      <h2 className='mb-10 text-balance text-2xl font-semibold tracking-tight text-fcu-primary-950 md:text-3xl'>
        What&apos;s included
      </h2>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {features.map((feat, i) => (
          <BlurFade key={feat.title} delay={0.08 + i * 0.06} inView>
            <MagicCard
              className='h-full rounded-2xl'
              gradientColor='oklch(93.67% 0.039 227.71 / 0.4)'
              gradientFrom='oklch(75.6% 0.138 220.17)'
              gradientTo='oklch(64.66% 0.117 219.68)'
            >
              <div className='p-6'>
                <div className='mb-4 flex size-11 items-center justify-center rounded-xl bg-fcu-primary-100 text-fcu-primary-900'>
                  <feat.icon className='size-5' strokeWidth={1.8} aria-hidden='true' />
                </div>
                <h3 className='mb-2 text-base font-semibold text-foreground'>
                  {feat.title}
                </h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {feat.desc}
                </p>
              </div>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </section>
  )
}
