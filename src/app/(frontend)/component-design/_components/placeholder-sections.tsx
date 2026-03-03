'use client'

import { SectionWrapper } from './section-wrapper'
import {
  Layers,
  Type,
  MousePointerClick,
  Compass,
  Image,
  Landmark,
} from 'lucide-react'

interface PlaceholderCardProps {
  icon: React.ReactNode
  name: string
  description: string
}

function PlaceholderCard({ icon, name, description }: PlaceholderCardProps) {
  return (
    <div className='flex items-start gap-4 rounded-xl border border-dashed border-border bg-muted/30 p-5 transition-colors hover:border-border/80 hover:bg-muted/50'>
      <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground'>
        {icon}
      </div>
      <div>
        <p className='text-sm font-semibold text-foreground'>{name}</p>
        <p className='mt-0.5 text-xs text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}

function SectionPlaceholder({ label }: { label: string }) {
  return (
    <div className='rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center'>
      <p className='text-xs font-bold uppercase tracking-wider text-muted-foreground/60'>
        Coming Soon
      </p>
      <p className='mt-1 text-sm text-muted-foreground'>
        {label} components will be showcased here with live interactive demos.
      </p>
    </div>
  )
}

export function FoundationsSection() {
  return (
    <SectionWrapper
      id='foundations'
      title='Foundations'
      description='Core infrastructure components that power the page builder rendering pipeline.'
    >
      <div className='grid gap-3 sm:grid-cols-2'>
        <PlaceholderCard
          icon={<Layers className='size-5' />}
          name='PageBuilder Renderer'
          description='Switch-based block renderer with dynamic imports'
        />
        <PlaceholderCard
          icon={<Layers className='size-5' />}
          name='SanityImage'
          description='next/image wrapper with Sanity URL builder'
        />
        <PlaceholderCard
          icon={<Layers className='size-5' />}
          name='ButtonLink'
          description='CTA button component driven by Sanity buttonLink objects'
        />
        <PlaceholderCard
          icon={<Layers className='size-5' />}
          name='Section Wrapper'
          description='Semantic section with tone and spacing control'
        />
        <PlaceholderCard
          icon={<Layers className='size-5' />}
          name='Portable Text Renderer'
          description='Custom PTE components for rich text blocks'
        />
      </div>
      <SectionPlaceholder label='Foundation' />
    </SectionWrapper>
  )
}

export function ContentMessagingSection() {
  return (
    <SectionWrapper
      id='content-messaging'
      title='Content & Messaging'
      description='Primary content blocks for headlines, body copy, statistics, and feature showcases.'
    >
      <div className='grid gap-3 sm:grid-cols-2'>
        <PlaceholderCard
          icon={<Type className='size-5' />}
          name='Hero'
          description='Above-fold impact section with headline, image, and CTAs'
        />
        <PlaceholderCard
          icon={<Type className='size-5' />}
          name='Rich Text'
          description='Freeform content via Portable Text'
        />
        <PlaceholderCard
          icon={<Type className='size-5' />}
          name='Stats / Metrics'
          description='Key numbers and achievements display'
        />
        <PlaceholderCard
          icon={<Type className='size-5' />}
          name='Timeline'
          description='Chronological events and milestones'
        />
        <PlaceholderCard
          icon={<Type className='size-5' />}
          name='Features'
          description='Feature highlight grid with icons and descriptions'
        />
      </div>
      <SectionPlaceholder label='Content & Messaging' />
    </SectionWrapper>
  )
}

export function EngagementConversionSection() {
  return (
    <SectionWrapper
      id='engagement-conversion'
      title='Engagement & Conversion'
      description='Blocks designed to drive action — CTAs, social proof, FAQs, and lead capture.'
    >
      <div className='grid gap-3 sm:grid-cols-2'>
        <PlaceholderCard
          icon={<MousePointerClick className='size-5' />}
          name='Call to Action'
          description='Conversion-focused banner with headline and CTAs'
        />
        <PlaceholderCard
          icon={<MousePointerClick className='size-5' />}
          name='Testimonials'
          description='Social proof section with referenced testimonials'
        />
        <PlaceholderCard
          icon={<MousePointerClick className='size-5' />}
          name='FAQ'
          description='Accordion-style frequently asked questions'
        />
        <PlaceholderCard
          icon={<MousePointerClick className='size-5' />}
          name='Form'
          description='Contact, newsletter, and application forms'
        />
      </div>
      <SectionPlaceholder label='Engagement & Conversion' />
    </SectionWrapper>
  )
}

export function NavigationDiscoverySection() {
  return (
    <SectionWrapper
      id='navigation-discovery'
      title='Navigation & Discovery'
      description='Blocks that help users find and navigate to content across the site.'
    >
      <div className='grid gap-3 sm:grid-cols-2'>
        <PlaceholderCard
          icon={<Compass className='size-5' />}
          name='Content Card Grid'
          description='Linked content cards for discovery'
        />
        <PlaceholderCard
          icon={<Compass className='size-5' />}
          name='Logo Cloud'
          description='Partner and member organisation logos'
        />
        <PlaceholderCard
          icon={<Compass className='size-5' />}
          name='Team Showcase'
          description='Staff and team member profiles'
        />
      </div>
      <SectionPlaceholder label='Navigation & Discovery' />
    </SectionWrapper>
  )
}

export function MediaSection() {
  return (
    <SectionWrapper
      id='media'
      title='Media'
      description='Visual content blocks for images, galleries, and video embeds.'
    >
      <div className='grid gap-3 sm:grid-cols-2'>
        <PlaceholderCard
          icon={<Image className='size-5' />}
          name='Image Gallery'
          description='Responsive image showcase with lightbox'
        />
        <PlaceholderCard
          icon={<Image className='size-5' />}
          name='Video Embed'
          description='Embedded video with poster image'
        />
      </div>
      <SectionPlaceholder label='Media' />
    </SectionWrapper>
  )
}

export function FinancialServicesSection() {
  return (
    <SectionWrapper
      id='financial-services'
      title='Financial Services'
      description='FCU-specific blocks for products, rates, calculators, and branch information.'
    >
      <div className='grid gap-3 sm:grid-cols-2'>
        <PlaceholderCard
          icon={<Landmark className='size-5' />}
          name='Product Comparison'
          description='Side-by-side product feature comparison'
        />
        <PlaceholderCard
          icon={<Landmark className='size-5' />}
          name='Rate Display'
          description='Interest rate showcase for loans and savings'
        />
        <PlaceholderCard
          icon={<Landmark className='size-5' />}
          name='Calculator'
          description='Interactive loan, savings, and mortgage calculator'
        />
        <PlaceholderCard
          icon={<Landmark className='size-5' />}
          name='Branch Finder'
          description='Branch location search with map'
        />
        <PlaceholderCard
          icon={<Landmark className='size-5' />}
          name='Fee Table'
          description='Structured fee schedule display'
        />
      </div>
      <SectionPlaceholder label='Financial Services' />
    </SectionWrapper>
  )
}
