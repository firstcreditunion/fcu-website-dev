import { type SchemaTypeDefinition } from 'sanity'

import { headerNavigation } from './headerNavigation'
import { footerNavigation } from './footerNavigation'
import { siteSettings } from './siteSettings'
import { designTokens, colorPalette, colorToken } from './designTokens'
import { componentConfig, variantGuideline } from './componentConfig'
import { designSystemUser } from './designSystemUser'

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

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    headerNavigation,
    footerNavigation,
    siteSettings,
    designTokens,
    componentConfig,
    designSystemUser,

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
    colorPalette,
    colorToken,
    variantGuideline,
  ],
}
