import { type SchemaTypeDefinition } from 'sanity'

import { homePage } from './homePage'
import { headerNavigation } from './headerNavigation'

import { link } from './objects/link'
import { navGroup } from './objects/navGroup'
import { mainNavItem } from './objects/mainNavItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    homePage,
    headerNavigation,

    // Objects (reusable)
    link,
    navGroup,
    mainNavItem,
  ],
}
