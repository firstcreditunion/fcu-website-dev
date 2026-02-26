import { defineQuery } from 'next-sanity'

export const HOMEPAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "homePage"][0] {
    title,
    subtitle,
    ctaText,
    ctaLink
  }
`)

export const HEADER_NAVIGATION_QUERY = defineQuery(/* groq */ `
  *[_id == "headerNavigation"][0] {
    mainNav[] {
      _key,
      label,
      url,
      megaMenu[] {
        _key,
        title,
        items[] {
          _key,
          label,
          linkType,
          url,
          externalUrl,
          openInNewTab
        }
      }
    },
    utilityNav {
      primaryAction {
        label,
        url
      },
      secondaryAction {
        label,
        url
      },
      showSearch
    }
  }
`)
