'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { Button } from '@/components/ui/button'
import { Stat, StatRow, StatLabel, StatValue } from '@/components/ui/stat'
import { Section } from '@/components/marketing'

const stats = [
  { value: '$0', label: 'Monthly fees' },
  { value: '24/7', label: 'Access' },
  { value: '$0', label: 'NZ transfers' },
]

export function StatsBar() {
  return (
    <Section variant='surface'>
      <BlurFade inView>
        <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-16'>
          {/* Left — copy */}
          <div className='flex flex-col items-start gap-5'>
            <h2 className='text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.025em] text-balance text-foreground'>
              Banking that doesn&apos;t cost you a cent
            </h2>
            <p className='max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base'>
              No monthly fees, no transfer charges, and round-the-clock access to your money. The Bill
              Pay Account keeps it simple so you can focus on what matters.
            </p>
            <Button
              variant='link'
              render={<Link href='/accounts' />}
              nativeButton={false}
              className='gap-1.5'
            >
              Compare all accounts <ArrowUpRight className='size-4' aria-hidden='true' />
            </Button>
          </div>

          {/* Right — DS stat blocks (no rings, all FCU-blue/neutral) */}
          <StatRow divided>
            {stats.map((s) => (
              <Stat key={s.label}>
                <StatValue mono>{s.value}</StatValue>
                <StatLabel>{s.label}</StatLabel>
              </Stat>
            ))}
          </StatRow>
        </div>
      </BlurFade>
    </Section>
  )
}
