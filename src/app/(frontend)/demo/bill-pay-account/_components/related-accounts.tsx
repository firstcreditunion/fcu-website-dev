'use client'

import Link from 'next/link'
import { ArrowRight, Wallet, PiggyBank, Target } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Section, SectionHead } from '@/components/marketing'

const accounts = [
  {
    icon: Wallet,
    title: 'Everyday Account',
    desc: 'Your main account for day-to-day spending, wages, and 24/7 banking access.',
    href: '/accounts/transactional-accounts/everyday-account',
    cta: 'Apply online',
  },
  {
    icon: PiggyBank,
    title: 'Expense Account',
    desc: 'Set aside money for regular expenses, separate from your everyday funds.',
    href: '/accounts/transactional-accounts/expense-account',
    cta: 'Open an account',
  },
  {
    icon: Target,
    title: 'Special Purpose Account',
    desc: 'Short-term savings goals with funds kept readily available when you need them.',
    href: '/accounts/transactional-accounts/special-purpose-account',
    cta: 'Open an account',
  },
]

export function RelatedAccounts() {
  return (
    <Section variant='surface'>
      <SectionHead eyebrow='Other transactional accounts' title='Explore more accounts' />
      <div className='grid gap-4 md:grid-cols-3'>
        {accounts.map((account, i) => {
          const Icon = account.icon
          return (
            <BlurFade key={account.title} delay={0.08 + i * 0.08} inView className='h-full'>
              <Card className='h-full transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-md)]'>
                <CardContent className='flex h-full flex-col gap-3 p-6'>
                  <span className='grid size-10 place-items-center rounded-lg bg-primary-subtle text-primary [&_svg]:size-5'>
                    <Icon aria-hidden='true' />
                  </span>
                  <h3 className='text-[16px] font-semibold text-foreground'>{account.title}</h3>
                  <p className='flex-1 text-sm leading-relaxed text-muted-foreground'>
                    {account.desc}
                  </p>
                  <Button
                    variant='link'
                    render={<Link href={account.href} />}
                    nativeButton={false}
                    className='w-fit gap-1.5'
                  >
                    {account.cta} <ArrowRight className='size-3.5' aria-hidden='true' />
                  </Button>
                </CardContent>
              </Card>
            </BlurFade>
          )
        })}
      </div>
    </Section>
  )
}
