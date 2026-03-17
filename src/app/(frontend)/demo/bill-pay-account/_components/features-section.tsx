'use client'

import { CreditCard, ListChecks, Clock, Wallet } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'

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
    <section className='relative z-10 -mt-28 px-6 sm:-mt-32 md:-mt-40 lg:px-8'>
      <div className='mx-auto max-w-5xl rounded-3xl bg-white px-8 py-14 shadow-lg ring-1 ring-black/5 sm:px-12 sm:py-16 md:px-16 md:py-20'>
        <BlurFade delay={0} inView>
          <h2 className='mb-12 text-center text-2xl font-semibold tracking-tight text-fcu-primary-950 md:mb-14 md:text-3xl'>
            What&apos;s included
          </h2>
        </BlurFade>

        <div className='grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feat, i) => (
            <BlurFade key={feat.title} delay={0.08 + i * 0.08} inView>
              <div className='flex flex-col items-center text-center'>
                <div className='mb-5 flex size-14 items-center justify-center rounded-2xl bg-fcu-primary-100'>
                  <feat.icon
                    className='size-6 text-fcu-primary-900'
                    strokeWidth={1.6}
                    aria-hidden='true'
                  />
                </div>
                <h3 className='mb-2 text-lg font-semibold text-fcu-primary-950'>
                  {feat.title}
                </h3>
                <p className='max-w-xs text-sm leading-relaxed text-muted-foreground'>
                  {feat.desc}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
