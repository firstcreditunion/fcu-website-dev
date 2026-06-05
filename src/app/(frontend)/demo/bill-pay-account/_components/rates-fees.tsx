'use client'

import Link from 'next/link'
import { BlurFade } from '@/components/ui/blur-fade'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
  DescriptionDetail,
} from '@/components/ui/description-list'
import { Section } from '@/components/marketing'

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
    <Section>
      <h2 className='mb-10 text-balance text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em] text-foreground'>
        Rates &amp; fees
      </h2>

      <div className='grid gap-8 md:grid-cols-2'>
        <BlurFade delay={0.1} inView>
          <div>
            <h3 className='mb-4 text-[17px] font-semibold text-foreground'>Interest rates</h3>
            <DescriptionList>
              <DescriptionRow className='grid-cols-[1fr_auto] gap-4'>
                <DescriptionTerm className='text-[14px]'>Credit balance</DescriptionTerm>
                <DescriptionDetail mono className='justify-end font-semibold'>
                  0.05% p.a.
                </DescriptionDetail>
              </DescriptionRow>
              <DescriptionRow className='grid-cols-[1fr_auto] gap-4'>
                <DescriptionTerm className='text-[14px]'>Overdrawn balance</DescriptionTerm>
                <DescriptionDetail mono className='justify-end font-semibold text-status-warning-700'>
                  20.00% p.a.
                </DescriptionDetail>
              </DescriptionRow>
            </DescriptionList>
            <p className='mt-4 text-xs leading-relaxed text-muted-foreground'>
              Looking for higher returns? Explore our{' '}
              <Link href='/accounts/savings-accounts' className='text-primary hover:underline'>
                savings accounts
              </Link>{' '}
              or{' '}
              <Link href='/accounts/term-deposits' className='text-primary hover:underline'>
                term deposits
              </Link>
              .
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div>
            <h3 className='mb-4 text-[17px] font-semibold text-foreground'>Transaction fees</h3>
            <DescriptionList>
              {txFees.map((fee) => (
                <DescriptionRow key={fee.label} className='grid-cols-[1fr_auto] gap-4'>
                  <DescriptionTerm className='text-[14px]'>{fee.label}</DescriptionTerm>
                  <DescriptionDetail className='justify-end'>
                    {fee.free ? (
                      <Badge variant='primary'>Free</Badge>
                    ) : (
                      <span className='font-mono font-semibold tabular-nums text-foreground'>
                        {fee.value}
                      </span>
                    )}
                  </DescriptionDetail>
                </DescriptionRow>
              ))}
            </DescriptionList>
          </div>
        </BlurFade>
      </div>

      <p className='mt-8 text-xs leading-relaxed text-muted-foreground'>
        <strong className='font-medium text-foreground'>Depositor Compensation Scheme</strong>
        {' — From 1 July 2025, this account is covered. '}
        <Button
          variant='link'
          render={<Link href='/depositor-compensation-scheme' />}
          nativeButton={false}
          className='text-xs'
        >
          Learn more
        </Button>
      </p>
    </Section>
  )
}
