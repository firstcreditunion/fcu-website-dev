import type { StructureResolver } from 'sanity/structure'
import { CogIcon, MenuIcon } from '@sanity/icons'

const SINGLETONS = ['siteSettings', 'headerNavigation']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Navigation')
        .icon(MenuIcon)
        .child(
          S.list()
            .title('Navigation')
            .items([
              S.listItem()
                .title('Header Navigation')
                .icon(MenuIcon)
                .child(
                  S.document()
                    .schemaType('headerNavigation')
                    .documentId('headerNavigation')
                    .title('Header Navigation'),
                ),
            ]),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() as string),
      ),

      S.divider(),

      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),
    ])
