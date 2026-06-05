'use client'

import Link from 'next/link'
import { BlurFade } from '@/components/ui/blur-fade'
import { Button } from '@/components/ui/button'
import { Cta, CtaContent, CtaTitle, CtaMessage, CtaActions } from '@/components/ui/cta'
import { Section } from '@/components/marketing'

export function CtaSection() {
  return (
    <Section>
      <BlurFade inView>
        {/* DS primary CTA. after:hidden disables the component's built-in
            fcu-secondary (lime) radial glow to honor the reserved-secondary policy —
            the gradient itself is pure fcu-primary blue. */}
        <Cta tone='primary' layout='centered' className='after:hidden'>
          <CtaContent>
            <CtaTitle>Ready to separate your bills?</CtaTitle>
            <CtaMessage>
              Contact us by phone or visit a branch — our team will have you set up quickly. Call
              centre hours: Mon&nbsp;10&thinsp;am&ndash;5&thinsp;pm, Tue&ndash;Fri&nbsp;8&thinsp;am&ndash;5&thinsp;pm.
            </CtaMessage>
          </CtaContent>
          <CtaActions>
            <Button render={<Link href='/contact' />} nativeButton={false} size='lg'>
              Contact us
            </Button>
            <Button
              render={<Link href='/branches' />}
              nativeButton={false}
              variant='ghost'
              size='lg'
            >
              Find a branch
            </Button>
          </CtaActions>
        </Cta>
      </BlurFade>
    </Section>
  )
}
