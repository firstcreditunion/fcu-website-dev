import { HeroSection } from './_components/hero-section'
import { FeaturesSection } from './_components/features-section'
import { HowItWorks } from './_components/how-it-works'
import { RatesFees } from './_components/rates-fees'
import { DebitCardSection } from './_components/debit-card-section'
import { FaqSection } from './_components/faq-section'
import { RelatedAccounts } from './_components/related-accounts'
import { CtaSection } from './_components/cta-section'

export const metadata = {
  title: 'Bill Pay Account | First Credit Union',
  description:
    'Keep your regular bill payments in one dedicated place. The Bill Pay Account separates committed payments from everyday spending — no monthly fees, automatic payments, and debit card eligible.',
}

export default function BillPayAccountPage() {
  return (
    <div className='overflow-x-hidden'>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <RatesFees />
      <DebitCardSection />
      <FaqSection />
      <RelatedAccounts />
      <CtaSection />
    </div>
  )
}
