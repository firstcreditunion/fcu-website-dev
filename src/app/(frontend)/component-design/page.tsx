import type { Metadata } from 'next'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { ComponentDesignLayout } from './_components/component-design-layout'
import {
  FoundationsSection,
  ContentMessagingSection,
  EngagementConversionSection,
  NavigationDiscoverySection,
  MediaSection,
  FinancialServicesSection,
} from './_components/placeholder-sections'
import { ResearchDocumentSection } from './_components/research-document-section'

export const metadata: Metadata = {
  title: 'Component Design',
  description:
    'First Credit Union component library — CMS-driven blocks, page builder patterns, and interactive component showcases.',
  robots: 'noindex, nofollow',
}

async function getResearchMarkdown(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    'component-design-planning',
    'COMPONENT-DESIGN-RESEARCH.md',
  )
  return fs.readFile(filePath, 'utf-8')
}

export default async function ComponentDesignPage() {
  const researchContent = await getResearchMarkdown()

  return (
    <ComponentDesignLayout>
      <FoundationsSection />
      <ContentMessagingSection />
      <EngagementConversionSection />
      <NavigationDiscoverySection />
      <MediaSection />
      <FinancialServicesSection />
      <ResearchDocumentSection content={researchContent} />
    </ComponentDesignLayout>
  )
}
