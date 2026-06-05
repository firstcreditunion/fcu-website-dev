'use client'

import { BlurFade } from '@/components/ui/blur-fade'
import { Wrap, Split, SectionHead, Checklist, ChecklistItem } from '@/components/marketing'

export function WhyRingfence() {
  return (
    <section className='bg-surface py-[clamp(48px,7vw,96px)]'>
      <Wrap>
        <BlurFade inView>
          <Split
            blob
            image={{
              src: '/illustrations/bill-pay.png',
              alt: 'An illustration of a person managing their monthly bills and payments.',
            }}
          >
            <SectionHead
              className='mb-0'
              eyebrow='How it works in practice'
              title="Bills shouldn't eat into what's free to spend."
              lede='Your Bill Pay Account holds the money already promised to rent, power and insurance — so the balance you see everywhere else is the balance you can actually use.'
            />
            <Checklist className='mt-6'>
              <ChecklistItem title='Committed funds stay separated.' />
              <ChecklistItem title="Your Everyday Account shows only what's free to spend." />
              <ChecklistItem title='Automatic payments run on schedule.' />
              <ChecklistItem title='Top it up once each payday and forget it.' />
            </Checklist>
          </Split>
        </BlurFade>
      </Wrap>
    </section>
  )
}
