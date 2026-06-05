'use client'

import Link from 'next/link'
import { BlurFade } from '@/components/ui/blur-fade'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/marketing'

export function DebitCardSection() {
  return (
    <Section variant='surface'>
      <BlurFade delay={0.1} inView>
        <Card className='mx-auto max-w-3xl'>
          <CardContent className='flex flex-col items-center gap-8 p-6 sm:flex-row sm:p-8'>
            {/* Static card visual — a primary-blue gradient panel (represents a physical card, not UI chrome) */}
            <div className='w-full max-w-[300px] shrink-0'>
              <div className='relative flex aspect-[1.586/1] flex-col justify-between overflow-hidden rounded-xl bg-[linear-gradient(135deg,var(--color-fcu-primary-900),var(--color-fcu-primary-600))] p-5 text-white shadow-[var(--shadow-lg)] ring-1 ring-inset ring-white/10'>
                <div className='flex items-start justify-between'>
                  {/* chip */}
                  <div className='h-7 w-10 rounded-md bg-[linear-gradient(135deg,oklch(88%_0.06_90),oklch(70%_0.09_85))] ring-1 ring-inset ring-black/10' />
                  {/* Mastercard mark */}
                  <div className='flex items-center' aria-hidden='true'>
                    <span className='size-6 rounded-full bg-[oklch(64%_0.2_25)]' />
                    <span className='-ml-2.5 size-6 rounded-full bg-[oklch(78%_0.17_60)]' />
                  </div>
                </div>
                <div>
                  <div className='font-mono text-[15px] tracking-[0.14em]'>
                    &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4829
                  </div>
                  <div className='mt-2 flex items-center justify-between'>
                    <span className='text-[11px] font-medium tracking-wide text-white/85 uppercase'>
                      FCU Member
                    </span>
                    <span className='font-mono text-[11px] text-white/85'>12/28</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='text-center sm:text-left'>
              <h2 className='mb-2 text-[18px] font-semibold text-foreground'>
                Mastercard&reg; Debit Card
              </h2>
              <p className='mb-3 text-sm leading-relaxed text-muted-foreground'>
                Link a debit card to this account for in-store, online, and contactless payments
                wherever Mastercard is accepted. Your first card is issued free and a digital card is
                available immediately via the&nbsp;mobile&nbsp;app.
              </p>
              <Button variant='link' render={<Link href='/debit-card' />} nativeButton={false}>
                View card details &rarr;
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </Section>
  )
}
