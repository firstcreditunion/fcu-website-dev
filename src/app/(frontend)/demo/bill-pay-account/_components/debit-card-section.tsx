'use client'

import Link from 'next/link'
import { BlurFade } from '@/components/ui/blur-fade'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import {
  CreditCard,
  CreditCardFlipper,
  CreditCardFront,
  CreditCardBack,
  CreditCardChip,
  CreditCardName,
  CreditCardNumber,
  CreditCardExpiry,
  CreditCardCvv,
  CreditCardMagStripe,
  CreditCardServiceProvider,
} from '@/components/kibo-ui/credit-card'

export function DebitCardSection() {
  return (
    <section className='bg-gradient-to-b from-white to-fcu-primary-50/30'>
      <div className='mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8'>
        <BlurFade delay={0.1} inView>
          <NeonGradientCard
            neonColors={{ firstColor: 'oklch(75.6% 0.138 220.17)', secondColor: 'oklch(47.85% 0.087 220.03)' }}
            borderSize={2}
            borderRadius={20}
            className='mx-auto max-w-3xl'
          >
            <div className='flex flex-col items-center gap-8 p-6 sm:flex-row sm:p-8'>
              <div className='w-full max-w-[280px] shrink-0'>
                <CreditCard>
                  <CreditCardFlipper>
                    <CreditCardFront className='bg-gradient-to-br from-fcu-primary-900 to-fcu-primary-600'>
                      <CreditCardChip />
                      <div className='absolute bottom-0 left-0 flex flex-col gap-2'>
                        <CreditCardNumber>&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4829</CreditCardNumber>
                        <div className='flex items-center gap-4'>
                          <CreditCardName>FCU Member</CreditCardName>
                          <CreditCardExpiry>12/28</CreditCardExpiry>
                        </div>
                      </div>
                      <CreditCardServiceProvider type='Mastercard' />
                    </CreditCardFront>
                    <CreditCardBack className='bg-gradient-to-br from-fcu-primary-800 to-fcu-primary-950'>
                      <CreditCardMagStripe />
                      <div className='absolute bottom-0 right-0 flex items-center gap-2'>
                        <span className='text-xs text-white/60'>CVV</span>
                        <CreditCardCvv className='rounded bg-white/90 px-3 py-1 text-sm text-fcu-primary-950'>
                          &bull;&bull;&bull;
                        </CreditCardCvv>
                      </div>
                    </CreditCardBack>
                  </CreditCardFlipper>
                </CreditCard>
              </div>

              <div className='text-center sm:text-left'>
                <h2 className='mb-2 text-lg font-semibold text-foreground'>
                  Mastercard&reg; Debit Card
                </h2>
                <p className='mb-3 text-sm leading-relaxed text-muted-foreground'>
                  Link a debit card to this account for in-store, online, and
                  contactless payments wherever Mastercard is accepted. Your
                  first card is issued free and a digital card is available
                  immediately via the&nbsp;mobile&nbsp;app.
                </p>
                <Link
                  href='/debit-card'
                  className='group inline-flex items-center gap-1 text-sm font-semibold text-fcu-primary-900 transition-colors hover:text-fcu-primary-700'
                >
                  View card details
                  <span aria-hidden='true' className='transition-transform group-hover:translate-x-0.5'>&rarr;</span>
                </Link>
              </div>
            </div>
          </NeonGradientCard>
        </BlurFade>
      </div>
    </section>
  )
}
