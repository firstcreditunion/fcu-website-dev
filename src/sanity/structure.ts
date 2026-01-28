import type { StructureResolver } from 'sanity/structure'
import { HomeIcon } from '@sanity/icons'

/**
 * PLACEHOLDER STRUCTURE - Update when adding more document types
 *
 * Singletons use fixed documentId to ensure only one document exists.
 * Add new singletons to SINGLETONS array to filter from generic lists.
 */

// Document types that should be singletons (not appear in generic lists)
const SINGLETONS = ['homePage']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Homepage singleton with fixed ID
      S.listItem().title('Homepage').icon(HomeIcon).child(
        S.document().schemaType('homePage').documentId('homePage'), // Fixed ID = singleton
      ),

      S.divider(),

      // All other document types (filtered to exclude singletons)
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() as string),
      ),
    ])
