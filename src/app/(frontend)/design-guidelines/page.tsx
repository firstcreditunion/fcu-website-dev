import type { Metadata } from 'next'
import { DesignGuidelinesLayout } from './_components/design-guidelines-layout'
import { LogoSection } from './_components/logo-section'
import { TypographySection } from './_components/typography-section'
import { ColourSection } from './_components/colour-section'
import { SpacingSection } from './_components/spacing-section'
import { ElevationSection } from './_components/elevation-section'
import { RadiusSection } from './_components/radius-section'
import { IconSection } from './_components/icon-section'

export const metadata: Metadata = {
  title: 'Design Guidelines',
  description:
    'First Credit Union design system — tokens, typography, colours, spacing, and component reference.',
  robots: 'noindex, nofollow',
}

export default function DesignGuidelinesPage() {
  return (
    <DesignGuidelinesLayout>
      <LogoSection />
      <TypographySection />
      <ColourSection />
      <SpacingSection />
      <ElevationSection />
      <RadiusSection />
      <IconSection />
    </DesignGuidelinesLayout>
  )
}
