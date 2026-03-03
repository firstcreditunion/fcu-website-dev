import type { Metadata } from 'next'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { client } from '@/sanity/lib/client'
import {
  DESIGN_TOKENS_QUERY,
  ALL_COMPONENT_CONFIGS_QUERY,
} from '@/sanity/lib/queries'
import { ComponentDesignLayout } from './_components/component-design-layout'
import { AuthGate } from './_components/auth-gate'
import { SyncTokensButton } from './_components/sync-tokens-button'
import {
  FoundationsSection,
  ContentMessagingSection,
  EngagementConversionSection,
  NavigationDiscoverySection,
  MediaSection,
  FinancialServicesSection,
} from './_components/placeholder-sections'
import { ResearchDocumentSection } from './_components/research-document-section'
import { ButtonShowcase } from './_components/showcases/button-showcase'
import { BadgeShowcase } from './_components/showcases/badge-showcase'
import { InputShowcase } from './_components/showcases/input-showcase'
import { SelectShowcase } from './_components/showcases/select-showcase'
import { SwitchShowcase } from './_components/showcases/switch-showcase'
import { SliderShowcase } from './_components/showcases/slider-showcase'
import { LabelShowcase } from './_components/showcases/label-showcase'
import { CardShowcase } from './_components/showcases/card-showcase'
import { SeparatorShowcase } from './_components/showcases/separator-showcase'
import { TabsShowcase } from './_components/showcases/tabs-showcase'
import { AccordionShowcase } from './_components/showcases/accordion-showcase'
import { TableShowcase } from './_components/showcases/table-showcase'
import { DialogShowcase } from './_components/showcases/dialog-showcase'
import { SheetShowcase } from './_components/showcases/sheet-showcase'
import { TooltipShowcase } from './_components/showcases/tooltip-showcase'
import { SonnerShowcase } from './_components/showcases/sonner-showcase'
import { NavigationMenuShowcase } from './_components/showcases/navigation-menu-showcase'
import { CommandShowcase } from './_components/showcases/command-showcase'
import { ScrollAreaShowcase } from './_components/showcases/scroll-area-showcase'

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

function getConfig(configs: Record<string, unknown>[] | null, name: string) {
  if (!configs) return null
  const found = configs.find(
    (c) => (c as { componentName?: string }).componentName === name,
  )
  return (found as Record<string, unknown> | undefined) ?? null
}

export default async function ComponentDesignPage() {
  const researchContent = await getResearchMarkdown()

  let designTokens: { lastSyncedAt?: string | null } | null = null
  let componentConfigs: Record<string, unknown>[] | null = null

  try {
    const tokensResult = await client.fetch(DESIGN_TOKENS_QUERY)
    designTokens = tokensResult
    componentConfigs = await client.fetch(ALL_COMPONENT_CONFIGS_QUERY)
  } catch {
    // Sanity may not have these documents yet — that's fine
  }

  return (
    <ComponentDesignLayout>
      <AuthGate>
        <div className='mb-8'>
          <SyncTokensButton lastSyncedAt={designTokens?.lastSyncedAt} />
        </div>

        {/* Page Builder Blocks */}
        <FoundationsSection />
        <ContentMessagingSection />
        <EngagementConversionSection />
        <NavigationDiscoverySection />
        <MediaSection />
        <FinancialServicesSection />

        {/* UI Primitives — Interactive Playgrounds */}
        <ButtonShowcase
          initialConfig={getConfig(componentConfigs, 'button') as never}
        />
        <BadgeShowcase
          initialConfig={getConfig(componentConfigs, 'badge') as never}
        />
        <InputShowcase
          initialConfig={getConfig(componentConfigs, 'input') as never}
        />
        <SelectShowcase
          initialConfig={getConfig(componentConfigs, 'select') as never}
        />
        <SwitchShowcase
          initialConfig={getConfig(componentConfigs, 'switch') as never}
        />
        <SliderShowcase
          initialConfig={getConfig(componentConfigs, 'slider') as never}
        />
        <LabelShowcase
          initialConfig={getConfig(componentConfigs, 'label') as never}
        />
        <CardShowcase
          initialConfig={getConfig(componentConfigs, 'card') as never}
        />
        <SeparatorShowcase
          initialConfig={getConfig(componentConfigs, 'separator') as never}
        />
        <TabsShowcase
          initialConfig={getConfig(componentConfigs, 'tabs') as never}
        />
        <AccordionShowcase
          initialConfig={getConfig(componentConfigs, 'accordion') as never}
        />
        <TableShowcase
          initialConfig={getConfig(componentConfigs, 'table') as never}
        />
        <DialogShowcase
          initialConfig={getConfig(componentConfigs, 'dialog') as never}
        />
        <SheetShowcase
          initialConfig={getConfig(componentConfigs, 'sheet') as never}
        />
        <TooltipShowcase
          initialConfig={getConfig(componentConfigs, 'tooltip') as never}
        />
        <SonnerShowcase
          initialConfig={getConfig(componentConfigs, 'sonner') as never}
        />
        <NavigationMenuShowcase
          initialConfig={
            getConfig(componentConfigs, 'navigation-menu') as never
          }
        />
        <CommandShowcase
          initialConfig={getConfig(componentConfigs, 'command') as never}
        />
        <ScrollAreaShowcase
          initialConfig={getConfig(componentConfigs, 'scroll-area') as never}
        />

        {/* Reference */}
        <ResearchDocumentSection content={researchContent} />
      </AuthGate>
    </ComponentDesignLayout>
  )
}
