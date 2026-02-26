import type { StructureResolver } from 'sanity/structure'
import { HomeIcon, MenuIcon } from '@sanity/icons'

const SINGLETONS = ['homePage', 'headerNavigation']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.divider(),

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
    ])
