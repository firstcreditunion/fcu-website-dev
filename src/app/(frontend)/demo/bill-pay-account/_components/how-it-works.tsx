'use client'

import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { TextAnimate } from '@/components/ui/text-animate'

const steps = [
  {
    num: 1,
    title: 'Open the account',
    desc: 'Contact us or visit a branch. We\u2019ll set it up alongside your existing accounts in minutes.',
  },
  {
    num: 2,
    title: 'Fund it each payday',
    desc: 'Set an automatic transfer from your Everyday Account so the money arrives before bills fall\u00A0due.',
  },
  {
    num: 3,
    title: 'Bills pay themselves',
    desc: 'Point direct debits, APs, and bill payments here. Everything runs on autopilot.',
  },
]

export function HowItWorks() {
  return (
    <section className='my-20'>
      <div className='mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8'>
        <TextAnimate
          as='h2'
          animation='blurInUp'
          by='word'
          className='mb-12 text-balance text-2xl font-semibold tracking-tight text-fcu-primary-950 md:text-3xl'
        >
          3 steps to stress-free bills
        </TextAnimate>

        <div className='grid gap-6 md:grid-cols-3 md:gap-0'>
          {steps.map((step, i) => (
            <BlurFade key={step.num} delay={0.1 + i * 0.1} inView>
              <div
                className={`relative px-0 md:px-8 ${
                  i < steps.length - 1
                    ? 'border-b border-border pb-6 md:border-b-0 md:border-r md:pb-0'
                    : ''
                } ${i === 0 ? 'md:pl-0' : ''} ${i === steps.length - 1 ? 'md:pr-0' : ''}`}
              >
                <div className='mb-4 flex size-12 items-center justify-center rounded-2xl bg-fcu-primary-900 font-mono text-lg font-bold text-white shadow-lg shadow-fcu-primary-900/20'>
                  <NumberTicker
                    value={step.num}
                    delay={0.3 + i * 0.12}
                    className='text-white'
                  />
                </div>
                <h3 className='mb-2 text-lg font-semibold text-foreground'>
                  {step.title}
                </h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {step.desc}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
