import { type SchemaTypeDefinition } from 'sanity'

import { headerNavigation } from './headerNavigation'
import { footerNavigation } from './footerNavigation'
import { siteSettings } from './siteSettings'
import { designTokens, colorPalette, colorToken } from './designTokens'
import { componentConfig, variantGuideline } from './componentConfig'
import { designSystemUser } from './designSystemUser'
import { disclaimerSnippet } from './disclaimerSnippet'
import { loanPageBuilder } from './loanPageBuilder'
import { loanProductPage } from './loanProductPage'
import { brandMolecule } from './brandMolecule'

import { loanHeroBlock } from './blocks/loanHeroBlock'
import { loanAtAGlanceBlock } from './blocks/loanAtAGlanceBlock'
import { trustStatsBlock } from './blocks/trustStatsBlock'
import { featureGridBlock } from './blocks/featureGridBlock'
import { loanExampleBlock } from './blocks/loanExampleBlock'
import { ratesFeesBlock } from './blocks/ratesFeesBlock'
import { noticeBlock } from './blocks/noticeBlock'
import { faqBlock } from './blocks/faqBlock'
import { relatedLinksBlock } from './blocks/relatedLinksBlock'
import { ctaBarBlock } from './blocks/ctaBarBlock'
import { legalFinePrintBlock } from './blocks/legalFinePrintBlock'

import { link } from './objects/link'
import { navGroup } from './objects/navGroup'
import { mainNavItem } from './objects/mainNavItem'
import { seo } from './objects/seo'
import { socialLink } from './objects/socialLink'
import { address } from './objects/address'
import { dayHours } from './objects/dayHours'
import { announcementBar } from './objects/announcementBar'
import { disputeResolutionScheme } from './objects/disputeResolutionScheme'
import { footerLink } from './objects/footerLink'
import { footerColumn } from './objects/footerColumn'
import { buttonLink } from './objects/buttonLink'
import { keyValueRow } from './objects/keyValueRow'
import { trustStatItem } from './objects/trustStatItem'
import { featureItem } from './objects/featureItem'
import { faqItem } from './objects/faqItem'
import { relatedLinkItem } from './objects/relatedLinkItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    headerNavigation,
    footerNavigation,
    siteSettings,
    brandMolecule,
    designTokens,
    componentConfig,
    designSystemUser,
    disclaimerSnippet,
    loanProductPage,

    // Objects (reusable)
    link,
    navGroup,
    mainNavItem,
    seo,
    socialLink,
    address,
    dayHours,
    announcementBar,
    disputeResolutionScheme,
    footerLink,
    footerColumn,
    buttonLink,
    keyValueRow,
    trustStatItem,
    featureItem,
    faqItem,
    relatedLinkItem,
    colorPalette,
    colorToken,
    variantGuideline,
    loanPageBuilder,
    loanHeroBlock,
    loanAtAGlanceBlock,
    trustStatsBlock,
    featureGridBlock,
    loanExampleBlock,
    ratesFeesBlock,
    noticeBlock,
    faqBlock,
    relatedLinksBlock,
    ctaBarBlock,
    legalFinePrintBlock,
  ],
}
