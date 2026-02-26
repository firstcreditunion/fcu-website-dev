import { type SchemaTypeDefinition } from 'sanity'

import { headerNavigation } from './headerNavigation'
import { siteSettings } from './siteSettings'

import { link } from './objects/link'
import { navGroup } from './objects/navGroup'
import { mainNavItem } from './objects/mainNavItem'
import { seo } from './objects/seo'
import { socialLink } from './objects/socialLink'
import { address } from './objects/address'
import { dayHours } from './objects/dayHours'
import { announcementBar } from './objects/announcementBar'
import { disputeResolutionScheme } from './objects/disputeResolutionScheme'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    headerNavigation,
    siteSettings,

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
  ],
}
