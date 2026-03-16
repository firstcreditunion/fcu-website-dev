'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'

const accounts = [
  {
    title: 'Everyday Account',
    desc: 'Your main account for day-to-day spending, wages, and 24/7 banking access.',
    href: '/accounts/transactional-accounts/everyday-account',
    cta: 'Apply online',
  },
  {
    title: 'Expense Account',
    desc: 'Set aside money for regular expenses, separate from your everyday funds.',
    href: '/accounts/transactional-accounts/expense-account',
    cta: 'Open an account',
  },
  {
    title: 'Special Purpose Account',
    desc: 'Short-term savings goals with funds kept readily available when you need them.',
    href: '/accounts/transactional-accounts/special-purpose-account',
    cta: 'Open an account',
  },
]

export function RelatedAccounts() {
  return (
    <section className='mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8'>
      <p className='mb-1 text-xs font-semibold uppercase tracking-wider text-fcu-primary-800/50'>
        Other transactional accounts
      </p>
      <h2 className='mb-10 text-2xl font-semibold tracking-tight text-fcu-primary-950 md:text-3xl'>
        Explore more accounts
      </h2>

      <div className='grid gap-4 md:grid-cols-3'>
        {accounts.map((account) => (
          <MagicCard
            key={account.title}
            className='h-full rounded-2xl'
            gradientColor='oklch(93.67% 0.039 227.71 / 0.3)'
            gradientFrom='oklch(75.6% 0.138 220.17)'
            gradientTo='oklch(64.66% 0.117 219.68)'
          >
            <div className='flex h-full flex-col p-6'>
              <h3 className='mb-2 text-base font-semibold text-foreground'>
                {account.title}
              </h3>
              <p className='mb-5 flex-1 text-sm leading-relaxed text-muted-foreground'>
                {account.desc}
              </p>
              <Link
                href={account.href}
                className='group inline-flex items-center gap-1.5 text-sm font-semibold text-fcu-primary-900 transition-colors hover:text-fcu-primary-700'
              >
                {account.cta}
                <ArrowRight
                  aria-hidden='true'
                  className='size-3.5 transition-transform group-hover:translate-x-0.5'
                />
              </Link>
            </div>
          </MagicCard>
        ))}
      </div>
    </section>
  )
}
