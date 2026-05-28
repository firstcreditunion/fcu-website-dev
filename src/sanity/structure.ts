import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  MenuIcon,
  ComponentIcon,
  ColorWheelIcon,
  UsersIcon,
  DocumentTextIcon,
} from '@sanity/icons'

const SINGLETONS = ['siteSettings', 'headerNavigation', 'footerNavigation', 'designTokens']
const HIDDEN_TYPES = [
  ...SINGLETONS,
  'componentConfig',
  'designSystemUser',
  'loanProductPage',
  'disclaimerSnippet',
]

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
              S.listItem()
                .title('Footer Navigation')
                .icon(MenuIcon)
                .child(
                  S.document()
                    .schemaType('footerNavigation')
                    .documentId('footerNavigation')
                    .title('Footer Navigation'),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Design System')
        .icon(ColorWheelIcon)
        .child(
          S.list()
            .title('Design System')
            .items([
              S.listItem()
                .title('Design Tokens')
                .icon(ColorWheelIcon)
                .child(
                  S.document()
                    .schemaType('designTokens')
                    .documentId('designTokens')
                    .title('Design Tokens'),
                ),
              S.listItem()
                .title('Component Configs')
                .icon(ComponentIcon)
                .child(
                  S.documentTypeList('componentConfig').title(
                    'Component Configs',
                  ),
                ),
              S.listItem()
                .title('Users')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('designSystemUser').title(
                    'Design System Users',
                  ),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Loan Product Pages')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('loanProductPage').title('Loan Product Pages'),
        ),
      S.listItem()
        .title('Disclaimer Snippets')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('disclaimerSnippet').title('Disclaimer Snippets'),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_TYPES.includes(item.getId() as string),
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
