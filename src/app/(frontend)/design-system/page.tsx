import type { Metadata } from 'next'
import { Foundations } from './_sections/foundations'
import { Buttons } from './_sections/buttons'
import { Inputs } from './_sections/inputs'
import { TextareaSelect } from './_sections/textarea-select'
import { Selection } from './_sections/selection'
import { CardDialog } from './_sections/card-dialog'
import { TableSection } from './_sections/table'
import { AlertBadge } from './_sections/alert-badge'
import { Navigation } from './_sections/navigation'
import { Disclosure } from './_sections/disclosure'
import { DropdownMenuSection } from './_sections/dropdown-menu'
import { HoverCardSection } from './_sections/hover-card'
import { AvatarSection } from './_sections/avatar'
import { Indicators } from './_sections/indicators'
import { SkeletonSection } from './_sections/skeleton'
import { ToastSection } from './_sections/toast'
import { EmptyState } from './_sections/empty-state'
import { ToggleGroupSection, RatingSection } from './_sections/toggle-rating'
import { SliderSection } from './_sections/slider'
import { OtpSection } from './_sections/otp'
import { StepperSection } from './_sections/stepper'
import { FileUploadSection } from './_sections/file-upload'
import { TagInputSection } from './_sections/tag-input'
import { ComboboxSection } from './_sections/combobox'
import { CommandSection } from './_sections/command'

export const metadata: Metadata = {
  title: 'Design System',
  // Dev/internal reference — public but kept out of search engines.
  robots: { index: false, follow: false },
}

export default function DesignSystemPage() {
  return (
    <>
      <header className='border-b border-border pb-8'>
        <p className='text-[11px] font-semibold uppercase tracking-widest text-brand-accent'>
          First Credit Union
        </p>
        <h1 className='mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl'>
          Design System
        </h1>
        <p className='mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
          The living reference for First Credit Union components, tokens, and patterns — built on
          shadcn / Base UI and Tailwind v4.
        </p>
      </header>

      <Foundations />
      <Buttons />
      <Inputs />
      <TextareaSelect />
      <Selection />
      <CardDialog />
      <TableSection />
      <AlertBadge />
      <Navigation />
      <Disclosure />
      <DropdownMenuSection />
      <HoverCardSection />
      <AvatarSection />
      <Indicators />
      <SkeletonSection />
      <ToastSection />
      <EmptyState />
      <ToggleGroupSection />
      <RatingSection />
      <SliderSection />
      <OtpSection />
      <StepperSection />
      <FileUploadSection />
      <TagInputSection />
      <ComboboxSection />
      <CommandSection />
    </>
  )
}
