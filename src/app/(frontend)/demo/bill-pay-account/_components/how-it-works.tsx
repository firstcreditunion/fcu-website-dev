'use client'

import { BlurFade } from '@/components/ui/blur-fade'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/marketing'

const steps = [
  {
    num: 1,
    title: 'Open the account',
    desc: 'Contact us or visit a branch. We’ll set it up alongside your existing accounts in minutes.',
  },
  {
    num: 2,
    title: 'Fund it each payday',
    desc: 'Set an automatic transfer from your Everyday Account so the money arrives before bills fall due.',
  },
  {
    num: 3,
    title: 'Bills pay themselves',
    desc: 'Point direct debits, APs, and bill payments here. Everything runs on autopilot.',
  },
]

export function HowItWorks() {
  return (
    <Section>
      <BlurFade inView>
        <h2 className='mb-10 text-balance text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em] text-foreground'>
          3 steps to stress-free bills
        </h2>
      </BlurFade>

      <div className='grid gap-4 md:grid-cols-3'>
        {steps.map((step, i) => (
          <BlurFade key={step.num} delay={0.08 + i * 0.08} inView className='h-full'>
            <Card className='h-full'>
              <CardContent className='flex h-full flex-col gap-3 p-6'>
                <span className='inline-flex size-10 items-center justify-center rounded-xl bg-primary font-mono text-[16px] font-semibold text-primary-foreground'>
                  {step.num}
                </span>
                <h3 className='text-[17px] font-semibold tracking-[-0.01em] text-foreground'>
                  {step.title}
                </h3>
                <p className='text-[14px] leading-relaxed text-muted-foreground'>{step.desc}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}
